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
import AllCourses from "../pages/AllCourses/AllCourses";
import About from "../pages/About/About";
import Terms from "../pages/Terms/Terms";
import Privacy from "../pages/Privacy/Privacy";
import DashBoardLayout from "../layout/DashBoardLayout";
import DashBoardRedirect from "../layout/DashBoardRedirect";
import MyProfile from "../PrivatePages/MyProfile/MyProfile";
import AdminRoute from "../routes/AdminRoute";
import AdminProfile from "../PrivatePages/AdminProfile/AdminProfile";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        path: "",
        element: <Home></Home>,
        loader: () => fetch("https://nex-us-core-server.vercel.app/courses"),
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
        loader: ()=> fetch("https://nex-us-core-server.vercel.app/userCourses")
      },
      {
        path: "/manageCourses",
        element: (
          <PrivateRoute>
            <ManageCourses></ManageCourses>
          </PrivateRoute>
        ),
        loader: () => fetch("https://nex-us-core-server.vercel.app/courses"),
      },
      {
        path: "/updateCourse/:id",
        element: (
          <PrivateRoute>
            <UpdateCourse></UpdateCourse>
          </PrivateRoute>
        ),
        loader: () => fetch("https://nex-us-core-server.vercel.app/courses"),
      },
      {
        path: "/Category/:category",
        element: <Category></Category>,
        loader: () => fetch("https://nex-us-core-server.vercel.app/courses"),
      },
      {
        path: "/categoryDetails",
        element: <CategoryDetails></CategoryDetails>,
        loader: () => fetch("https://nex-us-core-server.vercel.app/courses"),
      },
      {
        path: "/courseDetails/:id",
        element: <CourseDetails></CourseDetails>,
        loader: () => fetch("https://nex-us-core-server.vercel.app/courses"),
      },
      {
        path: "/allCourses",
        element: <AllCourses></AllCourses>,
        loader: () => fetch("https://nex-us-core-server.vercel.app/courses"),
      },
      {
        path: "/faq",
        element: <Faq></Faq>
      },
      {
        path: "/about",
        element: <About></About>
      },
      {
        path: "/terms",
        element: <Terms></Terms>
      },
      {
        path: "/privacy",
        element: <Privacy></Privacy>
      }
    ],
  },
  {
    path: "dashboard",
    element: <PrivateRoute>
      <DashBoardLayout></DashBoardLayout>
    </PrivateRoute>,
    children:[
      {
        index: true,
        element: <PrivateRoute>
          <DashBoardRedirect></DashBoardRedirect>
        </PrivateRoute>
      },

      // user
      {
        path: "myProfile",
        element: <PrivateRoute>
          <MyProfile></MyProfile>
        </PrivateRoute>
      },
      {
        path: "dashboard/myEnrolledCourses",
        element: <PrivateRoute>
          <MyEnrolledCourses></MyEnrolledCourses>
        </PrivateRoute>
      },

      // admin
      {
        path: "adminProfile",
        element: <AdminRoute>
          <AdminProfile></AdminProfile>
        </AdminRoute>
      },
      {
        path: "dashboard/addCourse",
        element: <AdminRoute>
          <AddCourse></AddCourse>
        </AdminRoute>
      },
      {
        path: "dashboard/manageCourses",
        element: <AdminRoute>
          <ManageCourses></ManageCourses>
        </AdminRoute>
      }
    ]
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>
  }
]);

export default Router;
