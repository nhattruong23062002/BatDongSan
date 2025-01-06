import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function Language({ hidden }) {
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setShowLanguageOptions(false);
    localStorage.setItem("i18nextLng", lang);
  };
  const languages = [
    { code: "vi", name: "Tiếng Việt", flag: "https://flagcdn.com/w40/vn.png" },
    { code: "en", name: "English", flag: "https://flagcdn.com/w40/us.png" },
    { code: "kr", name: "한국어", flag: "https://flagcdn.com/w40/kr.png" },
  ];
   
  const currentLanguage = languages.find((lang) => lang.code === i18n.language);

  return (
    <div className={`relative py-1 ${hidden}`}>
      <button
        onClick={() => setShowLanguageOptions(!showLanguageOptions)}
        className="flex items-center space-x-2"
      >
        <img
          src={currentLanguage.flag}
          alt={currentLanguage.name}
          className="w-6 h-6 rounded-full object-cover"
        />
        <span className="hidden lg:inline">{currentLanguage.name}</span>
      </button>
      {showLanguageOptions && (
        <div className="absolute right-0 top-10 bg-white shadow-md rounded-md p-2 space-y-2 w-[150px] z-10">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full flex items-center p-2 rounded-md hover:bg-gray-100 ${
                i18n.language === lang.code ? "font-bold" : ""
              }`}
            >
              <img
                src={lang.flag}
                alt={lang.name} 
                className="w-5 h-5 rounded-full mr-2 object-cover"
              />
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Language;
