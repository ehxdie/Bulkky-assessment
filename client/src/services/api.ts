import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1"
});

// Attach token before requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

// Handle 401 / token expiry globally if needed
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      // e.g. redirect to login, clear token, etc.
    }
    return Promise.reject(err);
  }
);

export default api;
