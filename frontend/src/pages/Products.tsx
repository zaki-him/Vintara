import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router";
import axios from "axios";

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

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/products"); 
        setProducts(res.data);
      } catch (err: any) {
        console.error('error: ', err.message)
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <section className="flex justify-center items-center min-h-screen">
          <p className="text-lg font-playfair">Loading products...</p>
        </section>
      </>
    );
  }

  return (
    <section className="bg-creme">
      <Header />
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 bg-white">
        {products.map((product) => (
          <Link to={`/product/${product._id}`} key={product._id}>
            <ProductCard product={product} />
          </Link>
        ))}
      </section>
    </section>
  );
};

export default Products;
