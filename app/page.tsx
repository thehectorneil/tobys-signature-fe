import Banner from "../components/Banner";
import CardSlider from "@/components/CardSlider";

export default function Home() {
  return (
    <div>
          <Banner />
          
            <section className="pt-10 text-center">
              <h2 className="text-3xl font-bold mb-4 text-black">Our Best Sellers</h2>
            </section>

          <CardSlider />
    </div>
  );
}
