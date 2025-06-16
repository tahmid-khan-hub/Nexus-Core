import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router";
import UseAuth from "../../Hooks/UseAuth";
import "./Navbar.css";

const Navbar = () => {
  const { user, logOut } = UseAuth();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const profileDropdownRef = useRef(null);

  const handleSignOut = () => {
    logOut()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(e.target)
      ) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const privateLinks = (
    <>
      <NavLink to="/">
        <li>
          <a>Home</a>
        </li>
      </NavLink>
      <NavLink to="/addCourse">
        <li>
          <a>AddCourse</a>
        </li>
      </NavLink>
      <NavLink to="/manageCourses">
        <li>
          <a>ManageCourses</a>
        </li>
      </NavLink>
      <NavLink to="/myEnrolledCourses">
        <li>
          <a>MyEnrolledCourses</a>
        </li>
      </NavLink>
      <NavLink to="/faq">
        <li>
          <a>FaQ</a>
        </li>
      </NavLink>
    </>
  );

  const links = (
    <>
      <NavLink to="/">
        <li>
          <a>Home</a>
        </li>
      </NavLink>
      <NavLink to="/faq">
        <li>
          <a>FaQ</a>
        </li>
      </NavLink>
    </>
  );

  return (
    <div className="navbar sticky top-0 z-50 bg-[#d9e9f9] border-b-2 border-blue-400 shadow-sm">
      <div className="navbar-start">
        <a className="text-2xl font-semibold ml-1">NexusCore</a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {user ? privateLinks : links}
        </ul>
      </div>

      <div className="navbar-end flex items-center space-x-3">
        {user ? (
          <div className="relative" ref={profileDropdownRef}>
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="focus:outline-none"
              aria-label="User menu"
            >
              <img
                title={user.displayName || "User"}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500 ring-offset-2"
                src={user.photoURL}
                alt="Profile"
              />
            </button>

            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white p-4 z-20 text-center">
                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover mx-auto mb-2 ring-2 ring-blue-500 ring-offset-2"
                  />
                )}
                <p className="font-semibold mb-1">{user.displayName}</p>
                <p className="text-sm text-gray-600 mb-2">{user.email}</p>
                <button
                  onClick={handleSignOut}
                  className="mt-2 w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login">
              <a className="mr-1 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2">
                Login
              </a>
            </Link>
            <Link className="hidden lg:block" to="/register">
              <a className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2">
                Register
              </a>
            </Link>
          </>
        )}

        <div className="dropdown relative">
          <div
            tabIndex={0}
            role="button"
            className="btn-ghost lg:hidden cursor-pointer mr-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow right-0 absolute"
          >
            {user ? privateLinks : links}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
