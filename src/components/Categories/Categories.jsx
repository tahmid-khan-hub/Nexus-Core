import * as motion from "motion/react-client";
import React from "react";
import { Link } from "react-router";

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

  return (
    <div className="p-6 bg-blue-100 ">
      <h2 className="text-2xl font-bold mb-2 text-center">Categories</h2>
      <p className="text-gray-500 text-center mb-11">
        {" "}
        Browse through our popular categories to find courses that match your
        interests and boost your skills.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {category.map((cat, index) => (
          <motion.div
            className="overflow-hidden border-2 rounded-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            key={index}
          >
            <Link to={`Category/${cat}`}>
              <div className="bg-white p-5 rounded-xl shadow-md text-center ">
                <h2 className="text-lg font-semibold text-gray-700">{cat}</h2>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
