import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../../services/client";
import { addProductToCart } from "../../services/cart";
import { createWishlist } from "../../services/wishlist";
import type { Product } from "../../types/client";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [wishMsg, setWishMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    (async () => {
      try {
        const resp = await getProduct(id);
        if (mounted) setProduct(resp.data.data);
      } catch {
        if (mounted) setProduct(null);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  const handleIncrease = () => setQuantity((q) => q + 1);
  const handleDecrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = async () => {
    if (!product) return;
    setLoading(true);
    setMsg(null);
    try {
      await addProductToCart({ productId: product.id, quantity });
      setMsg("Added to cart");
      setTimeout(() => setMsg(null), 1500);
    } catch {
      setMsg("Failed to add to cart");
      setTimeout(() => setMsg(null), 1500);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToWishlist = async () => {
    if (!product) return;
    setWishMsg(null);
    try {
      await createWishlist({ productId: product.id });
      setWishMsg("Added to wishlist");
      setTimeout(() => setWishMsg(null), 1400);
    } catch {
      setWishMsg("Failed to add to wishlist");
      setTimeout(() => setWishMsg(null), 1400);
    }
  };

  if (!product) {
    return (
      <div
        className="p-6 min-h-screen flex items-center justify-center bg-gray-50 font-sans"
        style={{ fontFamily: "Montserrat, Arial, sans-serif" }}
      >
        <div className="text-gray-600">Loading product...</div>
      </div>
    );
  }

  return (
    <div
      className="p-4 md:p-8 min-h-screen bg-gray-50 font-sans"
      style={{ fontFamily: "Montserrat, Arial, sans-serif" }}
    >
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 w-full">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-64 md:h-full object-cover"
              />
            ) : (
              <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-400">
                No image
              </div>
            )}
          </div>

          <div className="md:w-1/2 w-full p-6 flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              {product.name}
            </h1>
            <p className="text-sm text-gray-600 mb-4">{product.description}</p>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="text-lg text-gray-900 font-semibold">
                  {" "}
                  ${product.price}{" "}
                </div>
                <div className="text-sm text-gray-600">
                  Stock: {product.stock}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleDecrease}
                  disabled={loading || quantity <= 1}
                  className="bg-gray-200 text-gray-800 px-3 py-1 rounded"
                >
                  -
                </button>
                <div className="px-3 py-1 border rounded text-gray-800">
                  {quantity}
                </div>
                <button
                  onClick={handleIncrease}
                  disabled={loading}
                  className="bg-gray-200 text-gray-800 px-3 py-1 rounded"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                disabled={loading}
                className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition"
              >
                {loading ? "Adding..." : `Add to Cart (${quantity})`}
              </button>

              <button
                onClick={handleAddToWishlist}
                disabled={loading}
                className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition"
              >
                Add to Wishlist
              </button>
            </div>

            {msg && <div className="mt-4 text-sm text-green-600">{msg}</div>}
            {wishMsg && (
              <div className="mt-2 text-sm text-green-600">{wishMsg}</div>
            )}

            <div className="mt-auto pt-4 text-xs text-gray-500">
              Product ID: {product.id}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
