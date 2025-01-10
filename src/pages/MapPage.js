import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const locations = [
  {
    id: 1,
    name: "Tiền thuê hàng tháng 5000/38",
    image: "/images/house1.jpg",
    description: "Căn hộ studio được lựa chọn đầu tư tốt.",
    area: "16.5 m²",
    price: "70,000 won",
    floor: "Tầng 3/4",
    lat: 16.047079,
    lng: 108.20623,
  },
  {
    id: 2,
    name: "Tiền thuê hàng tháng 1000/53",
    image: "/images/house2.jpg",
    description: "Khu căn hộ cao cấp, tiện nghi đầy đủ.",
    area: "23.4 m²",
    price: "80,000 won",
    floor: "Tầng 4/5",
    lat: 16.054234,
    lng: 108.213909,
  },
  {
    id: 3,
    name: "Điều lệ 170 triệu",
    image: "/images/house3.jpg",
    description: "Officetel cao cấp với thiết kế hiện đại.",
    area: "32.24 m²",
    price: "170 triệu VND",
    floor: "Tầng 1/10",
    lat: 16.067293,
    lng: 108.204597,
  },
  {
    id: 4,
    name: "Điều lệ 170 triệu",
    image: "/images/house3.jpg",
    description: "Officetel cao cấp với thiết kế hiện đại.",
    area: "32.24 m²",
    price: "170 triệu VND",
    floor: "Tầng 1/10",
    lat: 16.067293,
    lng: 108.204597,
  },
  {
    id: 5,
    name: "Điều lệ 170 triệu",
    image: "/images/house3.jpg",
    description: "Officetel cao cấp với thiết kế hiện đại.",
    area: "32.24 m²",
    price: "170 triệu VND",
    floor: "Tầng 1/10",
    lat: 16.067293,
    lng: 108.204597,
  },
  {
    id: 6,
    name: "Điều lệ 170 triệu",
    image: "/images/house3.jpg",
    description: "Officetel cao cấp với thiết kế hiện đại.",
    area: "32.24 m²",
    price: "170 triệu VND",
    floor: "Tầng 1/10",
    lat: 16.067293,
    lng: 108.204597,
  },
  {
    id: 7,
    name: "Điều lệ 170 triệu",
    image: "/images/house3.jpg",
    description: "Officetel cao cấp với thiết kế hiện đại.",
    area: "32.24 m²",
    price: "170 triệu VND",
    floor: "Tầng 1/10",
    lat: 16.067293,
    lng: 108.204597,
  },
  {
    id: 8,
    name: "Điều lệ 170 triệu",
    image: "/images/house3.jpg",
    description: "Officetel cao cấp với thiết kế hiện đại.",
    area: "32.24 m²",
    price: "170 triệu VND",
    floor: "Tầng 1/10",
    lat: 16.067293,
    lng: 108.204597,
  },
  {
    id: 9,
    name: "Điều lệ 170 triệu",
    image: "/images/house3.jpg",
    description: "Officetel cao cấp với thiết kế hiện đại.",
    area: "32.24 m²",
    price: "170 triệu VND",
    floor: "Tầng 1/10",
    lat: 16.067293,
    lng: 108.204597,
  },
  {
    id: 10,
    name: "Điều lệ 170 triệu",
    image: "/images/house3.jpg",
    description: "Officetel cao cấp với thiết kế hiện đại.",
    area: "32.24 m²",
    price: "170 triệu VND",
    floor: "Tầng 1/10",
    lat: 16.067293,
    lng: 108.204597,
  },
];

const MapPage = () => {
  const [hoveredLocation, setHoveredLocation] = useState(null);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/3 bg-white shadow-md p-4 overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-6">Danh sách các địa điểm</h2>
        {locations.map((location) => (
          <div
            key={location.id}
            className={`flex items-start gap-4 p-4 mb-4 border rounded-lg ${
              hoveredLocation === location.id
                ? "border-blue-500 bg-blue-100"
                : "border-gray-200 bg-white"
            } hover:shadow-lg transition-all`}
            onMouseEnter={() => setHoveredLocation(location.id)}
            onMouseLeave={() => setHoveredLocation(null)}
          >
            <img
              src={location.image}
              alt={location.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div>
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
        ))}
      </div>

      {/* Bản đồ */}
      <div className="w-2/3">
        <MapContainer
          center={[16.054079, 108.20723]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {locations.map((location) => (
            <Marker
              key={location.id}
              position={[location.lat, location.lng]}
              eventHandlers={{
                mouseover: () => setHoveredLocation(location.id),
                mouseout: () => setHoveredLocation(null),
              }}
            >
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
