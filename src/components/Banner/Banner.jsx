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
        "Explore a diverse catalog of courses across various categories. Filter by topic, difficulty, or instructor to find exactly what you need.",
    },
    {
      id: 2,
      image: "https://i.ibb.co/cczPpgcF/image.png",
      heading: "Your Enrolled Courses",
      paragraph:
        "Easily track your enrolled courses, manage your progress, and continue learning where you left off—on any device.",
    },
    {
      id: 3,
      image: "https://i.ibb.co/YFzgFY7j/image.png",
      heading: "Top-Rated Courses",
      paragraph:
        "Check out the most popular courses loved by thousands of learners. Handpicked based on ratings, reviews, and completion rate.",
    },
  ];

  return (
    <div
      style={{
        maxWidth: "1350px",
        marginLeft: "auto",
        marginRight: "auto",
        overflow: "hidden",
      }}
    >
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id}>
            <div style={{ position: "relative" }}>
              {/* Background Image */}
              <img
                src={slide.image}
                alt={slide.heading}
                style={{
                  width: "100%",
                  height: "90vh",
                  maxHeight: "500px",
                  objectFit: "cover",
                  display: "block", // prevent inline image whitespace issues
                }}
              />

              {/* Overlay */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "1rem",
                }}
              >
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    maxWidth: "95%",
                  }}
                >
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    style={{
                      fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
                      fontWeight: "bold",
                      marginBottom: "1rem",
                    }}
                  >
                    {slide.heading}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                    style={{
                      fontSize: "clamp(0.9rem, 3vw, 1.2rem)",
                      color: "#ccc",
                    }}
                  >
                    {slide.paragraph}
                  </motion.p>
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
