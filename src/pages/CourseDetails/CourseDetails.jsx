import React, { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router";
import * as motion from "motion/react-client";
import UseAuth from "../../Hooks/UseAuth";
import Swal from "sweetalert2";
import PageLoading from "../../Hooks/PageLoading";
import UseApplicationApi from "../../Hooks/UseApplicationApi";

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

  const [alreadyEnrolled, setAlreadyEnrolled] = useState(false);
  const [totalEnrolled, setTotalEnrolled] = useState(0);
  const [enrollLimitReached, setEnrollLimitReached] = useState(false);
  const [remainingSeat, setRemainingSeat] = useState(0);

  const course = data.find((c) => c._id.toString() === id);
  const userEmail = user?.email || "";

  const userCourseData = {
    email: userEmail,
    courseId: course._id,
    title: course.title,
    description: course.description,
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "NexusCore | CourseDetails";
  }, []);

  useEffect(() => {
    if (course) {
      setTotalEnrolled(course.enrolled);
      setRemainingSeat(Number(course.seatLimit) - Number(course.enrolled));
    }
  }, [course]);

  useEffect(() => {
    if (course) {
      setRemainingSeat(Number(course.seatLimit) - totalEnrolled);
    }
  }, [totalEnrolled, course]);

  useEffect(() => {
    if (!userEmail || !course?._id) return;

    userCoursesCount(userEmail)
      .then((res) => {
        setEnrollLimitReached(res.count >= 3);
      })
      .catch((err) => {
        console.error("Count error:", err);
        setEnrollLimitReached(false);
      });

    userCoursesCheck(userEmail, course._id)
      .then((res) => {
        setAlreadyEnrolled(res?.enrolled === true);
      })
      .catch((err) => {
        console.error("Enrollment check error:", err);
        setAlreadyEnrolled(false);
      });
  }, [userEmail, course?._id, userCoursesCheck, userCoursesCount]);

  useEffect(() => {
    if (!userEmail) {
      setAlreadyEnrolled(false);
    }
  }, [userEmail]);

  const handleUserCourses = () => {
    if (!userEmail || alreadyEnrolled) return;

    if (enrollLimitReached) {
      return Swal.fire({
        icon: "warning",
        title: "Limit Reached",
        text: "You can’t enroll in more than 3 courses.",
      });
    }

    if (remainingSeat <= 0) {
      return Swal.fire({
        icon: "warning",
        title: "No Seat Available",
        text: "All seats for this course are filled.",
      });
    }

    enrollPost(userCourseData, userEmail)
      .then((res) => {
        if (res.insertedId) {
          return enrollIncrement(course._id, totalEnrolled + 1, userEmail);
        }
      })
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Course enrolled successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        setTotalEnrolled((prev) => Number(prev) + 1);
        setAlreadyEnrolled(true);
      })
      .catch((err) => console.log("Enrollment error:", err));
  };

  const handleUnenroll = () => {
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
        courseDelete(userEmail, course._id)
          .then(() => myEnrolledCoursesPatch(course._id, userEmail))
          .then(() => {
            Swal.fire({
              position: "top-end",
              icon: "info",
              title: "Course unenrolled successfully!",
              showConfirmButton: false,
              timer: 1500,
            });
            setTotalEnrolled((prev) => Math.max(0, prev - 1));
            setAlreadyEnrolled(false);
          })
          .catch((err) => Swal.fire("Error", err.message, "error"));
      }
    });
  };

  return (
    <PageLoading>
      <>
        <div>
          <h1 className="text-3xl font-bold text-gray-800 text-center mt-11 mb-2">
            Course Details
          </h1>
          <p className="text-gray-600 mb-11 text-center">
            Explore the full details of the selected course and decide if it’s
            the right fit for your learning journey.
          </p>
        </div>

        <motion.div
          animate={{ y: [0, -20] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="max-w-2xl w-[96%] mx-auto bg-white dark:bg-gray-900 shadow-2xl rounded-2xl overflow-hidden border-2 border-blue-600 dark:border-gray-700 transition hover:shadow-2xl duration-300 my-16"
        >
          <div>
            <img
              src={course.photoURL}
              alt={course.title}
              className="w-full h-56 object-cover p-2 rounded-2xl"
            />

            <div className="p-6 space-y-3">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {course.title}
              </h2>
              <p className="text-sm mb-5 text-gray-500 dark:text-gray-400">
                {course.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-700 dark:text-gray-300">
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
                  <p>{totalEnrolled}</p>
                </div>
                <div>
                  <span className="font-semibold">🪑 Seat Limit:</span>
                  <p>{course.seatLimit}</p>
                </div>
              </div>

              <div className="pt-5">
                {/* {remainingSeat > 0 ? (
                  <button
                    onClick={
                      alreadyEnrolled ? handleUnenroll : handleUserCourses
                    }
                    disabled={!userEmail}
                    className={`w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-200 ${
                      !userEmail
                        ? "bg-gray-400 cursor-not-allowed"
                        : alreadyEnrolled
                        ? "bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl"
                        : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl"
                    }`}
                  >
                    {!userEmail
                      ? "Login to Enroll"
                      : alreadyEnrolled
                      ? "Enrolled"
                      : "Enroll Now"}
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full bg-gray-400 cursor-not-allowed p-2 rounded-2xl"
                  >
                    No Seat Left
                  </button>
                )} */}
                {alreadyEnrolled ? (
                  <button
                    onClick={handleUnenroll}
                    className="w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
                  >
                    Enrolled
                  </button>
                ) : (
                  <button
                    onClick={handleUserCourses}
                    className={`px-4 py-2 rounded ${
                      enrollLimitReached || remainingSeat <= 0
                        ? "w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 "
                        : "w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
                    }`}
                  >
                    {enrollLimitReached
                      ? "Enroll Now"
                      : remainingSeat <= 0
                      ? "No Seat Left"
                      : "Enroll Now"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </>
    </PageLoading>
  );
};

export default CourseDetails;
