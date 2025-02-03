import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUser } from "../services/userService";
import { toast, ToastContainer } from "react-toastify";

function RegisterForm() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            fullName,
            email,
            phoneNumber,
            role: "user",
            password,
        };
        try {
            const response = await addUser(userData);

            if (response.status === 201 || response.status === 200) {
                toast.success("회원가입이 완료되었습니다!", { autoClose: 1500 });
            } else {
                toast.error("회원가입 중 오류가 발생했습니다.", { autoClose: 1500 });
            }
        } catch (error) {
            toast.error("서버에 문제가 있습니다. 다시 시도해주세요.", { autoClose: 1500 });
        }
    };

    return (
        <div className="min-h-[650px] flex items-center justify-center bg-gray-100 px-2 sm:px-4 lg:px-0">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    회원 가입
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-600">
                            성함
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            placeholder="이름을 입력하세요"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

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
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-600">
                            전화번호
                        </label>
                        <input
                            type="text"
                            id="phoneNumber"
                            placeholder="전화번호를 입력하세요"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
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
                            가입하기
                        </button>
                    </div>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        이미 계정이 있으신가요?{" "}
                        <button
                            onClick={() => navigate("/login")}
                            className="text-blue-500 hover:underline"
                        >
                            로그인
                        </button>
                    </p>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default RegisterForm;
