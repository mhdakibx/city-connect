import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate } from "react-router";
import toast from "react-hot-toast";

const PrivateRoutes = ({ children }) => {
  const { authUser, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!authUser) {
        
        return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoutes;