import ky from 'ky';
import useAuthStore from '../store/useAuthStore';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

/* LOGIC OVERVIEW
 *
 * 1. TOKENS
 * - Access token: stored in Zustand (memory only), sent via Authorization header
 * - Refresh token: HttpOnly cookie (auto-sent by browser)
 *
 *
 * 2. REQUEST FLOW
 * - Normal requests use access token
 * - If valid → success response returned
 *
 *
 * 3. ERROR HANDLING
 * - 401 → access token expired → trigger refresh flow
 * - 500 / other errors → not auth-related → return error directly (no refresh)
 *
 *
 * 4. REFRESH FLOW (ONLY ON 401)
 * - Refresh token sent automatically via cookie
 * - Backend returns new access token
 * - Store updated token in Zustand
 * - Retry original request and return final response
 *
 * - If refresh token is invalid/expired:
 *   → logout user immediately
 *
 *
 * 5. SAFETY
 * - Single refresh request at a time (refreshPromise concurrency lock)
 * - Prevent duplicate refresh calls during parallel 401s
 * - No localStorage usage
 * - Refresh token rotation supported
 *
 */

// this variable help us that refresh route is called once
let refreshPromise = null;

const refreshToken = async () => {
  const res = await ky.post('auth/refresh', {
    prefixUrl: `${baseUrl}/api/`,
    credentials: 'include',
    throwHttpErrors: false,
    retry: 0,
  });

  if (!res.ok) return null;

  const data = await res.json();
  return data?.data?.token;
};

const retryRequest = (request, token) => {
  const headers = Object.fromEntries(request.headers.entries());

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // KY return full url in request.url, so we remove the (baseURL + api) from it,because our apiClient add the prefixURL automatically.
  const url = request.url.replace(baseUrl + '/api/', '');

  return apiClient(url, {
    method: request.method,
    headers,
    body: request.body,
  });
};

const apiClient = ky.create({
  prefixUrl: `${baseUrl}/api/`,
  credentials: 'include',
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
        //if response.status is 401, we call our refresh route in backend, otherwise we return the response of the backend to the caller
        if (response.status !== 401) return response;

        // x-retry prevents infinite refresh loops
        // If request already retried and still fails (401),
        // refresh token is expired/invalid -> logout & redirect to login page
        if (request.headers.get('x-retry')) {
          useAuthStore.getState().logout();
          window.location.replace('/login');
          return;
        }

        request.headers.set('x-retry', 'true');

        try {
          // CONCURRENCY LOCK: only ONE refresh request allowed
          if (!refreshPromise) {
            refreshPromise = refreshToken();
          }

          const newToken = await refreshPromise;

          refreshPromise = null;

          if (!newToken) {
            throw new Error('NO_TOKEN');
          }

          useAuthStore.getState().setAccessToken(newToken);

          return retryRequest(request, newToken);
        } catch (err) {
          console.log(err);
          refreshPromise = null;

          useAuthStore.getState().logout();
          window.location.replace('/login');
          return;
        }
      },
    ],
  },
});

export default apiClient;
