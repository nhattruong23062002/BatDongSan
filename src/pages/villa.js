import React from "react";
import Layout from "../layout/layout";
import { TfiLocationPin } from "react-icons/tfi";
import { IoBedOutline, IoPricetagOutline } from "react-icons/io5";
import { PiBathtubLight } from "react-icons/pi";
import { TbBuildingEstate } from "react-icons/tb";

function Villa() {
    return (
        <Layout>
            <div className="font-sans">
                {/* Header Section */}
                <section
                    className="relative bg-cover bg-center h-[700px]"
                    style={{
                        backgroundImage: "url('./nen.jpg')",
                    }}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center">
                        <div className="mt-12 text-white">
                            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                                Biệt Thự
                            </h1>
                        </div>
                    </div>
                </section>

                {/* Breadcrumb Section */}
                <div className="bg-gray-100 py-4 text-left">
                    <div className="container mx-auto px-4 ">
                        <p className="text-base font-medium">
                            <span className="text-black">Trang chủ </span>
                            <span className="mx-2"> / </span>
                            <span className="text-[#7DCE32]"> Biệt thự</span>
                        </p>
                    </div>
                </div>

                {/* Content Section with Sidebar */}
                <div className="container mx-auto px-4 py-8 flex gap-8">
                    {/* Sidebar */}
                    <div className="w-full lg:w-1/4 xl:w-1/5 p-4 bg-white border-2 border-gray-100 mb-6 lg:mb-0 lg:block hidden">
                        <div className="aside-title mb-4">
                            <h2 className="text-2xl text-left font-bold text-black">Kiểu Nhà Đất</h2>
                        </div>
                        <div className="aside-content">
                            <ul>
                                <li className="mb-4">
                                    <label className="flex items-center text-left cursor-pointer hover:text-[#7DCE32]">
                                        <input
                                            type="checkbox"
                                            className="mr-3 w-5 h-5"
                                        />
                                        Biệt thự
                                    </label>
                                </li>
                                <li className="mb-4">
                                    <label className="flex items-center text-left cursor-pointer hover:text-[#7DCE32]">
                                        <input
                                            type="checkbox"
                                            className="mr-3 w-5 h-5"
                                        />
                                        Căn hộ
                                    </label>
                                </li>
                                <li className="mb-4">
                                    <label className="flex items-center text-left cursor-pointer hover:text-[#7DCE32]">
                                        <input
                                            type="checkbox"
                                            className="mr-3 w-5 h-5"
                                        />
                                        Nhà phố
                                    </label>
                                </li>
                            </ul>
                        </div>

                        {/* HR line */}
                        <hr className="my-4 border-t-2 border-gray-100" />

                        {/* Price Range Section */}
                        <div className="aside-title mb-4">
                            <h2 className="text-2xl text-left font-bold text-black">Chọn Mức Giá</h2>
                        </div>
                        <div className="aside-content">
                            <ul>
                                <li className="mb-4">
                                    <label className="flex items-center text-left cursor-pointer hover:text-[#7DCE32]">
                                        <input
                                            type="checkbox"
                                            className="mr-3 w-5 h-5"
                                        />
                                        Dưới 100.000.000
                                    </label>
                                </li>
                                <li className="mb-4">
                                    <label className="flex items-center text-left cursor-pointer hover:text-[#7DCE32]">
                                        <input
                                            type="checkbox"
                                            className="mr-3 w-5 h-5"
                                        />
                                        100.000.000 - 200.000.000
                                    </label>
                                </li>
                                <li className="mb-4">
                                    <label className="flex items-center text-left cursor-pointer hover:text-[#7DCE32]">
                                        <input
                                            type="checkbox"
                                            className="mr-3 w-5 h-5"
                                        />
                                        200.000.000 - 300.000.000
                                    </label>
                                </li>
                                <li className="mb-4">
                                    <label className="flex items-center text-left cursor-pointer hover:text-[#7DCE32]">
                                        <input
                                            type="checkbox"
                                            className="mr-3 w-5 h-5"
                                        />
                                        300.000.000 - 400.000.000
                                    </label>
                                </li>
                                <li className="mb-4">
                                    <label className="flex items-center text-left cursor-pointer hover:text-[#7DCE32]">
                                        <input
                                            type="checkbox"
                                            className="mr-3 w-5 h-5"
                                        />
                                        400.000.000 - 500.000.000
                                    </label>
                                </li>
                                <li className="mb-4">
                                    <label className="flex items-center text-left cursor-pointer hover:text-[#7DCE32]">
                                        <input
                                            type="checkbox"
                                            className="mr-3 w-5 h-5"
                                        />
                                        500.000.000 - 600.000.000
                                    </label>
                                </li>
                                <li className="mb-4">
                                    <label className="flex items-center text-left cursor-pointer hover:text-[#7DCE32]">
                                        <input
                                            type="checkbox"
                                            className="mr-3 w-5 h-5"
                                        />
                                        600.000.000 - 1.000.000.000
                                    </label>
                                </li>
                            </ul>
                        </div>
                        {/* HR line */}
                        <hr className="my-4 border-t-2 border-gray-100" />

                        {/* Price Range Section */}
                        <div className="aside-title mb-4">
                            <h2 className="text-2xl text-left font-bold text-black">Chọn Diện Tích</h2>
                        </div>
                        <div className="aside-content">
                            <ul>
                                <li className="mb-4">
                                    <label className="flex items-center text-left cursor-pointer hover:text-[#7DCE32]">
                                        <input
                                            type="checkbox"
                                            className="mr-3 w-5 h-5"
                                        />
                                        Từ 20 - 50 m2
                                    </label>
                                </li>
                                <li className="mb-4">
                                    <label className="flex items-center text-left cursor-pointer hover:text-[#7DCE32]">
                                        <input
                                            type="checkbox"
                                            className="mr-3 w-5 h-5"
                                        />
                                        50 - 90 m2
                                    </label>
                                </li>
                                <li className="mb-4">
                                    <label className="flex items-center text-left cursor-pointer hover:text-[#7DCE32]">
                                        <input
                                            type="checkbox"
                                            className="mr-3 w-5 h-5"
                                        />
                                        90 - 120 m2
                                    </label>
                                </li>
                                <li className="mb-4">
                                    <label className="flex items-center text-left cursor-pointer hover:text-[#7DCE32]">
                                        <input
                                            type="checkbox"
                                            className="mr-3 w-5 h-5"
                                        />
                                        120 - 160 m2
                                    </label>
                                </li>
                                <li className="mb-4">
                                    <label className="flex items-center text-left cursor-pointer hover:text-[#7DCE32]">
                                        <input
                                            type="checkbox"
                                            className="mr-3 w-5 h-5"
                                        />
                                        Trên 160 m2
                                    </label>
                                </li>
                                <li className="mb-4">
                                    <label className="flex items-center text-left cursor-pointer hover:text-[#7DCE32]">
                                        <input
                                            type="checkbox"
                                            className="mr-3 w-5 h-5"
                                        />
                                        Dưới 20 m2
                                    </label>
                                </li>
                            </ul>
                        </div>
                        {/* HR line */}
                        <hr className="my-4 border-t-2 border-gray-100" />

                        {/* Price Range Section */}
                        <div className="aside-title mb-4">
                            <h2 className="text-2xl text-left font-bold text-black">Loại tin rao</h2>
                        </div>
                        <div className="aside-content">
                            <ul>
                                <li className="mb-4">
                                    <label className="flex items-center text-left cursor-pointer hover:text-[#7DCE32]">
                                        <input
                                            type="checkbox"
                                            className="mr-3 w-5 h-5"
                                        />
                                        Nhà đất - BÁN
                                    </label>
                                </li>
                                <li className="mb-4">
                                    <label className="flex items-center text-left cursor-pointer hover:text-[#7DCE32]">
                                        <input
                                            type="checkbox"
                                            className="mr-3 w-5 h-5"
                                        />
                                        Nhà đất - THUÊ
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Main Content Section */}
                    <div className="w-full lg:w-3/4 xl:w-4/5">
                        {/* Image Section */}
                        <img
                            src="https://bizweb.dktcdn.net/100/336/794/themes/692935/assets/banner.png?1705907391239"
                            alt="Biệt thự"
                            className="w-full h-[300px]"
                        />

                        {/* Ưu Tiên Xem Section */}
                        <div className="mt-4 flex">
                            <div className="aside-title mb-4">
                                <h2 className="text-base text-left font-bold text-black mr-12">Ưu Tiên Xem: </h2>
                            </div>
                            <div className="aside-content">
                                <div className="flex items-center">
                                    <div className="mr-4">
                                        <label className="flex items-center text-left cursor-pointer hover:text-[#7DCE32]">
                                            <input
                                                type="checkbox"
                                                className="mr-2 w-4 h-4"
                                            />
                                            Tin rao mới
                                        </label>
                                    </div>
                                    <div className="mr-4">
                                        <label className="flex items-center text-left cursor-pointer hover:text-[#7DCE32]">
                                            <input
                                                type="checkbox"
                                                className="mr-2 w-4 h-4"
                                            />
                                            Tin rao cũ
                                        </label>
                                    </div>
                                    <div className="mr-4">
                                        <label className="flex items-center text-left cursor-pointer hover:text-[#7DCE32]">
                                            <input
                                                type="checkbox"
                                                className="mr-2 w-4 h-4"
                                            />
                                            Giá tăng dần
                                        </label>
                                    </div>
                                    <div className="mr-4">
                                        <label className="flex items-center text-left cursor-pointer hover:text-[#7DCE32]">
                                            <input
                                                type="checkbox"
                                                className="mr-2 w-4 h-4"
                                            />
                                            Giá giảm dần
                                        </label>
                                    </div>
                                </div>

                            </div>

                        </div>
                        {/* HR line */}
                        <hr className="my-4 border-t-2 border-gray-100" />
                        <section className="bg-white p-4 flex flex-col md:flex-row">
                            {/* Hình ảnh */}
                            <div className="w-full md:w-1/4 flex-shrink-0 mb-4 md:mb-0">
                                <img
                                    src="https://th.bing.com/th?id=OIP.9yQB4gtqfKutkivgqdHWFgHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
                                    alt="Hình ảnh BĐS"
                                    className="w-full h-[160px] object-cover"
                                />
                            </div>

                            {/* Nội dung */}
                            <div className="w-full md:w-3/4 flex flex-col justify-start pl-0 md:pl-4">
                                <div className="justify-items-start">
                                    <h2 className="text-xl font-bolder text-black mb-3 hover:text-[#7DCE32] cursor-pointer">
                                        Cho thuê biệt thự view biển
                                    </h2>
                                    <p className="text-gray-600 mt-1 flex items-center mb-3">
                                        <TfiLocationPin className="text-teal-500 mr-2" />
                                        Phường Mỹ Khê, Sơn Trà, Đà Nẵng
                                    </p>
                                    <p className="text-lg flex items-center font-semibold text-teal-500 mb-3">
                                        <IoPricetagOutline className="text-teal-500 mr-2" />
                                        37.000.000 VNĐ/tháng
                                    </p>
                                </div>
                                <div className="flex gap-2 text-lg text-gray-600">
                                    <span className="mt-2 flex items-center">
                                        <IoBedOutline className="text-gray-300 mr-2 text-3xl" />
                                        5 Ngủ
                                    </span>
                                    <span className="mt-2 flex items-center">
                                        <PiBathtubLight className="text-gray-300 mr-2 text-3xl" />
                                        3 Tắm
                                    </span>
                                    <span className="mt-2 flex items-center">
                                        <TbBuildingEstate className="text-gray-300 mr-2 text-3xl" />
                                        180m²
                                    </span>
                                </div>
                            </div>
                        </section>
                        <hr class="border-t border-dashed border-gray-300 my-4" />
                        <section className="bg-white p-4 flex flex-col md:flex-row">
                            {/* Hình ảnh */}
                            <div className="w-full md:w-1/4 flex-shrink-0 mb-4 md:mb-0">
                                <img
                                    src="https://th.bing.com/th?id=OIP.x4Co-9j6iqNZ8tGYIxpOTAHaFj&w=288&h=216&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
                                    alt="Hình ảnh BĐS"
                                    className="w-full h-[160px] object-cover"
                                />
                            </div>

                            {/* Nội dung */}
                            <div className="w-full md:w-3/4 flex flex-col justify-start pl-0 md:pl-4">
                                <div className="justify-items-start">
                                    <h2 className="text-xl font-bolder text-black mb-3 hover:text-[#7DCE32] cursor-pointer">
                                        Cho thuê căn hộ cao cấp Azura
                                    </h2>
                                    <p className="text-gray-600 mt-1 flex items-center mb-3">
                                        <TfiLocationPin className="text-teal-500 mr-2" />
                                        Phường An Hải Bắc, Sơn Trà, Đà Nẵng
                                    </p>
                                    <p className="text-lg flex items-center font-semibold text-teal-500 mb-3">
                                        <IoPricetagOutline className="text-teal-500 mr-2" />
                                        15.000.000 VNĐ/tháng
                                    </p>
                                </div>
                                <div className="flex gap-2 text-lg text-gray-600">
                                    <span className="mt-2 flex items-center">
                                        <IoBedOutline className="text-gray-300 mr-2 text-3xl" />
                                        1 Ngủ
                                    </span>
                                    <span className="mt-2 flex items-center">
                                        <PiBathtubLight className="text-gray-300 mr-2 text-3xl" />
                                        1 Tắm
                                    </span>
                                    <span className="mt-2 flex items-center">
                                        <TbBuildingEstate className="text-gray-300 mr-2 text-3xl" />
                                        52m²
                                    </span>
                                </div>
                            </div>
                        </section>
                        <hr class="border-t border-dashed border-gray-300 my-4" />
                        <section className="bg-white p-4 flex flex-col md:flex-row">
                            {/* Hình ảnh */}
                            <div className="w-full md:w-1/4 flex-shrink-0 mb-4 md:mb-0">
                                <img
                                    src="https://th.bing.com/th?id=OIP.RY7yP02mrn9Mulc-X0o6pwHaEd&w=322&h=194&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
                                    alt="Hình ảnh BĐS"
                                    className="w-full h-[160px] object-cover"
                                />
                            </div>

                            {/* Nội dung */}
                            <div className="w-full md:w-3/4 flex flex-col justify-start pl-0 md:pl-4">
                                <div className="justify-items-start">
                                    <h2 className="text-xl font-bolder text-black mb-3 hover:text-[#7DCE32] cursor-pointer">
                                        Cho thuê căn hộ Monarchy
                                    </h2>
                                    <p className="text-gray-600 mt-1 flex items-center mb-3">
                                        <TfiLocationPin className="text-teal-500 mr-2" />
                                        Phường An Hải Tây, Sơn Trà, Đà Nẵng
                                    </p>
                                    <p className="text-lg flex items-center font-semibold text-teal-500 mb-3">
                                        <IoPricetagOutline className="text-teal-500 mr-2" />
                                        12.000.000 VNĐ/tháng
                                    </p>
                                </div>
                                <div className="flex gap-2 text-lg text-gray-600">
                                    <span className="mt-2 flex items-center">
                                        <IoBedOutline className="text-gray-300 mr-2 text-3xl" />
                                        2 Ngủ
                                    </span>
                                    <span className="mt-2 flex items-center">
                                        <PiBathtubLight className="text-gray-300 mr-2 text-3xl" />
                                        1 Tắm
                                    </span>
                                    <span className="mt-2 flex items-center">
                                        <TbBuildingEstate className="text-gray-300 mr-2 text-3xl" />
                                        60m²
                                    </span>
                                </div>
                            </div>
                        </section>
                        <hr class="border-t border-dashed border-gray-300 my-4" />
                        <section className="bg-white p-4 flex flex-col md:flex-row">
                            {/* Hình ảnh */}
                            <div className="w-full md:w-1/4 flex-shrink-0 mb-4 md:mb-0">
                                <img
                                    src="https://file4.batdongsan.com.vn/2022/10/29/20221029013944-54c8_wm.jpg"
                                    alt="Hình ảnh BĐS"
                                    className="w-full h-[160px] object-cover"
                                />
                            </div>

                            {/* Nội dung */}
                            <div className="w-full md:w-3/4 flex flex-col justify-start pl-0 md:pl-4">
                                <div className="justify-items-start">
                                    <h2 className="text-xl font-bolder text-black mb-3 hover:text-[#7DCE32] cursor-pointer">
                                        The Sang Residence - căn hộ cao cấp mặt biển sở hữu lâu dài tại Đà Nẵng
                                    </h2>
                                    <p className="text-gray-600 mt-1 flex items-center mb-3">
                                        <TfiLocationPin className="text-teal-500 mr-2" />
                                        Phường Khuê Mỹ, Ngũ Hành Sơn, Đà Nẵng
                                    </p>
                                    <p className="text-lg flex items-center font-semibold text-teal-500 mb-3">
                                        <IoPricetagOutline className="text-teal-500 mr-2" />
                                        3.700.000.000 VNĐ
                                    </p>
                                </div>
                                <div className="flex gap-2 text-lg text-gray-600">
                                    <span className="mt-2 flex items-center">
                                        <IoBedOutline className="text-gray-300 mr-2 text-3xl" />
                                        3 Ngủ
                                    </span>
                                    <span className="mt-2 flex items-center">
                                        <PiBathtubLight className="text-gray-300 mr-2 text-3xl" />
                                        1 Tắm
                                    </span>
                                    <span className="mt-2 flex items-center">
                                        <TbBuildingEstate className="text-gray-300 mr-2 text-3xl" />
                                        105.5m²
                                    </span>
                                </div>
                            </div>
                        </section>
                        <hr class="border-t border-dashed border-gray-300 my-4" />
                        <section className="bg-white p-4 flex flex-col md:flex-row">
                            {/* Hình ảnh */}
                            <div className="w-full md:w-1/4 flex-shrink-0 mb-4 md:mb-0">
                                <img
                                    src="https://file4.batdongsan.com.vn/2024/05/16/20240516183459-5732_wm.jpg"
                                    alt="Hình ảnh BĐS"
                                    className="w-full h-[160px] object-cover"
                                />
                            </div>

                            {/* Nội dung */}
                            <div className="w-full md:w-3/4 flex flex-col justify-start pl-0 md:pl-4">
                                <div className="justify-items-start">
                                    <h2 className="text-xl font-bolder text-black mb-3 hover:text-[#7DCE32] cursor-pointer">
                                        Căn hộ cao cấp Peninsula view sông Hàn, trung tâm Đà Nẵng - cạnh DA Sun Symphony
                                    </h2>
                                    <p className="text-gray-600 mt-1 flex items-center mb-3">
                                        <TfiLocationPin className="text-teal-500 mr-2" />
                                        Phường Nại Hiên Đông, Sơn Trà, Đà Nẵng
                                    </p>
                                    <p className="text-lg flex items-center font-semibold text-teal-500 mb-3">
                                        <IoPricetagOutline className="text-teal-500 mr-2" />
                                        2.392.000.000 VNĐ
                                    </p>
                                </div>
                                <div className="flex gap-2 text-lg text-gray-600">
                                    <span className="mt-2 flex items-center">
                                        <IoBedOutline className="text-gray-300 mr-2 text-3xl" />
                                        2 Ngủ
                                    </span>
                                    <span className="mt-2 flex items-center">
                                        <PiBathtubLight className="text-gray-300 mr-2 text-3xl" />
                                        1 Tắm
                                    </span>
                                    <span className="mt-2 flex items-center">
                                        <TbBuildingEstate className="text-gray-300 mr-2 text-3xl" />
                                        46.5m²
                                    </span>
                                </div>
                            </div>
                        </section>
                        <hr class="border-t border-dashed border-gray-300 my-4" />
                        <section className="bg-white p-4 flex flex-col md:flex-row">
                            {/* Hình ảnh */}
                            <div className="w-full md:w-1/4 flex-shrink-0 mb-4 md:mb-0">
                                <img
                                    src="https://file4.batdongsan.com.vn/2024/07/24/20240724112604-3ae7_wm.jpg"
                                    alt="Hình ảnh BĐS"
                                    className="w-full h-[160px] object-cover"
                                />
                            </div>

                            {/* Nội dung */}
                            <div className="w-full md:w-3/4 flex flex-col justify-start pl-0 md:pl-4">
                                <div className="justify-items-start">
                                    <h2 className="text-xl font-bolder text-black mb-3 hover:text-[#7DCE32] cursor-pointer">
                                        Căn hộ chung cư tại Sun Symphony Residence
                                    </h2>
                                    <p className="text-gray-600 mt-1 flex items-center mb-3">
                                        <TfiLocationPin className="text-teal-500 mr-2" />
                                        Phường Nại Hiên Đông, Sơn Trà, Đà Nẵng
                                    </p>
                                    <p className="text-lg flex items-center font-semibold text-teal-500 mb-3">
                                        <IoPricetagOutline className="text-teal-500 mr-2" />
                                        3.100.000.000 VNĐ
                                    </p>
                                </div>
                                <div className="flex gap-2 text-lg text-gray-600">
                                    <span className="mt-2 flex items-center">
                                        <IoBedOutline className="text-gray-300 mr-2 text-3xl" />
                                        1 Ngủ
                                    </span>
                                    <span className="mt-2 flex items-center">
                                        <PiBathtubLight className="text-gray-300 mr-2 text-3xl" />
                                        1 Tắm
                                    </span>
                                    <span className="mt-2 flex items-center">
                                        <TbBuildingEstate className="text-gray-300 mr-2 text-3xl" />
                                        52m²
                                    </span>
                                </div>
                            </div>
                        </section>

                        <hr class="border-t border-dashed border-gray-300 my-4" />
                    </div>

                </div>
            </div>
        </Layout>
    );
}

export default Villa;
