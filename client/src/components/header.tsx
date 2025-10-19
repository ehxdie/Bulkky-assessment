import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getCart } from "../services/cart";

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
          onClick={handleCartClick}
          className="relative bg-gray-200 p-2 rounded hover:bg-gray-300 transition"
          title="View Cart"
        >
          <span role="img" aria-label="cart" className="text-xl">
            🛒
          </span>
        </button>
        {showCart && (
          <div className="absolute right-24 top-16 bg-white shadow-lg rounded p-4 w-80 max-h-96 overflow-y-auto border z-20">
            <h3 className="font-bold mb-2">Cart Items</h3>
            {loading ? (
              <div>Loading...</div>
            ) : cartItems.length === 0 ? (
              <div>No items in cart.</div>
            ) : (
              <ul>
                {cartItems.map((item) => (
                  <li key={item.id} className="mb-2 border-b pb-2">
                    <div className="font-semibold">{item.product?.name || "Product"}</div>
                    <div className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </div>
                    <div className="text-sm text-gray-700">
                      Price: ${item.product?.price ?? "N/A"}
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <button
              className="mt-2 text-blue-600 underline"
              onClick={() => setShowCart(false)}
            >
              Close
            </button>
          </div>
        )}
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