import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router'

const SignIn: React.FC = () => {
  return (
    <section className='flex justify-center items-center min-h-screen font-playfair'>
      <div className='flex flex-col items-center gap-2 w-96 shadow-2xl shadow-coco px-4 py-10 rounded-2xl bg-white'>
        <h1 className='text-center text-3xl font-playfair text-wine'>Welcome to Vintara</h1>
        <form action="" className='flex flex-col pb-3 gap-2 w-full'>
          <div className='flex flex-col gap-1'>
            <label htmlFor="">Email</label>
            <input type="email" className='input-tag' placeholder='example@gmail.com'/>
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor="">Password</label>
            <input type="password"  className='input-tag'/>
          </div>
        </form>
        <hr className='text-wine w-40'/>
        <div className='flex flex-col items-center gap-4'>
          <h3>Or sign in with:</h3>
          <div className='flex gap-6'>
            <button className='cursor-pointer'>
              <img src={assets.github_logo} alt="" className='size-8' />
            </button>
            <button className='cursor-pointer'>
              <img src={assets.google_logo} alt="" className='size-8' />
            </button>
          </div>
        </div>
        <p>Don't have an account?
          <Link to={'/sign-in'}>
            <span className='text-wine'> Register</span>
          </Link>
        </p>
      </div>
    </section>
  )
}

export default SignIn