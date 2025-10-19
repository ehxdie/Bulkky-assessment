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
      // Redirect to login after successful registration
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
    <form className="p-6 flex flex-col gap-4" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-2">Register</h2>
      <input
        name="name"
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="border rounded px-3 py-2"
        required
      />
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
      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        className="border rounded px-3 py-2"
        required
      >
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
      </select>
      <button
        type="submit"
        className="bg-blue-600 text-white rounded px-4 py-2"
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-600">{success}</div>}
      <button
        type="button"
        className="text-blue-600 underline mt-2"
        onClick={onSwitch}
      >
        Already have an account? Login
      </button>
    </form>
  );
};

export default Register;
