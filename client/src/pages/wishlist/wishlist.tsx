import React, { useEffect, useState } from "react";
import { getWishlist, deleteWishlist } from "../../services/wishlist";
import type { WishlistProduct } from "../../types/wishlist";

const Wishlist: React.FC = () => {
  const [wishlists, setWishlists] = useState<WishlistProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWishlist = async () => {
    setLoading(true);
    setError(null);
    try {
      const resp = await getWishlist();
      setWishlists(resp.data.data);
    } catch (err: any) {
      setError("Failed to fetch wishlist.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleDelete = async (wishlistId: string) => {
    try {
      await deleteWishlist({ productId: wishlistId });
      fetchWishlist();
    } catch {
      setError("Failed to delete wishlist item.");
    }
  };

  return (
    <div
      className="p-4 md:p-8 min-h-screen bg-gray-50 font-sans"
      style={{ fontFamily: "Montserrat, Arial, sans-serif" }}
    >
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        My Wishlist
      </h2>
      {loading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : wishlists.length === 0 ? (
        <div className="text-center text-gray-500">No items in wishlist.</div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {wishlists.map((item) => (
            <li
              key={item.id}
              className="bg-white border rounded-xl shadow p-6 flex flex-col"
            >
              <div className="font-semibold text-lg text-gray-800 mb-1">
                {item.product?.name}
              </div>
              <div className="text-sm text-gray-600 mb-2">
                {item.product?.description}
              </div>
              {item.product?.imageUrl ? (
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="w-full h-32 object-cover mb-2 rounded"
                />
              ) : (
                <div className="w-full h-32 bg-gray-100 flex items-center justify-center text-gray-400 mb-2">
                  No image
                </div>
              )}
              <div className="flex gap-4 text-sm text-gray-700 mb-2">
                <span>
                  <strong>Price:</strong> ${item.product?.price}
                </span>
                <span>
                  <strong>Stock:</strong> {item.product?.stock}
                </span>
              </div>
              <button
                className="mt-auto bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                onClick={() => handleDelete(item.productId)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;
