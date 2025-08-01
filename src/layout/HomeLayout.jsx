import React from 'react';
import { Outlet, useLocation, useNavigation } from 'react-router';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Banner from '../components/Banner/Banner';

const HomeLayout = () => {
    const location = useLocation();
    const navigation = useNavigation();

    console.log('Navigation state:', navigation.state); 
    
    const showBannerRoutes = ['/', '/home'];
    const shouldShowBanner = showBannerRoutes.includes(location.pathname);

    return (
        <div>
            <Navbar />
            
            {shouldShowBanner && <Banner />}

            <div className='w-[96%] md:max-w-[1500px] mx-auto '>
                <Outlet />
            </div>

            <Footer />
        </div>
    );
};

export default HomeLayout;
