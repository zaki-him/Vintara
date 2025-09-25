import React from 'react'

interface Product {
  name: string,
  price: string,
  img: string
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