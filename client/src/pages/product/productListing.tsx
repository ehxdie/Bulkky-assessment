import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../../services/client";
import type { Product } from "../../types/client";

const ProductListing: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [addingId, setAddingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const resp = await getAllProducts();
        if (mounted) setProducts(resp.data.data || []);
      } catch {
        if (mounted) setProducts([]);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  
  return (
    <div
      className="p-4 md:p-8 min-h-screen bg-gray-50 font-sans"
      style={{ fontFamily: "Montserrat, Arial, sans-serif" }}
    >
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Products
          </h1>
          {message && (
            <div className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded">
              {message}
            </div>
          )}
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <article
              key={product.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col"
            >
              <button
                onClick={() => navigate(`/products/${product.id}`)}
                className="text-left"
                aria-label={`Open ${product.name}`}
                style={{ all: "unset", cursor: "pointer", display: "block" }}
              >
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-40 sm:h-48 bg-gray-100 flex items-center justify-center text-gray-400">
                    No image
                  </div>
                )}

                <div className="p-4">
                  <h2 className="font-semibold text-lg text-gray-800 mb-1">
                    {product.name}
                  </h2>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-700">
                    <div>
                      <div>
                        <span className="font-medium">Price:</span>{" "}
                        <span className="text-gray-900">${product.price}</span>
                      </div>
                      <div>
                        <span className="font-medium">Stock:</span>{" "}
                        <span>{product.stock}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </button>

              <div className="p-4 pt-0 mt-auto">
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/products/${product.id}`)}
                    className="bg-transparent border border-gray-300 text-gray-700 px-3 py-2 rounded-md text-sm hover:bg-gray-50 transition"
                  >
                    View
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
