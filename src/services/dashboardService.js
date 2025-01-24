import axios from "axios";
import { API_URL } from "../config/apiUrls";

const getPropertiesCountByStatus = async () => {
    const response = await axios.get(`${API_URL}/properties/status`)
    return response.data.payload;
};

const getPropertiesCountByTypes = async () => {
    const response = await axios.get(`${API_URL}/properties/types`)
    return response.data.payload;
};

const getTotalRevenue = async () => {
    const response = await axios.get(`${API_URL}/properties/totalRevenue`)
    return response.data.payload;
};

export { getPropertiesCountByStatus, getPropertiesCountByTypes, getTotalRevenue };
