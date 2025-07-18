import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router";
import * as motion from "motion/react-client";

const AllCourses = () => {
  const coursesData = useLoaderData();
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    document.title = "NexusCore | All Courses";
    window.scrollTo(0,0)
  }, []);

  const sortOptions = [
    { label: "Default", value: "default" },
    { label: "Most enrolled", value: "enrolled_descending" },
    { label: "Less enrolled", value: "enrolled_ascending" },
    { label: "Latest", value: "new_course" },
    { label: "Oldest", value: "old_course" },
  ];

  const sortedCourses = [...coursesData].sort((a, b) => {
    if (sortOption === "enrolled_descending") {
      return b.enrolled - a.enrolled;
    } else if (sortOption === "enrolled_ascending") {
      return a.enrolled - b.enrolled;
    } else if (sortOption === "new_course") {
      return new Date(b.date) - new Date(a.date); // newest first
    } else if (sortOption === "old_course") {
      return new Date(a.date) - new Date(b.date); // oldest first
    }
    return 0; // default
  });

  return (
    <div className="py-12">
      <div className="max-w-[1310px] mx-auto px-2">
        <h2 className="text-3xl font-bold text-center mb-4 mt-5">
          All Courses
        </h2>
        <p className="text-gray-500 mb-16 text-center">
          Explore our full range of courses to learn new skills, boost your
          career, or dive into a new interest. There's something for
          everyone—start learning and growing today.
        </p>

        {/* Sort dropdown */}
        <div className="flex justify-center gap-4 mb-10 flex-wrap">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-4 py-2 border border-blue-400 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {sortOptions.map((option) => (
              <option key={option.value} className="text-black" value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {sortedCourses.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-24">
            {sortedCourses.map((course) => (
              <motion.div
                whileHover={{ scale: 1.05 }}
                key={course._id}
                className="max-w-sm bg-gray-50 border-2 border-blue-300 rounded-lg shadow-xl mx-auto flex flex-col"
              >
                <img
                  className="rounded-xl w-full p-2 h-[250px] object-cover"
                  src={course.photoURL}
                  alt={course.title}
                />
                <div className="p-5 flex flex-col flex-grow">
                  <h5 className="mb-4 text-2xl font-semibold tracking-tight text-gray-900">
                    {course.title}
                  </h5>
                  <p className="mb-3 font-normal text-gray-500">
                    {course.description && course.description.length > 50
                      ? course.description.slice(0, 50) + "..."
                      : course.description || "No description available."}
                  </p>

                  <div className="text-right mt-auto">
                    <Link
                      to={`/courseDetails/${course._id}`}
                      className="inline-flex items-center text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-5"
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

export default AllCourses;
