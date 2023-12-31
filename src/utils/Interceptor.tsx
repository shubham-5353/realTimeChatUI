import { AxiosError, AxiosRequestConfig } from "axios";

import instance from "./Axios";

const setUpInterceptor = (token: any) => {
  const handleError = async (error: AxiosError) => {
    console.log("error in handleError", error);
    return Promise.reject(error);
  };

  instance.interceptors.request.use(
    async (config: any | AxiosRequestConfig) => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    }, handleError
  );

  instance.interceptors.response.use((response) => response, handleError);
};

export default setUpInterceptor;
