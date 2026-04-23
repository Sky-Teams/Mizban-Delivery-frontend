import ky from "ky";

const apiClient = ky.create({
  prefixUrl: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 second timeout

  hooks: {
    beforeRequest: [
      (request) => {
        const token = localStorage.getItem("token");
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
      (request, response) => {
        if (!response.ok && response.status === 401) {
          console.log("Unauthorized! Redirect to login?");
        }
        return response;
      },
    ],
  },

  throwHttpErrors: true,
});

export default apiClient;
