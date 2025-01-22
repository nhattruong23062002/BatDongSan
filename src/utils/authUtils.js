import { jwtDecode } from "jwt-decode";

export const setToken = (token) => {
    localStorage.setItem("authToken", token);
};

export const getToken = () => {
    return localStorage.getItem("authToken");
};

export const removeToken = () => {
    localStorage.removeItem("authToken");
};

export const decodeToken = () => {
    const token = getToken();
    if (token) {
        try {
            return jwtDecode(token);
        } catch (error) {
            console.error("Invalid token:", error);
            removeToken();
        }
    }
    return null;
};
