import React, { useEffect, useState } from "react";
import PropertyForm from "../components/PropertyForm";
import { useParams, useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { getDetailProperty, updateProperty } from "../services/propertyService";
import { toast, ToastContainer } from "react-toastify";
import { getImages, updateImages } from "../services/imagesService";

const EditProperty = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [initialData, setInitialData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [idImages, setIdImages] = useState(true);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const property = await getDetailProperty(id);
                const images = await getImages();

                const propertyImages = images.find((img) => img.propertyId === id);
                setIdImages(propertyImages?.id)

                setInitialData({
                    ...property,
                    mainImageURL: propertyImages?.mainImageURL || null,
                    additionalImages: propertyImages?.additionalImages || [],
                });
            } catch (error) {
                toast.error("부동산 데이터를 가져오는 중 오류가 발생했습니다.", { autoClose: 1500 });
            } finally {
                setLoading(false);
            }
        };
        fetchProperty();
    }, [id]);

    const handleSubmit = async ({ mainImageURL, additionalImages, ...values }) => {
        try {
            await updateProperty(id, values);

            const updatedImages = new FormData();

            if (
                mainImageURL.length > 0 &&
                mainImageURL[0]?.originFileObj &&
                mainImageURL[0]?.url !== initialData.mainImageURL
            ) {
                updatedImages.append("mainImageURL", mainImageURL[0].originFileObj);
            }

            const newAdditionalImages = additionalImages.filter((file) => file.originFileObj);
            if (newAdditionalImages.length > 0) {
                newAdditionalImages.forEach((file) => {
                    updatedImages.append("additionalImages", file.originFileObj);
                });
            }

            if (updatedImages.has("mainImageURL") || updatedImages.has("additionalImages")) {
                updatedImages.append("propertyId", id);
                await updateImages(idImages, updatedImages);
            }

            navigate("/admin/manageProperty", {
                state: { message: "부동산이 성공적으로 업데이트되었습니다." },
            });
        } catch (error) {
            console.error("Error updating property or images:", error);
            toast.error("부동산 업데이트 중 오류가 발생했습니다.", { autoClose: 1500 });
        }
    };


    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div>
            <PropertyForm initialData={initialData} onSubmit={handleSubmit} />
            <ToastContainer />
        </div>
    );
};

export default EditProperty;
