import React from "react";
import { createBrowserRouter } from "react-router";
import HomeLayout from "../layout/HomeLayout";
import Home from "../components/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AddCourse from "../PrivatePages/AddCourse/AddCourse";
import MyEnrolledCourses from "../PrivatePages/MyEnrolledCourses/MyEnrolledCourses";
import ManageCourses from "../PrivatePages/ManageCourses/ManageCourses";
import PrivateRoute from "../routes/PrivateRoute";
import CategoryDetails from "../pages/CategoryDetails/CategoryDetails";
import Category from "../pages/Category/Category";
import CourseDetails from "../pages/CourseDetails/CourseDetails";
import UpdateCourse from "../PrivatePages/UpdateCourse/UpdateCourse";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Faq from "../pages/Faq/Faq";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        path: "",
        element: <Home></Home>,
        loader: () => fetch("https://course-management-server-pi.vercel.app/courses"),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/addCourse",
        element: (
          <PrivateRoute>
            <AddCourse></AddCourse>
          </PrivateRoute>
        ),
      },
      {
        path: "/myEnrolledCourses",
        element: (
          <PrivateRoute>
            <MyEnrolledCourses></MyEnrolledCourses>
          </PrivateRoute>
        ),
        loader: ()=> fetch("https://course-management-server-pi.vercel.app/userCourses")
      },
      {
        path: "/manageCourses",
        element: (
          <PrivateRoute>
            <ManageCourses></ManageCourses>
          </PrivateRoute>
        ),
        loader: () => fetch("https://course-management-server-pi.vercel.app/courses"),
      },
      {
        path: "/updateCourse/:id",
        element: (
          <PrivateRoute>
            <UpdateCourse></UpdateCourse>
          </PrivateRoute>
        ),
        loader: () => fetch("https://course-management-server-pi.vercel.app/courses"),
      },
      {
        path: "/Category/:category",
        element: <Category></Category>,
        loader: () => fetch("https://course-management-server-pi.vercel.app/courses"),
      },
      {
        path: "/categoryDetails",
        element: <CategoryDetails></CategoryDetails>,
        loader: () => fetch("https://course-management-server-pi.vercel.app/courses"),
      },
      {
        path: "/courseDetails/:id",
        element: <CourseDetails></CourseDetails>,
        loader: () => fetch("https://course-management-server-pi.vercel.app/courses"),
      },
      {
        path: "/faq",
        element: <Faq></Faq>
      }
    ],
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>
  }
]);

export default Router;
