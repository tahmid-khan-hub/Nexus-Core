import React from "react";
import { createBrowserRouter } from "react-router";
import HomeLayout from "../layout/HomeLayout";
import Home from "../components/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AddCourse from "../PrivatePages/AddCourse/AddCourse"
import MyEnrolledCourses from "../PrivatePages/MyEnrolledCourses/MyEnrolledCourses";
import ManageCourses from "../PrivatePages/ManageCourses/ManageCourses"

const Router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        path: "",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "/addCourse",
        element: <AddCourse></AddCourse>
      },
      {
        path: "/myEnrolledCourses",
        element: <MyEnrolledCourses></MyEnrolledCourses>
      },
      {
        path: "/manageCourses",
        element: <ManageCourses></ManageCourses>
      }
    ],
  },
]);

export default Router;
