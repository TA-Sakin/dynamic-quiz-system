import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../shared/Loading";
import { useAuth } from "../../Context/AuthContext";

const PublicRoute = ({ children }) => {
  const { currentUser: user, loading, token } = useAuth();
  let location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return children;
};

export default PublicRoute;
