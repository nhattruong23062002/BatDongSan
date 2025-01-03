import React, { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa"; // Import từ react-icons
import "leaflet/dist/leaflet.css";
import MapComponent from "./MapComponent"; // Import MapComponent
//import { useTranslation } from "react-i18next";

const PropertyDetail = () => {
  //const { t } = useTranslation("details");
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
          <span>Trang chủ / </span>
          <span>Tp. Đà Nẵng </span>
          <span className="text-green-500">
            Cho thuê căn hộ, biệt thự cao cấp
          </span>
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
              Cho thuê căn hộ, biệt thự cao cấp
            </h1>
            <p className="text-gray-600 mb-2">
              Thuộc Quận/Huyện:{" "}
              <span className="font-medium">Quận Sơn Trà, Tp. Đà Nẵng</span>
            </p>
            <p className="text-gray-600 mb-2">
              Kiểu dự án: <span className="font-medium">Căn hộ</span>
            </p>
            <p className="text-gray-600 mb-2">
              Trạng thái:{" "}
              <span className="text-red-500">Đang bán (cho thuê)</span>
            </p>
            <p className="text-4xl font-bold text-red-500 mb-4">
              6.000.000.000đ
            </p>
            <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 flex items-center">
              <FaPhoneAlt className="mr-2" /> 0123 456 789 (Liên hệ ngay)
            </button>
          </div>
        </div>
        {/* Project Details */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Features */}
          <div className="bg-green-100 p-4 rounded-lg shadow">
            <h2 className="text-lg font-bold text-green-600 mb-4">
              Đặc điểm dự án
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Loại tin rao:</span>
                <span>Cho thuê</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Địa chỉ:</span>
                <span>Phường 15, Bình Thạnh</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Diện tích:</span>
                <span>175m²</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Phòng ngủ:</span>
                <span>3</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Phòng WC:</span>
                <span>2</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Hướng nhà:</span>
                <span>Đông Nam</span>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="bg-green-100 p-4 rounded-lg shadow">
            <h2 className="text-lg font-bold text-green-600 mb-4">
              Thông tin liên hệ
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Tên liên lạc:</span>
                <span>Lee Woo Min</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Số điện thoại:</span>
                <span>0123 456 789</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Email:</span>
                <span>Woomin@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
        {/* Project Description */}
        <div className="bg-white mt-8 p-6 rounded-lg shadow">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Chi tiết dự án
          </h2>
          <p className="text-gray-600 mb-4">
            Căn hộ cao cấp Eurowindow River Park chính thức được tung ra thị
            trường. Chính sách siêu khủng gửi tặng khách hàng:
          </p>
          <ul className="list-disc pl-6 text-gray-600">
            <li>
              Tặng vé cứng đi nghỉ dưỡng 3 ngày 2 đêm tại địa điểm du lịch nổi
              tiếng với giá trị 10 triệu.
            </li>
            <li>
              Ngân hàng Techcombank hỗ trợ 70% giá trị căn hộ trong 25 năm, miễn
              lãi 0% trong 2 năm đầu.
            </li>
            <li>Chiết khấu 15% khi thanh toán trước 95% giá trị căn hộ.</li>
            <li>
              Tên dự án: Eurowindow River Park. Chủ đầu tư: Tập đoàn Eurowindow
              Holdings.
            </li>
          </ul>
          {isExpanded && (
            <div className="mt-4">
              <p className="text-gray-600">
                Với vị trí đắc địa, dự án Eurowindow River Park nằm sát sông
                Hồng, mang đến môi trường sống xanh, sạch và đầy đủ tiện nghi.
              </p>
              <p className="text-gray-600 mt-2">
                - Vị trí: Đường Trần Hữu Dực, quận Nam Từ Liêm, Hà Nội.
              </p>
              <p className="text-gray-600 mt-2">
                - Tiện ích: Trung tâm thương mại, hồ bơi vô cực, phòng gym, khu
                vui chơi trẻ em, khu BBQ...
              </p>
            </div>
          )}

          {/* Nút "Xem thêm" */}
          <div className="text-center">
            <button
              onClick={handleToggleExpand}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 "
            >
              {isExpanded ? "Thu gọn" : "Xem thêm "}
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
