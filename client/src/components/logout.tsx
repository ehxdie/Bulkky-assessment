import React from "react";
import { useAuth } from "../hooks/useAuth";

const LogoutButton: React.FC = () => {
  const auth = useAuth();

  const handleLogout = () => {
    auth?.logout();
    // Optionally, you can redirect to login page here if needed
    window.location.href = "/login";
  };

  if (!auth?.user) return null;

  return (
    <div className="w-full flex justify-end p-4 bg-white border-b">
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
