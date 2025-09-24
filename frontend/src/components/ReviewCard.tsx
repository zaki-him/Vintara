import React from 'react'

interface Review {
  review: string,
  name: string,
  feedback: string,
  img: string
}

interface ReviewProps {
  review: Review
}

const ReviewCard: React.FC<ReviewProps> = ({review}) => {
  return (
    <div className='p-4 flex flex-col items-center gap-3 bg-wine'>
      <h3 className='font-bold text-center text-creme'>{review.feedback}</h3>
      <p className='text-sm text-center'>{review.review}</p>
      <img src={review.img} alt="" />
      <p className='text-creme'>{review.name}</p>
    </div>
  )
}

export default ReviewCard