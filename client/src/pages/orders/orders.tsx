import React, { useEffect, useState } from "react";
import { getOrders } from "../../services/orders";
import type { GetOrdersResponse } from "../../types/orders";

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<GetOrdersResponse["data"]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const resp = await getOrders();
        setOrders(resp.data.data);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div
      className="p-4 md:p-8 min-h-screen bg-gray-50 font-sans"
      style={{ fontFamily: "Montserrat, Arial, sans-serif" }}
    >
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        My Orders
      </h2>
      {loading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-500">No orders found.</div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {orders.map((order) => (
            <li
              key={order.id}
              className="border rounded-xl bg-white shadow p-6 flex flex-col gap-2"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-700">
                  Order ID: <span className="text-gray-900">{order.id}</span>
                </span>
                <span
                  className={`px-3 py-1 rounded text-xs font-bold ${
                    order.status === "COMPLETED"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div className="text-gray-700 mb-2">
                <strong>Total:</strong> ${order.total}
              </div>
              <div>
                <strong>Items:</strong>
                <ul className="ml-4 list-disc text-gray-600">
                  {order.items.map((item: any) => (
                    <li key={item.id} className="mb-1">
                      <span className="font-medium">{item.product?.name}</span>{" "}
                      x {item.quantity} (${item.product?.price})
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-sm text-gray-500 mt-2">
                <strong>Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
