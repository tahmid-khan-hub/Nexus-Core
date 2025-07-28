import React from "react";
import UseAuth from "../../Hooks/UseAuth";
import { Link, useLoaderData } from "react-router";
import { FaBookOpen } from "react-icons/fa";
import Animation from "../../Hooks/Animation";

const MyProfile = () => {
  const { user } = UseAuth();
  const allUserCourses = useLoaderData();
  const userCourses = allUserCourses.filter(
    (course) => course.email === user?.email
  );
  console.log(userCourses);
  return (
    <div className="min-h-screen p-6 space-y-10">
      {/* Profile Section */}
      <Animation><div data-aos="fade-left" className="bg-white rounded-xl shadow p-6 flex items-center gap-6">
        <img
          src={user?.photoURL}
          alt="User"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-bold">
            {user?.displayName || "Student"}
          </h2>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div></Animation>

      {/* Total Enrolled Summary */}
      <Animation><div data-aos="fade-up" className="bg-[#f0f9ff] border-2 border-blue-300 rounded-lg shadow-md p-6 flex items-center justify-between max-w-md mx-auto">
        {/* Left side: Text */}
        <div>
          <h3 className="text-xl font-bold text-gray-800">Courses Enrolled</h3>
          <p className="text-gray-600">
            You’ve joined {userCourses.length} course
            {(userCourses.length !== 1 && userCourses.length !== 0) ? "s" : ""}
          </p>
        </div>

        {/* Right side: Number + Icon */}
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-blue-600">
            {userCourses.length}
          </span>
          <FaBookOpen className="text-4xl text-blue-500 mt-1" />
        </div>
      </div></Animation>

      {/* Paragraph + Buttons Section */}
      <div className="text-center space-y-6">
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Manage your enrolled courses or explore new learning opportunities.
          Click below to view all available courses or check your enrolled ones.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link to="/allCourses">
            <a className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-[13px] shadow-md p-2 px-3 hover:bg-gradient-to-r hover:from-cyan-600 hover:to-blue-600 ">
              View All Courses
            </a>
          </Link>
          <Link to="/dashboard/myEnrolledCourses">
            <a className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-[13px] shadow-md p-2 px-3 hover:bg-gradient-to-r hover:from-cyan-600 hover:to-blue-600 ">
              My Enrolled Courses
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
