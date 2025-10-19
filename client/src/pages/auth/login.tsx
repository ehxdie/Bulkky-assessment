import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import type { LoginRequest } from "../../types/auth";

const Login: React.FC<{ onSwitch: () => void }> = ({ onSwitch }) => {
  const [form, setForm] = useState<LoginRequest>({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    if (auth?.user) {
      if (auth.user.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/products");
      }
    }
  }, [auth?.user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await auth?.login(form);
      setSuccess("Login successful!");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-50 font-sans"
      style={{ fontFamily: "Montserrat, Arial, sans-serif" }}
    >
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 mx-2">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-500 text-sm">Sign in to your account</p>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label className="text-sm font-medium text-gray-700" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
            required
          />
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
            required
          />
          <button
            type="submit"
            className="bg-gray-700 text-white rounded px-4 py-2 font-semibold shadow hover:bg-gray-800 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <div className="text-red-500 text-center">{error}</div>}
          {success && (
            <div className="text-green-600 text-center">{success}</div>
          )}
        </form>
        <div className="mt-6 text-center">
          <button
            type="button"
            className="text-gray-700 underline font-medium"
            onClick={onSwitch}
          >
            Don't have an account? Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
