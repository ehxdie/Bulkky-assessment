import React, { useState, useEffect, createContext, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { login as loginAPI } from "../services/auth";
import type { LoginRequest, LoginResponse } from "../types/auth";

const AuthContext = createContext<{
  user: any;
  login: (credentials: LoginRequest) => Promise<LoginResponse>;
  logout: () => void;
} | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
          setUser(null);
        } else {
          setUser(decoded);
        }
      } catch (e) {
        console.error("Invalid token", e);
        localStorage.removeItem("token");
        setUser(null);
      }
    }
  }, []);

  async function login(credentials: LoginRequest) {
    const resp = await loginAPI(credentials);
    const token = resp.data.data.token;
    localStorage.setItem("token", token);
    const decoded: any = jwtDecode(token);
    setUser(decoded);
    return resp.data;
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
