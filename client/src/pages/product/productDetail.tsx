import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../../services/client";
import { addProductToCart } from "../../services/cart";
import type { Product } from "../../types/client";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [adding, setAdding] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      getProduct(id).then((resp) => setProduct(resp.data.data));
    }
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;
    setAdding(true);
    setSuccess(null);
    setError(null);
    try {
      await addProductToCart({ productId: product.id, quantity: 1 });
      setSuccess("Added to cart!");
      setTimeout(() => setSuccess(null), 1200);
    } catch (err: any) {
      setError("Could not add to cart");
      setTimeout(() => setError(null), 1200);
    } finally {
      setAdding(false);
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
      <button
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        onClick={handleAddToCart}
        disabled={adding}
      >
        {adding ? "Adding..." : "Add to Cart"}
      </button>
      {success && <div className="text-green-600 mt-2">{success}</div>}
      {error && <div className="text-red-600 mt-2">{error}</div>}
    </div>
  );
};

export default ProductDetail;
