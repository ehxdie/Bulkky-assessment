import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainContainer from "./components/mainContainer";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import { AuthProvider } from "./hooks/useAuth";
import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  return (
    <Router>
      <AuthProvider>
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
          </Routes>
        </MainContainer>
      </AuthProvider>
    </Router>
  );
}

export default App;
