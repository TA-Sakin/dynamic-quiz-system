import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../shared/Loading";
import { useAuth } from "../../Context/AuthContext";

const PublicRoute = ({ children }) => {
  const { currentUser: user, loading } = useAuth();
  let location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default PublicRoute;
