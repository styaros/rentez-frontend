import axios from "axios";
import { COMPANIES_API, EMPLOYEE_API } from "../Helpers/RequestLinks";

export const registerEmployee = async (data) => {
    try {
        const response = await axios.post(EMPLOYEE_API + '/register', data, {
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

export const registerCompanies = async (data) => {
    try {
        const response = await axios.post(COMPANIES_API + '/register', data, {
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

export const loginCompany = async (data) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(COMPANIES_API + '/login', data, {
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

export const loginEmployee = async (data) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(EMPLOYEE_API + '/login', data, {
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

export const getByIdEmployee = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(EMPLOYEE_API + '/' + id, {
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


export const putEmployee = async (id, data) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put(EMPLOYEE_API + '/' + id, data, {
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
