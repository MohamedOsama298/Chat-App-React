import axios from "axios";
const BASE_URL: string = process.env.REACT_APP_BASE_URL || "localhost:8080";
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
