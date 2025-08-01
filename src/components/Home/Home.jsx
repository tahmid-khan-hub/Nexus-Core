import React, { useEffect } from "react";
import CourseSection from "../CourseSection/CourseSection";
import PopularSection from "../PopularSection/PopularSection";
import HallOfFame from "../HallOfFame/HallOfFame";
import Categories from "../Categories/Categories";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../pages/Loader/Loader";

const Home = () => {
  const axiosSecure = UseAxiosSecure();

  const { data: coursesData = [], isLoading} = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await axiosSecure.get("/courses");
      return res.data;
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "NexusCore | Home";
  }, []);

  if (isLoading) return <Loader></Loader>;
  
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
