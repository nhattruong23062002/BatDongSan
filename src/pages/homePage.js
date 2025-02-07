import React, { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { API_URL } from "../config/apiUrls";
import axios from "axios";
import Card from "../components/CardComponent";
import { useNavigate } from "react-router-dom";
import { getProperties, getPropertiesByBedroomAndType } from "../services/propertyService";
import { getImagesByPropertyId } from "../services/imagesService";

function HomePage() {
    const [activeType, setActiveType] = useState("아파트");
    const [propertyTypes, setPropertyTypes] = useState([]);
    const [properties, setProperties] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [propertiesByBedroomAndType, setPropertiesByBedroomAndType] = useState("");
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [listingType, setListingType] = useState("Rent");

    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchQuery.trim() !== "") {
            navigate(
                `/search?query=${encodeURIComponent(searchQuery)}&type=${encodeURIComponent(listingType)}`
            );
        }
    };

    console.log("propertyTypes", propertyTypes)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const propertyTypesResponse = await axios.get(
                    `${API_URL}/propertyTypes`
                );
                const propertiesByBedroomAndType = await getPropertiesByBedroomAndType();
                setPropertiesByBedroomAndType(propertiesByBedroomAndType);
                setPropertyTypes(propertyTypesResponse.data.payload);

                const propertiesResponse = await getProperties();
                const propertiesWithImages = await Promise.all(
                    propertiesResponse.map(async (property) => {
                        const imagesResponse = await getImagesByPropertyId(
                            property._id
                        );
                        return {
                            ...property,
                            mainImage: imagesResponse[0]?.mainImageURL || null,
                        };
                    })
                );
                setProperties(propertiesWithImages);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const filtered = properties.filter(
            (property) => property?.propertyTypes?.name === activeType
        );
        setFilteredProperties(filtered);
    }, [properties, activeType]);

    const handleButtonClick = (categoryId) => {
        navigate(`/map/${categoryId}`);
    };
    return (
        <div className="font-sans">
            <section
                className="relative bg-cover bg-center h-[600px] lg:h-[800px]"
                style={{
                    backgroundImage: "url('./Nen.jpg')",
                }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center">
                    <h1 className="text-white text-5xl">꿈의 부동산 찾기</h1>

                    <div className="mt-12 flex items-center space-x-1">
                        <select className="bg-orange-500 text-white px-6 py-3 rounded-l-md outline-none hover:bg-orange-600" onChange={(e) => setListingType(e.target.value)} >
                            <option value="Rent">임대</option>
                            <option value="Sell">판매</option>
                        </select>
                        <input
                            type="text"
                            placeholder="프로젝트, 빌라 검색..."
                            className="w-full lg:w-[600px] py-3 px-4"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button
                            className="flex items-center bg-green-600 text-white px-6 py-3 rounded-r-md hover:bg-green-700"
                            onClick={handleSearch}
                        >
                            <IoSearchSharp className="text-2xl mr-0 lg:mr-2" />
                            <span className="hidden lg:inline">빠른 검색</span>
                        </button>
                    </div>

                    <div className="mt-4 bg-opacity-90 rounded-md p-6 max-w-[700px]">
                        <h2 className="text-center text-xl font-semibold mb-6 text-white">
                            유형별 빠른 검색
                        </h2>
                        <div className="grid grid-cols-3 lg:grid-cols-5 gap-6 text-center">
                            {[
                                {
                                    id: "678287b058712ad353461cad",
                                    name: "원/투룸",
                                    image: "./Chungcu.png",
                                },
                                {
                                    id: "678287f258712ad353461caf",
                                    name: "아파트",
                                    image: "./Canho.png",
                                },
                                {
                                    id: "6782882b58712ad353461cb1",
                                    name: "주택/빌라",
                                    image: "./Bietthu.png",
                                },
                                {
                                    id: "678289ef58712ad353461cc0",
                                    name: "가든 하우스",
                                    image: "./Nhavuon.png",
                                },
                                {
                                    id: "67828a8258712ad353461cc2",
                                    name: "타운하우스",
                                    image: "./Nhapho.png",
                                },
                            ].map((category) => (
                                <div
                                    key={category.id}
                                    className="backdrop-opacity-10 backdrop-invert bg-white/10 shadow py-2 px-4 rounded w-[110px] mx-auto hover:bg-opacity-20 hover:bg-white cursor-pointer"
                                    onClick={() =>
                                        handleButtonClick(category.id)
                                    }
                                >
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="mx-auto mb-2 w-14 h-14"
                                    />
                                    <p className="text-white text-sm font-medium">
                                        {category.name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-10 bg-gray-100">
                <div className="container mx-auto max-w-[1280px] px-4">
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-left">
                            <h2 className="text-orange-500 text-2xl font-bold inline text-left">
                                최신{" "}
                                <span className="text-black">프로젝트</span>
                            </h2>
                            <p className="text-gray-600 mt-2">
                                이 최신 프로젝트가 근처에 있습니까?
                            </p>
                        </div>
                        <div className="flex space-x-2 mb-6 hidden md:flex">
                            {[
                                "아파트",
                                "주택/빌라",
                                "가든 하우스",
                                "타운하우스",
                            ].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setActiveType(type)}
                                    className={`font-medium px-4 py-2 rounded ${activeType === type
                                        ? "text-orange-500"
                                        : "text-gray-800 hover:text-orange-500"
                                        }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                    <Card properties={filteredProperties} />
                </div>
            </section>

            <section className="py-10 bg-white">
                <div className="container mx-auto max-w-[1280px] px-4">
                    <div className="text-center mb-8">
                        <h2 className="text-orange-500 text-2xl font-bold">
                            대표적인{" "}
                            <span className="text-black">프로젝트</span>
                        </h2>
                        <p className="text-gray-600 mt-2">스타일이라는 차이</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {propertyTypes.map((project) => (
                            <div
                                key={project._id}
                                className={`relative rounded-lg overflow-hidden shadow-lg group cursor-pointer ${project.name === "원/투룸"
                                    ? "lg:col-span-2"
                                    : ""
                                    }`}
                                onClick={() => navigate(`/map/${project._id}`)} // Chuyển hướng khi nhấn vào danh mục
                            >
                                <img
                                    src={project.imageURL}
                                    alt={project.name}
                                    className="w-full h-64 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent transition-opacity duration-300 group-hover:opacity-0"></div>
                                <div className="absolute bottom-3 left-0 w-full text-white text-center font-semibold transition-transform duration-300">
                                    <div className="text-3xl group-hover:-translate-y-2 transition-transform duration-300">
                                        {project.name}
                                    </div>
                                    {project?.name === "원/투룸" ? (
                                        <div className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            {propertiesByBedroomAndType.length}유닛
                                        </div>
                                    ) : (
                                        <div className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            {project.count}유닛
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HomePage;
