import React from 'react';
import { useLoaderData, useParams } from 'react-router';
import CategoryDetails from '../CategoryDetails/CategoryDetails';
import Lottie from "lottie-react";
import NoDataFound from "../../assets/lotties/noData.json";

const Category = () => {
    const { category } = useParams();
    const courseData = useLoaderData();

    const categoryTypes = courseData.filter(course => course.categories === category);

    return (
        <div className='grid grid-cols-1'>
            {
                categoryTypes.length > 0 ? (
                    categoryTypes.map((item, index) => (
                        <CategoryDetails key={index} category={item} />
                    ))
                ) : (
                    <div className="p-4 my-11 text-center flex flex-col items-center justify-center">
  <div className="w-72 h-72">
    <Lottie animationData={NoDataFound} loop />
  </div>
  <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 ">
    Sorry, no courses found for this category.
  </h2>
  <p className="text-gray-500 mt-2 text-sm md:text-base">
    Please try a different category or check back later.
  </p>
</div>
                )
            }
        </div>
    );
};

export default Category;
