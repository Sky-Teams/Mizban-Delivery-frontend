import api from './api';

export const signup = async(userData) => {
    try{
        console.log('userData',userData);
        const response = await api.post('/api/auth/register',userData);
        return response.data;
    }catch(error){
        console.log('error authServices: ',error);
        throw error.response?.data || error;
    }
};


export const login = async (credentials) => {
    try{
        const response = await api.post("api/auth/login",credentials);
        if(response.data.token){
            localStorage.setItem('token',response.data.token); // save token
        }
        return response.data;
    }catch(error){
        throw error.response?.data || error;
    }
};


export const logout = () =>{
 localStorage.removeItem('token');
}