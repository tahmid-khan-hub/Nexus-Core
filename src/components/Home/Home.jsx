import React, { useEffect } from 'react';
import Banner from '../Banner/Banner';
import CourseSection from '../CourseSection/CourseSection';
import PopularSection from '../PopularSection/PopularSection';
import HallOfFame from '../HallOfFame/HallOfFame'
import Categories from '../Categories/Categories';
import { useLoaderData } from 'react-router';

const Home = () => {

    const coursesData = useLoaderData();

    useEffect(() =>{
        window.scrollTo(0,0);
        document.title = "NexusCore | Home"
    },[])

    return (
        <div>
            <Banner></Banner>
            <CourseSection coursesData={coursesData}></CourseSection>
            <PopularSection coursesData={coursesData}></PopularSection>
            <Categories coursesData={coursesData}></Categories>
            <HallOfFame></HallOfFame>
        </div>
    );
};

export default Home;