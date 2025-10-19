import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/auth";
import type { SignUpRequest } from "../../types/auth";

const Register: React.FC<{ onSwitch: () => void }> = ({ onSwitch }) => {
  const [form, setForm] = useState<SignUpRequest>({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const resp = await register(form);
      setSuccess(resp.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 mx-2 font-sans"
      style={{ fontFamily: "Montserrat, Arial, sans-serif" }}
    >
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Create Account
        </h1>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="text-sm font-medium text-gray-700" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
          required
        />
        <label className="text-sm font-medium text-gray-700" htmlFor="email">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
          required
        />
        <label className="text-sm font-medium text-gray-700" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
          required
        />
        <label className="text-sm font-medium text-gray-700" htmlFor="role">
          Role
        </label>
        <select
          id="role"
          name="role"
          value={form.role}
          onChange={handleChange}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
          required
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
        <button
          type="submit"
          className="bg-gray-700 text-white rounded px-4 py-2 font-semibold shadow hover:bg-gray-800 transition"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
        {error && <div className="text-red-500 text-center">{error}</div>}
        {success && <div className="text-green-600 text-center">{success}</div>}
      </form>
      <div className="mt-6 text-center">
        <button
          type="button"
          className="text-gray-700 underline font-medium"
          onClick={onSwitch}
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
};

export default Register;
