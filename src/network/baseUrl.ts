import axios from "axios";
const BASE_URL: string =
  process.env.REACT_APP_BASE_URL || "http://localhost:8080";
export const httpInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});
export const authorizedHttpInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    Authorization: "Bearer " + localStorage.getItem("chat_app_token"),
  },
});

authorizedHttpInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("chat_app_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
