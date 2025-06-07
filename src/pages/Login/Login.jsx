import React from "react";
import { Link } from "react-router";
import Lottie from "lottie-react";
import loginLottie from "../../assets/lotties/login.json";

const Login = () => {
  return (
    <div className="max-w-sm w-11/12 mx-auto text-black p-4 border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 bg-white my-24">
      
      {/* Lottie Animation */}
      <div className="w-40 mx-auto mb-4">
        <Lottie animationData={loginLottie} loop={true} />
      </div>

      <form className="space-y-6">
        <h5 className="text-2xl text-center font-semibold text-gray-900">
          Welcome Again!
        </h5>
        <p className="text-center -mt-5">Please Sign In here!</p>

        {/* Email */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Your email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="Enter Your Email"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Your password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Your Password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            required
          />
        </div>

        {/* Lost Password */}
        <div>
          <a className="ms-auto text-sm text-blue-700 hover:underline font-semibold">
            Lost Password?
          </a>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Login to your account
        </button>

        {/* Register Link */}
        <div className="text-sm font-medium text-gray-500">
          Not registered?{" "}
          <Link to="/register" className="text-blue-700 hover:underline">
            Create account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
