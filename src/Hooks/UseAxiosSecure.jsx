import axios from "axios";
import React from "react";
import UseAuth from "./UseAuth";

const UseAxiosSecure = () => {
  

  const { user } = UseAuth();
  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/",
  });

  axiosInstance.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${user.accessToken}`;
    return config;
  });

  return axiosInstance;
};

export default UseAxiosSecure;
