import axios from "axios";
import { API_URL } from "../config/apiUrls";
import { getToken } from "../utils/authUtils";

const getUsers = async () => {
    const token = getToken();
    const response = await axios.get(`${API_URL}/users`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data.payload;
};

const addUser = async (userData) => {
    const token = getToken();
    const response = await axios.post(`${API_URL}/users`, userData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data.payload;
};

const updateUser = async (userId, userData) => {
    const token = getToken();
    const response = await axios.patch(`${API_URL}/users/${userId}`, userData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data.payload;
};

const deleteUser = async (userId) => {
    const token = getToken();
    await axios.delete(`${API_URL}/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export { getUsers, addUser, updateUser, deleteUser };
