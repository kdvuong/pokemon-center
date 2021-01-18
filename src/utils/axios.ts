import axios, { AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
  baseURL: "http://localhost:3001/",
  timeout: 1000,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const instance = axios.create(config);
export { instance as axios };
