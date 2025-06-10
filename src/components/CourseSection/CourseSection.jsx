import React, { useState, useEffect } from "react";
import { Link } from "react-router";

const CourseSection = ({ coursesData }) => {
  const limit = 6;

  const [latestCourses, setLatestCourses] = useState([]);

  useEffect(() => {
    if (coursesData && coursesData.length > 0) {
      const sortedCourses = [...coursesData].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });

      setLatestCourses(sortedCourses.slice(0, limit));
    }
  }, [coursesData, limit]);

  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800 dark:text-white">
          Our Latest Courses
        </h2>
        <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-10">
          Discover new opportunities with our recently added courses, designed
          to keep you ahead.
        </p>

        {latestCourses.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestCourses.map((course) => (
              <div
                key={course._id}
                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
              >
                <Link to={`/courses/${course._id}`}>
                  <img
                    className="rounded-t-lg w-full h-48 object-cover"
                    src={course.photoURL}
                  />
                </Link>
                <div className="p-5">
                  <Link to={`/courses/${course._id}`}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {course.title}
                    </h5>
                  </Link>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {course.description && course.description.length > 150
                      ? course.description.slice(0, 150) + "..."
                      : course.description || "No description available."}
                  </p>
                  {course.date && (
                    <p className="mb-3 text-sm font-normal text-gray-500 dark:text-gray-400">
                      Added on: {new Date(course.date).toLocaleDateString()}
                    </p>
                  )}
                  <div className="text-right mt-auto">
                    {" "}
                    <Link
                      to={`/courses/${course._id}`}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5"
                    >
                      Read more
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseSection;
