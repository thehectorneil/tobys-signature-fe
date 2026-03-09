"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CardItem {
  id: number;
  title: string;
  image: string;
  price: string;
}

export default function CardSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);

  const cards: CardItem[] = [
    { id: 1, title: "Chocolate Cake", image: "/banner/banner1.jpg", price: "₱500" },
    { id: 2, title: "Strawberry Bliss", image: "/banner/banner2.jpg", price: "₱550" },
    { id: 3, title: "Red Velvet", image: "/banner/banner3.jpg", price: "₱600" },
    { id: 4, title: "Mango Delight", image: "/banner/banner4.jpg", price: "₱580" },
    { id: 5, title: "Cookies & Cream", image: "/banner/banner5.jpg", price: "₱650" },
    { id: 6, title: "Caramel Crunch", image: "/banner/banner1.jpg", price: "₱620" },
  ];

  // 🔹 Responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCards(1);
      else if (window.innerWidth < 1024) setVisibleCards(2);
      else setVisibleCards(4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const canGoLeft = currentIndex > 0;
  const canGoRight = currentIndex < cards.length - visibleCards;

  const handlePrev = () => canGoLeft && setCurrentIndex((prev) => prev - 1);
  const handleNext = () => canGoRight && setCurrentIndex((prev) => prev + 1);

  return (
    
    <div className="relative w-full flex justify-center my-12">
        

      <div className="max-w-[1000px] w-full flex items-center justify-between overflow-hidden">
        
        {/* Left Button */}
        <button
          onClick={handlePrev}
          disabled={!canGoLeft}
          className={`p-2 rounded-full bg-[#f8cf37] text-black hover:brightness-90 transition ${
            !canGoLeft ? "opacity-40 cursor-not-allowed" : ""
          }`}
        >
          <ChevronLeft size={28} />
        </button>

        {/* Cards Wrapper */}
        <div className="relative flex-1 mx-4 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out gap-4"
            style={{
              transform: `translateX(-${currentIndex * (200 + 16)}px)`, // 200px width + 16px gap
              width: `${cards.length * (200 + 16)}px`,
            }}
          >
            {cards.map((card) => (
              <div
                key={card.id}
                className="flex-shrink-0 w-[200px] h-[200px] bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative w-full h-[70%]">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="h-[30%] flex flex-col justify-center items-center p-2">
                  <h3 className="text-sm font-semibold text-gray-800 truncate w-full text-center">
                    {card.title}
                  </h3>
                  <p className="text-red-600 font-bold text-sm mt-1">{card.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Button */}
        <button
          onClick={handleNext}
          disabled={!canGoRight}
          className={`p-2 rounded-full bg-[#f8cf37] text-black hover:brightness-90 transition ${
            !canGoRight ? "opacity-40 cursor-not-allowed" : ""
          }`}
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  );
}
