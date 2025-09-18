import React from 'react'
import { Link } from 'react-router'

const Home: React.FC = () => {
  return (
    <>
      <section className=''>
        <div>
          <h1>Find The Best Fashion Style For You</h1>

          <p>Step into timeless style with Vintara — where every piece is inspired by the golden eras of fashion. From classic cuts to retro details, we bring back the charm of yesterday for today's world.</p>
          
          <Link to={'/#about'}>
            <button>
              Learn More
            </button>
          </Link>
        </div>

        <div>

        </div>
      </section>
    </>
  )
}

export default Home