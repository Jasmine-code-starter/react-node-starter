import axios from "axios";
import { getToken } from "./token";
import { useNavigate } from "react-router-dom";

const http = axios.create({
  baseURL: "http://127.0.0.1:3007/api/user",
  timeout: 5000,
});

http.interceptors.request.use(
  (config: any) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    response.data.headers = response.headers;
    return response.data;
  },
  (error) => {
    if (error.response.status === 401) {
      const navigate = useNavigate();
      navigate("/login");
    }
    return Promise.reject(error);
  }
);

export { http };
