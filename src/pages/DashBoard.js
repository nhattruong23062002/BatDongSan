import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { getUsers } from "../services/userService";
import { getProperties } from "../services/propertyService";
import { getPropertiesCountByStatus, getPropertiesCountByTypes, getTotalRevenue } from "../services/dashboardService";

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [properties, setProperties] = useState([]);
    const [propertiesByCountStatus, setPropertiesByCountStatus] = useState({
        Available: 0,
        Sold: 0,
        Rented: 0,
    });
    const [propertiesByCountTypes, setPropertiesByCountTypes] = useState([]);
    const [totalRevenueState, setTotalRevenueState] = useState();

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const users = await getUsers();
                const properties = await getProperties();
                const statusCounts = await getPropertiesCountByStatus();
                const typeCounts = await getPropertiesCountByTypes();
                const totalRevenue = await getTotalRevenue();

                setUsers(users);
                setProperties(properties);
                setPropertiesByCountStatus(statusCounts);
                setPropertiesByCountTypes(typeCounts);
                setTotalRevenueState(totalRevenue);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        fetchDashboardData();
    }, []);

    const statusData = {
        labels: ["사용 가능", "판매됨", "임대됨"],
        datasets: [
            {
                data: [
                    propertiesByCountStatus.Available,
                    propertiesByCountStatus.Sold,
                    propertiesByCountStatus.Rented,
                ],
                backgroundColor: ["#4CAF50", "#F44336", "#FFC107"],
            },
        ],
    };

    const typeData = {
        labels: propertiesByCountTypes.map((type) => type.propertyTypeName),
        datasets: [
            {
                data: propertiesByCountTypes.map((type) => type.count),
                backgroundColor: ["#2196F3", "#9C27B0", "#FF9800", "#4CAF50", "#F44336"],
            },
        ],
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <main className="flex-1 p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">시스템 개요</h1>

                <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-4 shadow-md rounded-lg">
                        <h3 className="text-lg font-bold text-gray-600">총 부동산</h3>
                        <p className="text-3xl font-bold text-blue-500">{properties?.length}</p>
                    </div>
                    <div className="bg-white p-4 shadow-md rounded-lg">
                        <h3 className="text-lg font-bold text-gray-600">사용자 수</h3>
                        <p className="text-3xl font-bold text-purple-500">{users?.length}</p>
                    </div>
                    <div className="bg-white p-4 shadow-md rounded-lg">
                        <h3 className="text-lg font-bold text-gray-600">부동산 유형</h3>
                        <p className="text-3xl font-bold text-yellow-500">{propertiesByCountTypes?.length}</p>
                    </div>
                    <div className="bg-white p-4 shadow-md rounded-lg">
                        <h3 className="text-lg font-bold text-gray-600">총 매출</h3>
                        <p className="text-3xl font-bold text-green-500">
                            {totalRevenueState?.totalRevenue?.toLocaleString("vi-VN")} VND
                        </p>
                    </div>

                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 shadow-md rounded-lg">
                        <h3 className="text-lg font-bold text-gray-600 mb-4">부동산 상태</h3>
                        <Bar
                            data={statusData}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: false
                                },
                                scales: {
                                    y: {
                                        title: {
                                            display: true,
                                            text: "개수",
                                        },
                                        beginAtZero: true,
                                    },
                                },
                            }}
                        />
                    </div>

                    <div className="bg-white p-4 shadow-md rounded-lg">
                        <h3 className="text-lg font-bold text-gray-600 mb-4">부동산 유형</h3>
                        <div className="flex justify-center">
                            <div className="w-[400px] h-[400px]">
                                <Pie data={typeData} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
