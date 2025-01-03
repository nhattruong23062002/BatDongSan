import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaGoogle,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* About Us */}
        <div>
          <div className="text-left">
            <h2 className="text-white text-lg font-bold uppercase">
              Về chúng tôi
            </h2>
            <div className="relative mt-1">
              <div className="bg-orange-500 h-0.5 w-full mt-1 opacity-50"></div>{" "}
              {/* Đường mờ */}
            </div>
          </div>
          <p>
            Delta Platinum là một sản phẩm của Delta Web, với nỗ lực phát triển
            bền vững về thị trường bất động sản, Delta Platinum đều có thể giúp
            bạn.
          </p>
          <p className="mt-4">
            Tìm tin bán nhà đất hoặc cho thuê nhà đất mới nhất bằng cách sử dụng
            công cụ tìm kiếm hoặc các đường link ngay trên trang chủ.
          </p>
        </div>

        {/* Policies */}
        <div>
          <div className="text-left">
            <h2 className="text-white text-lg font-bold uppercase">
              Chính Sách
            </h2>
            <div className="relative mt-1">
              <div className="bg-orange-500 h-0.5 w-full mt-1 opacity-50"></div>{" "}
              {/* Đường mờ */}
            </div>
          </div>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-white">
                Trang chủ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Tất cả tin rao
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Giới thiệu
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Liên hệ
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div className="text-left">
            <h2 className="text-white text-lg font-bold uppercase">Liên Hệ</h2>
            <div className="relative mt-1">
              <div className="bg-orange-500 h-0.5 w-full mt-1 opacity-50"></div>{" "}
              {/* Đường mờ */}
            </div>
          </div>
          <p className="mb-2">Bạn cần hỗ trợ?</p>
          <p className="text-red-500 text-2xl font-bold mb-2">1900 6750</p>
          <p>Sơn Trà, Đà Nẵng</p>
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

        {/* Guide */}
        <div>
          <div className="text-left">
            <h2 className="text-white text-lg font-bold uppercase">
              Hướng Dẫn
            </h2>
            <div className="relative mt-1">
              <div className="bg-orange-500 h-0.5 w-full mt-1 opacity-50"></div>{" "}
              {/* Đường mờ */}
            </div>
          </div>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-white">
                Trang chủ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Tất cả tin rao
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Tin tức
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Giới thiệu
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Liên hệ
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center mt-10 border-t border-gray-700 pt-6">
        <p className="text-sm">
          © Bản quyền thuộc về <span className="text-green-500">K-bro</span> |
          Cung cấp bởi <span className="text-green-500">K-bro IT</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
