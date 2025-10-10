import React from "react";
import { Link } from "react-router";

interface Product {
  _id: string;
  name: string;
  description?: string;
  sizes?: string[];
  prices: number;
  category?: string;
  stock?: number;
  images?: string[];
}

interface ProductProps {
  product: Product;
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden transition-transform duration-300 hover:shadow-lg">
      {/* Product Image */}
      <Link to={`/product/${product._id}`}>
        <div className="w-full h-64 bg-creme flex justify-center items-center overflow-hidden">
          <img
            src={product.images && product.images.length > 0 ? product.images[0] : ""}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-5 flex flex-col justify-between h-[200px]">
        <div>
          <h2 className="font-playfair text-xl font-semibold text-coco truncate">
            {product.name}
          </h2>

          {product.category && (
            <p className="text-sm text-gray-500 font-playfair mt-1">
              {product.category}
            </p>
          )}

          <p className="text-wine text-lg font-semibold mt-2">
            ${product.prices.toFixed(2)}
          </p>
        </div>

        {/* Sizes & Availability */}
        <div className="flex justify-between items-center mt-4">
          {product.sizes && product.sizes.length > 0 ? (
            <p className="text-sm text-gray-600 font-playfair">
              Sizes: {product.sizes.join(", ")}
            </p>
          ) : (
            <p className="text-sm text-gray-600 font-playfair">One Size</p>
          )}

          {product.stock && product.stock > 0 ? (
            <span className="text-sm text-green-600 font-semibold">In Stock</span>
          ) : (
            <span className="text-sm text-red-500 font-semibold">Out of Stock</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
