import axios from "axios";
import { API_URL } from "../config/apiUrls";
import { getToken } from "../utils/authUtils";

const getProperties = async () => {
    const response = await axios.get(`${API_URL}/properties`);
    return response.data.payload;
};

const getDetailProperty = async (id) => {
    const response = await axios.get(`${API_URL}/properties/${id}`);
    return response.data.payload;
};

const addProperty = async (propertyData) => {
    const token = getToken();
    const response = await axios.post(`${API_URL}/properties`, propertyData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data.payload;
};

const updateProperty = async (propertyId, propertyData) => {
    const token = getToken();
    const response = await axios.patch(`${API_URL}/properties/${propertyId}`, propertyData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data.payload;
};

const deleteProperty = async (propertyId) => {
    const token = getToken();
    await axios.delete(`${API_URL}/properties/${propertyId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export { getProperties, addProperty, updateProperty, deleteProperty, getDetailProperty };
