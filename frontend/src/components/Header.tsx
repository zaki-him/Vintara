import React from 'react'
import { Link } from 'react-router'

const Header:React.FC = () => {
  const links = [
    {
      name: 'Home',
      link: '/'
    },
    {
      name: 'About',
      link: '/#about'
    },
    {
      name: 'Collections',
      link: '/#collections'
    },
    {
      name: 'Products',
      link: '/products'
    },
  ]


  return (
    <header className='flex justify-between items-center px-8 md:px-14 lg:px-20 py-6 bg-vanilla'>
      <Link to={'/'}>
        <h1 className='font-playfair text-3xl font-bold'>Vintara</h1>
      </Link>

      <nav className='flex items-center gap-4 max-sm:hidden'>
        {links.map((link, index) => (
          <Link to={link.link}>
            <p 
              key={index}
              className='font-playfair py-1 text-xl transition-all duration-500 animate-nav hover:text-coffee'  
            >{link.name}</p>
          </Link>
        ))}
      </nav>

      <Link to={'/sign-in'}>
        <button className='cursor-pointer px-8 py-1.5 font-playfair bg-coffee text-vanilla'>
          Login
        </button>
      </Link>
    </header>
  )
}

export default Header