import React, { useEffect, useState } from "react";
import { FaHeart, FaPhoneAlt, FaRegHeart } from "react-icons/fa";
import "leaflet/dist/leaflet.css";
import { useParams } from "react-router-dom";
import { getDetailProperty } from "../services/propertyService";
import { getImagesByPropertyId } from "../services/imagesService";
import { toast, ToastContainer } from "react-toastify";
import { addFavorite, deleteFavorite, getDetailFavorite } from "../services/favoriteService";
import { decodeToken } from "../utils/authUtils";
import MapComponent from "../components/MapComponent";

const PropertyDetail = () => {
  const { id } = useParams();
  const user = decodeToken();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupImage, setPopupImage] = useState("");
  const [property, setProperty] = useState();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mainImage, setMainImage] = useState();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchDetailProperty = async () => {
      try {
        const detalProperty = await getDetailProperty(id);
        const imageProperty = await getImagesByPropertyId(detalProperty._id);
        if (user) {
          const checkFavorite = await getDetailFavorite(user._id, id);
          if (checkFavorite) setIsFavorite(true);
        }
        const dataProperty = {
          ...detalProperty,
          mainImage: imageProperty[0]?.mainImageURL || null,
          additionalImages: [imageProperty[0]?.mainImageURL, ...(imageProperty[0]?.additionalImages || [])],
        };
        setProperty(dataProperty);
      } catch (error) {
        console.error("Error fetching property types:", error);
      }
    };
    window.scrollTo(0, 0);
    fetchDetailProperty();
  }, []);

  const handleDoubleClick = (image) => {
    setPopupImage(image);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    if (property?.mainImage) {
      setMainImage(property.mainImage);
    }
  }, [property]);

  const handlePreviousImage = () => {
    if (property?.additionalImages) {
      const newIndex = (currentImageIndex - 1 + property.additionalImages.length) % property.additionalImages.length;
      setCurrentImageIndex(newIndex);
      setMainImage(property.additionalImages[newIndex]);
    }
  };

  const handleNextImage = () => {
    if (property?.additionalImages) {
      const newIndex = (currentImageIndex + 1) % property.additionalImages.length;
      setCurrentImageIndex(newIndex);
      setMainImage(property.additionalImages[newIndex]);
    }
  };

  const toggleFavorite = async () => {
    if (!user) {
      toast.info("로그인 해주세요!", { autoClose: 1500 });
      return;
    }
    setIsFavorite((prev) => !prev);
    const data = {
      userId: user._id,
      propertyId: id,
    };

    try {
      if (!isFavorite) {
        await addFavorite(data);
        toast.success("즐겨찾기에 성공적으로 추가되었습니다!", { autoClose: 1500 });
      } else {
        await deleteFavorite(data);
        toast.info("즐겨찾기에서 제거되었습니다.", { autoClose: 1500 });
      }
    } catch (error) {
      toast.error("오류가 발생했습니다. 다시 시도해주세요.", { autoClose: 1500 });
    }
  };

  const handleImageClick = (image, index) => {
    setCurrentImageIndex(index);
    setMainImage(image);
  };


  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-sm text-gray-500 mb-4">
          <a href="/" className="hover:text-blue-800 transition-colors">
            홈 /{" "}
          </a>
          <span>{property?.title} </span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="relative mb-4">
              <img
                src={mainImage}
                alt="Main"
                className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover rounded-lg border"
              />
            </div>

            <div className="flex items-center gap-4 justify-between">
              <button
                className="text-gray-500 hover:text-gray-800 font-bold text-2xl px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                onClick={handlePreviousImage}
              >
                {"<"}
              </button>

              <div className="flex gap-4 overflow-x-auto scrollbar-hide px-2">
                {property?.additionalImages.map((image, index) => (
                  <div
                    key={index}
                    className={`relative group w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 border-2 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${mainImage === image
                      ? "border-blue-500 shadow-lg"
                      : "border-gray-300 hover:border-blue-500"
                      }`}
                    onClick={() => handleImageClick(image, index)}
                    onDoubleClick={() => handleDoubleClick(image)}
                  >
                    <img
                      src={image}
                      alt={`Sub ${index}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all"></div>
                  </div>
                ))}
              </div>

              <button
                className="text-gray-500 hover:text-gray-800 font-bold text-2xl px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                onClick={handleNextImage}
              >
                {">"}
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {property?.title}
            </h1>
            <p className="text-gray-600 mb-2">
              <span className="font-medium text-blue-500">주소:</span> {property?.address}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium text-blue-500">부동산 유형:</span>{" "}
              {property?.propertyTypes?.name}
            </p>
            <div className={`text-gray-600 mb-2 ${property?.status === "Available" ? "text-green-500" : property?.status === "Rented" ? "text-orange-500" : "text-gray-500"}`}>
              <span className="font-medium text-blue-500">상태:</span> {property?.status === "Available" ? "사용 가능" : property?.status === "Rented" ? "임대됨" : "판매됨"}
            </div>
            {
              property?.description && (
                <div className="text-gray-600 mb-2">
                  <span className="font-medium text-blue-500">설명:</span> {property?.description}
                </div>
              )
            }
            <p className="text-4xl font-bold text-red-500 mb-4">
              {property?.price?.toLocaleString("vi-VN")}₫
            </p>
            <div className="flex items-center gap-2">
              <button
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 flex items-center justify-center"
                onClick={() => (window.location.href = `tel:${property?.contactPhone}`)}
              >
                <FaPhoneAlt className="mr-2" />010 5424 3939
              </button>
              <button
                className={`mt-2 px-4 py-2 rounded-lg shadow flex items-center justify-center ${isFavorite ? "text-red-500" : "text-gray-500"
                  }`}
                onClick={toggleFavorite}
              >
                {isFavorite ? (
                  <FaHeart className="text-xl" />
                ) : (
                  <FaRegHeart className="text-xl" />
                )}
                <span className="ml-2">{isFavorite ? "즐겨찾기에 추가됨" : "즐겨찾기"}</span>

              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <div className="bg-white p-6 shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-bold text-blue-600 mb-4 border-b-2 border-blue-500 pb-2">
              프로젝트 정보
            </h2>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span className="text-gray-600 font-medium">보증금:</span>
                <span className="text-gray-800 font-semibold">{property?.deposit?.toLocaleString("vi-VN")}đ</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600 font-medium">면적:</span>
                <span className="text-gray-800 font-semibold">{property?.area}㎡</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600 font-medium">침실:</span>
                <span className="text-gray-800 font-semibold">{property?.bedrooms}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600 font-medium">욕실:</span>
                <span className="text-gray-800 font-semibold">{property?.bathrooms}</span>
              </li>
              {property?.building && (
                <li className="flex justify-between">
                  <span className="text-gray-600 font-medium">건물명:</span>
                  <span className="text-gray-800 font-semibold">{property?.building}</span>
                </li>
              )}
              <li className="flex justify-between">
                <span className="text-gray-600 font-medium">방 개수/층 수:</span>
                <span className="text-gray-800 font-semibold">{property?.numberRoom}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600 font-medium">거래 유형:</span>
                <span className="text-gray-800 font-semibold">
                  {property?.listingType === "Sell" ? "판매" : "임대"}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600 font-medium">유닛 유형:</span>
                <span className="text-gray-800 font-semibold">{property?.unitType}</span>
              </li>
            </ul>
          </div>

          {/* Thông tin liên hệ */}
          <div className="bg-white p-6 shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-bold text-blue-600 mb-4 border-b-2 border-blue-500 pb-2">
              연락처 정보
            </h2>
            <ul className="space-y-3">
              <li className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">연락처 이름:</span>
                <span className="text-gray-800 font-semibold">황성구</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">전화번호:</span>
                <div className="flex flex-col items-end">
                  <span className="text-gray-800 font-semibold">010 5424 3939 (KOR)</span>
                  <span className="text-gray-800 font-semibold">070 599 3988 (VN)</span>
                </div>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">이메일:</span>
                <span className="text-blue-500 font-semibold hover:underline">
                  hsglove83@nate.com
                </span>
              </li>
            </ul>
            <button
              className="mt-4 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300 w-full"
              onClick={() => (window.location.href = "tel:01054243939")}
            >
              연락하기
            </button>
          </div>
        </div>

        <MapComponent address={property?.address} />
        {isPopupOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-[1000]">
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
                className="w-full max-h-[600px] rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default PropertyDetail;