import React, { useEffect } from "react";
import Lottie from "lottie-react";
import NoDataFound from "../../assets/lotties/noData.json";
import { motion } from "framer-motion";
import { Link } from "react-router";
import PageLoading from "../../Hooks/PageLoading";

const CategoryDetails = ({ category }) => {
  useEffect(() => {
    document.title = "NexusCore | CategoryDetails";
  }, []);

  const {
    certificateIncluded,
    date,
    description,
    duration,
    language,
    photoURL,
    title,
    enrolled,
    _id,
  } = category;

  return (
    <PageLoading>
      <motion.div className="p-4 my-11" >
        <div className="backdrop-blur-md bg-white border border-blue-300 rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden max-w-[1300px] mx-auto p-2 ">
          <img
            src={photoURL}
            alt={title}
            className="w-full md:w-[55%] object-cover rounded-xl"
          />
          <div className="p-6 md:w-[45%] flex flex-col flex-grow">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">{title}</h2>
            <p className="text-gray-800 mt-2 mb-5">{description}</p>
            <div className="flex flex-wrap gap-x-4 text-sm text-gray-600">
              <p>🕒 {duration} weeks</p>
              <p>🌍 {language}</p>
              <p>📅 {date}</p>
              <p>
                🎓{" "}
                {certificateIncluded
                  ? "Certificate included"
                  : "No certificate"}
              </p>
              <p>👥 {enrolled} students enrolled</p>
            </div>

            <div className="text-right mt-auto">
              <Link to={`/courseDetails/${_id}`}>
                <motion.button
                  className="inline-flex items-center text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-9"
                  whileTap={{ scale: 0.95 }}
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
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </PageLoading>
  );
};

export default CategoryDetails;
