import React from 'react'
import Header from '../components/Header'
import ProductCard from '../components/ProductCard'
import { Link } from 'react-router'

const Products: React.FC = () => {
  return (
    <>
      <Header />
      <section className='bg-white'>
        {products.map((product, index) => (
          <Link to={`/product/${product.id}`}>
            <ProductCard product={product} key={index} />
          </Link>
        ))}
      </section>
    </>
  )
}

export default Products