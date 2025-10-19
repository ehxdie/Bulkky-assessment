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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : wishlists.length === 0 ? (
        <div>No items in wishlist.</div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlists.map((item) => (
            <li key={item.id} className="border rounded p-4 flex flex-col">
              <div className="font-semibold text-lg">{item.product?.name}</div>
              <div className="text-sm text-gray-600">
                {item.product?.description}
              </div>
              {item.product?.imageUrl && (
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="w-full h-32 object-cover mt-2 rounded"
                />
              )}
              <div className="flex gap-4 text-sm text-gray-700 mt-2">
                <span>
                  <strong>Price:</strong> ${item.product?.price}
                </span>
                <span>
                  <strong>Stock:</strong> {item.product?.stock}
                </span>
              </div>
              <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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
