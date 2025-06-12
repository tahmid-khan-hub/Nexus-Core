import React, { useState } from "react";
import { Link, useLoaderData } from "react-router";
import UseAuth from "../../Hooks/UseAuth";
import Lottie from "lottie-react";
import Swal from "sweetalert2";
import axios from "axios";
import dataNotFound from "../../assets/lotties/dataNotFound.json"

const ManageCourses = () => {
  const { user } = UseAuth();
  const courseData = useLoaderData();

  const email = user.email;
  const userAddedCourses = courseData.filter(
    (course) => course.UserEmail === email
  );

  const [courses, setCourses] = useState(userAddedCourses);

  const handleCourseDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/courses/${id}`)
          .then((res) => {
            console.log(res.data);
            setCourses((prevCourses) =>
              prevCourses.filter((course) => course._id !== id)
            );
            Swal.fire({
              title: "Deleted!",
              text: "Your added course has been deleted.",
              icon: "success",
            });
          })
          .catch((err) => {
            console.error(err);
            Swal.fire({
              title: "Error!",
              text: "Something went wrong while deleting.",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h2 className="text-3xl font-bold text-center mt-11 text-black mb-2">
        Manage Your Courses
      </h2>
      <p className="text-gray-500 text-center mb-8">
        Here you can view, edit, and delete the courses you've added. Keep your
        course list organized and up-to-date.
      </p>

      {courses.length > 0 ? (
        <table className="w-11/12 mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mb-11 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50  dark:text-gray-400">
            <tr className="border-b-2">
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr
                key={index}
                className="border-b-2 bg-gray-50 border-gray-600 text-black"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {course.title}
                </th>
                <td className="px-6 py-4">
                  {course.description.length > 50
                    ? course.description.slice(0, 50) + "..."
                    : course.description}
                </td>
                <td className="px-6 py-4">
                  <Link
                    to={`/updateCourse/${course._id}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <a
                    onClick={() => handleCourseDelete(course._id)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="p-4 mb-11 text-center flex flex-col items-center justify-center">
          <div className="w-72 h-72">
            <Lottie animationData={dataNotFound} loop />
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 ">
            You haven’t added any courses yet.
          </h2>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Start by adding a new course to manage and keep track of your content here.
          </p>
        </div>
      )}
    </div>
  );
};

export default ManageCourses;
