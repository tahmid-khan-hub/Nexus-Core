import React from "react";
import { Outlet, Link, useNavigate } from "react-router";
import { AiFillHome } from "react-icons/ai";
import { FaUserShield, FaUserCircle, FaBookmark, FaComment } from "react-icons/fa";
import { MdManageAccounts, MdLibraryAdd, MdFeedback } from "react-icons/md";
import useUserRole from "../Hooks/useUserRole";
import Loader from "../pages/Loader/Loader";
import UseAuth from "../Hooks/UseAuth";
import { IoIosSettings } from "react-icons/io";
import Animation from "../Hooks/Animation";

const DashBoardLayout = () => {
  const { role, roleLoading } = useUserRole();
  const { user, logOut } = UseAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (roleLoading) return <Loader />;

  return (
    <div className="drawer lg:drawer-open max-w-[1500px] mx-auto">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Top navbar for mobile */}
        <div className="navbar sticky top-0 z-50 bg-base-100 w-full lg:hidden">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 mb-1 lg:hidden">
            <div className="flex">
              <a className="text-2xl font-semibold ml-1 mt-1 text-black">
                Nex
                <span className="font-bold text-blue-500 text-[27px]">US</span>
                Core
              </a>
            </div>
          </div>
        </div>

        {/* Page content */}
        <Outlet />
      </div>

      {/* Sidebar */}
      <div className="drawer-side border-r-2 border-blue-300">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <Animation><ul data-aos="fade-left" className="menu bg-base-200 text-base-content min-h-full w-80 p-4 flex flex-col justify-between">
          <div>
            {/* Logo */}
            <div className="flex ml-2 mb-4">
              <a className="text-2xl font-semibold ml-1 mt-1 text-black">
                Nex
                <span className="font-bold text-blue-500 text-[27px]">US</span>
                Core
              </a>
            </div>

            {role === "admin" ? (
              <>
                {/* Admin links */}
                <Link to="/">
                  <li className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-[13px] shadow-md mb-1.5">
                    <div>
                      <AiFillHome size={14} className="inline-block mr-1" />
                      <a>Home</a>
                    </div>
                  </li>
                </Link>
                <Link to="/dashboard/adminProfile">
                  <li className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-[13px] shadow-md mb-1.5">
                    <div>
                      <FaUserShield size={14} className="inline-block mr-1 " />
                      <a>Admin Profile</a>
                    </div>
                  </li>
                </Link>
                <Link to="/dashboard/manageCourses">
                  <li className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-[13px] shadow-md mb-1.5">
                    <div>
                      <MdManageAccounts
                        size={15}
                        className="inline-block mr-1"
                      />
                      <a>Manage Courses</a>
                    </div>
                  </li>
                </Link>
                <Link to="/dashboard/addCourse">
                  <li className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-[13px] shadow-md mb-1.5">
                    <div>
                      <MdLibraryAdd size={14} className="inline-block mr-1 " />
                      <a>Add Course</a>
                    </div>
                  </li>
                </Link>
                <Link to="/dashboard/allFeedback">
                  <li className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-[13px] shadow-md mb-1.5">
                    <div>
                      <MdFeedback
                        size={15}
                        className="inline-block mr-1 mt-0.5"
                      />
                      <a>All Feedback</a>
                    </div>
                  </li>
                </Link>
              </>
            ) : (
              <>
                {/* User links */}
                <Link to="/">
                  <li className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-[13px] shadow-md mb-1.5">
                    <div>
                      <AiFillHome size={14} className="inline-block mr-1 " />
                      <a>Home</a>
                    </div>
                  </li>
                </Link>
                <Link to="/dashboard/myProfile">
                  <li className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-[13px] shadow-md mb-1.5">
                    <div>
                      <FaUserCircle
                        size={14}
                        className="inline-block mr-1 mt-0.5"
                      />
                      <a>My Profile</a>
                    </div>
                  </li>
                </Link>
                <Link to="/dashboard/myEnrolledCourses">
                  <li className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-[13px] shadow-md mb-1.5">
                    <div className="flex">
                      <FaBookmark
                        size={12}
                        className="inline-block mr-1 mt-0.5"
                      />
                      <a>My Enrolled Courses</a>
                    </div>
                  </li>
                </Link>
              </>
            )}
          </div>

          {/* Bottom Profile Picture, Settings, Feedback & Logout */}
          <div className="mt-4 pt-4 flex flex-col gap-3">
            {/* Profile Photo */}
            <div className="flex items-center gap-3">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-400"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold">
                  {user?.displayName?.[0] || "U"}
                </div>
              )}
              <div className="text-sm font-medium">{user?.displayName}</div>
            </div>

            {/* Settings Link */}
            <Link to="/dashboard/settings">
              <button className="btn btn-outline btn-sm w-full text-blue-600 border-blue-400 hover:bg-blue-100 text-[15px] rounded-lg">
                <IoIosSettings size={19}/> Settings
              </button>
            </Link>

            {/* Feedback Link */}
            {
              role !== 'admin' && <Link to="/dashboard/feedback">
              <button className="btn btn-outline btn-sm w-full text-blue-600 border-blue-400 hover:bg-blue-100 text-[15px] rounded-lg">
                <FaComment size={14} className="mr-1 mt-0.5"/> Feedback
              </button>
              </Link>
            }

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg px-4 py-1 text-center w-full"
            >
              Logout
            </button>
          </div>
        </ul></Animation>
      </div>
    </div>
  );
};

export default DashBoardLayout;
