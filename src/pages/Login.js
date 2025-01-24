import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config/apiUrls";
import { decodeToken, setToken } from "../utils/authUtils";
import { toast, ToastContainer } from "react-toastify";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginData = {
            email,
            password,
        };
        try {
            const response = await axios.post(`${API_URL}/users/login`, loginData);
            if (response.status === 200) {
                const token = response.data.token;
                setToken(token);

                const decodedToken = decodeToken();
                const role = decodedToken?.role;
                if (role === "admin") {
                    navigate("/admin/dashboard");
                } else if (role === "user") {
                    navigate("/");
                }
            } else {
                toast.error("잘못된 이메일 또는 비밀번호");
            }
        } catch (error) {
            toast.error("잘못된 이메일 또는 비밀번호");
        }
    };

    return (
        <div className="min-h-[500px] flex items-center justify-center bg-gray-100 px-2 sm:px-4 lg:px-0">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">로그인</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                            이메일
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="이메일을 입력하세요"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                            비밀번호
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="비밀번호를 입력하세요"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
                        >
                            로그인
                        </button>
                    </div>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        계정이 없으신가요?{" "}
                        <button
                            onClick={() => navigate("/register")}
                            className="text-blue-500 hover:underline"
                        >
                            회원 가입
                        </button>
                    </p>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default LoginForm;
