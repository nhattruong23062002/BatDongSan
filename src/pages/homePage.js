import React from "react";
import Layout from "../layout/layout";
import { IoSearchSharp } from "react-icons/io5";

function HomePage() {
  return (
    <Layout>
      <div className="font-sans">
        <section
          className="relative bg-cover bg-center h-[700px]"
          style={{
            backgroundImage: "url('./nen.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center">
            <div className="mt-12 flex items-center space-x-1">
              <select className="bg-orange-500 text-white px-6 py-3 rounded-l-md outline-none">
                <option value="rent">Thuê</option>
                <option value="sell">Bán</option>
              </select>
              <input
                type="text"
                placeholder="Tìm dự án, biệt thự..."
                className="w-full lg:w-[600px] py-3 px-4"
              />
              <button className="flex items-center bg-green-600 text-white px-6 py-3 rounded-r-md">
                <IoSearchSharp className="text-2xl mr-0 lg:mr-2" />
                <span className="hidden lg:inline">TÌM KIẾM NHANH</span>
              </button>
            </div>

            <div className="mt-4 bg-opacity-90 rounded-md p-6 max-w-[700px]">
              <h2 className="text-center text-xl font-semibold mb-6 text-white">
                Tìm nhanh theo kiểu dáng
              </h2>
              <div className="grid grid-cols-3 lg:grid-cols-5 gap-6 text-center">
                <div className="backdrop-opacity-10 backdrop-invert bg-white/10 shadow py-2 px-4 rounded w-24 mx-auto">
                  <img
                    src="./Bietthu.png"
                    alt="Biệt thự"
                    className="mx-auto mb-2 w-14 h-14"
                  />
                  <p className="text-white text-sm font-medium">Biệt thự</p>
                </div>
                <div className="backdrop-opacity-10 backdrop-invert bg-white/10 shadow py-2 px-4 rounded w-24 mx-auto">
                  <img
                    src="./Nhavuon.png"
                    alt="Nhà vườn"
                    className="mx-auto mb-2 w-14 h-14"
                  />
                  <p className="text-white text-sm font-medium">Nhà vườn</p>
                </div>
                <div className="backdrop-opacity-10 backdrop-invert bg-white/10 shadow py-2 px-4 rounded w-24 mx-auto">
                  <img
                    src="./Nhapho.png"
                    alt="Nhà phố"
                    className="mx-auto mb-2 w-14 h-14"
                  />
                  <p className="text-white text-sm font-medium">Nhà phố</p>
                </div>
                <div className="backdrop-opacity-10 backdrop-invert bg-white/10 shadow py-2 px-4 rounded w-24 mx-auto">
                  <img
                    src="./Chungcu.png"
                    alt="Chung cư"
                    className="mx-auto mb-2 w-14 h-14"
                  />
                  <p className="text-white text-sm font-medium">Chung cư</p>
                </div>
                <div className="backdrop-opacity-10 backdrop-invert bg-white/10 shadow py-2 px-4 rounded w-24 mx-auto">
                  <img
                    src="./Canho.png"
                    alt="Căn hộ"
                    className="mx-auto mb-2 w-14 h-14"
                  />
                  <p className="text-white text-sm font-medium">Căn hộ</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default HomePage;
