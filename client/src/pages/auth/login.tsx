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
        navigate("/");
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
      // No need to manually navigate here; useEffect will handle it when user is set
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="p-6 flex flex-col gap-4" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-2">Login</h2>
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="border rounded px-3 py-2"
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="border rounded px-3 py-2"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white rounded px-4 py-2"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-600">{success}</div>}
      <button
        type="button"
        className="text-blue-600 underline mt-2"
        onClick={onSwitch}
      >
        Don't have an account? Register
      </button>
    </form>
  );
};

export default Login;
