import React, { useEffect } from "react";
import Lottie from "lottie-react";
import aboutLottie from "../../assets/lotties/about.json";
import Animation from "../../Hooks/Animation"

const About = () => {
  useEffect(()=>{document.title = "NexusCore | About"},[])
  return (
    <Animation><div className=" min-h-screen py-12 md:px-10 lg:px-20">
      <div className="max-w-[1300px] mx-auto grid md:grid-cols-2 gap-16 items-center mb-44">
        {/* Lottie Animation */}
        <div data-aos="fade-right">
          <Lottie
            animationData={aboutLottie}
            loop={true}
            className="w-full h-auto"
          />
        </div>

        {/* Text Content */}
        <div data-aos="fade-left">
          <h2 className="text-3xl font-bold mb-7">
            Welcome to{" "}
            <a className="text-3xl font-bold ml-1 ">
              Nex<span className="font-bold text-blue-500 text-3xl">US</span>
              Core
            </a>
          </h2>
          <p className="text-lg leading-relaxed mb-6">
            NexUSCore is a modern educational platform where learning meets
            convenience and flexibility. Whether you're a student or an
            instructor, we've designed every feature with you in mind.
          </p>

          <ul className="space-y-4 ">
            <li className="flex items-start">
              <span className="text-blue-500 text-xl mr-3">✔</span>
              <span>
                <strong>Enroll in Courses:</strong> Seamlessly browse and join
                courses in your field of interest.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 text-xl mr-3">✔</span>
              <span>
                <strong>Manage Enrolled Courses:</strong> Track your progress
                and access all your courses in one place.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 text-xl mr-3">✔</span>
              <span>
                <strong>Category-wise Browsing:</strong> Easily explore courses
                based on categories like development, design, and more.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 text-xl mr-3">✔</span>
              <span>
                <strong>Popular & Latest Picks:</strong> Discover trending and
                newly released courses every week.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 text-xl mr-3">✔</span>
              <span>
                <strong>Add & Manage Courses:</strong> Instructors can create,
                update, and manage their own course content with ease.
              </span>
            </li>
          </ul>

          <p className="mt-6 text-gray-600">
            At NexUSCore, our goal is to empower lifelong learners and enable
            educators to reach a broader audience. Join us on a journey of
            knowledge and growth.
          </p>
        </div>
      </div>
    </div></Animation>
  );
};

export default About;
