import React, { useEffect } from "react";
import { useLoaderData, useParams } from "react-router";
import * as motion from "motion/react-client";

const CourseDetails = () => {
  const { id } = useParams();
  const data = useLoaderData();

  const course = data.find((c) => c._id.toString() === id);
  console.log(course);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-gray-800 text-center mt-11 mb-2">
          Course Details
        </h1>
        <p className="text-gray-600 mb-11 text-center">
          Explore the full details of the selected course and decide if it’s the
          right fit for your learning journey.
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
                <p>{course.enrolled}</p>
              </div>
            </div>

            <div className="pt-4 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700">
              <span>👤 Uploaded by:</span> <br />
              <span className="font-medium">{course.UserEmail}</span>
            </div>

            <div className="pt-5">
              <button className="w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 transition duration-200">
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default CourseDetails;
