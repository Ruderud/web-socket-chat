import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const BASE_URL = "http://localhost:4400";

export const axiosInstance = (config: AxiosRequestConfig): AxiosInstance => {
  const createInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5 * 1000,
    ...config,
    headers: {
      "Content-Type": "application/json",
      ...config.headers,
    },
  });

  return createInstance;
};
