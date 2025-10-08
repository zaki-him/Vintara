import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";

type Product = {
  _id: string;
  name: string;
  prices: number;
  images: string[];
};

type OrderItem = {
  product: Product;
  quantity: number;
};

type Order = {
  _id: string;
  items: OrderItem[];
  totalPrice: number;
  shippingAddress: string;
  createdAt: string;
};

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Please log in to view your orders");
          return;
        }

        const res = await axios.get("http://localhost:3000/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // the backend returns a single order document (findOne)
        // convert it to an array for consistency
        if (res.data) {
          setOrders([res.data]);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading)
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-[#F2E6DC] text-coco font-playfair">
          Loading your orders...
        </div>
      </>
    );

  if (!orders.length)
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-[#F2E6DC] text-wine font-playfair">
          You have no previous orders.
        </div>
      </>
    );

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#F2E6DC] p-8">
        <h1 className="text-3xl font-playfair text-coco font-bold mb-8">
          Your Orders
        </h1>

        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-xl shadow-md p-6 mb-6 border border-[#e5d0c0]"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-coco">
                Order ID: {order._id}
              </h2>
              <p className="text-wine text-sm">
                Placed on: {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between border-b border-[#e5d0c0] pb-3"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.product.images?.[0]}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-md border"
                    />
                    <div>
                      <h3 className="text-coco font-semibold">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-wine">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="text-coco font-semibold">
                    ${(item.product.prices * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-between items-center">
              <p className="text-wine text-sm">
                Shipping to: {order.shippingAddress || "Not specified"}
              </p>
              <p className="text-lg font-bold text-coco">
                Total: ${order.totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OrdersPage;
