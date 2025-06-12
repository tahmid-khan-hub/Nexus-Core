import React, { useState } from "react";
import { Link, useLoaderData } from "react-router";
import UseAuth from "../../Hooks/UseAuth";
import Lottie from "lottie-react";
import dataNotFound from "../../assets/lotties/dataNotFound.json";
import Swal from "sweetalert2";
import axios from "axios";

const MyEnrolledCourses = () => {
  const { user } = UseAuth();
  const UserEmail = user.email || "";

  const data = useLoaderData();

  const UserCoursesData = data.filter((courses) => courses.email == UserEmail);

  const [userCourses, setUserCourses] = useState(UserCoursesData);

  const handleRemoveEnrollment = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be unenrolled from this course.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/userCourses/${id}`)
          .then(() => {
            setUserCourses((prev) =>
              prev.filter((course) => course._id !== id)
            );
            Swal.fire({
              title: "Removed!",
              text: "Your enrolled course has been removed",
              icon: "success",
            });
          })
          .catch((error) => {
            console.error(error);
            Swal.fire("Error", "Failed to remove enrollment.", "error");
          });
      }
    });
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h2 className="text-3xl font-bold text-center mt-11 text-black mb-2">
        My Enrolled Courses
      </h2>
      <p className="text-gray-500 text-center mb-8">
        View all the courses you’ve enrolled in. You can remove your enrollment
        from any course at any time.
      </p>

      {userCourses.length > 0 ? (
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
            </tr>
          </thead>
          <tbody>
            {userCourses.map((course, index) => (
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
                  <a
                    onClick={() => handleRemoveEnrollment(course._id)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Remove enrollment
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
            You haven’t enrolled in any courses yet.
          </h2>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Start enrolling in courses to begin learning and track your progress
            here.
          </p>
        </div>
      )}
    </div>
  );
};

export default MyEnrolledCourses;
