import api from './api';
import {handleApiError} from './handleApiError';

// Get Courier
export const getCouriers = async (limit,page) => {
    try {
        const response = await api.get(`drivers?limit=${limit}&page=${page}`).json();
        return response;
    } catch (error) {
        await handleApiError(error);
    }
}

// Create Courier
export const createCourier = async (data) => {
    try {
        const response = await api.post('/couriers', {
            json: data,
        }).json();
        return response;
    } catch (error) {
       await handleApiError(error);
    }
};

  // UpdateCourier
export const updateCourier = async (id, data) => {
    try {
        const response = await api.put(`/couriers/${id}`, {
            json: data,
        }).json();
        return response;
    } catch (error) {
        await handleApiError(error);
    }
};


  // Delete Courier
export const deleteCourier = async (id) => {
    try {
        const response = await api.delete(`/couriers/${id}`).json();
        return response;
    } catch (error) {
       await handleApiError(error);
    }
};