import React from 'react'

const SignUp: React.FC = () => {
  return (
    <section className='flex justify-center items-center min-h-screen font-playfair'>
      <div className='flex flex-col items-center gap-2 w-96 shadow-2xl shadow-coco px-4 py-10 rounded-2xl bg-white'>
        <h1 className='text-center text-3xl font-playfair text-wine'>Welcome to Vintara</h1>
        <form action="" className='flex flex-col pb-3 gap-2 w-full'>
          <div className='flex flex-col gap-1'>
            <label htmlFor="">Username</label>
            <input type="text"  className='input-tag' placeholder='John Doe'/>
          </div>
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
        <div>
          <h3>Or sign up with:</h3>
          <div>
            <img src="" alt="" />
            <img src="" alt="" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignUp