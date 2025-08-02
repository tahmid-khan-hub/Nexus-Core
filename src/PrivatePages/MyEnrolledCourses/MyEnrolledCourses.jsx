import React, { useEffect, useState } from "react";
import UseAuth from "../../Hooks/UseAuth";
import Lottie from "lottie-react";
import dataNotFound from "../../assets/lotties/dataNotFound.json";
import Swal from "sweetalert2";
import UseApplicationApi from "../../Hooks/UseApplicationApi";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import Loader from "../../pages/Loader/Loader";
import { MdRemoveCircle } from "react-icons/md";

const MyEnrolledCourses = () => {

  useEffect(() => {document.title = "NexusCore | MyEnrolledCourses"},[])

  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const { myEnrolledCoursesPromise, myEnrolledCoursesPatch } = UseApplicationApi();
  const UserEmail = user.email || "";

  const { data: data = [], isLoading} = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await axiosSecure.get("/userCourses");
      return res.data;
    },
  });

  const [userCourses, setUserCourses] = useState([]);

  useEffect(() => {
    if (data.length && UserEmail) {
      const filtered = data.filter((courses) => courses.email === UserEmail);
      setUserCourses(filtered);
    }
  }, [data, UserEmail]);

  const handleRemoveEnrollment = (id, courseId) => {
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
        myEnrolledCoursesPromise(id, UserEmail) 
          .then(() => {
            myEnrolledCoursesPatch(courseId, UserEmail)
            .then(() => {
              setUserCourses((prev) =>
                prev.filter((course) => course._id !== id)
              );
              Swal.fire("Removed!", "Your enrolled course has been removed", "success");
            })
            
          })
          .catch((error) => {
            console.error(error);
            Swal.fire("Error", "Failed to remove enrollment.", "error");
          });
      }
    });
  };

  if(isLoading) return <Loader></Loader>;

  return (
    <div className="relative mt-11 overflow-x-auto sm:rounded-lg min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-2 mt-5">
        My Enrolled Courses
      </h2>
      <p className="text-gray-500 text-center mb-12">
        View all the courses you’ve enrolled in. You can remove your enrollment
        from any course at any time.
      </p>

      {userCourses.length > 0 ? (
       <div className="overflow-x-auto"> <table className="
        mx-auto text-sm text-left text-gray-500 dark:text-gray-400 mt-8 border ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50  dark:text-gray-400">
            <tr className="border-b-2">
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Enrolled Date
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
                  {new Date(course.date).toLocaleString("en-GB",{
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-6 py-4">
                  <a
                    onClick={() => handleRemoveEnrollment(course._id, course.courseId)}
                    className="font-medium hover:underline text-red-500 hover:text-red-600"
                  >
                    <MdRemoveCircle className="ml-3" size={18} />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table></div>
      ) : (
        <div className="p-4 mb-32 text-center flex flex-col items-center justify-center ">
          <div className="w-72 h-72 text-blue-400">
            <Lottie animationData={dataNotFound} loop />
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold ">
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
