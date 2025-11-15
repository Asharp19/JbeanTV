"use client";
import { useMemo } from "react";
import { HeroSection } from "@/app/componentsHomePage/HeroSection";
import { PredictionCarousel } from "@/app/componentsHomePage/PredictionCarousel";

const Home = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <HeroSection />

      <div className="mt-12">
        <PredictionCarousel />
      </div>
    </main>
  );
};

export default Home;
