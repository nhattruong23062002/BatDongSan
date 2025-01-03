import React from "react";
import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";

function Card({ image, tags, title, location, price, details }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden group">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-2 left-2 flex space-x-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`bg-${tag.color}-500 text-white text-xs px-2 py-1 rounded`}
            >
              {tag.label}
            </span>
          ))}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-500 text-sm mt-1">{location}</p>
        <p className="text-orange-500 font-bold text-lg mt-3">{price}</p>
      </div>

      <div className="border-t border-gray-200 px-4 py-2 grid grid-cols-3 text-sm text-gray-600">
        <div className="flex items-center justify-center">
          <FaBed className="text-gray-300 mb-1 text-xl mr-2" />
          <span>{details.bedrooms} Ngủ</span>
        </div>

        <div className="flex items-center justify-center border-l border-gray-200">
          <FaBath className="text-gray-300 mb-1 text-xl mr-2" />
          <span>{details.bathrooms} Tắm</span>
        </div>

        <div className="flex items-center justify-center border-l border-gray-200">
          <FaRulerCombined className="text-gray-300 mb-1 text-xl mr-2" />
          <span>{details.area} m²</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
