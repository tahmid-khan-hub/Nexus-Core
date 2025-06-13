import React from "react";
import icon from "../../assets/icons/course icon.png";
import { Link, NavLink } from "react-router";
import UseAuth from "../../Hooks/UseAuth";
import './Navbar.css'

const Navbar = () => {

  const {user, logOut} = UseAuth();

  const handleSignOut = () =>{
    logOut()
      .then(res =>{
        console.log(res);
      })
      .catch(err =>{
        console.log(err);
      })
  }

  const links = (
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

  return (
    <div className="navbar bg-[#d9e9f9] border-b-2 border-blue-400 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className=" btn-ghost mr-3 lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <img src={icon} className="-ml-1 md:ml-1 lg:ml-0" alt="" />
        <a className=" text-2xl font-semibold ml-1">EduNova</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links}
        </ul>
      </div>
      <div className="navbar-end">
        {
          
          (user && user.photoURL) ? <a><img className="w-11 h-11 rounded-full object-cover" src={user.photoURL}></img></a> : <a><img className="w-12 h-12 rounded-full mr-2 object-cover" src="https://i.ibb.co/Kxsnfc4C/image.png"></img></a>
        }
        {
          user ? <a onClick={handleSignOut} className="btn ml-2">Sign Out</a> : <>
            <Link to="/login"><a className="btn mr-2">Login</a></Link>
            <Link className="hidden lg:block" to="/register"><a className="btn ">Register</a></Link>
          </>
        }
        
      </div>
    </div>
  );
};

export default Navbar;
