import axios, { AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_BACKEND_URL ?? "http://localhost:3001/",
<<<<<<< HEAD
  timeout: process.env.NODE_ENV === "production" ? 10000 : 5000,
=======
  timeout: process.env.NODE_ENV === "production" ? 10000 : 1000,
>>>>>>> refactor: change network time out to 10s in production
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const instance = axios.create(config);
export { instance as axios };
