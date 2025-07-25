import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router";
import UseAuth from "../../Hooks/UseAuth";
import Lottie from "lottie-react";
import Swal from "sweetalert2";
import dataNotFound from "../../assets/lotties/dataNotFound.json";
import UseApplicationApi from "../../Hooks/UseApplicationApi";

const ManageCourses = () => {
  useEffect(() => {
    document.title = "NexusCore | ManageCourses";
    window.scrollTo(0,0)
  }, []);

  const { user } = UseAuth();
  const { manageCoursesPromise } = UseApplicationApi();
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
        manageCoursesPromise(id, email)
          .then(() => {
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
        Manage Your Courses
      </h2>
      <p className="text-gray-500 text-center mb-8">
        Here you can view, edit, and delete the courses you've added. Keep your
        course list organized and up-to-date.
      </p>

      {courses.length > 0 ? (
        <div className="overflow-x-auto"><table className="w-[1300px] mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-8 border">
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
        </table></div>
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
