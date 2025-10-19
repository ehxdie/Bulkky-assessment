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
import ProductListing from "./pages/product/productListing";
import ProductDetail from "./pages/product/productDetail";
import Orders from "./pages/orders/orders";
import Wishlist from "./pages/wishlist/wishlist";
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
        <Route path="/products" element={<ProductListing />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/wishlist" element={<Wishlist />} />
        {/* Redirect non-admin users from "/" to product listing */}
        <Route path="/" element={<Navigate to="/products" replace />} />
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/products" replace />} />
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
