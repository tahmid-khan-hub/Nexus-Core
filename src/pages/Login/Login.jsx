import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Lottie from "lottie-react";
import loginLottie from "../../assets/lotties/login.json";
import UseAuth from "../../Hooks/UseAuth";
import Swal from "sweetalert2";
import PageLoading from "../../Hooks/PageLoading";
import Animation from "../../Hooks/Animation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import RegisterWithGoogle from "../../Hooks/RegisterWithGoogle";

const Login = () => {

  useEffect(()=>{document.title = "NexusCore | Login"},[])

  const [showIcon, setShowIcon] = useState(false)

  const { signIn } = UseAuth();

  const handleGoogle = RegisterWithGoogle();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSignIn = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    console.log(email, password);

    signIn(email, password)
      .then((res) => {
        console.log(res);
        const User = res.user;
        navigate(`${location.state ? location.state : "/"}`);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Sucessfully Login! Welcome Back",
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

  return (
    <Animation>
      <PageLoading>
      <div data-aos="fade-up" className="max-w-sm w-11/12 mx-auto text-black p-4 border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 bg-white my-24 mb-[213px]">
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
        <label className="block mb-2 text-sm font-medium text-gray-900">
            Your Password
          </label>
        <div className="relative flex">
          <input
            type={showIcon ? "text":"password"}
            name="password"
            id="password"
            placeholder="Enter Your Password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            required
          />
          <span onClick={()=> setShowIcon(!showIcon)} className="absolute right-3 top-3 cursor-pointer">{showIcon ? <FaEyeSlash size={20} /> : <FaEye size={20} />}</span>
          
        </div>

        {/* Lost Password */}
        <div>
          <a className="ms-auto text-sm text-blue-400 hover:underline font-semibold">
            Lost Password?
          </a>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
        >
          Login to your account
        </button>

        <div className="divider -mt-2">OR</div>

        {/* social buttons */}

        {/* google */}
        <button
          onClick={handleGoogle}
          className="btn w-full -mt-2 bg-white text-black border-2 border-[#77b2ea]"
        >
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
          <Link to="/register" className="text-blue-400 hover:underline">
            Create account
          </Link>
        </div>
      </form>
    </div>
    </PageLoading>
    </Animation>
  );
};

export default Login;
