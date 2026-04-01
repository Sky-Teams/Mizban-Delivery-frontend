import api from './api';
import {handleApiError} from './handleApiError';

export const signup = async(userData) => {
    try{
        const response = await api.post('auth/register', {json: userData}).json();
        return response;
    }catch(error){
       await handleApiError(error);
    }
};


export const login = async (credentials) => {
   
    try{
       const response = await api.post("auth/login", { json: credentials }).json();
        return response;
    }catch(error){
       await handleApiError(error);
    }
};
