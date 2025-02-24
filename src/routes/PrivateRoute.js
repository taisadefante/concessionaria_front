import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PrivateRoute({ children }) {
  const { user } = useAuth();

  if (!user || user.email !== "taisadefante@hotmail.com") {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;
