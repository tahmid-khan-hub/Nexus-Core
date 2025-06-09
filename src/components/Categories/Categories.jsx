import React from 'react';
import { Link } from 'react-router';

const Categories = ({coursesData}) => {
    console.log(coursesData);
    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {/* tech */}
            <Link>
                <div className='border-2 p-5'>
                    <h2>Technology</h2>
                </div>
            </Link>

            {/* business */}
            <Link>
                <div className='border-2 p-5'>
                    <h2>Business</h2>
                </div>
            </Link>

            {/* Marketing */}
            <Link>
                <div className='border-2 p-5'>
                    <h2>Marketing</h2>
                </div>
            </Link>

            {/* UI/UX Design */}
            <Link>
                <div className='border-2 p-5'>
                    <h2>UI/UX Design</h2>
                </div>
            </Link>

            {/* Finance */}
            <Link>
                <div className='border-2 p-5'>
                    <h2>Finance</h2>
                </div>
            </Link>

            {/* Photography */}
            <Link>
                <div className='border-2 p-5'>
                    <h2>Photography</h2>
                </div>
            </Link>

            {/* Communication */}
            <Link>
                <div className='border-2 p-5'>
                    <h2>Communication</h2>
                </div>
            </Link>

            {/* Career Development */}
            <Link>
                <div className='border-2 p-5'>
                    <h2>Career Development</h2>
                </div>
            </Link>


        </div>
    );
};

export default Categories;