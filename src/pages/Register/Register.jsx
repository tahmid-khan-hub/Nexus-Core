import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import Lottie from "lottie-react";
import registerLottie from "../../assets/lotties/register.json";
import UseAuth from "../../Hooks/UseAuth";
import GoogleSignIn from "../../Hooks/GoogleSignIn";
import GitHubSignIn from "../../Hooks/GitHubSignIn";
import Swal from "sweetalert2";
import PageLoading from "../../Hooks/PageLoading";
import Animation from "../../Hooks/Animation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useForm } from "react-hook-form";
import app from "../../firebase/firebase_init";
import { getAuth } from "firebase/auth";

const Register = () => {
  useEffect(() => {
    document.title = "NexusCore | Register";
  }, []);
  const auth = getAuth(app);

  const [showIcon, setShowIcon] = useState(false);
  const [showConfirmIcon, setShowConfirmIcon] = useState(false);

  const { signUp, updateUserProfile } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const handleGoogle = GoogleSignIn();
  const handleGitHub = GitHubSignIn();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      await signUp(data.email, data.password);

      await updateUserProfile({
        displayName: data.name,
        photoURL: data.photoURL,
      });
      await auth.currentUser.reload();

      const userInfo = {
        name: data.name,
        email: data.email,
        photoURL: data.photoURL,
        role: "user",
        createdAt: new Date(),
      };

      await axiosSecure.post("/users", userInfo);

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message || "Something went wrong!",
      });
    }
  };

  return (
    <Animation>
      <PageLoading>
        <div
          data-aos="fade-up"
          className="max-w-sm w-11/12 mx-auto text-black p-4 border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 bg-white my-24"
        >
          {/* Lottie Animation */}
          <div className="w-40 mx-auto mb-4">
            <Lottie animationData={registerLottie} loop={true} />
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h5 className="flex text-2xl justify-center items-center font-semibold text-gray-900 ">
              Welcome To{" "}
              <div className="">
                <h2 className="text-2xl font-semibold ml-2">
                  <span>N</span>ex<span className="text-blue-600">US</span>Core
                </h2>
              </div>
              !
            </h5>
            <p className="text-center -mt-5">Please Register here </p>

            {/* Name */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Your Name
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Enter Your Name"
                required
                {...register("name", { required: "Name is required" })}
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}

            {/* photoURL */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Your PhotoURL
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Enter Your Photo URL"
                required
                {...register("photoURL", {})}
              />
            </div>

            {/* email */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Your Email
              </label>
              <input
                type="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Enter Your Email"
                required
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}

            {/* password */}
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Your Password
            </label>
            <div className="flex relative">
              <input
                type={showIcon ? "text" : "password"}
                placeholder="Enter Your Password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                    message:
                      "Password must be at least 8 characters, include uppercase, lowercase, number, and special character",
                  },
                })}
              />
              <span
                onClick={() => setShowIcon(!showIcon)}
                className="absolute right-3 top-3 cursor-pointer"
              >
                {showIcon ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}

            {/* confirm password */}
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Confirm Password
            </label>
            <div className="flex relative">
              <input
                type={showConfirmIcon ? "text" : "password"}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Confirm Your Password"
                required
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              <span
                onClick={() => setShowConfirmIcon(!showConfirmIcon)}
                className="absolute right-3 top-3 cursor-pointer"
              >
                {showConfirmIcon ? (
                  <FaEyeSlash size={20} />
                ) : (
                  <FaEye size={20} />
                )}
              </span>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}

            {/* Register Button */}
            <button
              type="submit"
              className="w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-4"
            >
              Click here to Register
            </button>

            <div className="divider -mt-2">OR</div>

            {/* social buttons */}
            {/* GitHub */}
            <button
              onClick={handleGitHub}
              className="btn w-full bg-black text-white border-black"
            >
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
              Register with GitHub
            </button>

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
              Register with Google
            </button>

            {/* Register Link */}
            <div className="text-sm font-medium text-gray-500 mb-5">
              Already Have Account?{" "}
              <Link to="/login" className="text-blue-400 hover:underline">
                Sign in here
              </Link>
            </div>
          </form>
        </div>
      </PageLoading>
    </Animation>
  );
};

export default Register;
