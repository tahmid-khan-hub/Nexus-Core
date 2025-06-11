import * as motion from "motion/react-client";
import React from "react";
import { Link } from "react-router";

import {
  FaLaptopCode,
  FaChartLine,
  FaMicrophoneAlt,
  FaPencilRuler,
  FaCamera,
  FaBriefcase,
  FaLightbulb,
} from "react-icons/fa";

const Categories = () => {
  const category = [
    "Technology",
    "Business",
    "Marketing",
    "UiUxDesign",
    "Finance",
    "Photography",
    "Communication",
    "CareerDevelopment",
  ];

  const categoryIcons = {
    Technology: <FaLaptopCode size={40} className="mb-2 text-blue-600" />,
    Business: <FaChartLine size={40} className="mb-2 text-green-600" />,
    Marketing: <FaMicrophoneAlt size={40} className="mb-2 text-red-600" />,
    UiUxDesign: <FaPencilRuler size={40} className="mb-2 text-purple-600" />,
    Finance: <FaChartLine size={40} className="mb-2 text-yellow-600" />,
    Photography: <FaCamera size={40} className="mb-2 text-orange-600" />,
    Communication: <FaMicrophoneAlt size={40} className="mb-2 text-indigo-600" />,
    CareerDevelopment: <FaBriefcase size={40} className="mb-2 text-teal-600" />,
    Default: <FaLightbulb size={40} className="mb-2 text-gray-500" />,
  };

  return (
    <div className="p-6 bg-blue-100 ">
      <h2 className="text-2xl font-bold mb-2 text-center text-gray-800 ">
        Categories
      </h2>
      <p className="text-gray-500 text-center mb-11 dark:text-gray-400">
        Browse through our popular categories to find courses that match your
        interests and boost your skills.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {category.map((cat) => (
          <motion.div
            className="overflow-hidden border-2 rounded-xl border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            key={cat}
          >
            <Link to={`Category/${cat}`}>
              <div className="bg-white p-5 rounded-xl shadow-md text-center flex flex-col items-center justify-center h-full ">
                {categoryIcons[cat] || categoryIcons.Default}
                <h2 className="text-lg font-semibold  text-gray-700 ">{cat}</h2>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Categories;