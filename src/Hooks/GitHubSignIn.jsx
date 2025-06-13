import React from "react";
import { useLocation, useNavigate } from "react-router";
import UseAuth from "../Hooks/UseAuth";
import Swal from "sweetalert2";

const GitHubSignIn = () => {
  const { signWithGitHub } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleGitHub = () => {
    signWithGitHub()
      .then((res) => {
        console.log(res);
        navigate(`${location.state ? location.state : "/"}`);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully Registered! Welcome to our Platform",
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

  return handleGitHub;
};

export default GitHubSignIn;
