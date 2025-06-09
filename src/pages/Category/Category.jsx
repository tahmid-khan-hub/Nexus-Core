import React from 'react';
import { useLoaderData, useParams } from 'react-router';
import CategoryDetails from '../CategoryDetails/CategoryDetails';

const Category = () => {

    const {category} = useParams();

    const courseData = useLoaderData();
    console.log(category, courseData);

    const categoryTypes = courseData.filter(course => course.categories == category)

    console.log(categoryTypes);

    return (
        <div className='grid grid-cols-1'>
            {
                categoryTypes.map((category, index) => <CategoryDetails key={index} category={category}></CategoryDetails>)
            }
        </div>
    );
};

export default Category;