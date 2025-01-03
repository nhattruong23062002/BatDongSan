import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "../locales/en.json";
import vi from "../locales/vi.json";
import kr from "../locales/kr.json";

i18n
  .use(LanguageDetector) // Sử dụng LanguageDetector để phát hiện ngôn ngữ
  .use(initReactI18next) // Kết nối với React
  .init({
    resources: {
      en: en,
      vi: vi,
      kr: kr,
    },
    lng: localStorage.getItem("i18nextLng") || "vi", // Ưu tiên lấy ngôn ngữ từ localStorage
    fallbackLng: "vi", // Ngôn ngữ mặc định
    interpolation: {
      escapeValue: false, // React đã tự động escape
    },
    debug: true,
    detection: {
      order: ["localStorage", "cookie", "navigator"], // Thứ tự ưu tiên phát hiện
      caches: ["localStorage"], // Lưu ngôn ngữ vào localStorage
    },
  });

export default i18n;
