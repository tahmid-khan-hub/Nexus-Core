import React from 'react';
import UseAxiosSecure from './UseAxiosSecure';

const UseApplicationApi = () => {
  const axiosSecure = UseAxiosSecure();

  // Courses
  const addCoursePromise = (email, courseData) => {
    return axiosSecure.post(`courses?email=${email}`, courseData).then(res => res.data);
  };

  const updateCoursePromise = (_id, email, courseData) => {
    return axiosSecure.put(`courses/${_id}?email=${email}`, courseData).then(res => res.data);
  };

  const manageCoursesPromise = (id, email) => {
    return axiosSecure.delete(`courses/${id}?email=${email}`).then(res => res.data);
  };

  const enrollIncrement = (id, newEnrollCount, email) => {
    return axiosSecure.patch(`courses/${id}?email=${email}`, {
      enrolled: newEnrollCount,
    }).then(res => res.data);
  };

  const myEnrolledCoursesPatch = (courseId, email) => {
    return axiosSecure.patch(`courses/${courseId}/unenroll?email=${email}`).then(res => res.data);
  };

  // Enrollments
  const enrollPost = (courseData, email) => {
    return axiosSecure.post(`userCourses?email=${email}`, courseData).then(res => res.data);
  };

  const myEnrolledCoursesPromise = (id, email) => {
    return axiosSecure.delete(`userCourses/${id}?email=${email}`).then(res => res.data);
  };

  const courseDelete = (email, id) => {
    return axiosSecure.delete(`userCourses/${email}/${id}`).then(res => res.data);
  };

  const userCoursesCount = (email) => {
    return axiosSecure.get(`userCoursesCount?email=${email}`).then(res => res.data);
  };

  const userCoursesCheck = (email, courseId) => {
    return axiosSecure.get(`userCourses/check`, {
      params: { email, courseId },
    }).then(res => res.data);
  };

  return {
    addCoursePromise,
    updateCoursePromise,
    manageCoursesPromise,
    enrollIncrement,
    myEnrolledCoursesPatch,
    enrollPost,
    myEnrolledCoursesPromise,
    courseDelete,
    userCoursesCount,
    userCoursesCheck,
  };
};

export default UseApplicationApi;
