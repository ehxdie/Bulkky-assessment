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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {loading ? (
        <div>Loading...</div>
      ) : orders.length === 0 ? (
        <div>No orders found.</div>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="border rounded p-4">
              <div>
                <strong>Order ID:</strong> {order.id}
              </div>
              <div>
                <strong>Status:</strong> {order.status}
              </div>
              <div>
                <strong>Total:</strong> ${order.total}
              </div>
              <div>
                <strong>Items:</strong>
                <ul className="ml-4 list-disc">
                  {order.items.map((item: any) => (
                    <li key={item.id}>
                      {item.product?.name} x {item.quantity} ($
                      {item.product?.price})
                    </li>
                  ))}
                </ul>
              </div>
              <div>
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
