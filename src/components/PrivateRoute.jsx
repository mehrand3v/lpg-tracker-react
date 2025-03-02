import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  // If still loading auth state, show a loading spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // Check for user in both state and session storage
  const sessionUser = sessionStorage.getItem("user");

  // If not authenticated in state or session, redirect to login
  if (!currentUser && !sessionUser) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the protected component
  return children;
};

export default PrivateRoute;
