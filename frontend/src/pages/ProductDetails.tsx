import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import Header from "../components/Header";

type Product = {
  _id: string;
  name: string;
  description?: string;
  sizes: string[];
  prices: number;
  category?: string;
  stock: number;
  images: string[];
};

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [inCart, setInCart] = useState(false);
  const navigate = useNavigate();
  const checkCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const res = await axios.get("http://localhost:3000/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const cartData = Array.isArray(res.data) ? res.data[0] : res.data;
      const isInCart = cartData?.items?.some(
        (item: any) => item.product._id === id
      );

      setInCart(isInCart);
    } catch (error) {
      console.log("Error checking cart", error);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/products/${id}`);
        setProduct(res.data.product);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    checkCart();
  }, [id]);

  const handleCartAction = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/sign-in");

      if (!inCart) {
        if (selectedSize === "") {
          return alert("Please choose a size");
        }
        await axios.post(
          "http://localhost:3000/cart/add",
          {
            productId: product?._id,
            quantity,
            size: selectedSize,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setInCart(true);
      } else {
        await axios.delete(`http://localhost:3000/cart/delete/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setInCart(false);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to add product to cart.");
    }
  };

  if (loading)
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#F2E6DC] flex items-center justify-center text-coco font-playfair">
          Loading product...
        </div>
      </>
    );

  if (!product)
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#F2E6DC] flex items-center justify-center text-wine font-playfair">
          Product not found.
        </div>
      </>
    );
  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#F2E6DC] p-8 flex flex-col lg:flex-row gap-10 justify-center">
        {/* Images Section */}
        <div className="flex flex-col items-center lg:w-1/2">
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="w-80 h-96 object-cover rounded-[20%_0%_0%_0%] shadow"
          />
          <div className="flex gap-4 mt-4">
            {product.images?.slice(1).map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`product-${idx}`}
                className="w-20 h-20 object-cover rounded cursor-pointer border border-transparent hover:border-wine transition"
                onClick={() => {
                  const updated = [...product.images];
                  [updated[0], updated[idx + 1]] = [
                    updated[idx + 1],
                    updated[0],
                  ];
                  setProduct({ ...product, images: updated });
                }}
              />
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="flex flex-col gap-4 lg:w-1/2 font-playfair">
          <h1 className="text-3xl font-bold text-coco">{product.name}</h1>
          <p className="text-wine text-lg">{product.category}</p>
          <p className="text-[16px] md:text-[18px]">{product.description}</p>
          <p className="text-2xl font-bold text-coco">
            ${product.prices?.toFixed(2)}
          </p>

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-4">
              <h3 className="text-coco font-semibold">Size:</h3>
              <div className="flex gap-3 mt-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 rounded border transition font-semibold ${
                      selectedSize === size
                        ? "bg-wine text-[#F2E6DC] border-wine"
                        : "border-coco text-coco hover:bg-wine hover:text-[#F2E6DC]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="mt-4 flex items-center gap-4">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-2 py-1 bg-[#F2E6DC] text-coco border rounded"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-2 py-1 bg-[#F2E6DC] text-coco border rounded"
            >
              +
            </button>
          </div>

          {/* Stock Info */}
          <p
            className={`mt-2 ${
              product.stock > 0 ? "text-green-700" : "text-red-600"
            }`}
          >
            {product.stock > 0
              ? `In stock (${product.stock} available)`
              : "Out of stock"}
          </p>

          {/* Add to Cart */}
          <button
            onClick={handleCartAction}
            disabled={product.stock === 0}
            className="mt-6 w-48 bg-wine text-[#F2E6DC] py-2 rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {!inCart ? "Add to Cart" : "Remove from Cart"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
