import axios from "axios";
import { SPORTGROUND_API, TYPES_API } from "../Helpers/RequestLinks";

export const getAllSportground = async () => {
    try {
        const response = await axios.get(SPORTGROUND_API + '/', {
            withCredentials: true,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const updateSportground = async (id, data) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put(SPORTGROUND_API + '/' + id, data, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const createSportground = async (id, data) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(SPORTGROUND_API + '/'  + id, data, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const getAllSportgroundTypes = async () => {
    try {
        const response = await axios.get(TYPES_API + '/', {
            withCredentials: true,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const deleteSportground = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(SPORTGROUND_API + '/' + id, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};