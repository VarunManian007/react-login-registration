import axios from "axios";
import { ApiResponse } from "../model/apiResponse";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const httpService = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

export const GET_REQUEST = async (url: string, config: {}) => {
    try {
        const response: ApiResponse = await httpService.get(url, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const POST_REQUEST = async (url: string, data: {}, config: {}): Promise<ApiResponse> => {
    try {
        const response: ApiResponse = await httpService.post(url, data, config);
        return response.data;
    } catch (error) {
        console.log(error.message);
        throw error.data;
    }
};