import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router";
import Router from "./router/Router.jsx";
import AuthProvider from "./contexts/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={Router} />
    </AuthProvider>
  </StrictMode>
);
