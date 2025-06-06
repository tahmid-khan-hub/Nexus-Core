import React from "react";
import Marquee from "react-fast-marquee";

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
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-2 text-center mt-11">Hall of Fame</h2>
      <p className="text-gray-500 mb-8 text-center">
        Celebrating our top learners who completed their courses with excellence
        and earned certificates.
      </p>

      <Marquee pauseOnHover gradient={false} speed={50}>
        {students.map((cert) => (
          <div
            key={cert.certificateId}
            className="w-80 bg-white shadow rounded p-4 m-2 border inline-block"
          >
            <h3 className="text-lg font-semibold">{cert.name}</h3>
            <p>Course: {cert.course}</p>
            <p className="text-gray-500 text-sm">Issued on: {cert.issuedOn}</p>
            <p className="text-gray-400 text-xs">
              Certificate ID: {cert.certificateId}
            </p>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default HallOfFame;
