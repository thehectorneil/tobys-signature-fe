"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star, Heart, Plus, Trash2 } from "lucide-react";

interface CardItem {
  id: number;
  title: string;
  image: string;
  price: number;
  rating: number;
  ratingCount: number;
}

export default function CardSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const visibleCards = 4;

  const cards: CardItem[] = [
    { id: 1, title: "Chocolate Cake", image: "/banner/banner1.jpg", price: 1500, rating: 4.6, ratingCount: 212 },
    { id: 2, title: "Strawberry Bliss", image: "/banner/banner2.jpg", price: 1250, rating: 4.1, ratingCount: 98 },
    { id: 3, title: "Red Velvet", image: "/banner/banner3.jpg", price: 1700, rating: 3.7, ratingCount: 65 },
    { id: 4, title: "Mango Delight", image: "/banner/banner4.jpg", price: 1300, rating: 4.8, ratingCount: 330 },
    { id: 5, title: "Cookies & Cream", image: "/banner/banner5.jpg", price: 1450, rating: 3.5, ratingCount: 40 },
  
    { id: 6, title: "Chocolate Cake", image: "/banner/banner2.jpg", price: 1550, rating: 4.4, ratingCount: 180 },
    { id: 7, title: "Strawberry Bliss", image: "/banner/banner3.jpg", price: 1350, rating: 3.9, ratingCount: 72 },
    { id: 8, title: "Red Velvet", image: "/banner/banner4.jpg", price: 1680, rating: 4.7, ratingCount: 250 },
    { id: 9, title: "Mango Delight", image: "/banner/banner5.jpg", price: 1280, rating: 3.4, ratingCount: 33 },
    { id: 10, title: "Cookies & Cream", image: "/banner/banner1.jpg", price: 1420, rating: 4.2, ratingCount: 120 },
  
    { id: 11, title: "Chocolate Cake", image: "/banner/banner3.jpg", price: 1580, rating: 4.9, ratingCount: 410 },
    { id: 12, title: "Strawberry Bliss", image: "/banner/banner4.jpg", price: 1320, rating: 3.6, ratingCount: 55 },
    { id: 13, title: "Red Velvet", image: "/banner/banner5.jpg", price: 1750, rating: 4.3, ratingCount: 144 },
    { id: 14, title: "Mango Delight", image: "/banner/banner1.jpg", price: 1290, rating: 3.2, ratingCount: 21 },
    { id: 15, title: "Cookies & Cream", image: "/banner/banner2.jpg", price: 1480, rating: 4.5, ratingCount: 201 },
  
    { id: 16, title: "Chocolate Cake", image: "/banner/banner4.jpg", price: 1620, rating: 4.0, ratingCount: 110 },
    { id: 17, title: "Strawberry Bliss", image: "/banner/banner5.jpg", price: 1380, rating: 3.3, ratingCount: 44 },
    { id: 18, title: "Red Velvet", image: "/banner/banner1.jpg", price: 1720, rating: 4.8, ratingCount: 322 },
    { id: 19, title: "Mango Delight", image: "/banner/banner2.jpg", price: 1310, rating: 4.1, ratingCount: 99 },
    { id: 20, title: "Cookies & Cream", image: "/banner/banner3.jpg", price: 1490, rating: 3.8, ratingCount: 68 },
  
    { id: 21, title: "Chocolate Cake", image: "/banner/banner5.jpg", price: 1590, rating: 4.7, ratingCount: 295 },
    { id: 22, title: "Strawberry Bliss", image: "/banner/banner1.jpg", price: 1360, rating: 3.5, ratingCount: 52 },
    { id: 23, title: "Red Velvet", image: "/banner/banner2.jpg", price: 1690, rating: 4.6, ratingCount: 210 },
    { id: 24, title: "Mango Delight", image: "/banner/banner3.jpg", price: 1270, rating: 3.1, ratingCount: 18 },
    { id: 25, title: "Cookies & Cream", image: "/banner/banner4.jpg", price: 1510, rating: 4.4, ratingCount: 176 },
  ];

  const canGoLeft = currentIndex > 0;
  const canGoRight = currentIndex < cards.length - visibleCards;

  const handlePrev = () => canGoLeft && setCurrentIndex((prev) => prev - 1);
  const handleNext = () => canGoRight && setCurrentIndex((prev) => prev + 1);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 0,
    }).format(price);

  const getRatingColor = (rating: number) =>
    rating >= 4 ? "bg-green-600 text-white" : "bg-yellow-400 text-black";

  return (
    <div className="w-full flex justify-center my-1">

      {/* DESKTOP SLIDER */}
      <div className="hidden md:flex max-w-[1000px] w-full items-center justify-between overflow-hidden">

        <button
          onClick={handlePrev}
          disabled={!canGoLeft}
          className={`p-2 rounded-full bg-[#f8cf37] text-black hover:brightness-90 ${
            !canGoLeft ? "opacity-40 cursor-not-allowed" : ""
          }`}
        >
          <ChevronLeft size={28} />
        </button>

        <div className="relative flex-1 mx-4 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out gap-4"
            style={{
              transform: `translateX(-${currentIndex * 216}px)`,
              width: `${cards.length * 216}px`,
            }}
          >
            {cards.map((card) => (
              <Card card={card} key={card.id} formatPrice={formatPrice} getRatingColor={getRatingColor}/>
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={!canGoRight}
          className={`p-2 rounded-full bg-[#f8cf37] text-black hover:brightness-90 ${
            !canGoRight ? "opacity-40 cursor-not-allowed" : ""
          }`}
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* MOBILE SWIPE SLIDER */}
      <div className="md:hidden w-full overflow-x-auto pl-2">
        <div className="flex gap-4 snap-x snap-mandatory overflow-x-scroll scrollbar-hide">
          {cards.map((card) => (
            <Card card={card} key={card.id} formatPrice={formatPrice} getRatingColor={getRatingColor}/>
          ))}
        </div>
      </div>

    </div>
  );
}

/* CARD COMPONENT */
function Card({
  card,
  formatPrice,
  getRatingColor,
}: {
  card: CardItem;
  formatPrice: (price: number) => string;
  getRatingColor: (rating: number) => string;
}) {

  const [liked, setLiked] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const addItem = () => setQuantity(quantity + 1);

  const removeItem = () => {
    if (quantity === 1) {
      setQuantity(0);
    } else {
      setQuantity(quantity - 1);
    }
  };
  return (
    <div className="snap-start flex-shrink-0 w-[150px] md:w-[200px] h-[200px] bg-white rounded-lg shadow-sm border border-[#171717] overflow-hidden">

      <div className="relative w-full h-[60%]">

        <Image
          src={card.image}
          alt={card.title}
          fill
          className="object-cover"
        />

       {/* HEART ICON */}
        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-2 right-2 bg-gray-100 rounded-full p-1 shadow-sm hover:bg-gray-200 transition"
        >
          <Heart
            size={16}
            className={`transition-transform duration-150 ${
              liked ? "scale-110 text-red-500" : "text-gray-700"
            }`}
            fill={liked ? "currentColor" : "none"}
            strokeWidth={2}
          />
        </button>

      {/* QUICK ADD CART */}
      <div className="absolute bottom-2 right-2">

        <div
          className={`flex items-center justify-end bg-[#f8cf37] rounded-full shadow-md overflow-hidden transition-all duration-300 ${
            quantity === 0 ? "w-6" : "w-16.5"
          }`}
        >

          {quantity > 0 && (
            <button
              onClick={removeItem}
              className="px-1 text-black hover:opacity-70 transition"
            >
              <Trash2 size={14} />
            </button>
          )}

          {quantity > 0 && (
            <span className="text-xs font-semibold text-black w-4 text-center">
              {quantity}
            </span>
          )}

          <button
            onClick={addItem}
            className="p-1 text-black hover:opacity-70 transition"
          >
            <Plus size={16} />
          </button>

        </div>

      </div>

      </div>

      <div className="h-[40%] flex flex-col justify-center px-2">

        {/* TITLE */}
        <h3 className="text-sm font-normal text-gray-800 text-left truncate">
          {card.title}
        </h3>

        {/* RATING */}
        <div className="flex items-center gap-2 mt-1">

        <div className="flex items-center gap-1 px-1.5 py-[2px] rounded-sm text-[10px] font-semibold bg-gray-100 text-gray-800">

          <Star
            size={10}
            className={card.rating >= 4 ? "text-green-500" : "text-yellow-400"}
            fill="currentColor"
            strokeWidth={0}
          />

          {card.rating.toFixed(1)}

          <span className="text-[10px] text-gray-500">
            ({card.ratingCount})
          </span>

        </div>

        </div>

        {/* PRICE */}
        <p className="text-md font-bold text-[#000000] mt-1 text-left">
          {formatPrice(card.price)}
        </p>

      </div>
    </div>
  );
}