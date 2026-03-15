"use client";

import Image from "next/image";

const categories = [
    { name: "Premium", image: "/category/premium.png" },
    { name: "Classic", image: "/category/classic.png" },
    { name: "Party", image: "/category/party.png" },
    { name: "Customized", image: "/category/customized.png" },
];

export default function CategoryCircles() {
    return (
      <section className="w-full flex justify-center my-6">
  
        <div className="max-w-[1000px] w-full grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 px-4">
  
          {categories.map((cat) => (
            <button
              key={cat.name}
              className="flex items-center justify-center bg-[#1f2024] rounded-xl p-4 shadow-md active:scale-95 transition-transform duration-150"
            >
              <div className="relative w-[80px] h-[80px] md:w-[130px] md:h-[130px] rounded-full overflow-hidden border border-[#171717]">
  
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover"
                />
  
              </div>
            </button>
          ))}
  
        </div>
  
      </section>
    );
  }