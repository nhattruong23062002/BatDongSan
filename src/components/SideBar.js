import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    FaHome,
    FaUsers,
    FaSignInAlt,
    FaRegBuilding,
} from "react-icons/fa";

import { removeToken } from "../utils/authUtils";

function AdminSidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { path: "/admin/dashboard", icon: FaHome, label: "대시보드" },
        { path: "/admin/manageUser", icon: FaUsers, label: "사용자 관리" },
        { path: "/admin/manageProperty", icon: FaRegBuilding, label: "부동산 관리" },
    ];

    return (
        <div className="min-h-screen w-64 bg-white shadow-md flex flex-col">
            <div></div>
            <div className="flex items-center justify-center h-20 border-b" >
                <div className="flex items-center space-x-3">
                    <img
                        src="/Logo.png"
                        alt="Logo"
                        className="h-16 w-auto"
                    />
                </div>
            </div>

            <nav className="flex-1 p-4">
                <ul className="space-y-4">
                    {menuItems.map((item) => (
                        <li
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={`flex items-center space-x-3 cursor-pointer 
                                ${location.pathname === item.path
                                    ? "text-blue-600 font-medium"
                                    : "text-gray-400 hover:text-blue-600"
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span>{item.label}</span>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="p-4 border-t">
                <ul className="space-y-4">
                    <li
                        onClick={() => {
                            removeToken();
                            navigate("/login");
                        }}
                        className="flex items-center space-x-3 hover:text-blue-600 cursor-pointer text-gray-400"
                    >
                        <FaSignInAlt className="w-5 h-5" />
                        <span>로그아웃</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default AdminSidebar;
