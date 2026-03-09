export default function ProductsPage() {
  return (
    <div className="max-w-[1200px] mx-auto py-20 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Our Products</h1>
      <p className="text-center text-gray-600 mb-12">
        Browse through our delicious cake selections 🍰
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Sample products */}
        {[
          { name: "Red Velvet", price: "₱600", img: "/banner/banner1.jpg" },
          { name: "Mango Delight", price: "₱580", img: "/banner/banner2.jpg" },
          { name: "Cookies & Cream", price: "₱650", img: "/banner/banner5.jpg" },
          { name: "Chocolate Cake", price: "₱620", img: "/banner/banner3.jpg" },
        ].map((product, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-red-600 font-bold mt-2">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
