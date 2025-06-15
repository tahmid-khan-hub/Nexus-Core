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

    const myEnrolledCoursesPromise = (id, email) =>{
        return axiosSecure.delete(`userCourses/${id}?email=${email}`)
        .then(res => res.data)
    }

    const myEnrolledCoursesPatch = (courseId, email) =>{
        return axiosSecure.patch(`courses/${courseId}/unenroll?email=${email}`)
        .then(res => res.data)
    }

    const updateCoursePromise = (_id, email, courseData) =>{
        return axiosSecure.put(`courses/${_id}?email=${email}`, courseData)
        .then(res => res.data)
    }

    return {
        addCoursePromise,
        manageCoursesPromise,
        myEnrolledCoursesPromise,
        myEnrolledCoursesPatch,
        updateCoursePromise,
    }
};

export default UseApplicationApi;