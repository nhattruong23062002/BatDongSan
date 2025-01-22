import React from "react";
import { useTranslation } from "react-i18next";
import {
  FaFacebook,
  FaTwitter,
  FaGoogle,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  const { t } = useTranslation("footer");

  return (
    <footer className="bg-gray-900 text-gray-400 py-10">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        <div>
          <h2 className="text-white text-lg font-bold uppercase">
            회사 소개
          </h2>
          <div className="bg-orange-500 h-0.5 w-full mt-1 opacity-50"></div>
          <p>K-Bro Land는 부동산 시장에서 지속 가능한 발전을 목표로 하는 K-Bro의 제품입니다.</p>
          <p className="mt-4">홈페이지에서 검색 도구나 링크를 사용하여 판매 또는 임대 최신 목록을 찾으세요.</p>
        </div>

        {/* Policies */}
        <div>
          <h2 className="text-white text-lg font-bold uppercase">
            정책
          </h2>
          <div className="bg-orange-500 h-0.5 w-full mt-1 opacity-50"></div>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-white">
                홈
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                모든 목록
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                회사 소개
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                문의하기
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-white text-lg font-bold uppercase">
            문의하기
          </h2>
          <div className="bg-orange-500 h-0.5 w-full mt-1 opacity-50"></div>
          <p className="mb-2">지원이 필요하십니까?</p>

          <p className="text-red-500 text-2xl font-bold mb-2">1900 6750</p>
          <p>선짜, 다낭</p>
          <p>K-bro@gmail.com</p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-gray-400 hover:text-white text-xl">
              <FaFacebook />
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-xl">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-xl">
              <FaGoogle />
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-xl">
              <FaInstagram />
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-xl">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Guidelines */}
        <div>
          <h2 className="text-white text-lg font-bold uppercase">
            가이드라인
          </h2>
          <div className="bg-orange-500 h-0.5 w-full mt-1 opacity-50"></div>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-white">
                홈
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                모든 목록
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                뉴스
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                회사 소개
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                문의하기
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-10 border-t border-gray-700 pt-6">
        <p className="text-sm">
          © 저작권 소유 <span className="text-green-500">K-bro</span> |{" "}
          제공 <span className="text-green-500">K-bro IT</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
