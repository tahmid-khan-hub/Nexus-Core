import React from "react";
import Slider from "react-slick";
import * as motion from "motion/react-client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: false,
  };
const slides = [
  {
    id: 1,
    image: "https://i.ibb.co/931y1XzJ/image.png",
    heading: "Browse All Courses",
    paragraph:
      "Explore a rich collection of curated courses tailored to your learning goals. Browse by category, instructor, or discover what’s trending with our most enrolled courses.",
  },
  {
    id: 2,
    image: "https://i.ibb.co/cczPpgcF/image.png",
    heading: "Your Enrolled Courses",
    paragraph:
      "Easily access and manage all the courses you’ve enrolled in. Track your progress, resume lessons, and stay on top of your learning—anytime, on any device.",
  },
  {
    id: 3,
    image: "https://i.ibb.co/YFzgFY7j/image.png",
    heading: "Top-Rated Courses",
    paragraph:
      "Browse our most popular courses, highly rated by learners like you. These trusted courses are selected for their quality, effectiveness, and learner satisfaction.",
  },
];


  return (
    <div className="w-full overflow-hidden">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id}>
            <div className="relative">
              {/* Background Image */}
              <img
                src={slide.image}
                alt={slide.heading}
                className="w-full h-[90vh] max-h-[500px] md:max-h-[600px] object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 flex justify-center items-center px-4">
                <div className="w-[96%] max-w-[1300px] mx-auto text-white text-center">
                  <motion.div
                    key={slide.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  >
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                      className="text-[clamp(1.5rem,5vw,2.5rem)] font-bold mb-4"
                    >
                      {slide.heading}
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                      className="text-[clamp(0.9rem,3vw,1.2rem)] text-gray-300"
                    >
                      {slide.paragraph}
                    </motion.p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
