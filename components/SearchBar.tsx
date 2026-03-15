"use client";

import { Search } from "lucide-react";
import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    console.log("Searching:", query);
    // later connect to product filtering or API
  };

  return (
    <div className="w-full flex justify-center my-4 px-4">

      {/* wrapper controls width */}
      <div className="w-full md:w-1/3 relative">

        <input
          type="text"
          placeholder="Search cakes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-10 rounded-full border border-gray-300 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#f8cf37]"
        />

        <button
          onClick={handleSearch}
          className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#f8cf37] text-black rounded-full p-2 hover:brightness-95 transition"
        >
          <Search size={16} />
        </button>

      </div>

    </div>
  );
}