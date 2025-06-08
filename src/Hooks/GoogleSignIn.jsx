import React from "react";
import { useLocation, useNavigate } from "react-router";
import UseAuth from "../Hooks/UseAuth";

const GoogleSignIn = () => {
  const { signWithGoogle } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogle = () => {
    signWithGoogle()
      .then((res) => {
        console.log(res.user);
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return handleGoogle;
};

export default GoogleSignIn;
