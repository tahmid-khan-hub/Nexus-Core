import axios from "axios";
import React from "react";
import UseAuth from "./UseAuth";

const UseAxiosSecure = () => {
  
  const { user, logOut } = UseAuth();
  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/",
  });

  axiosInstance.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${user.accessToken}`;
    return config;
  });

  axiosInstance.interceptors.response.use(response =>{
    return response;
  }, error =>{
    if(error.status === 401 || error.status === 403){
      logOut()
        .then(()=>{
          console.log('sign out');
        })
        .catch(err =>{
          console.log(err);
        })
    }
    return Promise.reject(error)
  })

  return axiosInstance;
};

export default UseAxiosSecure;
