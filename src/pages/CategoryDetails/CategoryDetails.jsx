import React from "react";

const CategoryDetails = ({ category }) => {

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
    <div className="p-4">
  <div className="backdrop-blur-md bg-white/70 border border-gray-200 rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden max-w-5xl mx-auto">
    <img
      src={photoURL}
      alt={title}
      className="w-full md:w-1/3 object-cover"
    />
    <div className="p-6 md:w-2/3">
      <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
      <p className="text-gray-800 mt-2 mb-4">{description}</p>
      <div className="flex flex-wrap gap-x-4 text-sm text-gray-600">
        <p>🕒 {duration} weeks</p>
        <p>🌍 {language}</p>
        <p>📅 {date}</p>
        <p>🎓 {certificateIncluded ? "Certificate included" : "No certificate"}</p>
        <button className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-16">Enroll Now</button>
      </div>
    </div>
  </div>
</div>
  );
};

export default CategoryDetails;
