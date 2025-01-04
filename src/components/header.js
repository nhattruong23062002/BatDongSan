import React, { useState } from "react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <div className="bg-white bg-opacity-90 shadow-md">
      <div className="container mx-auto max-w-[1280px] flex items-center justify-between h-16 px-6">
        <div className="flex items-center space-x-2">
          <img src="./logo.png" alt="Logo" className="h-20 w-auto" />
        </div>

        <div className="block lg:hidden">
          <button onClick={toggleMenu} className="text-green-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        <nav
          style={{ zIndex: 1000 }}
          className={`lg:flex flex-col lg:flex-row lg:space-x-6 text-sm font-medium text-gray-700 absolute lg:relative lg:top-0 top-16 left-0 w-full bg-white lg:bg-transparent lg:w-auto transform lg:transform-none transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <a
            href="#"
            className="block py-2 px-4 hover:text-green-500 transition-colors"
          >
            Trang chủ
          </a>

          <div className="relative">
            <button
              onClick={toggleSubMenu}
              className="block py-2 px-4 hover:text-green-500 transition-colors w-full text-left lg:inline lg:w-auto text-center"
            >
              Tất cả tin rao <span className="ml-1">&#x25BC;</span>
            </button>
            {isSubMenuOpen && (
              <div className="absolute left-32 lg:left-0 bg-white shadow-lg rounded-md mt-2 z-10 w-40 text-center">
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 "
                >
                  Căn hộ
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Nhà mặt đất
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Biệt thự
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Văn phòng
                </a>
              </div>
            )}
          </div>

          <a
            href="#"
            className="block py-2 px-4 hover:text-green-500 transition-colors"
          >
            Tin tức
          </a>
          <a
            href="#"
            className="block py-2 px-4 hover:text-green-500 transition-colors"
          >
            Giới thiệu
          </a>
          <a
            href="#"
            className="block py-2 px-4 hover:text-green-500 transition-colors"
          >
            Liên hệ
          </a>
        </nav>
      </div>
    </div>
  );
}

export default Header;
