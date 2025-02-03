import React, { useEffect, useState } from "react";
import Card from "../components/CardComponent";
import { decodeToken } from "../utils/authUtils";
import { getAllFavoriteForUser } from "../services/favoriteService";
import { getImagesByPropertyId } from "../services/imagesService";

function FavoriteProperty() {
    const [properties, setProperties] = useState([]);
    const user = decodeToken();

    useEffect(() => {
        const fetchFavoriteProperty = async () => {
            try {
                const allFavorite = await getAllFavoriteForUser(user._id);
                const allProperty = allFavorite.map((a) => a.properties).filter((property) => property !== null);
                const propertiesWithImages = await Promise.all(
                    allProperty.map(async (property) => {
                        const imagesResponse = await getImagesByPropertyId(property._id);
                        return {
                            ...property,
                            mainImage: imagesResponse[0]?.mainImageURL || null,
                        };
                    })
                );
                setProperties(propertiesWithImages);
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        };

        fetchFavoriteProperty();
    }, []);

    return (
        <div className="container mx-auto max-w-[1280px] min-h-[600px] px-4 py-10">
            <h1 className="text-2xl font-bold mb-6">
                좋아하는 부동산 목록
            </h1>
            {properties.length > 0 ? (
                <Card properties={properties} />
            ) : (
                <p className="text-gray-600">좋아하는 부동산이 없습니다</p>
            )}
        </div>
    );
}

export default FavoriteProperty;
