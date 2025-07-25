import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import useUserRole from "../Hooks/useUserRole";
import Loader from "../pages/Loader/Loader";

const DashBoardRedirect = () => {
  const { role, roleLoading } = useUserRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (!roleLoading) {
      if (role === "admin") {
        navigate("/dashboard/adminProfile");
      } else {
        navigate("/dashboard/myProfile");
      }
    }
  }, [role, roleLoading, navigate]);

  if (roleLoading) return <Loader/>;
  return null;
};

export default DashBoardRedirect;