import React from "react";
import { useLoaderData } from "react-router";
import UseAuth from "../../Hooks/UseAuth";
import { FaBook, FaTags, FaUserGraduate } from "react-icons/fa";
import DataGraph from "./DataGraph";

const AdminProfile = () => {
  const courses = useLoaderData();
  const { user } = UseAuth();

  // Total counts
  const totalCourses = courses.length;
  const totalEnrolled = courses.reduce(
    (sum, course) => sum + course.enrolled,
    0
  );
  const totalCategories = new Set(courses.map((course) => course.categories))
    .size;

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Admin Info */}
      <div className="bg-white rounded-xl shadow p-6 flex items-center gap-6">
        <img
          src={user?.photoURL}
          alt="Admin"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-bold">{user?.displayName || "Admin"}</h2>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-[#eef6ff] border-2 border-blue-300 rounded-lg shadow-md text-center space-y-2">
          <FaBook className="text-4xl text-blue-500 mx-auto" />
          <h3 className="text-2xl font-bold">{totalCourses}</h3>
          <p className="text-gray-700">Total Courses</p>
        </div>

        <div className="p-4 bg-[#eef6ff] border-2 border-blue-300 rounded-lg shadow-md text-center space-y-2">
          <FaTags className="text-4xl text-blue-500 mx-auto" />
          <h3 className="text-2xl font-bold">{totalCategories}</h3>
          <p className="text-gray-700">Unique Categories</p>
        </div>

        <div className="p-4 bg-[#eef6ff] border-2 border-blue-300 rounded-lg shadow-md text-center space-y-2">
          <FaUserGraduate className="text-4xl text-blue-500 mx-auto" />
          <h3 className="text-2xl font-bold">{totalEnrolled}</h3>
          <p className="text-gray-700">Total Enrolled</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Courses by Category</h3>
        <DataGraph courses={courses} />
      </div>
    </div>
  );
};

export default AdminProfile;
