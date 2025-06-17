import axios from "axios";
import React from "react";
import UseAuth from "./UseAuth";

const UseAxiosSecure = () => {
  const { user, logOut } = UseAuth();

  const axiosInstance = axios.create({
    baseURL: "https://course-management-server-pi.vercel.app/",
  });

  axiosInstance.interceptors.request.use(
    async (config) => {
      if (user) {
        const token = await user.getIdToken(); 
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        logOut()
          .then(() => {
            console.log("Signed out due to unauthorized access.");
          })
          .catch((err) => {
            console.error(err);
          });
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default UseAxiosSecure;
