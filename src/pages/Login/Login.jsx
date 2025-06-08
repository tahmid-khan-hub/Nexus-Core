import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Lottie from "lottie-react";
import loginLottie from "../../assets/lotties/login.json";
import UseAuth from "../../Hooks/UseAuth";
import GitHubSignIn from "../../Hooks/GitHubSignIn";
import GoogleSignIn from "../../Hooks/GoogleSignIn";

const Login = () => {

  const {signIn} = UseAuth();

  const handleGitHub = GitHubSignIn();
  const handleGoogle = GoogleSignIn();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSignIn = e =>{
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    console.log(email, password);

    signIn(email, password)
      .then(res => {
        console.log(res);
        const User = res.user;
        navigate(`${location.state ? location.state : "/"}`)

      })
      .catch(err =>{
        console.log(err);

      })

  }

  return (
    <div className="max-w-sm w-11/12 mx-auto text-black p-4 border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 bg-white my-24">
      {/* Lottie Animation */}
      <div className="w-40 mx-auto mb-4">
        <Lottie animationData={loginLottie} loop={true} />
      </div>

      <form onSubmit={handleSignIn} className="space-y-6">
        <h5 className="text-2xl text-center font-semibold text-gray-900">
          Welcome Again!
        </h5>
        <p className="text-center -mt-5">Please Sign In here!</p>

        {/* Email */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Your Email
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
            Your Password
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

        <div className="divider -mt-2">OR</div>

        {/* social buttons */}
        {/* GitHub */}
        <button onClick={handleGitHub} className="btn w-full bg-black text-white border-black">
          <svg
            aria-label="GitHub logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="white"
              d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
            ></path>
          </svg>
          Login with GitHub
        </button>

        {/* google */}
        <button onClick={handleGoogle} className="btn w-full -mt-2 bg-white text-black border-2 border-blue-500">
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>

        {/* Register Link */}
        <div className="text-sm font-medium text-gray-500 mb-5">
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
