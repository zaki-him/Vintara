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
    <div className='max-w-xl'>
      <Link to={card.path}>
        <button className='w-full py-2 bg-wine'>
          {card.name}
        </button>
      </Link>
    </div>
  )
}

export default CollectionCard