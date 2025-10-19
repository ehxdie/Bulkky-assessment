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

  useEffect(() => {
    const fetchCartCount = async () => {
      setLoading(true);
      try {
        const resp = await getCart();
        setCartItems(resp.data.data);
      } catch {
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCartCount();
  }, []);

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

  const cartCount = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );

  const handleLogout = () => {
    auth?.logout();
    window.location.href = "/login";
  };

  // Only show navigation buttons if user role is USER
  const isUser = auth?.user?.role === "USER";

  return (
    <header
      className="w-full flex flex-col md:flex-row items-center justify-between px-4 py-3 bg-white border-b shadow-sm font-sans"
      style={{ fontFamily: "Montserrat, Arial, sans-serif" }}
    >
      <div className="flex items-center gap-2 md:gap-4 mb-2 md:mb-0">
        {isUser && (
          <>
            <button
              onClick={() => navigate("/products")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold text-sm"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/orders")}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition font-semibold text-sm"
            >
              Orders
            </button>
            <button
              onClick={() => navigate("/wishlist")}
              className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition font-semibold text-sm"
            >
              Wishlist
            </button>
          </>
        )}
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <button
          onClick={handleCartClick}
          className="relative bg-gray-200 p-2 rounded hover:bg-gray-300 transition"
          title="View Cart"
        >
          <span role="img" aria-label="cart" className="text-xl">
            🛒
          </span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs font-bold">
              {cartCount}
            </span>
          )}
        </button>
        {showCart && <Cart onClose={() => setShowCart(false)} />}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition font-semibold text-sm"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
