import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import * as motion from "motion/react-client";

const CourseSection = ({ coursesData }) => {
  const limit = 6;

  const [latestCourses, setLatestCourses] = useState([]);

  useEffect(() => {
    if (coursesData && coursesData.length > 0) {
      const sortedCourses = [...coursesData].sort((a, b) => {
        const timeA = new Date(a.date).getTime();
        const timeB = new Date(b.date).getTime();
        return timeB - timeA;
      });

      setLatestCourses(sortedCourses.slice(0, limit));
    }
  }, [coursesData, limit]);

  return (
    <div className="py-12 ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 mt-16 text-gray-800 ">
          Our Latest Courses
        </h2>
        <p className="text-lg text-center text-gray-500 mb-12">
          Discover new opportunities with our recently added courses, designed
          to keep you ahead.
        </p>

        {latestCourses.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestCourses.map((course) => (
              <motion.div
                whileHover={{ scale: 1.05 }}
                key={course._id}
                className="max-w-sm bg-gray-50 border-2 border-blue-300 rounded-lg shadow-xl mx-auto"
              >
                <Link to={`/courses/${course._id}`}>
                  <img
                    className="rounded-xl w-full p-2 h-48 object-cover"
                    src={course.photoURL}
                  />
                </Link>
                <div className="p-5">
                  <Link to={`/courses/${course._id}`}>
                    <h5 className="mb-4 text-2xl font-semibold tracking-tight text-gray-900 ">
                      {course.title}
                    </h5>
                  </Link>
                  <p className="mb-3 font-normal text-gray-500 ">
                    {course.description && course.description.length > 150
                      ? course.description.slice(0, 150) + "..."
                      : course.description || "No description available."}
                  </p>
                  {course.date && (
                    <p className="mb-3 mt-4 text-sm font-normal text-gray-600 ">
                      Added on :{" "}
                      <span className="font-semibold">
                        {new Date(course.date).toLocaleDateString()}
                      </span>
                    </p>
                  )}
                  <div className="text-right mt-auto">
                    {" "}
                    <Link
                      to={`/courses/${course._id}`}
                      className="inline-flex items-center text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-5"
                    >
                      View Details
                      <svg
                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseSection;
