import React from "react";
import { Link } from "react-router";

const Login = () => {
  return (
    <div className="max-w-sm w-11/12 mx-auto text-black p-4 border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 bg-white my-24">
      <form className="space-y-6">
        <h5 className="text-2xl text-center font-semibold text-gray-900 ">
          Welcome Again!
        </h5>
        <p className="text-center -mt-5">Please Sign In here!</p>

        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 "
            placeholder="Enter Your Email"
            required
          />
        </div>

        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Your Password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 "
            required
          />
        </div>

        <div>
          <a
            className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500 font-semibold"
          >
            Lost Password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login to your account
        </button>

        <div className="text-sm font-medium text-gray-500 ">
          Not registered?{" "}
          <Link to="/register"><a
            href="#"
            className="text-blue-700 hover:underline dark:text-blue-500"
          >
            Create account
          </a></Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
