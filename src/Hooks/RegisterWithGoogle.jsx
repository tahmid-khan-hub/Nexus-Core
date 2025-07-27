import React from "react";
import UseAuth from "./UseAuth";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import UseAxiosSecure from "./UseAxiosSecure";

const RegisterWithGoogle = () => {
  const { signWithGoogle } = UseAuth();
  const navigate = useNavigate();
  const axiosSecure = UseAxiosSecure();

  const handleGoogle = () => {
    signWithGoogle()
      .then((res) => {
        const user = res.user;

        const userInfo = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role: "user",
          createdAt: new Date(),
        };

        try {
          axiosSecure.post("/users", userInfo);
        } catch (dbError) {
          console.log("DB error:", dbError.response?.data || dbError.message);
        }

        console.log("Logged in user:", user);
        navigate("/");

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Welcome to NexUSCore",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Something went wrong! Please try again.",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return handleGoogle;
};

export default RegisterWithGoogle;
