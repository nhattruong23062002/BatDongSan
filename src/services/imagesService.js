import axios from "axios";
import { API_URL } from "../config/apiUrls";
import { getToken } from "../utils/authUtils";

export const uploadImages = async (formData) => {
    return axios.post(`${API_URL}/images`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const getImages = async () => {
    const token = getToken();
    const response = await axios.get(`${API_URL}/images`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data.payload;
};

export const updateImages = async (idImages, updatedImages) => {
    const response = await axios.patch(`${API_URL}/images/${idImages}`, updatedImages, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data.payload;
};

export const getImagesByPropertyId = async (propertyId) => {
    const response = await axios.get(`${API_URL}/images/propertyId/${propertyId}`)
    return response.data.payload;
};
