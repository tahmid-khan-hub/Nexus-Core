import React from "react";
import { Outlet, Link } from "react-router";
import { AiFillHome } from "react-icons/ai";
import { FaUserShield, FaUserCircle, FaBookmark } from "react-icons/fa";
import { MdManageAccounts, MdLibraryAdd } from "react-icons/md";
import useUserRole from "../Hooks/useUserRole";
import Loader from "../pages/Loader/Loader";

const DashBoardLayout = () => {
  const { role, roleLoading } = useUserRole();
  if (roleLoading) return <Loader></Loader>;
  return (
    <div className="drawer lg:drawer-open max-w-[1500px] mx-auto">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="navbar sticky top-0 z-50 bg-base-100 w-full lg:hidden">
          <div className="flex-none ">
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
        {/* Page content here */}
        <Outlet></Outlet>
      </div>
      <div className="drawer-side border-r border-blue-500">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          {/* logo */}
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
                <li className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-[13px] shadow-md">
                  <div><AiFillHome size={12} className="inline-block mr-1 mt-1" />
                  <a>Home</a></div>
                </li>
              </Link>
              <Link to="/dashboard/adminProfile">
                <li className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-[13px] shadow-md">
                  <div><FaUserShield size={12} className="inline-block mr-1 mt-1" />
                  <a>Admin Profile</a></div>
                </li>
              </Link>
              <Link to="/dashboard/manageCourses">
                <li className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-[13px] shadow-md">
                  <div><MdManageAccounts size={12} className="inline-block mr-1 mt-1" />
                  <a>Manage Courses</a></div>
                </li>
              </Link>
              <Link to="/dashboard/addCourse">
                <li className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-[13px] shadow-md">
                  <div><MdLibraryAdd size={12} className="inline-block mr-1 mt-1" />
                  <a>Add Course</a></div>
                </li>
              </Link>
            </>
          ) : (
            <>
              {/* User links */}
              <Link to="/">
                <li className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-[13px] shadow-md mb-1.5">
                  <div><AiFillHome size={14} className="inline-block mr-1 " />
                  <a>Home</a></div>
                </li>
              </Link>
              <Link to="/dashboard/myProfile">
                <li className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-[13px] shadow-md mb-1.5">
                  <div><FaUserCircle size={14} className="inline-block mr-1 mt-0.5" />
                  <a>My Profile</a></div>
                </li>
              </Link>
              <Link to="/dashboard/myEnrolledCourses">
                <li className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-[13px] shadow-md mb-1.5">
                  <div className="flex"><FaBookmark size={12} className="inline-block mr-1 mt-0.5" />
                  <a>My Enrolled Courses</a></div>
                </li>
              </Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashBoardLayout;
