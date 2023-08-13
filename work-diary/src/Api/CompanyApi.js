import axios from "axios";
import { COMPANIES_API } from "../Helpers/RequestLinks";

export const getCompany = async (id) => {
    try {
        const response = await axios.get(COMPANIES_API + '/' + id, {
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

export const updateCompanies = async (id, data) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put(COMPANIES_API + '/' + id, data, {
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

export const deleteCompanies = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(COMPANIES_API + '/' + id, {
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