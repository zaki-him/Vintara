import React from "react";
import { Link } from "react-router";
import { assets, collections, peopleReviews } from "../assets/assets";
import CollectionCard from "../components/CollectionCard";
import ReviewCard from "../components/ReviewCard";
import Header from "../components/Header";

const Home: React.FC = () => {
  return (
    <>
      <Header />
      {/*Hero Section */}
      <section className="flex justify-around items-center gap-10 max-md:flex-wrap px-16 mt-10 bg-[#F2E6DC]">
        <div className="flex flex-col gap-6 max-w-80 lg:max-w-xl max-md:max-w-sm">
          <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            Find The Best Fashion Style For You
          </h1>

          <p className="text-[16px] md:text-xl font-playfair">
            Step into timeless style with Vintara — where every piece is
            inspired by the golden eras of fashion. From classic cuts to retro
            details, we bring back the charm of yesterday for today's world.
          </p>

          <Link to={"/#about"}>
            <button className="cursor-pointer font-playfair w-40 py-2 bg-wine text-[#F2E6DC]">
              Learn More
            </button>
          </Link>
        </div>

        <div className="h-96 w-[355px] flex justify-center">
          <img
            src={assets.hero_photo}
            alt=""
            className="w-full rounded-[0%_0%_0%_20%]"
          />
        </div>
      </section>

      {/*Collections section */}
      <section className="flex flex-col items-center w-full mt-5 py-8 gap-4 bg-white">
        <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold">
          New Collection
        </h1>
        <p className="font-playfair text-[15px] text-center md:text-xl text-wine">
          Discover our vintage collections — from timeless tops to classic pants
          and statement coats.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-14 mt-6 w-full">
          {collections.map((card, index) => (
            <CollectionCard card={card} key={index} />
          ))}
        </div>
      </section>

      {/**About section */}
      <section className="px-18 py-10 flex justify-around items-center gap-8 max-md:flex-wrap">
        <div className="h-96 w-[355px] flex justify-center">
          <img
            src={assets.about_photo}
            alt=""
            className="w-full rounded-[20%_0%_0%_0%]"
          />
        </div>
        <div className="w-[355px] flex flex-col gap-3">
          <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-coco">
            Best Fashion You Can Find
          </h1>
          <p className="text-[16px] md:text-xl font-playfair">
            Our love for old-school fashion inspired us to create a space where
            vintage lives on. Every piece we share has a story, a touch of
            nostalgia, and a style that feels timeless. We’re here to bring you
            classics that let you stand out while staying true to the charm of
            the past.
          </p>
          <div></div>
        </div>
      </section>

      {/*Best products section */}
      <section className="px-14 pb-10 flex">
        <div className="flex flex-col gap-3 w-72">
          <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-coco">
            Best Seller Product
          </h1>
          <p className="text-[16px] md:text-[18px] font-playfair">
            Step into our best sellers — timeless pieces that our community
            can’t get enough of. These classics have been loved, worn, and
            treasured, and they continue to stand the test of time.
          </p>
        </div>
        <div></div>
      </section>

      <section className="flex flex-col items-center gap-6 bg-white py-10 px-10">
          <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-coco">What People Say About Us</h1>
          <p className="text-[16px] md:text-[18px] font-playfair">See what our customers are saying about their favorite vintage finds.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {peopleReviews.map((review, index) => (
              <ReviewCard review={review} key={index}/>
            ))}
          </div>
      </section>
    </>
  );
};

export default Home;
