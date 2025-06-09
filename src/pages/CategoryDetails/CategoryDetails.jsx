import React from 'react';

const CategoryDetails = ({category}) => {

    const {certificateIncluded, date, description, duration, language, photoURL, title, _id} = category

    console.log(certificateIncluded, date, description, duration, language, photoURL, title, _id);

    return (
        <div>
            
        </div>
    );
};

export default CategoryDetails;