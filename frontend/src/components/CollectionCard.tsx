import React from 'react'
import { Link } from 'react-router'

interface Card {
  name: string,
  img: string,
  path: string
}

interface CardProps{
  card: Card
}

const CollectionCard: React.FC<CardProps> = ({card}) => {
  return (
    <div className=" md:max-w-xl max-h-56 md:max-h-60 lg:max-h-72 px-2">
      <img src={card.img} alt="" className='size-full object-fit'/>
      <Link to={card.path}>
        <button className='w-full py-2 bg-wine'>
          {card.name}
        </button>
      </Link>
    </div>
  )
}

export default CollectionCard