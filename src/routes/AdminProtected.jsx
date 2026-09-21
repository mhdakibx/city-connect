
import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../context/AuthProvider";

const AdminProtected = ({ children }) => {
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

  if (authUser?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminProtected;
