import React from "react";
import { Link } from "react-router";

interface Card {
  name: string;
  img: string;
  path: string;
}

interface CardProps {
  card: Card;
}

const CollectionCard: React.FC<CardProps> = ({ card }) => {
  return (
    <Link to={"/products"}>
      <div className="flex flex-col items-center">
        <Link to={card.path}>
          <img src={card.img} alt="" className="w-72 h-76" />
        </Link>
        <Link to={card.path}>
          <button className="bg-coco text-creme p-2 w-64 font-playfair cursor-pointer transform -translate-y-12">
            {card.name}
          </button>
        </Link>
      </div>
    </Link>
  );
};

export default CollectionCard;
