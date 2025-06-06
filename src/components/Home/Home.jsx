import React from 'react';
import Banner from '../Banner/Banner';
import CourseSection from '../CourseSection/CourseSection';
import PopularSection from '../PopularSection/PopularSection';
import HallOfFame from '../HallOfFame/HallOfFame'

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <CourseSection></CourseSection>
            <PopularSection></PopularSection>
            <HallOfFame></HallOfFame>
        </div>
    );
};

export default Home;