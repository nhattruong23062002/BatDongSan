import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const MapComponent = ({ address }) => {
  const [coordinates, setCoordinates] = useState({ lat: 16.0471, lng: 108.2068 });

  const customIcon = L.icon({
    iconUrl: "https://png.pngtree.com/png-vector/20230413/ourmid/pngtree-3d-location-icon-clipart-in-transparent-background-vector-png-image_6704161.png",
    iconSize: [35, 45],
    iconAnchor: [15, 45],
    popupAnchor: [0, -45],
  });

  useEffect(() => {
    const geocodeAddress = async (address) => {
      try {
        const response = await fetch(
          `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(
            address
          )}&apiKey=me5jFFVdL-ZAP6K5qoVWN3TRwcnIQUVZhHdWYRsSx-4`
        );
        const data = await response.json();

        if (data.items && data.items.length > 0) {
          setCoordinates(data.items[0].position);
        } else {
          console.error("Không tìm thấy tọa độ cho địa chỉ này.");
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    geocodeAddress(address);
  }, [address]);

  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold text-black mb-4">프로젝트 위치</h2>
      {coordinates ? (
        <MapContainer
          center={[coordinates.lat, coordinates.lng]}
          zoom={12}
          scrollWheelZoom={true}
          style={{ height: "500px", width: "100%", borderRadius: "10px" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[coordinates.lat, coordinates.lng]} icon={customIcon}>
            <Popup>{address}</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
};

export default MapComponent;
