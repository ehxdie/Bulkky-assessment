import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getCart } from "../services/cart";
import Cart from "./cart";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    auth?.logout();
    window.location.href = "/login";
  };

  const handleCartClick = async () => {
    setShowCart((prev) => !prev);
    if (!showCart) {
      setLoading(true);
      try {
        const resp = await getCart();
        setCartItems(resp.data.data);
      } catch {
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <header className="w-full flex items-center justify-between p-4 bg-white border-b relative z-10">
      <button
        onClick={() => navigate("/products")}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Home
      </button>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setShowCart((prev) => !prev)}
          className="relative bg-gray-200 p-2 rounded hover:bg-gray-300 transition"
          title="View Cart"
        >
          <span role="img" aria-label="cart" className="text-xl">
            🛒
          </span>
        </button>
        {showCart && <Cart onClose={() => setShowCart(false)} />}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;