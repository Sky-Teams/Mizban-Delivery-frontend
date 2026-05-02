import ky from 'ky';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const apiClient = ky.create({
  prefixUrl: baseUrl ? `${baseUrl.replace(/\/+$/, '')}/` : '',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
  hooks: {
    beforeRequest: [
      (request) => {
        const user = JSON.parse(localStorage.getItem("user"))
        if(!user) return
        if (user.token) {
          request.headers.set('Authorization', `Bearer ${user.token}`);
        }
      },
    ],
    afterResponse: [
      (_request, response) => {
        if (!response.ok && response.status === 401) {
          console.log('Unauthorized! Redirect to login?');
        }

        return response;
      },
    ],
  },
  throwHttpErrors: true,
});

export default apiClient;
