'use client';

import { Banner } from "@/components/Banner";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import dynamic from 'next/dynamic';
import { Suspense, useEffect, useState, useRef } from "react";
import { LoadingScreen } from "@/components/LoadingScreen";
import { list } from "@/constants";
import ImageEffects from "@/components/ImageEffects";

// Dynamically import sections
const FeaturesSection = dynamic(() => import('@/components/FeaturesSection.jsx'), { ssr: false });
const HowItWorks = dynamic(() => import('@/components/HowItWorksSection'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });
const PricingSection = dynamic(() => import('@/components/PricingSection'), { ssr: false });
const CTASection = dynamic(() => import('@/components/CtaSection'), { ssr: false });
const HorizontalScroll = dynamic(() => import('@/components/HorizontalScroll'), { ssr: false });

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const featuresRef = useRef(null);

  useEffect(() => {
    const handlePageLoad = () => {
      setIsLoaded(true);
    };

    if (document.readyState === "complete") {
      handlePageLoad();
    } else {
      window.addEventListener("load", handlePageLoad);
    }

    return () => {
      window.removeEventListener("load", handlePageLoad);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Scroll to the bottom of the page
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          });
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the section is in view
    );

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current);
      }
    };
  }, []);

  if (!isLoaded) {
    return <LoadingScreen />;
  }

  return (
    <Suspense fallback={<>loading ......</>}>
      <div className="relative">
        <Banner />
        <Navbar />
        <Hero />
        <div ref={featuresRef}>
          <FeaturesSection content={list} contentClassName="p-8" />
        </div>
        <HowItWorks />
        <CTASection />
        <HorizontalScroll />
        <div className="mb-[100vh]">
          <PricingSection />
        </div>
        <footer className="fixed bottom-0 left-0 w-full -z-10 bg-transparent transition-all duration-500">
          <Footer />
        </footer>
      </div>
    </Suspense>
  );
}
