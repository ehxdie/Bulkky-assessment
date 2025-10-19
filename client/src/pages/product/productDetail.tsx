import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../../services/client";
import type { Product } from "../../types/client";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      getProduct(id).then((resp) => setProduct(resp.data.data));
    }
  }, [id]);

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
    </div>
  );
};

export default ProductDetail;
