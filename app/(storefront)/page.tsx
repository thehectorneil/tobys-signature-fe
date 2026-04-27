import Banner from "@/components/Banner";
import CardSlider from "@/components/CardSlider";
import SearchBar from "@/components/SearchBar";
import CategoryCircles from "@/components/CategoryCircles";

export default function Home() {
  return (
    <div>
          <Banner />

          <SearchBar />

            <section className="pt-2 text-center">
              <h2 className="text-3xl font-bold mb-4 text-[var(--brand)]">Explore our Collections</h2>
            </section>

          <CategoryCircles />          
          
            <section className="pt-2 text-center">
              <h2 className="text-3xl font-bold mb-4 text-[var(--brand)]">Our Best Sellers</h2>
            </section>

          <CardSlider />
    </div>
  );
}
