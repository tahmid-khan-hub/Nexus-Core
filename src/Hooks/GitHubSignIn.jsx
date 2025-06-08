import React from "react";
import { useLocation, useNavigate } from "react-router";
import UseAuth from "../Hooks/UseAuth";

const GitHubSignIn = () => {

    const {signWithGitHub} = UseAuth();
    const navigate = useNavigate();
    const location = useLocation();

  const handleGitHub = () => {
    signWithGitHub()
      .then((res) => {
        console.log(res);
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return handleGitHub;
};

export default GitHubSignIn;
