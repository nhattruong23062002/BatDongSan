import React, { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa"; // Import từ react-icons
import "leaflet/dist/leaflet.css";
import MapComponent from "./MapComponent"; // Import MapComponent
import { useTranslation } from "react-i18next";

const PropertyDetail = () => {
  const { t } = useTranslation("details");
  const images = [
    "/images/1.jpg",
    "/images/house1.jpg",
    "/images/house2.jpg",
    "/images/house3.jpg",
    "/images/house4.jpg",
  ];
  const [mainImage, setMainImage] = useState(images[0]);
  const [isExpanded, setIsExpanded] = useState(false); // State quản lý trạng thái xem thêm
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State quản lý popup
  const [popupImage, setPopupImage] = useState(""); // State lưu ảnh của popup

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded); // Đảo trạng thái (mở/đóng)
  };
  const handleDoubleClick = (image) => {
    setPopupImage(image); // Gán ảnh được double-click vào popup
    setIsPopupOpen(true); // Mở popup
  };

  const closePopup = () => {
    setIsPopupOpen(false); // Đóng popup
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-4">
          <a href="/" className="hover:text-blue-800 transition-colors">
            {t("breadcrumb.home")} /{" "}
          </a>
          <span> {t("breadcrumb.city")} </span>
          <span className="text-green-500">{t("breadcrumb.property")}</span>
        </div>
        {/* Title and Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            <div className="relative mb-4">
              <img
                src={mainImage}
                alt="Main"
                className="w-full h-[600px] object-cover rounded-lg border"
                onDoubleClick={() => handleDoubleClick(mainImage)} // Double-click event
              />
            </div>

            {/* Image Gallery */}
            <div className="flex items-center gap-2">
              {/* Previous Button */}
              <button className="text-gray-500 hover:text-gray-800 font-bold text-xl ">
                {"<"}
              </button>

              {/* Image Thumbnails */}
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Sub ${index}`}
                    className={`w-24 h-24 object-cover rounded-lg cursor-pointer border-2 ${
                      mainImage === image
                        ? "border-blue-500"
                        : "border-gray-300"
                    }`}
                    onClick={() => setMainImage(image)}
                    onDoubleClick={() => handleDoubleClick(image)} // Double-click event
                  />
                ))}
              </div>

              {/* Next Button */}
              <button className="text-gray-500 hover:text-gray-800 font-bold text-xl">
                {">"}
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {t("title")}
            </h1>
            <p className="text-gray-600 mb-2">
              {t("district")}{" "}
              <span className="font-medium">Quan Son Tra, Tp. Da Nang</span>
            </p>
            <p className="text-gray-600 mb-2">
              {t("type")} <span className="font-medium">{t("house")}</span>
            </p>
            <p className="text-gray-600 mb-2">
              {t("status")} <span className="text-red-500">{t("sale")}</span>
            </p>
            <p className="text-4xl font-bold text-red-500 mb-4">
              6.000.000.000đ
            </p>
            <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 flex items-center">
              <FaPhoneAlt className="mr-2" /> 0123 456 789 ({t("contact")})
            </button>
          </div>
        </div>
        {/* Project Details */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Features */}
          <div className="bg-green-100 p-4 rounded-lg shadow">
            <h2 className="text-lg font-bold text-green-600 mb-4">
              {t("projectDetails.featuresTitle")}
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">{t("projectDetails.type")}:</span>
                <span>{t("projectDetails.rent")}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">
                  {t("projectDetails.address")}:
                </span>
                <span>{t("projectDetails.district")}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{t("projectDetails.area")}:</span>
                <span>{t("projectDetails.areaValue")}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">
                  {t("projectDetails.bedrooms")}:
                </span>
                <span>{t("projectDetails.bedroomCount")}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">
                  {t("projectDetails.bathrooms")}:
                </span>
                <span>{t("projectDetails.bathroomCount")}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">
                  {t("projectDetails.orientation")}:
                </span>
                <span>{t("projectDetails.orientationValue")}</span>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="bg-green-100 p-4 rounded-lg shadow">
            <h2 className="text-lg font-bold text-green-600 mb-4">
              {t("projectDetails.contactTitle")}
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">
                  {t("contacts.contactName")}:
                </span>
                <span>{t("contacts.contactPerson")}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{t("contacts.phone")}:</span>
                <span>{t("contacts.phoneNumber")}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{t("contacts.email")}:</span>
                <span>{t("contacts.emailAddress")}</span>
              </div>
            </div>
          </div>
        </div>
        {/* Project Description */}
        <div className="bg-white mt-8 p-6 rounded-lg shadow">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            {t("projectDetails.descriptionTitle")}
          </h2>
          <p className="text-gray-600 mb-4">{t("projectDetails.intro")}</p>
          <ul className="list-disc pl-6 text-gray-600">
            {t("projectDetails.benefits", { returnObjects: true }).map(
              (benefit, index) => (
                <li key={index}>{benefit}</li>
              )
            )}
          </ul>
          {isExpanded && (
            <div className="mt-4">
              <p className="text-gray-600">
                {t("projectDetails.expandedDetails.location")}
              </p>
              <p className="text-gray-600 mt-2">
                {t("projectDetails.expandedDetails.address")}
              </p>
              <p className="text-gray-600 mt-2">
                {t("projectDetails.expandedDetails.amenities")}
              </p>
            </div>
          )}

          {/* Nút "Xem thêm" */}
          <div className="text-center">
            <button
              onClick={handleToggleExpand}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 "
            >
              {isExpanded
                ? t("projectDetails.viewMore")
                : t("projectDetails.collapse")}
            </button>
          </div>
        </div>
        <MapComponent /> {/* Tích hợp bản đồ vào đây */}
        {/* Popup */}
        {isPopupOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg relative max-w-3xl">
              <button
                onClick={closePopup}
                className="absolute top-0.5 right-1 text-red-500 hover:text-gray-700"
              >
                ✖
              </button>
              <img
                src={popupImage}
                alt="Popup"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetail;
