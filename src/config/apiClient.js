import ky from 'ky';
import { 
  getToken,
  setToken,
  clearToken
 } from '../utils/tokenHelper';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

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
        if ( response.status === 401) {
          try{
           const refreshResponse = await ky.post('auth/refresh', {
              prefixUrl: baseUrl
                ? `${baseUrl.replace(/\/+$/, '')}/api/`
                : '',
            }).json();
            const newToken = refreshResponse?.data?.token;

            if(!newToken){
                throw new Error('No token from refresh');
            }
            setToken({newToken});

            request.headers.set('Authorization',  `Bearer ${newToken}`);

            return ky(request);
          
          }catch(error){
            console.log(error);
            clearToken();
            window.location.href = '/login';
          }
        }

        return response;
      },
    ],
  },
  throwHttpErrors: true,
});

export default apiClient;
