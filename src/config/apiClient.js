import ky from 'ky';
import { 
  getToken,
  setToken,
  clearToken
 } from '../utils/tokenHelper';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

let isRefreshing = false;
let failedQueue = [];

const  processQueue = (error, token = null) => {
  failedQueue.forEach(({resolve, reject, request}) =>{
    if(error){
      reject(error);
    }else{
      request.headers.set('Authorization', `Bearer ${token}`);
      resolve(ky(request));
    }
  });

  failedQueue = [];
};

const apiClient = ky.create({
  prefixUrl: baseUrl ? `${baseUrl.replace(/\/+$/, '')}/api/` : '',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
  hooks: {
    beforeRequest: [
      (request) => {
        const token = getToken();
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
     async (request, options, response) => {
        if ( response.status !== 401) {
          return response;
        } 

        if(request.url.includes('/auth/refresh')){
          clearToken();
          window.location.href='/login';
          return;
        }

        if(isRefreshing){
          return new Promise((resolve, reject) => {
            failedQueue.push({
              resolve,
              reject,
              request
            });
          });
        }

        isRefreshing = true;

        try{
  
        
           const refreshResponse = await ky.post('auth/refresh', {
              prefixUrl: baseUrl
              ?  `${baseUrl.replace(/\/+$/, '')}/api/`
              : "",
              credentials:"include",
              throwHttpErrors: false,
           }) 
            .json();

            const newToken = refreshResponse?.data?.token;

          
            if(!newToken){
              throw new Error('No token from refresh');
            }

            setToken(newToken);

            processQueue(null,newToken);

            request.headers.set(
              'Authorization', `Bearer ${newToken}`
            );

            return ky(request);
          }catch(error){
             console.log('Token refresh failed:',error);
             processQueue(error,null);
             clearToken();
             window.location.href = '/login';
          }finally{

            isRefreshing = false;
          } 
        },
    ],
  },
  throwHttpErrors: true,
});

export default apiClient;
