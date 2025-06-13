import React from "react";
import { useLocation, useNavigate } from "react-router";
import UseAuth from "../Hooks/UseAuth";
import Swal from "sweetalert2";

const GoogleSignIn = () => {
  const { signWithGoogle } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogle = () => {
    signWithGoogle()
      .then((res) => {
        console.log(res.user);
        navigate(`${location.state ? location.state : "/"}`);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Welcome! You’re now signed in",
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

export default GoogleSignIn;
