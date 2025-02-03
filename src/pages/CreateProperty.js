import React from "react";
import PropertyForm from "../components/PropertyForm";
import { addProperty } from "../services/propertyService"; // API tạo bất động sản
import { uploadImages } from "../services/imagesService"; // API upload ảnh
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateProperty = () => {
    const navigate = useNavigate();
    const handleSubmit = async ({ mainImageURL, additionalImages, ...values }) => {
        try {
            const propertyData = { ...values };
            const response = await addProperty(propertyData);

            const propertyId = response?._id ?? null;
            const imagesFormData = new FormData();

            if (mainImageURL.length > 0 && mainImageURL[0]?.originFileObj) {
                imagesFormData.append("mainImageURL", mainImageURL[0].originFileObj);
            }

            additionalImages.forEach((file) => {
                if (file.originFileObj) {
                    imagesFormData.append("additionalImages", file.originFileObj);
                }
            });
            imagesFormData.append("propertyId", propertyId);

            const uploadResponse = await uploadImages(imagesFormData);

            navigate("/admin/manageProperty", {
                state: { message: "새 부동산이 성공적으로 생성되었습니다." },
            });
        } catch (error) {
            console.error("Error submitting property:", error);
            toast.error("부동산 생성 또는 이미지 업로드 중 오류가 발생했습니다.", { autoClose: 1500 });
        }
    };

    return (
        <div>
            <PropertyForm onSubmit={handleSubmit} />
            <ToastContainer />
        </div>
    );
};

export default CreateProperty;
