import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const categories = [
  { id: 1, name: "Một/hai phòng", icon: "🏠" },
  { id: 2, name: "Căn hộ", icon: "🏢" },
  { id: 3, name: "Nhà/Biệt thự", icon: "🏡" },
  { id: 4, name: "Officetel", icon: "🏬" },
  { id: 5, name: "Doanh thu", icon: "💼" },
];

const locations = [
  {
    id: 1,
    name: "Tiền thuê hàng tháng 5000/38",
    images: ["/images/house1.jpg", "/images/house3.jpg", "/images/house1.jpg"],
    description: "Căn hộ studio được lựa chọn đầu tư tốt.",
    area: "16.5 m²",
    price: "70,000 won",
    floor: "Tầng 3/4",
    lat: 16.047079,
    lng: 108.20623,
    category: 1,
  },
  {
    id: 2,
    name: "Tiền thuê hàng tháng 1000/53",
    images: [
      "/images/house2.jpg",
      "/images/house2-1.jpg",
      "/images/house2-2.jpg",
    ],
    description: "Khu căn hộ cao cấp, tiện nghi đầy đủ.",
    area: "23.4 m²",
    price: "80,000 won",
    floor: "Tầng 4/5",
    lat: 16.054234,
    lng: 108.213909,
    category: 2,
  },
  {
    id: 3,
    name: "Điều lệ 170 triệu",
    images: [
      "/images/house3.jpg",
      "/images/house3-1.jpg",
      "/images/house3-2.jpg",
    ],
    description: "Officetel cao cấp với thiết kế hiện đại.",
    area: "32.24 m²",
    price: "170 triệu VND",
    floor: "Tầng 1/10",
    lat: 16.067293,
    lng: 108.204597,
    category: 3,
  },
  {
    id: 4,
    name: "Điều lệ 170 triệu",
    images: [
      "/images/house3.jpg",
      "/images/house3-1.jpg",
      "/images/house3-2.jpg",
    ],
    description: "Officetel cao cấp với thiết kế hiện đại.",
    area: "32.24 m²",
    price: "170 triệu VND",
    floor: "Tầng 1/10",
    lat: 16.067293,
    lng: 108.204597,
    category: 4,
  },
  {
    id: 5,
    name: "Điều lệ 170 triệu",
    images: [
      "/images/house3.jpg",
      "/images/house3-1.jpg",
      "/images/house3-2.jpg",
    ],
    description: "Officetel cao cấp với thiết kế hiện đại.",
    area: "32.24 m²",
    price: "170 triệu VND",
    floor: "Tầng 1/10",
    lat: 16.067293,
    lng: 108.204597,
    category: 5,
  },
];

const MapPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State quản lý popup
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const handleDoubleClick = (image, index) => {
    setCurrentImageIndex(index); // Cập nhật index của ảnh
    setIsPopupOpen(true); // Mở popup
  };

  const closePopup = () => {
    setIsPopupOpen(false); // Đóng popup
  };

  // Lọc địa điểm theo danh mục
  const filteredLocations = selectedCategory
    ? locations.filter((loc) => loc.category === selectedCategory)
    : locations;
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

  return (
    <div className="flex h-screen">
      {/* Thanh danh mục */}
      <div className="w-[80px] bg-white shadow-md p-4 flex flex-col gap-4 border-r">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`flex flex-col items-center gap-2 p-2 rounded-lg transition-all ${
              selectedCategory === category.id
                ? "bg-blue-100 text-blue-500 border border-blue-500"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() =>
              setSelectedCategory(
                selectedCategory === category.id ? null : category.id
              )
            }
          >
            <span className="text-2xl">{category.icon}</span>
            <span className="text-xs font-medium text-center">
              {category.name}
            </span>
          </button>
        ))}
      </div>

      {/* Danh sách địa điểm */}
      <div className="w-full md:w-2/6 bg-white overflow-y-auto p-4">
        <h2 className="text-2xl font-semibold mb-6">Danh sách các địa điểm</h2>
        {filteredLocations.length === 0 ? (
          <p className="text-center text-gray-500">Không có địa điểm nào.</p>
        ) : (
          filteredLocations.map((location) => (
            <div
              key={location.id}
              className="flex flex-col items-center gap-4 p-4 mb-4 border rounded-lg hover:shadow-lg transition-all hover:bg-blue-50"
              onClick={() => setSelectedLocation(location)}
            >
              <img
                src={location.images[0]}
                alt={location.name}
                loading="lazy"
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="text-center">
                <h3 className="text-lg font-semibold">{location.name}</h3>
                <p className="text-sm text-gray-500">{location.description}</p>
                <div className="mt-2 text-sm">
                  <p>
                    <strong>Diện tích:</strong> {location.area}
                  </p>
                  <p>
                    <strong>Giá thuê:</strong> {location.price}
                  </p>
                  <p>
                    <strong>Tầng:</strong> {location.floor}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Details section */}
      {selectedLocation && (
        <div className="w-2/6 bg-white p-4 relative border-l">
          {/* Close Button */}
          <button
            className="absolute top-2 right-4 bg-red-500 text-black w-8 h-8 rounded-lg shadow-md flex items-center justify-center hover:bg-gray-200 transition"
            onClick={() => setSelectedLocation(null)}
          >
            ✕
          </button>

          <h3 className="text-xl font-bold">{selectedLocation.name}</h3>
          <div className="flex gap-2 overflow-x-auto mb-4">
            {selectedLocation.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Hình ảnh ${index + 1}`}
                className="w-32 h-32 object-cover rounded-lg"
                onClick={() => handleDoubleClick(image, index)} // Thêm index
              />
            ))}
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
                    src={selectedLocation.images[currentImageIndex]}
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
          <p className="text-sm mt-2 font-bold ">
            {selectedLocation.description}
          </p>
          <div className="mt-4 text-sm">
            <p>
              <strong>Diện tích:</strong> {selectedLocation.area}
            </p>
            <p>
              <strong>Giá thuê:</strong> {selectedLocation.price}
            </p>
            <p>
              <strong>Tầng:</strong> {selectedLocation.floor}
            </p>
          </div>
          <div className="flex gap-2 mt-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Truy vấn văn bản
            </button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
              Liên hệ
            </button>
          </div>
        </div>
      )}

      {/* Bản đồ */}
      <div className="w-5/6 relative z-10">
        <MapContainer
          center={[16.054079, 108.20723]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {filteredLocations.map((location) => (
            <Marker key={location.id} position={[location.lat, location.lng]}>
              <Popup>
                <strong>{location.name}</strong>
                <p>{location.description}</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapPage;
