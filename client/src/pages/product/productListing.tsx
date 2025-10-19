import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../../services/client";
import type { Product } from "../../types/client";

const ProductListing: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllProducts().then((resp) => setProducts(resp.data.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <li
            key={product.id}
            className="border rounded p-4 cursor-pointer hover:shadow-lg transition"
            onClick={() => navigate(`/products/${product.id}`)}
          >
            <div className="font-semibold text-lg">{product.name}</div>
            <div className="flex gap-4 text-sm text-gray-700">
              <span>
                <strong>Price:</strong> ${product.price}
              </span>
              <span>
                <strong>Stock:</strong> {product.stock}
              </span>
            </div>
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-32 object-cover mt-2 rounded"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductListing;
