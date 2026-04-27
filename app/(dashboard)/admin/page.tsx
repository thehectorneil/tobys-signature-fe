export default function AdminPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--brand)] mb-4">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-4">

        <div className="bg-[#191a1e] p-4 rounded-lg">
          <p className="text-gray-400">Total Sales</p>
          <h2 className="text-xl font-bold">₱120,000</h2>
        </div>

        <div className="bg-[#191a1e] p-4 rounded-lg">
          <p className="text-gray-400">Orders</p>
          <h2 className="text-xl font-bold">320</h2>
        </div>

        <div className="bg-[#191a1e] p-4 rounded-lg">
          <p className="text-gray-400">Products</p>
          <h2 className="text-xl font-bold">58</h2>
        </div>

      </div>
    </div>
  );
}