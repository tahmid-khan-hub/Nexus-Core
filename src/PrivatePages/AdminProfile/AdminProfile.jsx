import React, { useEffect } from "react";
import UseAuth from "../../Hooks/UseAuth";
import { FaBook, FaTags, FaUserGraduate } from "react-icons/fa";
import DataGraph from "./DataGraph";
import Animation from "../../Hooks/Animation";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import Loader from "../../pages/Loader/Loader";

const AdminProfile = () => {
  useEffect(() => {
    document.title = "NexusCore | Admin Profile";
  }, []);
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const { data: courses = [], isLoading} = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await axiosSecure.get("/courses");
      return res.data;
    },
  });

  // Total counts
  const totalCourses = courses.length;
  const totalEnrolled = courses.reduce(
    (sum, course) => sum + course.enrolled,
    0
  );
  const totalCategories = new Set(courses.map((course) => course.categories)).size;

  if(isLoading) return <Loader></Loader>;
  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Admin Info */}
      <Animation><div data-aos="fade-left" className="bg-white rounded-xl shadow p-6 flex items-center gap-6">
        <img
          src={user?.photoURL}
          alt="Admin"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-bold">{user?.displayName || "Admin"}</h2>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div></Animation>

      {/* Stats Cards */}
      <Animation><div data-aos="fade-up" className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
      </div></Animation>

      {/* Chart */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Courses by Category</h3>
        <DataGraph courses={courses} />
      </div>
    </div>
  );
};

export default AdminProfile;
