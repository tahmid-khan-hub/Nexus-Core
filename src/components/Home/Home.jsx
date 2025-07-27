import React, { useEffect } from "react";
import CourseSection from "../CourseSection/CourseSection";
import PopularSection from "../PopularSection/PopularSection";
import HallOfFame from "../HallOfFame/HallOfFame";
import Categories from "../Categories/Categories";
import { useLoaderData } from "react-router";

const Home = () => {
  const coursesData = useLoaderData();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "NexusCore | Home";
  }, []);

  return (
    <>
      <div className="max-w-[1300px] mx-auto overflow-x-hidden">
        <CourseSection coursesData={coursesData}></CourseSection>
        <PopularSection coursesData={coursesData}></PopularSection>
        <Categories coursesData={coursesData}></Categories>
        <HallOfFame></HallOfFame>
      </div>
    </>
  );
};

export default Home;
