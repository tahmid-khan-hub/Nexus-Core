import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate, useParams } from "react-router";
import * as motion from "motion/react-client";
import UseAuth from "../../Hooks/UseAuth";
import Swal from "sweetalert2";
import PageLoading from "../../Hooks/PageLoading";
import UseApplicationApi from "../../Hooks/UseApplicationApi";
import { useQuery } from "@tanstack/react-query";

const CourseDetails = () => {
  const { user } = UseAuth();
  const {
    myEnrolledCoursesPatch,
    courseDelete,
    userCoursesCheck,
    userCoursesCount,
    enrollPost,
    enrollIncrement,
  } = UseApplicationApi();
  const { id } = useParams();
  const data = useLoaderData();
  const navigate = useNavigate();

  const course = data.find((c) => c._id.toString() === id);
  const userEmail = user?.email || "";

  // Fetch user's total enrolled courses
  const { data: courseCount = 0 } = useQuery({
    queryKey: ["userCoursesCount", userEmail],
    queryFn: () => userCoursesCount(userEmail).then((res) => res.count),
    enabled: !!userEmail,
  });

  // Check if already enrolled in this course
  const { data: isAlreadyEnrolled = false } = useQuery({
    queryKey: ["userCourseCheck", userEmail, course?._id],
    queryFn: () =>
      userCoursesCheck(userEmail, course._id).then(
        (res) => res?.enrolled === true
      ),
    enabled: !!userEmail && !!course?._id,
  });

  const enrollLimitReached = courseCount >= 3;
  const remainingSeat = Number(course?.seatLimit) - Number(course?.enrolled);

  const handleGoToPayment = () => {
    if (!userEmail) return;

    if (isAlreadyEnrolled) {
      Swal.fire({
        icon: "info",
        title: "Already Enrolled",
        text: "You are already enrolled in this course.",
      });
      return;
    }

    if (enrollLimitReached) {
      Swal.fire({
        icon: "warning",
        title: "Limit Reached",
        text: "You can’t enroll in more than 3 courses.",
      });
      return;
    }

    if (remainingSeat <= 0) {
      Swal.fire({
        icon: "warning",
        title: "No Seat Available",
        text: "All seats for this course are filled.",
      });
      return;
    }

    navigate("/payment", {
      state: { courseId: course._id, coursePrice: course.price },
    });
  };

  const getButtonProps = () => {
    if (!userEmail) {
      return { text: "Login to Enroll", disabled: true };
    }
    if (remainingSeat <= 0) {
      return { text: "No Seat Left", disabled: true };
    }
    return { text: "Enroll & Pay", disabled: false };
  };

  const { text, disabled } = getButtonProps();

  return (
    <PageLoading>
      <>
        <div>
          <h1 className="text-3xl font-bold text-center mt-16 mb-2">
            Course Details
          </h1>
          <p className="text-gray-500 mb-16 text-center">
            Explore the full details of the selected course and decide if it’s
            the right fit for your learning journey.
          </p>
        </div>

        <div className="min-h-screen">
          <motion.div
            animate={{ y: [0, -20] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="max-w-[1300px] mx-auto w-[96%] bg-white shadow-2xl rounded-2xl overflow-hidden border-2 border-blue-300 transition duration-300 my-16 p-2 mb-48"
          >
            <div className="flex flex-col md:flex-row">
              {/* Left image side */}
              <div className="md:w-[60%]">
                <img
                  src={course.photoURL}
                  alt={course.title}
                  className="w-full h-[300px] md:h-full object-cover p-2 rounded-2xl"
                />
              </div>

              {/* Right content side */}
              <div className="p-6 space-y-3 flex flex-col justify-between md:w-[40%]">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    {course.title}
                  </h2>
                  <p className="text-sm mb-8 text-gray-700">
                    {course.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-700">
                    <div>
                      <span className="font-semibold">📅 Date:</span>
                      <p>{new Date(course.date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="font-semibold">⏳ Duration:</span>
                      <p>{course.duration} weeks</p>
                    </div>
                    <div>
                      <span className="font-semibold">🌍 Language:</span>
                      <p>{course.language}</p>
                    </div>
                    <div>
                      <span className="font-semibold">🎓 Certificate:</span>
                      <p>{course.certificateIncluded}</p>
                    </div>
                    <div>
                      <span className="font-semibold">👥 Enrolled:</span>
                      <p>{course?.enrolled ?? 0}</p>
                    </div>
                    <div>
                      <span className="font-semibold">🪑 Seat Limit:</span>
                      <p>{course.seatLimit}</p>
                    </div>
                  </div>
                </div>

                {/* Button section pinned to bottom */}
                {/* <div className="pt-5">
                {alreadyEnrolled ? (
                  <button
                    onClick={handleUnenroll}
                    className="w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
                  >
                    Enrolled
                  </button>
                ) : (
                  <Link to="/payment" state={{courseId: course._id, handleCourses: handleUserCourses}}><button
                    className={`w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 ${
                      enrollLimitReached || remainingSeat <= 0
                        ? "cursor-not-allowed opacity-60"
                        : ""
                    }`}
                  >
                    {enrollLimitReached
                      ? "Enroll Now"
                      : remainingSeat <= 0
                      ? "No Seat Left"
                      : "Enroll Now"}
                  </button></Link>
                )}
              </div> */}
                <button
                  onClick={handleGoToPayment}
                  disabled={disabled}
                  className={`btn mt-4 ${
                    disabled
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#ef7706] to-[#fa9a1b] hover:from-[#fa9a1b] hover:to-[#ef7706] text-white"
                  }`}
                >
                  {text}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </>
    </PageLoading>
  );
};

export default CourseDetails;
