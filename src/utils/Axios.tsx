import axios, { AxiosInstance, AxiosError } from "axios";
import { BASE_URL } from "../Constant/constant";

// import { RouteList } from "../../utils/Routes";

const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json, text/plain,",
    "Content-Type": "application/json",
    credentials: "include",
  },
});

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("response in instance", response);
    return response;
  },
  function (error: AxiosError) {
    if (error)
      if (error?.response?.status == 401) {
        // redirect to landing page on unauthorized user
        window.location.href = "/";
      }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;
