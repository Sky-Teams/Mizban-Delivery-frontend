import axios from 'axios';

const api=axios.create({
    baseURL:"https://mizban-delivery-backend.onrender.com/",
    headers:{
        'Content-Type':"application/json"
    },
    timeout:30000, // 30 second timout
});

// Request interceptor to add token
   api.interceptors.request.use(
    (config)=>{
        const token=localStorage.getItem("token");
        if(token) 
        {
            config.headers['Authoriztion']= `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error),
    
   );

   // Response interceptor for error handling
   api.interceptors.response.use(
    (response) => response,
    
    (error) => {
        if(error.response) {
            if(error.response.status === 401){
                console.log('Unauthorized! Redirect to login?')
            }
        }
        return Promise.reject(error);
    }
   );

   export default api;