import React from "react";
import Lottie from "lottie-react";
import ErrorLottie from "../../assets/lotties/error.json";
import { Link, useNavigate } from "react-router";
import Navbar from "../../components/Navbar/Navbar";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <>
      
      <div className="bg-[#d9e9f9]">
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="w-72 h-72">
            <Lottie animationData={ErrorLottie} loop />
          </div>
          <p className="text-center text-2xl my-4">
            Oops! The page you're looking for doesn't exist
          </p>
          <div className="flex">
            <Link className="block mx-auto w-fit" to={`/`}>
              <button className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2">
                Home
              </button>
            </Link>
            <button
              onClick={() => navigate(-1)}
              className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
