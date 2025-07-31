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
import Settings from "../PrivatePages/Settings/Settings";
import Feedback from "../PrivatePages/Feedback/Feedback";
import AllFeedback from "../PrivatePages/AllFeedback/AllFeedback";
import CoursePayment from "../PrivatePages/CoursePayment/CoursePayment";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        path: "",
        element: <Home></Home>,
        loader: () => fetch("http://localhost:3000/courses"),
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
        path: "/payment",
        element: <PrivateRoute>
          <CoursePayment></CoursePayment>
        </PrivateRoute>,
        loader: () => fetch("http://localhost:3000/courses"),
      },
      {
        path: "/updateCourse/:id",
        element: (
          <PrivateRoute>
            <UpdateCourse></UpdateCourse>
          </PrivateRoute>
        ),
        loader: () => fetch("http://localhost:3000/courses"),
      },
      {
        path: "/Category/:category",
        element: <Category></Category>,
        loader: () => fetch("http://localhost:3000/courses"),
      },
      {
        path: "/categoryDetails",
        element: <CategoryDetails></CategoryDetails>,
        loader: () => fetch("http://localhost:3000/courses"),
      },
      {
        path: "/courseDetails/:id",
        element: <CourseDetails></CourseDetails>,
        loader: () => fetch("http://localhost:3000/courses"),
      },
      {
        path: "/allCourses",
        element: <AllCourses></AllCourses>,
        loader: () => fetch("http://localhost:3000/courses"),
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
        </PrivateRoute>,
        loader: ()=> fetch("http://localhost:3000/userCourses")
      },
      {
        path: "/dashboard/myEnrolledCourses",
        element: <PrivateRoute>
          <MyEnrolledCourses></MyEnrolledCourses>
        </PrivateRoute>,
        loader: ()=> fetch("http://localhost:3000/userCourses")
      },

      // admin
      {
        path: "adminProfile",
        element: <AdminRoute>
          <AdminProfile></AdminProfile>
        </AdminRoute>,
        loader: () => fetch("http://localhost:3000/courses"),
      },
      {
        path: "/dashboard/addCourse",
        element: <AdminRoute>
          <AddCourse></AddCourse>
        </AdminRoute>
      },
      {
        path: "/dashboard/manageCourses",
        element: <AdminRoute>
          <ManageCourses></ManageCourses>
        </AdminRoute>,
        loader: () => fetch("http://localhost:3000/courses"),
      },
      {
        path: "/dashboard/allFeedback",
        element: <AdminRoute>
          <AllFeedback></AllFeedback>
        </AdminRoute>
      },

      // user settings
      {
        path: "/dashboard/settings",
        element: <PrivateRoute>
          <Settings></Settings>
        </PrivateRoute>
      },
      {
        path: "/dashboard/feedback",
        element: <PrivateRoute>
          <Feedback></Feedback>
        </PrivateRoute>
      }
    ]
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>
  }
]);

export default Router;
