import React from "react";
import { createBrowserRouter } from "react-router";
import HomeLayout from "../layout/HomeLayout";
import Home from "../components/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AddCourse from "../PrivatePages/AddCourse/AddCourse"
import MyEnrolledCourses from "../PrivatePages/MyEnrolledCourses/MyEnrolledCourses";
import ManageCourses from "../PrivatePages/ManageCourses/ManageCourses"
import PrivateRoute from "../routes/PrivateRoute"

const Router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        path: "",
        element: <Home></Home>,
        loader: ()=> fetch("http://localhost:3000/courses"),
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
        element: <PrivateRoute>
          <AddCourse></AddCourse>
        </PrivateRoute>
      },
      {
        path: "/myEnrolledCourses",
        element: <PrivateRoute>
          <MyEnrolledCourses></MyEnrolledCourses>
        </PrivateRoute>
      },
      {
        path: "/manageCourses",
        element: <PrivateRoute>
          <ManageCourses></ManageCourses>
        </PrivateRoute>
      }
    ],
  },
]);

export default Router;
