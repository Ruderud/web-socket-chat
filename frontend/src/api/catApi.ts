import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axiosInstance";

export interface Cat {
  name: string;
  age: number;
  breed: string;
}

export const getCatByAge = async (age: number) => {
  try {
    const response = await axiosInstance().get(`/cats?age=${age}`);
    return response.data;
  } catch (error) {
    return `${error}`;
    // console.log(response.data, response.status);
  }
};

export const postNewCat = async (newCat: Cat) => {
  const config: AxiosRequestConfig = {
    data: newCat,
  };

  const response = await axiosInstance(config).post(`/cats`, config.data);

  return response.data;
};
