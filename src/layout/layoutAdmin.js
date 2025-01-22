import React from "react";
import Sidebar from "../components/SideBar";
import { Outlet } from "react-router-dom";

function AdminLayout({ children }) {
    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 p-6 bg-gray-50"> <Outlet /></main>
        </div>
    );
}

export default AdminLayout;

