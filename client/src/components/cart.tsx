import React, { useEffect, useState } from "react";
import {
  getCart,
  deleteCartItem,
  updateCartItemQuantity,
} from "../services/cart";
import { placeOrderFromCart } from "../services/orders";
import type { GetCartResponse } from "../types/cart";

const Cart: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [cartItems, setCartItems] = useState<GetCartResponse["data"]>([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const resp = await getCart();
      setCartItems(resp.data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleDelete = async (cartItemId: string) => {
    await deleteCartItem(cartItemId);
    fetchCart();
  };

  const handleIncrease = async (cartItemId: string, quantity: number) => {
    await updateCartItemQuantity(cartItemId, { quantity: quantity + 1 });
    fetchCart();
  };

  const handleDecrease = async (cartItemId: string, quantity: number) => {
    if (quantity <= 1) return;
    await updateCartItemQuantity(cartItemId, { quantity: quantity - 1 });
    fetchCart();
  };

  const handlePlaceOrderClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmOrder = async () => {
    setPlacingOrder(true);
    setOrderSuccess(null);
    setOrderError(null);
    try {
      await placeOrderFromCart();
      setOrderSuccess("Order placed successfully!");
      setCartItems([]); // Optionally clear cart after order
      setTimeout(() => setOrderSuccess(null), 1500);
    } catch (err: any) {
      setOrderError("Failed to place order.");
      setTimeout(() => setOrderError(null), 1500);
    } finally {
      setPlacingOrder(false);
      setShowConfirm(false);
    }
  };

  const handleCancelConfirm = () => {
    setShowConfirm(false);
  };

  return (
    <div
      className="absolute right-2 md:right-24 top-16 bg-white shadow-lg rounded-xl p-4 w-full max-w-xs md:max-w-sm max-h-96 overflow-y-auto border z-20 font-sans"
      style={{ fontFamily: "Montserrat, Arial, sans-serif" }}
    >
      <h3 className="font-bold mb-2 text-gray-800 text-lg text-center">
        Cart Items
      </h3>
      {loading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : cartItems.length === 0 ? (
        <div className="text-center text-gray-500">No items in cart.</div>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="mb-2 border-b pb-2 flex justify-between items-center"
            >
              <div>
                <div className="font-semibold text-gray-800">
                  {item.product?.name || "Product"}
                </div>
                <div className="text-sm text-gray-600 flex items-center gap-2">
                  <button
                    className="bg-gray-300 px-2 rounded"
                    onClick={() => handleDecrease(item.id, item.quantity)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>Quantity: {item.quantity}</span>
                  <button
                    className="bg-gray-300 px-2 rounded"
                    onClick={() => handleIncrease(item.id, item.quantity)}
                  >
                    +
                  </button>
                </div>
                <div className="text-sm text-gray-700">
                  Price: ${item.product?.price ?? "N/A"}
                </div>
              </div>
              <button
                className="ml-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      {orderSuccess && (
        <div className="text-green-600 mt-2 text-center">{orderSuccess}</div>
      )}
      {orderError && (
        <div className="text-red-600 mt-2 text-center">{orderError}</div>
      )}
      {showConfirm ? (
        <div className="mt-4 flex flex-col items-center">
          <div className="mb-2 font-semibold text-gray-700 text-center">
            Are you sure you want to place this order?
          </div>
          <div className="flex gap-2">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded font-semibold"
              onClick={handleConfirmOrder}
              disabled={placingOrder}
            >
              {placingOrder ? "Placing..." : "Confirm"}
            </button>
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded font-semibold"
              onClick={handleCancelConfirm}
              disabled={placingOrder}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded w-full font-semibold"
          onClick={handlePlaceOrderClick}
          disabled={placingOrder || cartItems.length === 0}
        >
          Place Order
        </button>
      )}
      <button
        className="mt-2 text-blue-600 underline w-full font-medium"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};

export default Cart;
