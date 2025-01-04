import React from "react";
import { useTranslation } from "react-i18next";
import { FaFacebook, FaTwitter, FaGoogle, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const { t } = useTranslation("footer");

  return (
    <footer className="bg-gray-900 text-gray-400 py-10">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        {/* About Us */}
        <div>
          <h2 className="text-white text-lg font-bold uppercase">{t("about_us")}</h2>
          <div className="bg-orange-500 h-0.5 w-full mt-1 opacity-50"></div>
          <p>{t("about_description_1")}</p>
          <p className="mt-4">{t("about_description_2")}</p>
        </div>

        {/* Policies */}
        <div>
          <h2 className="text-white text-lg font-bold uppercase">{t("policies")}</h2>
          <div className="bg-orange-500 h-0.5 w-full mt-1 opacity-50"></div>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">{t("links.home")}</a></li>
            <li><a href="#" className="hover:text-white">{t("links.listings")}</a></li>
            <li><a href="#" className="hover:text-white">{t("links.about")}</a></li>
            <li><a href="#" className="hover:text-white">{t("links.contact")}</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-white text-lg font-bold uppercase">{t("contact")}</h2>
          <div className="bg-orange-500 h-0.5 w-full mt-1 opacity-50"></div>
          <p className="mb-2">{t("contact_support")}</p>
          <p className="text-red-500 text-2xl font-bold mb-2">{t("hotline")}</p>
          <p>{t("address")}</p>
          <p>{t("email")}</p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-gray-400 hover:text-white text-xl"><FaFacebook /></a>
            <a href="#" className="text-gray-400 hover:text-white text-xl"><FaTwitter /></a>
            <a href="#" className="text-gray-400 hover:text-white text-xl"><FaGoogle /></a>
            <a href="#" className="text-gray-400 hover:text-white text-xl"><FaInstagram /></a>
            <a href="#" className="text-gray-400 hover:text-white text-xl"><FaYoutube /></a>
          </div>
        </div>

        {/* Guidelines */}
        <div>
          <h2 className="text-white text-lg font-bold uppercase">{t("guidelines")}</h2>
          <div className="bg-orange-500 h-0.5 w-full mt-1 opacity-50"></div>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">{t("links.home")}</a></li>
            <li><a href="#" className="hover:text-white">{t("links.listings")}</a></li>
            <li><a href="#" className="hover:text-white">{t("links.news")}</a></li>
            <li><a href="#" className="hover:text-white">{t("links.about")}</a></li>
            <li><a href="#" className="hover:text-white">{t("links.contact")}</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-10 border-t border-gray-700 pt-6">
        <p className="text-sm">
          {t("copyright")} <span className="text-green-500">K-bro</span> | {t("provided_by")} <span className="text-green-500">K-bro IT</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
