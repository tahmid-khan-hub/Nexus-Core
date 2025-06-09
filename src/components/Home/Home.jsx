import React, { useEffect } from 'react';
import Banner from '../Banner/Banner';
import CourseSection from '../CourseSection/CourseSection';
import PopularSection from '../PopularSection/PopularSection';
import HallOfFame from '../HallOfFame/HallOfFame'
import Categories from '../Categories/Categories';
import { useLoaderData } from 'react-router';

const Home = () => {

    const coursesData = useLoaderData();
    console.log(coursesData); 

    useEffect(() =>{
        window.scrollTo(0,0);
    },[])

    return (
        <div>
            <Banner></Banner>
            <CourseSection></CourseSection>
            <PopularSection></PopularSection>
            <Categories></Categories>
            <HallOfFame></HallOfFame>
        </div>
    );
};

export default Home;