import React from 'react';
import { Link } from 'react-router';

const Categories = () => {

    const category = ['Technology' , 'Business' ,'Marketing' ,'UI/UX Design' ,'Finance' ,'Photography' ,'Communication' ,'Career Development'];

    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {/* tech */}
            <Link to={`Category/${category[0]}`}>
                <div className='border-2 p-5'>
                    <h2>Technology</h2>
                </div>
            </Link>

            {/* business */}
            <Link to={`Category/${category[1]}`}>
                <div className='border-2 p-5'>
                    <h2>Business</h2>
                </div>
            </Link>

            {/* Marketing */}
            <Link to={`Category/${category[2]}`}>
                <div className='border-2 p-5'>
                    <h2>Marketing</h2>
                </div>
            </Link>

            {/* UI/UX Design */}
            <Link to={`Category/${category[3]}`}>
                <div className='border-2 p-5'>
                    <h2>UI/UX Design</h2>
                </div>
            </Link>

            {/* Finance */}
            <Link to={`Category/${category[4]}`}>
                <div className='border-2 p-5'>
                    <h2>Finance</h2>
                </div>
            </Link>

            {/* Photography */}
            <Link to={`Category/${category[5]}`}>
                <div className='border-2 p-5'>
                    <h2>Photography</h2>
                </div>
            </Link>

            {/* Communication */}
            <Link to={`Category/${category[6]}`}>
                <div className='border-2 p-5'>
                    <h2>Communication</h2>
                </div>
            </Link>

            {/* Career Development */}
            <Link to={`Category/${category[7]}`}>
                <div className='border-2 p-5'>
                    <h2>Career Development</h2>
                </div>
            </Link>


        </div>
    );
};

export default Categories;