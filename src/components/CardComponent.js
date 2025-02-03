import React, { useState } from "react";
import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function Card({ properties }) {
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslation("card");
  const itemsPerPage = 6;
  const navigate = useNavigate();

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProperties = properties.slice(startIndex, endIndex);

  const totalPages = Math.ceil(properties.length / itemsPerPage);

  const handleShowDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProperties.map((property) => (
          <div
            key={property._id}
            className="bg-white rounded-lg shadow overflow-hidden group"
            onClick={() => handleShowDetail(property._id)}
          >
            <div className="relative">
              <img
                src={property.mainImage || "/default-image.jpg"}
                alt={property.title}
                className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">{property.title}</h3>
              <p className="text-gray-500 text-sm mt-1 truncate">{property.address}</p>
              <p className="text-orange-500 font-bold text-lg mt-3">
                {property.price?.toLocaleString("vi-VN")}đ
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-2 grid grid-cols-3 text-sm text-gray-600">
              <div className="flex items-center justify-center">
                <FaBed className="text-gray-300 mb-1 text-xl mr-2" />
                <span>{property.bedrooms} 잠</span>
              </div>
              <div className="flex items-center justify-center border-l border-gray-200">
                <FaBath className="text-gray-300 mb-1 text-xl mr-2" />
                <span>{property.bathrooms} 욕실</span>
              </div>
              <div className="flex items-center justify-center border-l border-gray-200">
                <FaRulerCombined className="text-gray-300 mb-1 text-xl mr-2" />
                <span>{property.area} m²</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end items-center mt-6 space-x-2">
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          이전
        </button>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded ${currentPage === index + 1
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
              }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default Card;
