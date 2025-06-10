import React from "react";
import Lottie from "lottie-react";
import NoDataFound from "../../assets/lotties/noData.json";
import * as motion from "motion/react-client";

const CategoryDetails = ({ category }) => {
  if (!category) {
    return (
      <div className="p-4 my-11 text-center flex flex-col items-center justify-center">
        <div className="w-72 h-72">
          <Lottie animationData={NoDataFound} loop={true} />
        </div>
        <p className="text-3xl text-gray-600 mt-4">
          No category data available.
        </p>
      </div>
    );
  }

  const {
    certificateIncluded,
    date,
    description,
    duration,
    language,
    photoURL,
    title,
    _id,
  } = category;

  return (
    <motion.div
      className="p-4 my-11"
      whileHover={{ scale: 1.05 }}
    >
      <div className="backdrop-blur-md bg-white/70 border border-gray-200 rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden max-w-5xl mx-auto">
        <img
          src={photoURL}
          alt={title}
          className="w-full md:w-1/3 object-cover"
        />
        <div className="p-6 md:w-2/3 ">
          <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
          <p className="text-gray-800 mt-2 mb-4">{description}</p>
          <div className="flex flex-wrap gap-x-4 text-sm text-gray-600">
            <p>🕒 {duration} weeks</p>
            <p>🌍 {language}</p>
            <p>📅 {date}</p>
            <p>
              🎓{" "}
              {certificateIncluded ? "Certificate included" : "No certificate"}
            </p>
            <motion.button className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-16" whileTap={{ scale: 0.95 }}>
              Enroll Now
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryDetails;
