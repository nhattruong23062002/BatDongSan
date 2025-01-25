import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/apiUrls";
import axios from "axios";
import { getToken, removeToken } from "../utils/authUtils";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const [propertyTypes, setPropertyTypes] = useState([]);
    const navigation = useNavigate();
    const token = getToken();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleSubMenu = () => {
        setIsSubMenuOpen(!isSubMenuOpen);
    };

    useEffect(() => {
        const fetchPropertyTypes = async () => {
            try {
                const response = await axios.get(`${API_URL}/propertyTypes`);
                setPropertyTypes(response.data.payload);
            } catch (error) {
                console.error("Error fetching property types:", error);
            }
        };

        fetchPropertyTypes();
    }, []);
    const navigate = useNavigate();

    return (
        <div className="bg-white bg-opacity-90 shadow-md">
            <div className="container mx-auto max-w-[1280px] flex items-center justify-between h-16 px-6">
                <div className="flex items-center space-x-2">
                    <img
                        src="/Logo.png"
                        alt="Logo"
                        className="h-16 w-auto"
                        onClick={() => navigation("/")}
                    />
                </div>

                <div className="flex items-center space-x-4">
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
                </div>

                <nav
                    style={{ zIndex: 1000 }}
                    className={`text-center lg:flex flex-col lg:flex-row lg:space-x-6 text-sm font-medium text-gray-700 absolute lg:relative lg:top-0 top-16 left-0 w-full bg-white lg:bg-transparent lg:w-auto transform lg:transform-none transition-transform duration-300 ${
                        isMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                >
                    <a
                        href="#"
                        className="block py-2 px-4 hover:text-green-500 transition-colors"
                        onClick={() => navigation("/")}
                    >
                        홈
                    </a>
                    <div className="relative">
                        <button
                            onClick={toggleSubMenu}
                            className="block py-2 px-4 hover:text-green-500 transition-colors w-full text-left lg:inline lg:w-auto text-center"
                        >
                            모든 게시물 <span className="ml-1">&#x25BC;</span>
                        </button>
                        {isSubMenuOpen && (
                            <div className="absolute left-32 lg:left-0 bg-white shadow-lg rounded-md mt-2 z-10 w-40 text-center">
                                {propertyTypes.map((type) => (
                                    <button
                                        key={type._id}
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-left w-full"
                                        onClick={() =>
                                            navigate(`/map/${type._id}`)
                                        } // Chuyển hướng đến MapPage
                                    >
                                        {type.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <a
                        href="/favorite"
                        className="block py-2 px-4 hover:text-green-500 transition-colors"
                    >
                        좋아하다
                    </a>
                    <a
                        href="#"
                        className="block py-2 px-4 hover:text-green-500 transition-colors"
                    >
                        소개
                    </a>
                    {token ? (
                        <a
                            onClick={removeToken}
                            href="/"
                            className="block py-2 px-4 text-white transition-colors bg-red-500 rounded-sm"
                        >
                            로그아웃
                        </a>
                    ) : (
                        <a
                            href="/login"
                            className="block py-2 px-4 text-green-500 transition-colors bg-stone-800 rounded-sm"
                        >
                            로그인
                        </a>
                    )}
                </nav>
            </div>
        </div>
    );
}

export default Header;
