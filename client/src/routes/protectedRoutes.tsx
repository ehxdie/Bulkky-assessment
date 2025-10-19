import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function PrivateRoute({ children: any }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
}

// For admin-only:
export function AdminRoute({ children }) {
  const { user } = useAuth();
  if (!user || user.role !== "ADMIN") {
    return <Navigate to="/" />;
  }
  return children;
}
