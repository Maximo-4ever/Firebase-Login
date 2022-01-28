import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function ProtectedRoute({ children }) {
  const { user, login } = useAuth();

  if (!login) return <h1>Loading...</h1>;
  if (!user) return <Navigate to="/login" />;

  return <>{children}</>;
}
