import React from "react";
import { useTranslation } from "react-i18next";

function NewsCard({ news }) {
  const { t } = useTranslation("newsCard");

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md group hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-48 object-cover"
        />
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <span>{news.date}</span>
          <span className="flex items-center space-x-1">
            <span className="text-orange-500">{news.comments}</span>
            <span>{t("comment")}</span>
          </span>
        </div>
        <h3 className="text-gray-800 font-semibold text-lg leading-tight text-left hover:text-orange-500">
          {news.title}
        </h3>
        <p className="text-gray-600 text-sm mt-2 text-left">
          {news.description}{" "}
          <a href="#" className="text-orange-500">
            {t("read")}
          </a>
        </p>
      </div>

      <div className="flex items-center justify-between px-4 py-2 border-t border-gray-200 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <img
            src={news.author.avatar}
            alt={news.author.name}
            className="w-6 h-6 rounded-full"
          />
          <span>{news.author.name}</span>
        </div>
        <button className="text-gray-400 hover:text-orange-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8h2a2 2 0 012 2v4a2 2 0 01-2 2h-2m-4 4l-4-4m0 0l4-4m-4 4h12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default NewsCard;
