import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoriesSection from "@/components/CategoriesSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar /> 
      <Hero />
      <CategoriesSection />
      <FeaturedProducts />
      <Footer />
    </main>
  );
}