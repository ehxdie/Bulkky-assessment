import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import MainContainer from "./components/mainContainer";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import AdminDashboard from "./pages/admin/dashboard";
import { AuthProvider } from "./hooks/useAuth";
import { AdminRoute } from "./routes/protectedRoutes";

function AppRoutes() {
  const navigate = useNavigate();

  return (
    <MainContainer>
      <Routes>
        <Route
          path="/login"
          element={<Login onSwitch={() => navigate("/register")} />}
        />
        <Route
          path="/register"
          element={<Register onSwitch={() => navigate("/login")} />}
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </MainContainer>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
