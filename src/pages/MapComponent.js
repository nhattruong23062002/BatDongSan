import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useTranslation } from "react-i18next";

const MapComponent = () => {
  // Vị trí trung tâm bản đồ (tọa độ lat, lng)
  const center = [16.0471, 108.2068]; // Đà Nẵng
  const { t } = useTranslation("details");

  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold text-black mb-4">{t("position")}</h2>
      <MapContainer
        center={center}
        zoom={12}
        scrollWheelZoom={true}
        style={{ height: "500px", width: "100%", borderRadius: "10px" }}
      >
        {/* Lớp bản đồ (tile layer) */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Marker hiển thị vị trí */}
        <Marker position={center}>
          <Popup>
            Dự án tại <strong>Da Nang</strong>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
