import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../shared/Loading";
import { useAuth } from "../../Context/AuthContext";

const RequireAuth = ({ children }) => {
  const { currentUser: user, loading } = useAuth();
  let location = useLocation();

  if (loading) {
    return <Loading></Loading>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
