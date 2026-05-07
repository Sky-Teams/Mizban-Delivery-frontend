import ky from 'ky';
import { 
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens
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
        const token = getAccessToken();
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
     async (request, options, response) => {
        if ( response.status === 401) {
          try{
            const refreshToken = getRefreshToken ();
            
            if(!refreshToken) throw new Error('No refresh token');

            const res = await ky.post('auth/refresh',{
              preFixUrl:baseUrl,
              json: {refreshToken},
            }).json();

            const newAccessToken = res.accessToken;

            setTokens({
              accessToken : newAccessToken,
              refreshToken,
            });

            request.headers.set('Authorization',  `Bearer ${newAccessToken}`);

            return ky(request);
          }catch(error){
            clearTokens();
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
