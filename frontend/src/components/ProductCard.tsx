import React from 'react'

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
  product: Product
}

const ProductCard: React.FC<ProductProps> = ({product}) => {
  return (
    <div>ProductCard</div>
  )
}

export default ProductCard