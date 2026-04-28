import api from './api';

export const signup = async(userData) => {
        const response = await api.post('auth/register', {json: userData})
        .json();
        return response;
    
};

export const login = async (credentials) => {
       const response = await api.post("auth/login", { json: credentials })
       .json();
        return response;
};
