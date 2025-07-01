import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Banner from '../components/Banner/Banner';

const HomeLayout = () => {
    return (
        <div className=''>
            <Navbar></Navbar>
            <Banner></Banner>
            <div className='w-[96%] md:max-w-[1500px] mx-auto '>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default HomeLayout;