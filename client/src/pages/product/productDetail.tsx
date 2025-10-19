import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../../services/client";
import { addProductToCart } from "../../services/cart";
import type { Product } from "../../types/client";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      getProduct(id).then((resp) => setProduct(resp.data.data));
    }
  }, [id]);

  const handleIncrease = () => {
    setQuantity((q) => q + 1);
  };

  const handleDecrease = () => {
    setQuantity((q) => (q > 1 ? q - 1 : 1));
  };

  const handleAddToCart = async () => {
    if (!product) return;
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      await addProductToCart({ productId: product.id, quantity });
      setSuccess("Added to cart!");
      setTimeout(() => setSuccess(null), 1200);
    } catch (err: any) {
      setError("Could not add to cart");
      setTimeout(() => setError(null), 1200);
    } finally {
      setLoading(false);
    }
  };

  if (!product) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full max-w-md h-64 object-cover rounded mb-4"
        />
      )}
      <div className="mb-2 text-gray-700">{product.description}</div>
      <div className="flex gap-4 text-lg">
        <span>
          <strong>Price:</strong> ${product.price}
        </span>
        <span>
          <strong>Stock:</strong> {product.stock}
        </span>
      </div>
      <div className="mt-4 text-sm text-gray-500">Product ID: {product.id}</div>
      <div className="mt-6 flex items-center gap-4">
        <button
          className="bg-gray-300 px-3 py-1 rounded text-lg"
          onClick={handleDecrease}
          disabled={loading || quantity <= 1}
        >
          -
        </button>
        <span className="px-2">{quantity}</span>
        <button
          className="bg-gray-300 px-3 py-1 rounded text-lg"
          onClick={handleIncrease}
          disabled={loading}
        >
          +
        </button>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={handleAddToCart}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add to Cart"}
        </button>
      </div>
      {success && <div className="text-green-600 mt-2">{success}</div>}
      {error && <div className="text-red-600 mt-2">{error}</div>}
    </div>
  );
};

export default ProductDetail;
