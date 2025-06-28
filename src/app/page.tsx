"use client";
import { PageTransition } from "@/components/animations/page-transition";
import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import SearchForm from "@/components/common/search-form";
import ArticlesSection from "@/components/home-page/articles-section";
import HeroSection from "@/components/home-page/hero-section";
import NewsletterSection from "@/components/home-page/newsletter-section";
import PopularPackage from "@/components/home-page/popular-package";
import RecommendationsSections from "@/components/home-page/recommendations-sections";
import TopValueSection from "@/components/home-page/top-value-section";

export default function Home() {
  return (
    <PageTransition className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <SearchForm />
      <PopularPackage />
      <TopValueSection />
      <RecommendationsSections />
      <ArticlesSection />
      <NewsletterSection />
      <Footer />
    </PageTransition>
  );
}
