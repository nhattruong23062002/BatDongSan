import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import { FaHome } from "react-icons/fa";
import { API_URL } from "../config/apiUrls";

const MapPage = () => {
    const [categories, setCategories] = useState([]);
    const [locations, setLocations] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [filteredLocationsByAddress, setFilteredLocationsByAddress] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isPopupOpen, setIsPopupOpen] = useState(false); // State quản lý popup
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const popupRefs = useRef([]);

    const handleDoubleClick = (image, index) => {
        setCurrentImageIndex(index); // Cập nhật index của ảnh
        setIsPopupOpen(true); // Mở popup
    };

    const closePopup = () => {
        setIsPopupOpen(false); // Đóng popup
    };
    // Chuyển ảnh sang trái
    const handlePrevious = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? selectedLocation.images.length - 1 : prevIndex - 1
        );
    };

    // Chuyển ảnh sang phải
    const handleNext = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === selectedLocation.images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const fetchImagesForProperty = async (propertyId) => {
        try {
            const response = await axios.get(`${API_URL}/images/propertyId/${propertyId}`, {
                headers: { "Content-Type": "application/json" },
            });

            const { code, payload } = response.data;

            if (code === 200 && payload?.length > 0) {
                const { mainImageURL = "/placeholder-image.png", additionalImages = [] } = payload[0];
                return { mainImageURL, additionalImages };
            }
        } catch (error) {
            console.error(`Error fetching images for propertyId: ${propertyId}`, error);
        }
        return { mainImageURL: "/placeholder-image.png", additionalImages: [] };
    };



    const addressCache = new Map();

    const fetchCoordinates = async (address) => {
        if (addressCache.has(address)) {
            return addressCache.get(address);
        }
        try {
            const response = await axios.get("https://geocode.search.hereapi.com/v1/geocode", {
                params: {
                    q: address,
                    apiKey: "me5jFFVdL-ZAP6K5qoVWN3TRwcnIQUVZhHdWYRsSx-4",
                },
            });

            const location = response.data?.items?.[0]?.position;
            if (location) {
                const coordinates = { lat: location.lat, lng: location.lng };

                addressCache.set(address, coordinates);
                return coordinates;
            }

            console.error("Không tìm thấy tọa độ cho địa chỉ:", address);
            return { lat: null, lng: null };
        } catch (error) {
            console.error("Lỗi khi gọi API HERE:", error);
            return { lat: null, lng: null };
        }
    };



    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Bắt đầu loading
            try {
                // Fetch property types (categories)
                const [categoryResponse, locationResponse] = await Promise.all([
                    axios.get(`${API_URL}/propertytypes`),
                    axios.get(`${API_URL}/properties`),
                ]);
                if (categoryResponse.data.code === 200) {
                    const emojiMap = {
                        "678287b058712ad353461cad": "🏠",
                        "678287f258712ad353461caf": "🏢",
                        "6782882b58712ad353461cb1": "🏡",
                        "678289ef58712ad353461cc0": "🏬",
                        "67828a8258712ad353461cc2": "💼",
                    };

                    const formattedCategories =
                        categoryResponse.data.payload.map((item) => ({
                            id: item._id,
                            name: item.name,
                            icon: emojiMap[item._id] || "❓",
                        }));
                    setCategories(formattedCategories);
                }
                if (locationResponse.data.code === 200) {
                    const locationsWithDetails = await Promise.all(
                        locationResponse.data.payload.map(async (item) => {
                            // Fetch images for each property
                            const images = await fetchImagesForProperty(
                                item._id
                            );

                            const coordinates = await fetchCoordinates(
                                item.address
                            );

                            return {
                                id: item._id,
                                title: item.title,
                                address: item.address,
                                images: [
                                    images.mainImageURL,
                                    ...(images.additionalImages || []),
                                ],
                                propertyTypeId: item.propertyTypeId,
                                area: item.area,
                                price: item.price,
                                buildingId: item.building,
                                floor: item.numberFloors,
                                description: item.unitType,
                                deposit: item.deposit,
                                bedroom: item.bedrooms,
                                bathroom: item.bathrooms,
                                numberFloors: item.numberFloors,
                                numberUnits: item.numberUnits,
                                unitcode: item.unitCode,
                                status: item.status,
                                lat: coordinates.lat || 16.054079, // Fallback if no coordinates found
                                lng: coordinates.lng || 108.20723,
                            };
                        })
                    );

                    setLocations(locationsWithDetails);
                }
                setLoading(false); // Kết thúc loading
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    console.log("location", locations)

    // Filter locations by category
    const filteredLocations = locations.filter(
        (location) =>
            (!selectedCategory ||
                location.propertyTypeId === selectedCategory) &&
            (location.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                location.address
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()))
    );
    // Filter locations by search term

    // Custom icon for markers
    const createCustomIcon = () => {
        return new L.DivIcon({
            className: "custom-icon", // Class để tùy chỉnh CSS
            html: ReactDOMServer.renderToString(
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "30px",
                        height: "30px",
                        backgroundColor: "#A569BD", // Màu nền tím
                        color: "white", // Màu biểu tượng
                        borderRadius: "50%", // Tạo hình tròn
                        border: "2px solid white", // Viền trắng
                        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.3)", // Hiệu ứng đổ bóng
                    }}
                >
                    <FaHome size={20} /> {/* Biểu tượng */}
                </div>
            ),
            iconSize: [40, 40], // Kích thước icon
            iconAnchor: [20, 40], // Điểm neo của icon
            popupAnchor: [0, -40], // Điểm neo của popup
        });
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar for Categories */}
            <div className="w-[80px] bg-white shadow-md p-4 flex flex-col gap-4 border-r">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        className={`flex flex-col items-center gap-2 p-2 rounded-lg transition-all ${selectedCategory === category.id
                            ? "bg-blue-100 text-blue-500 border border-blue-500"
                            : "text-gray-700 hover:bg-gray-100"
                            }`}
                        onClick={() =>
                            setSelectedCategory(
                                selectedCategory === category.id
                                    ? null
                                    : category.id
                            )
                        }
                    >
                        <span className="text-3xl">{category.icon}</span>
                        <span className="text-xs font-medium text-center">
                            {category.name}
                        </span>
                    </button>
                ))}
            </div>

            {/* List of Locations */}
            {loading ? (
                <div className="flex justify-center items-center w-full h-screen">
                    <div className="loader">Loading 15s...</div>
                </div>
            ) : (
                <>
                    <div className="w-full md:w-2/6 bg-white overflow-y-auto p-4">
                        <h2 className="text-2xl font-semibold mb-6">
                            <a
                                href="/map"
                                className="hover:underline text-blue-500"
                            >
                                위치 목록
                            </a>
                        </h2>
                        {/* Thanh tìm kiếm */}
                        <input
                            type="text"
                            placeholder="이름이나 주소로 검색하세요..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {(filteredLocationsByAddress.length > 0
                            ? filteredLocationsByAddress
                            : filteredLocations
                        ).map((location) => (
                            <div
                                key={location.id}
                                className="flex flex-col items-center gap-4 p-4 mb-4 border rounded-lg hover:shadow-lg transition-all hover:bg-blue-50"
                                onClick={() => setSelectedLocation(location)} // Cập nhật `selectedLocation`
                            >
                                <img
                                    src={
                                        location.images?.[0] ||
                                        "/placeholder-image.png"
                                    }
                                    alt={location.title || "Không có hình ảnh"}
                                    className="w-24 h-24 object-cover rounded-lg"
                                    lazy="loading"
                                />
                                <div className="text-center">
                                    <h3 className="text-lg font-semibold">
                                        {location.title}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {location.address}
                                    </p>
                                    <div className="mt-2 text-sm">
                                        <p>
                                            <strong>토지:</strong>{" "}
                                            {location.area} m²
                                        </p>
                                        <p>
                                            <strong>임차료:</strong>{" "}
                                            {location.price?.toLocaleString()}{" "}
                                            VND
                                        </p>
                                        <p>
                                            <strong>건물:</strong>{" "}
                                            {location.buildingId}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
            {/* Details section */}
            {selectedLocation && (
                <div
                    className="w-full md:w-2/6 bg-white p-4 relative border-l max-h-screen overflow-y-auto"
                    onWheel={(e) => console.log("Scrolling", e.deltaY)}
                >
                    {/* Close Button */}
                    <button
                        className="absolute top-2 right-2 bg-red-500 text-black w-8 h-8 rounded-lg shadow-md flex items-center justify-center hover:bg-gray-200 transition"
                        onClick={() => setSelectedLocation(null)}
                    >
                        ✕
                    </button>

                    {/* Title */}
                    <h3 className="text-lg font-bold">
                        {selectedLocation.title}
                    </h3>

                    {/* Hình ảnh */}
                    <div className="flex gap-2 overflow-x-auto mb-4">
                        {selectedLocation.images &&
                            selectedLocation.images.length > 0 ? (
                            selectedLocation.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Hình ảnh ${index + 1}`}
                                    className="w-32 h-32 object-cover rounded-lg cursor-pointer"
                                    onClick={() =>
                                        handleDoubleClick(image, index)
                                    }
                                    lazy="loading"
                                />
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm">
                                Không có hình ảnh nào để hiển thị.
                            </p>
                        )}
                    </div>

                    {/* Popup hình ảnh */}
                    {isPopupOpen && (
                        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white p-4 rounded-lg shadow-lg relative max-w-3xl">
                                <button
                                    onClick={closePopup}
                                    className="absolute top-0.5 right-1 text-red-500 hover:text-gray-700"
                                >
                                    ✖
                                </button>
                                <div className="relative">
                                    <img
                                        src={
                                            selectedLocation.images[
                                            currentImageIndex
                                            ]
                                        }
                                        alt="Popup"
                                        className="w-full h-auto rounded-lg"
                                    />
                                    {/* Nút qua trái */}
                                    <button
                                        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
                                        onClick={handlePrevious}
                                    >
                                        ←
                                    </button>
                                    {/* Nút qua phải */}
                                    <button
                                        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
                                        onClick={handleNext}
                                    >
                                        →
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Details */}
                    <p className="text-lg mt-2 font-bold">위치 세부 정보</p>
                    <div>
                        <div className="mt-4 text-base leading-6 space-y-4">
                            <p>
                                <strong className="font-bold text-gray-700">
                                    주소:
                                </strong>{" "}
                                <span className="text-gray-900">
                                    {selectedLocation.address ||
                                        "Không xác định"}
                                </span>
                            </p>
                            <p>
                                <strong className="font-bold text-gray-700">
                                    토지:
                                </strong>{" "}
                                <span className="text-gray-900">
                                    {selectedLocation.area || "Không xác định"}{" "}
                                    m²
                                </span>
                            </p>
                            <p>
                                <strong className="font-bold text-gray-700">
                                    가격:
                                </strong>{" "}
                                <span className="text-gray-900">
                                    {selectedLocation.price?.toLocaleString()}{" "}
                                    VND
                                </span>
                            </p>
                            <p>
                                <strong className="font-bold text-gray-700">
                                    보증금:
                                </strong>{" "}
                                <span className="text-gray-900">
                                    {selectedLocation.deposit?.toLocaleString()}{" "}
                                    VND
                                </span>
                            </p>
                            <p>
                                <strong className="font-bold text-gray-700">
                                    건물:
                                </strong>{" "}
                                <span className="text-gray-900">
                                    {selectedLocation.buildingId ||
                                        "Không xác định"}
                                </span>
                            </p>
                            <p>
                                <strong className="font-bold text-gray-700">
                                    바닥:
                                </strong>{" "}
                                <span className="text-gray-900">
                                    {selectedLocation.floor || "Không xác định"}
                                </span>
                            </p>
                            <p>
                                <strong className="font-bold text-gray-700">
                                    상태:
                                </strong>{" "}
                                <span className="text-gray-900">
                                    {selectedLocation.status ||
                                        "Không xác định"}
                                </span>
                            </p>
                            <p>
                                <strong className="font-bold text-gray-700">
                                    침실:
                                </strong>{" "}
                                <span className="text-gray-900">
                                    {selectedLocation.bedroom ||
                                        "Không xác định"}
                                </span>
                            </p>
                            <p>
                                <strong className="font-bold text-gray-700">
                                    화장실:
                                </strong>{" "}
                                <span className="text-gray-900">
                                    {selectedLocation.bathroom ||
                                        "Không xác định"}
                                </span>
                            </p>
                            <p>
                                <strong className="font-bold text-gray-700">
                                    층수:
                                </strong>{" "}
                                <span className="text-gray-900">
                                    {selectedLocation.numberFloors ||
                                        "Không xác định"}
                                </span>
                            </p>
                            <p>
                                <strong className="font-bold text-gray-700">
                                    객실 코드:
                                </strong>{" "}
                                <span className="text-gray-900">
                                    {selectedLocation.unitcode ||
                                        "Không xác định"}
                                </span>
                            </p>
                        </div>
                    </div>
                    <hr className="border-t-4 border-gray-200 my-6" />

                    <div>
                        {/* Header */}
                        <div className="mb-4">
                            <h1 className="text-lg font-bold">
                                중개사무실 정보
                            </h1>
                        </div>

                        {/* Profile Section */}
                        <div className="flex items-center mb-4">
                            <img
                                src="./logo.png" // Thay bằng URL hình đại diện
                                alt="Profile"
                                className="w-12 h-12 rounded-full mr-4"
                            />
                            <div>
                                <p className="text-base font-semibold">
                                    K-BRO 부동산 중개사 사무실
                                </p>
                            </div>
                        </div>

                        {/* Divider */}
                        <hr className="border-gray-200 my-4" />

                        <div className="space-y-4">
                            <div className="flex">
                                <span className="w-1/3 text-gray-600 font-medium">
                                    주소
                                </span>
                                <span className="text-gray-800 font-medium">
                                    170 Pham Van Dong, Da Nang
                                </span>
                            </div>
                            <div className="flex">
                                <span className="w-1/3 text-gray-600 font-medium">
                                    대표자명
                                </span>
                                <span className="text-gray-800 font-medium">
                                    HWANG JEONG HO
                                </span>
                            </div>
                            <div className="flex">
                                <span className="w-1/3 text-gray-600 font-medium">
                                    사무실 전화번호
                                </span>
                                <span className="text-gray-800 font-medium">
                                    11260-2020-00036
                                </span>
                            </div>
                            <div className="flex">
                                <span className="w-1/3 text-gray-600 font-medium">
                                    대표전화번호
                                </span>
                                <span className="text-gray-800 font-medium">
                                    02-492-0505
                                </span>
                            </div>
                        </div>
                    </div>
                    <hr className="border-t-4 border-gray-200 my-6" />
                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-4">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                            텍스트 쿼리
                        </button>
                        <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
                            연락하다
                        </button>
                    </div>
                </div>
            )}

            {/* Map */}
            <div className="w-full md:w-5/6 relative z-10">
                <MapContainer
                    center={[16.054079, 108.20723]}
                    zoom={13}
                    style={{ height: "100%", width: "100%" }}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {filteredLocations
                        .filter((location) => {
                            if (!location.lat || !location.lng) {
                                console.warn(
                                    `Invalid LatLng for location: ${location.id}`,
                                    location
                                );
                                return false; // Loại bỏ các địa điểm không có lat/lng hợp lệ
                            }
                            return true;
                        })
                        .map((location, index) => (
                            <Marker
                                key={location.id}
                                position={[location.lat, location.lng]}
                                icon={createCustomIcon()}
                                eventHandlers={{
                                    click: () => {
                                        const filteredLocations =
                                            locations.filter(
                                                (loc) =>
                                                    loc.address ===
                                                    location.address
                                            );
                                        setFilteredLocationsByAddress(
                                            filteredLocations
                                        );
                                    },
                                }}
                            >
                                <Popup
                                    ref={(el) =>
                                        (popupRefs.current[index] = el)
                                    } // Gắn ref vào popup
                                    closeButton={false}
                                    autoPan={false}
                                    className="custom-popup"
                                >
                                    <div className="relative">
                                        <div
                                            className="text-white rounded-md shadow-lg w-28"
                                            style={{
                                                padding: "4px 5px 3px",
                                            }}
                                        >
                                            {/* Title */}
                                            <div className="bg-blue-500 text-center text-sm font-bold border-b border-blue-700 pb-1">
                                                {location.title ||
                                                    "Tên không xác định"}
                                            </div>
                                            {/* Address */}
                                            <div className="bg-white text-center text-black text-sm font-medium pt-1">
                                                {location.address ||
                                                    "Địa chỉ không xác định"}
                                            </div>
                                        </div>
                                        {/* Pointer */}
                                        <div className="absolute left-1/2 transform -translate-x-1/2 translate-y-1 w-4 h-4 bg-blue-500 rotate-45 border-l border-t border-blue-700"></div>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                </MapContainer>
            </div>
        </div>
    );
};

export default MapPage;
