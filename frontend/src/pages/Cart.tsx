import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";

type CartItem = {
  _id: string;
  product: {
    _id: string;
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
};

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // TODO: replace with your API URL
  const API_URL = "http://localhost:3000/cart";

  // fetch cart on mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // if using JWT
          },
        });
        setCartItems(res.data.items || []);
      } catch (err) {
        console.error("Error fetching cart", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const increaseQuantity = async (id: string) => {
    try {
      await axios.put(
        `${API_URL}/${id}`,
        { action: "increase" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCartItems((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const decreaseQuantity = async (id: string) => {
    try {
      await axios.put(
        `${API_URL}/${id}`,
        { action: "decrease" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCartItems((prev) =>
        prev.map((item) =>
          item._id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const removeItem = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCartItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  if (loading) return <p className="text-coco">Loading cart...</p>;

  return (
    <div className="flex flex-col gap-8 min-h-screen bg-[#F2E6DC] px-6">
      <Header />
      <h1 className="text-3xl font-bold mb-6 font-playfair text-coco">
        Shopping Cart
      </h1>
      {cartItems.length === 0 ? (
        <p className="text-wine">Your cart is empty 🛒</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center bg-white shadow rounded-lg p-4"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="ml-4 flex-1">
                  <h2 className="text-lg font-semibold text-coco">
                    {item.product.name}
                  </h2>
                  <p className="text-wine">${item.product.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => decreaseQuantity(item._id)}
                      className="px-2 py-1 bg-[#F2E6DC] text-coco rounded"
                    >
                      -
                    </button>
                    <span className="mx-3">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item._id)}
                      className="px-2 py-1 bg-[#F2E6DC] text-coco rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-coco">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeItem(item._id)}
                    className="text-wine text-sm mt-2 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white shadow rounded-lg p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4 text-coco">
              Order Summary
            </h2>
            <div className="flex justify-between mb-2 text-coco">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2 text-coco">
              <span>Shipping</span>
              <span>$10.00</span>
            </div>
            <hr className="my-3" />
            <div className="flex justify-between font-semibold text-lg text-coco">
              <span>Total</span>
              <span>${(total + 10).toFixed(2)}</span>
            </div>
            <button className="w-full mt-4 bg-wine text-[#F2E6DC] py-2 rounded-lg hover:opacity-90 font-playfair">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
