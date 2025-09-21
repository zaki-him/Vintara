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

const ReviewCard: React.FC<ReviewProps> = (review) => {
  return (
    <div>ReviewCard</div>
  )
}

export default ReviewCard