import axios from "axios";
import { BOXES_API, RESERVATION_API } from "../Helpers/RequestLinks";

export const getBoxesBySportground = async (id) => {
    try {
        const response = await axios.get(BOXES_API + '/sportground/' + id, {
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

export const createBox = async (id,data) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(BOXES_API + '/' + id, data , {
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

export const getReservation = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(RESERVATION_API + '/' , {
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

export const makeReservation = async (id,data) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(RESERVATION_API + '/' + id, data, {
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

export const changeStatusReservation = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put(RESERVATION_API + '/finished/' + id, {
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