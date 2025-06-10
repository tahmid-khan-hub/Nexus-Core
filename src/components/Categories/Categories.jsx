import * as motion from "motion/react-client";
import React from 'react';
import { Link } from 'react-router';

const Categories = () => {
    const category = [
        'Technology',
        'Business',
        'Marketing',
        'UiUxDesign',
        'Finance',
        'Photography',
        'Communication',
        'CareerDevelopment'
    ];

    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {category.map((cat, index) => (
                <Link to={`Category/${cat}`} key={index}>
                    <motion.div
                        className='border-2 p-5'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <h2>{cat}</h2>
                    </motion.div>
                </Link>
            ))}
        </div>
    );
};

export default Categories;
