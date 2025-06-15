import React from 'react';
import UseAxiosSecure from './UseAxiosSecure';

const UseApplicationApi = () => {
    const axiosSecure = UseAxiosSecure();

    const addCoursePromise = (email, courseData) =>{
        return axiosSecure.post(`courses?email=${email}`, courseData)
        .then(res => res.data)
    }

    const manageCoursesPromise = (id, email) => {
        return axiosSecure.delete(`courses/${id}?email=${email}`).then(res => res.data);
    };

    return {
        addCoursePromise,
        manageCoursesPromise
    }
};

export default UseApplicationApi;