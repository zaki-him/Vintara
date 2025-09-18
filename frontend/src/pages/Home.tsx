import React from 'react'
import { Link } from 'react-router'
import { assets, collections } from '../assets/assets'
import CollectionCard from '../components/CollectionCard'

const Home: React.FC = () => {
  return (
    <>
      <section className='flex justify-around items-center gap-10 max-md:flex-wrap px-16 mt-10 bg-[#F2E6DC]'>
        <div className='flex flex-col gap-6 max-w-80 lg:max-w-xl max-md:max-w-sm'>
          <h1 className='font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold'>Find The Best Fashion Style For You</h1>

          <p className='text-lg md:text-xl font-playfair'>Step into timeless style with Vintara — where every piece is inspired by the golden eras of fashion. From classic cuts to retro details, we bring back the charm of yesterday for today's world.</p>
          
          <Link to={'/#about'}>
            <button className='cursor-pointer font-playfair w-40 py-2 bg-wine text-[#F2E6DC]'>
              Learn More
            </button>
          </Link>
        </div>

        <div className='h-96 w-[355px] flex justify-center'>
          <img src={assets.hero_photo} alt="" className='w-full rounded-[0%_0%_0%_20%]'/>
        </div>
      </section>

      <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-14 mt-10'>
        {collections.map((card, index) => (
          <CollectionCard card={card} key={index}/>
        ))}
      </section>
    </>
  )
}

export default Home