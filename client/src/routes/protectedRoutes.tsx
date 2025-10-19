import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function PrivateRoute({ children }: ProtectedRouteProps) {
  const auth = useAuth();
  const user = auth?.user;
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

export function AdminRoute({ children }: ProtectedRouteProps) {
  const auth = useAuth();
  const user = auth?.user;
  if (!user || user.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}
