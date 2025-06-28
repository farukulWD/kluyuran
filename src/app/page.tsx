"use client";
import { PageTransition } from "@/components/animations/page-transition";
import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import SearchForm from "@/components/common/search-form";
import HeroSection from "@/components/home-page/hero-section";
import PopularPackage from "@/components/home-page/popular-package";
import TopValueSection from "@/components/home-page/top-value-section";
import VideoSection from "@/components/home-page/video-section";

export default function Home() {
  return (
    <PageTransition className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <SearchForm />
      <PopularPackage />
      <TopValueSection />
      <VideoSection />
      <Footer />
    </PageTransition>
  );
}
