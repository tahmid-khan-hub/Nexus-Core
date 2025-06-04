import React from "react";
import { createBrowserRouter } from "react-router";
import HomeLayout from "../layout/HomeLayout";
import Home from "../components/Home/Home";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children:[
        {
            path: "",
            element: <Home></Home>,
        }
    ]
  },
]);

export default Router;
