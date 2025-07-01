import React from "react";
import Marquee from "react-fast-marquee";
import { Award } from "lucide-react"; // optional, for icon

const HallOfFame = () => {
  const students = [
    {
      id: 1,
      name: "Sumaiya Akter",
      course: "Full Stack Web Development",
      issuedOn: "2024-05-20",
      certificateId: "FSWD-AR123",
    },
    {
      id: 2,
      name: "Navil Khan",
      course: "Data Science Bootcamp",
      issuedOn: "2025-04-15",
      certificateId: "DSB-RM456",
    },
    {
      id: 3,
      name: "Arif Hossain",
      course: "UI/UX Design Masterclass",
      issuedOn: "2024-03-30",
      certificateId: "UID-LW789",
    },
    {
      id: 4,
      name: "Mina Begum",
      course: "Digital Marketing",
      issuedOn: "2024-06-01",
      certificateId: "PYB-SK321",
    },
    {
      id: 5,
      name: "Sourov Ahmed",
      course: "Machine Learning with Python",
      issuedOn: "2025-05-10",
      certificateId: "MLP-JD654",
    },
  ];

  return (
    <div className=" my-24">
      <h2 className="text-3xl font-bold text-center mt-16 mb-2">
       Hall of Fame
      </h2>
      <p className="text-gray-500 mb-10 text-center max-w-xl mx-auto">
        Celebrating our top learners who completed their courses with excellence
        and earned certificates.
      </p>

      <Marquee pauseOnHover gradient={false} speed={50}>
        {students.map((cert) => (
          <div
            key={cert.certificateId}
            className="w-80 bg-gradient-to-br from-white to-gray-100 shadow-xl rounded-2xl p-5 m-4 border border-gray-200 transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold">{cert.name}</h3>
            </div>

            <div className="text-sm text-gray-700 mb-1">
              <span className="font-medium text-gray-900">Course:</span>{" "}
              {cert.course}
            </div>

            <div className="text-sm text-gray-600 mb-1">
              <span className="font-medium text-gray-800">Issued on:</span>{" "}
              {cert.issuedOn}
            </div>

            <div className="text-xs text-gray-400 mt-2">
              <span className="font-medium text-gray-500">Certificate ID:</span>{" "}
              {cert.certificateId}
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default HallOfFame;
