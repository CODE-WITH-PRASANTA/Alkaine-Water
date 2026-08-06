import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // Check if user is authenticated in storage
  const isAuth = sessionStorage.getItem("isAdminAuthenticated") === "true";

  // If not authenticated, redirect to login page
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;