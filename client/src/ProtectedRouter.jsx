import React from "react";
import { useAuth } from "./context/AuthContext";
import { Navigate, Outlet } from "react-router";
function ProtectedRouter() {
  const { use, isAuthenticated, isLoading } = useAuth();
  console.log(isLoading, isAuthenticated);

  if (isLoading) return <h1>Loading...</h1>;

  if (!isLoading && !isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
}

export default ProtectedRouter;
