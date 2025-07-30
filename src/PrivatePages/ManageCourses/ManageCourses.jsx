import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router";
import UseAuth from "../../Hooks/UseAuth";
import Lottie from "lottie-react";
import Swal from "sweetalert2";
import dataNotFound from "../../assets/lotties/dataNotFound.json";
import UseApplicationApi from "../../Hooks/UseApplicationApi";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";

const ManageCourses = () => {
  useEffect(() => {
    document.title = "NexusCore | ManageCourses";
    window.scrollTo(0, 0);
  }, []);

  const { user } = UseAuth();
  const { manageCoursesPromise } = UseApplicationApi();
  const courseData = useLoaderData();

  const email = user.email;
  

  const [courses, setCourses] = useState(courseData);

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
        manageCoursesPromise(id, email)
          .then(() => {
            setCourses((prevCourses) =>
              prevCourses.filter((course) => course._id !== id)
            );
            Swal.fire({
              title: "Deleted!",
              text: "The course has been deleted.",
              icon: "success",
            });
          })
          .catch((err) => {
            console.error(err);
            Swal.fire({
              title: "Error!",
              text: "Failed to remove course",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div className="relative overflow-x-auto sm:rounded-lg mt-11 min-h-screen">
      <h2 className="text-3xl font-bold text-center mt-5 mb-2">
        Manage Courses
      </h2>

      {courses.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="mx-auto text-sm text-left text-gray-700 mt-8 border border-gray-200">
            <thead className="text-xs uppercase bg-gray-100 text-gray-600">
              <tr className="border-b border-gray-200">
                <th className="px-6  py-3">Title</th>
                <th className="px-6  py-3">Description</th>
                <th className="px-6  py-3">Edit</th>
                <th className="px-6  py-3">Delete</th>
              </tr>
            </thead>

            <tbody>
              {courses.map((course, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 even:bg-gray-50"
                >
                  <td className="px-6  py-2 font-medium text-gray-900">
                    {course.title}
                  </td>
                  <td className="px-6  py-2">
                    {course.description.length > 50
                      ? course.description.slice(0, 50) + "..."
                      : course.description}
                  </td>
                  <td className="px-6 py-2">
                    <Link
                      to={`/updateCourse/${course._id}`}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      <MdModeEditOutline size={18} />
                    </Link>
                  </td>
                  <td className="px-6  py-2">
                    <span
                      onClick={() => handleCourseDelete(course._id)}
                      className="text-red-600 hover:underline font-medium cursor-pointer"
                    >
                      <RiDeleteBin5Fill size={16} className="ml-2" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-4 mb-36 text-center flex flex-col items-center justify-center">
          <div className="w-72 h-72">
            <Lottie animationData={dataNotFound} loop />
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold ">
            You haven’t added any courses yet.
          </h2>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Start by adding a new course to manage and keep track of your
            content here.
          </p>
        </div>
      )}
    </div>
  );
};

export default ManageCourses;
