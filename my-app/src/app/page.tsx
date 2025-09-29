import { Header } from "@/components/organisms/Header";
import { HeroSection } from "@/components/organisms/HeroSection";
import { CategoriesSection } from "@/components/organisms/CategoriesSection";
import { ProductCarousel } from "@/components/organisms/ProductCarousel";
import { Footer } from "@/components/organisms/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <HeroSection />
        <CategoriesSection />
        <ProductCarousel />
      </main>
      
      <Footer />
    </div>
  );
}
