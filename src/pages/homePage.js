import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import Card from "../components/card";
import NewsCard from "../components/NewCard";
import { useTranslation } from "react-i18next";

function HomePage() {
  const [activeType, setActiveType] = useState("BIỆT THỰ");
  const { t } = useTranslation("homePage");

  const handleButtonClick = (type) => {
    setActiveType(type);
  };

  const projectList = [
    {
      id: 1,
      image:
        "https://bizweb.dktcdn.net/thumb/large/100/336/794/products/modern-villa-vancouver-splyce-800x500.jpg?v=1540397698920",
      tags: [
        { label: t("projects.sale"), color: "blue" },
        { label: "Hot", color: "red" },
      ],
      title: t("projects.title1"),
      type: t("projects.type_villa"),
      location: t("projects.location1"),
      price: "12.500.000.000đ",
      details: {
        bedrooms: 3,
        bathrooms: 4,
        area: 96,
      },
    },
    {
      id: 2,
      image:
        "https://bizweb.dktcdn.net/thumb/large/100/336/794/products/florida-architecture-010815-02.jpg?v=1540395617910",
      tags: [{ label: t("projects.rent"), color: "orange" }],
      title: t("projects.title2"),
      type: t("projects.type_villa"),
      location: t("projects.location2"),
      price: "20.000.000đ",
      details: {
        bedrooms: 6,
        bathrooms: 3,
        area: 106,
      },
    },
    {
      id: 3,
      image:
        "https://bizweb.dktcdn.net/thumb/large/100/336/794/products/can-ho-mau-vinhomes-spring-lake-pham-hung-04.jpg?v=1540397162030",
      tags: [{ label: t("projects.sale"), color: "blue" }],
      title: t("projects.title3"),
      type: t("projects.type_apartment"),
      location: t("projects.location3"),
      price: "10.500.000.000đ",
      details: {
        bedrooms: 3,
        bathrooms: 2,
        area: 96,
      },
    },
    {
      id: 4,
      image:
        "https://bizweb.dktcdn.net/thumb/large/100/336/794/products/noi-that-can-ho-chung-cu-center-point.jpg?v=1540396565540",
      tags: [{ label: t("projects.rent"), color: "orange" }],
      title: t("projects.title4"),
      type: t("projects.type_condo"),
      location: t("projects.location3"),
      price: "20.000.000đ",
      details: {
        bedrooms: 3,
        bathrooms: 2,
        area: 76,
      },
    },
    {
      id: 5,
      image:
        "https://bizweb.dktcdn.net/thumb/large/100/336/794/products/6b.jpg?v=1540398749457",
      tags: [{ label: t("projects.rent"), color: "orange" }],
      title: t("projects.title5"),
      type: t("projects.type_villa"),
      location: t("projects.location3"),
      price: "35.000.000đ",
      details: {
        bedrooms: 5,
        bathrooms: 4,
        area: 200,
      },
    },
    {
      id: 6,
      image:
        "https://bizweb.dktcdn.net/thumb/large/100/336/794/products/phong-khach-can-ho-condotel-toa-g3-vinhomes-green-bay-530f3812-c3fa-4ac6-b1e5-cb42e4e6e23e.jpg?v=1540399059220",
      tags: [{ label: t("projects.rent"), color: "orange" }],
      title: t("projects.title6"),
      type: t("projects.type_apartment"),
      location: t("projects.location3"),
      price: "38.000.000đ",
      details: {
        bedrooms: 3,
        bathrooms: 2,
        area: 80,
      },
    },
  ];

  const featuredProjects = [
    {
      id: 1,
      image:
        "https://bizweb.dktcdn.net/100/336/794/themes/692935/assets/banner_project_1.png?1705907391239",
      title: t("featured_projects.flat"),
      count: 12,
    },
    {
      id: 2,
      image:
        "https://bizweb.dktcdn.net/100/336/794/themes/692935/assets/banner_project_2.png?1705907391239",
      title: t("featured_projects.apartment"),
      count: 23,
    },
    {
      id: 3,
      image:
        "https://bizweb.dktcdn.net/100/336/794/themes/692935/assets/banner_project_3.png?1705907391239",
      title: t("featured_projects.garden_house"),
      count: 9,
    },
    {
      id: 4,
      image:
        "https://bizweb.dktcdn.net/100/336/794/themes/692935/assets/banner_project_4.png?1705907391239",
      title: t("featured_projects.villa"),
      count: 16,
    },
    {
      id: 5,
      image:
        "https://bizweb.dktcdn.net/100/336/794/themes/692935/assets/banner_project_5.png?1705907391239",
      title: t("featured_projects.town_house"),
      count: 25,
    },
  ];

  const newsList = [
    {
      id: 1,
      image:
        "https://bizweb.dktcdn.net/thumb/large/100/336/794/articles/vinhomes-vingroup.png?v=1540430618343",
      date: "25/10/2018",
      comments: 0,
      title: t("news1.title"),
      description: t("news1.description"),
      author: {
        name: "Đào Quý Thương",
        avatar:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxXJcKZFB12lPbrp9Wrqp7ToeTe14w4SQeZg&s",
      },
    },
    {
      id: 2,
      image:
        "https://bizweb.dktcdn.net/thumb/large/100/336/794/articles/biet-thu-nghi-duong-phu-quoc.jpg?v=1540430533257",
      date: "25/10/2018",
      comments: 1,
      title: t("news2.title"),
      description: t("news2.description"),
      author: {
        name: "Đào Quý Thương",
        avatar:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxXJcKZFB12lPbrp9Wrqp7ToeTe14w4SQeZg&s",
      },
    },
    {
      id: 3,
      image:
        "https://bizweb.dktcdn.net/thumb/large/100/336/794/articles/panorama-nha-trang-e1512976436592.jpg?v=1540430397360",
      date: "25/10/2018",
      comments: 0,
      title: t("news3.title"),
      description: t("news3.description"),
      author: {
        name: "Đào Quý Thương",
        avatar:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxXJcKZFB12lPbrp9Wrqp7ToeTe14w4SQeZg&s",
      },
    },
  ];

  return (
    <div className="font-sans">
      <section
        className="relative bg-cover bg-center h-[600px] lg:h-[800px]"
        style={{
          backgroundImage: "url('./Nen.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center">
          <h1 className="text-white text-5xl">{t("banner.search_title")}</h1>

          <div className="mt-12 flex items-center space-x-1">
            <select className="bg-orange-500 text-white px-6 py-3 rounded-l-md outline-none">
              <option value="rent">{t("banner.rent")}</option>
              <option value="sell">{t("banner.sell")}</option>
            </select>
            <input
              type="text"
              placeholder={t("banner.search_placeholder")}
              className="w-full lg:w-[600px] py-3 px-4"
            />
            <button className="flex items-center bg-green-600 text-white px-6 py-3 rounded-r-md">
              <IoSearchSharp className="text-2xl mr-0 lg:mr-2" />
              <span className="hidden lg:inline">
                {t("banner.search_button")}
              </span>
            </button>
          </div>

          <div className="mt-4 bg-opacity-90 rounded-md p-6 max-w-[700px]">
            <h2 className="text-center text-xl font-semibold mb-6 text-white">
              {t("banner.quick_search")}
            </h2>
            <div className="grid grid-cols-3 lg:grid-cols-5 gap-6 text-center">
              <div className="backdrop-opacity-10 backdrop-invert bg-white/10 shadow py-2 px-4 rounded w-24 mx-auto">
                <img
                  src="./Bietthu.png"
                  alt={t("banner.villa")}
                  className="mx-auto mb-2 w-14 h-14"
                />
                <p className="text-white text-sm font-medium">
                  {t("banner.villa")}
                </p>
              </div>
              <div className="backdrop-opacity-10 backdrop-invert bg-white/10 shadow py-2 px-4 rounded w-24 mx-auto">
                <img
                  src="./Nhavuon.png"
                  alt={t("banner.garden_house")}
                  className="mx-auto mb-2 w-14 h-14"
                />
                <p className="text-white text-sm font-medium">
                  {t("banner.garden_house")}
                </p>
              </div>
              <div className="backdrop-opacity-10 backdrop-invert bg-white/10 shadow py-2 px-4 rounded w-24 mx-auto">
                <img
                  src="./Nhapho.png"
                  alt={t("banner.town_house")}
                  className="mx-auto mb-2 w-14 h-14"
                />
                <p className="text-white text-sm font-medium">
                  {t("banner.town_house")}
                </p>
              </div>
              <div className="backdrop-opacity-10 backdrop-invert bg-white/10 shadow py-2 px-4 rounded w-24 mx-auto">
                <img
                  src="./Chungcu.png"
                  alt={t("banner.apartment")}
                  className="mx-auto mb-2 w-14 h-14"
                />
                <p className="text-white text-sm font-medium">
                  {t("banner.apartment")}
                </p>
              </div>
              <div className="backdrop-opacity-10 backdrop-invert bg-white/10 shadow py-2 px-4 rounded w-24 mx-auto">
                <img
                  src="./Canho.png"
                  alt={t("banner.flat")}
                  className="mx-auto mb-2 w-14 h-14"
                />
                <p className="text-white text-sm font-medium">
                  {t("banner.flat")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-10 bg-gray-100">
        <div className="container mx-auto max-w-[1280px] px-4">
          <div className="flex justify-between items-center mb-4">
            <div className="text-left">
              <h2 className="text-orange-500 text-2xl font-bold inline text-left">
                {t("projects.latest_projects")}{" "}
                <span className="text-black">
                  {t("projects.latest_projects_subtitle")}
                </span>
              </h2>
              <p className="text-gray-600 mt-2">
                {t("projects.latest_projects_description")}
              </p>
            </div>
            <div className="flex space-x-2 mb-6 hidden md:flex">
              {[
                t("projects.villa"),
                t("projects.apartment"),
                t("projects.condominium"),
                t("projects.garden_house"),
              ].map((type) => (
                <button
                  key={type}
                  onClick={() => handleButtonClick(type)}
                  className={`font-medium px-4 py-2 rounded ${
                    activeType === type
                      ? "text-orange-500"
                      : "text-gray-800 hover:text-orange-500"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectList.map((project) => (
              <Card
                key={project.id}
                image={project.image}
                tags={project.tags}
                title={project.title}
                location={project.location}
                price={project.price}
                details={project.details}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="py-10 bg-white">
        <div className="container mx-auto max-w-[1280px] px-4">
          <div className="text-center mb-8">
            <h2 className="text-orange-500 text-2xl font-bold">
              {t("featured_projects.title")}{" "}
              <span className="text-black">
                {t("featured_projects.subtitle")}
              </span>
            </h2>
            <p className="text-gray-600 mt-2">
              {t("featured_projects.description")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className={`relative rounded-lg overflow-hidden shadow-lg group ${
                  project.title === "Căn hộ" ? "lg:col-span-2" : ""
                }`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent transition-opacity duration-300 group-hover:opacity-0"></div>
                <div className="absolute bottom-3 left-0 w-full text-white text-center font-semibold transition-transform duration-300">
                  <div className="text-3xl group-hover:-translate-y-2 transition-transform duration-300">
                    {project.title}
                  </div>
                  <div className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {t("featured_projects.units", { count: project.count })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-10 bg-gray-100">
      <div className="container mx-auto max-w-[1280px] px-4">
        <div className="text-left mb-6">
          <h2 className="text-orange-500 text-2xl font-bold inline">
            {t("real_estate_news.title")}{" "}
            <span className="text-black">{t("real_estate_news.subtitle")}</span>
          </h2>
          <p className="text-gray-600 mt-2">
            {t("real_estate_news.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsList.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      </div>
    </section>
    </div>
  );
}

export default HomePage;
