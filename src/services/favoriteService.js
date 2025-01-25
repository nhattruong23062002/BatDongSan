import axios from "axios";
import { API_URL } from "../config/apiUrls";
import { getToken } from "../utils/authUtils";

const getFavotites = async () => {
    const token = getToken();
    const response = await axios.get(`${API_URL}/favorites`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data.payload;
};

const getDetailFavorite = async (userId, propertyId) => {
    const response = await axios.get(`${API_URL}/favorites/detail/${userId}/${propertyId}`);
    return response.data.payload;
};

const getAllFavoriteForUser = async (userId) => {
    const token = getToken();
    const response = await axios.get(`${API_URL}/favorites/allFavoriteForUser/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data.payload;
};

const addFavorite = async (data) => {
    const token = getToken();
    const response = await axios.post(`${API_URL}/favorites`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data.payload;
};

const deleteFavorite = async (data) => {
    const token = getToken();
    await axios.delete(`${API_URL}/favorites/${data.userId}/${data.propertyId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export { getFavotites, addFavorite, deleteFavorite, getDetailFavorite, getAllFavoriteForUser };
