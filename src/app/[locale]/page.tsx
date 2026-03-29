import HeroSection from "../components/HeroSection";
import ProductCarousel from "../components/ProductCarousel";
import BrandStory from "../components/BrandStory";
import ImageGrid from "../components/ImageGrid";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductCarousel />
      <BrandStory />
      <ImageGrid />
    </>
  );
}
