"use client";

import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";

export default function Banner() {
  const [quantity, setQuantity] = useState(1);

  // ✅ Banner data
  const banners = [
    {
      src: "/banner/banner1.jpg",
      title: "Classic Chocolate Cake",
      description:
        "Rich, moist chocolate layers topped with creamy ganache and berries — a timeless favorite!",
    },
    {
      src: "/banner/banner2.jpg",
      title: "Strawberry Bliss",
      description:
        "A burst of freshness with whipped cream and real strawberries in every bite.",
    },
    {
      src: "/banner/banner3.jpg",
      title: "Red Velvet Perfection",
      description:
        "Soft and velvety red layers with luscious cream cheese frosting.",
    },
    {
      src: "/banner/banner4.jpg",
      title: "Tropical Mango Delight",
      description:
        "Sweet mango fusion that brings the taste of summer to your table.",
    },
    {
      src: "/banner/banner5.jpg",
      title: "Cookies & Cream Dream",
      description:
        "Crushed cookies, creamy filling, and a crunch that’ll make you smile.",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: false,
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Number(e.target.value));
    setQuantity(value);
  };

  return (
    <div className="w-full overflow-hidden mt-15 relative">
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div key={index} className="relative h-[300px] md:h-[450px]">
            {/* Banner Image */}
            <Image
              src={banner.src}
              alt={banner.title}
              fill
              className="object-cover"
              priority={index === 0}
            />

            {/* Overlay Content */}
            <div className="absolute inset-0 flex justify-center items-center bg-black/50 text-white">
              <div className="max-w-[1000px] w-full px-6 md:px-10 flex flex-col justify-center">
                <div className="max-w-lg space-y-4">
                  {/* Title */}
                  <h2 className="text-3xl md:text-5xl font-bold drop-shadow-lg">
                    {banner.title}
                  </h2>

                  {/* Description */}
                  <p className="text-sm md:text-base text-gray-200 leading-relaxed">
                    {banner.description}
                  </p>

                  {/* Quantity + Buttons */}
                  <div className="flex flex-wrap items-center gap-3 mt-4">
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="w-16 text-center text-black rounded-md py-1"
                    />
                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-semibold">
                      Add to Cart
                    </button>
                    <button className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-semibold">
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
