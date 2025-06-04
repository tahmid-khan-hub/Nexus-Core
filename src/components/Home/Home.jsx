import React from 'react';
import Banner from '../Banner/Banner';
import CourseSection from '../CourseSection/CourseSection';
import PopularSection from '../PopularSection/PopularSection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <CourseSection></CourseSection>
            <PopularSection></PopularSection>
        </div>
    );
};

export default Home;