import ky from 'ky';
import useAuthStore from '../store/useAuthStore';


const baseUrl = import.meta.env.VITE_API_BASE_URL;

let isRefreshing = false;
let failedQueue = [];


// Logout + Redirect helper
const logoutAndRedirect = () => {
  useAuthStore.getState().logout();
  window.location.replace('/login');
}

const  processQueue = (error, token = null) => {
  failedQueue.forEach(({resolve, reject, request}) =>{
    if(error){
      reject(error);
    }else{
      request.headers.set('Authorization', `Bearer ${token}`);
      resolve(retryRequest(request));
    }
  });

  failedQueue = [];
};

 const retryRequest = (request) => {
  const options = {
    method: request.method,
    headers: request.headers,
    prefixUrl: baseUrl ?  `${baseUrl.replace (/\/+$/, '')}/api/`: '',
    credentials: "include",
  }

    if(request.body){
      options.body = request.body;
    } 
    return ky(request.url,options);
 };

const apiClient = ky.create({
  prefixUrl: baseUrl ? `${baseUrl.replace(/\/+$/, '')}/api/` : '',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
  hooks: {
    beforeRequest: [
      (request) => {
        const token = useAuthStore.getState().accessToken;
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
     async (request, _options, response) => {
        if ( response.status !== 401) {
          return response;
        } 

        if(request._retry){
         logoutAndRedirect();
           return;
        }

        if(request.url.includes('/auth/refresh')){
          logoutAndRedirect();
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
        request._retry = true;

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

           useAuthStore.getState().setAccessToken(newToken);

            processQueue(null,newToken);

            request.headers.set(
              'Authorization', `Bearer ${newToken}`
            );

            return retryRequest(request);

          }catch(error){
             console.log('Token refresh failed:',error);
             processQueue(error,null);
             
             useAuthStore.getState().clearAccessToken();
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
