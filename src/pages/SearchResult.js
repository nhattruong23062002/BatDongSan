import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProperties } from "../services/propertyService";
import Card from "../components/CardComponent";
import { getImagesByPropertyId } from "../services/imagesService";

function SearchResults() {
    const [properties, setProperties] = useState([]);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("query");
    const type = new URLSearchParams(location.search).get("type");

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const allProperties = await getProperties();

                const filteredProperties = allProperties.filter((property) => {
                    const matchesTitle = property.title.toLowerCase().includes(query.toLowerCase());
                    const matchesType = type ? property.listingType === type : true;
                    return matchesTitle && matchesType;
                });

                const propertiesWithImages = await Promise.all(
                    filteredProperties.map(async (property) => {
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

        fetchSearchResults();
    }, [query, type]);

    return (
        <div className="container mx-auto max-w-[1280px] min-h-[600px] px-4 py-10">
            <h1 className="text-2xl font-bold mb-6">
                검색 결과: {query}
            </h1>
            {properties.length > 0 ? (
                <Card properties={properties} />
            ) : (
                <p className="text-gray-600">일치하는 부동산을 찾을 수 없습니다.</p>
            )}
        </div>
    );
}

export default SearchResults;
