import HeroSection from "@/components/home/HeroSection";
import TrustedBy from "@/components/home/TrustedBy";
import CompanyIntro from "@/components/home/CompanyIntro";
import FounderVision from "@/components/home/FounderVision";
import KeyStats from "@/components/home/KeyStats";
import ServicesGrid from "@/components/home/ServicesGrid";
import IndustriesGrid from "@/components/home/IndustriesGrid";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ApproachTimeline from "@/components/home/ApproachTimeline";
import AwardsSection from "@/components/home/AwardsSection";
import TestimonialsSlider from "@/components/home/TestimonialsSlider";
import FinalCTA from "@/components/shared/FinalCTA";
import finalCta from "@/data/pages/home/final-cta.json";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustedBy />
      <WhyChooseUs />
      <CompanyIntro />
      <FounderVision />
      <KeyStats />
      <ServicesGrid />
      <IndustriesGrid />
      <ApproachTimeline />
      <AwardsSection />
      <TestimonialsSlider />
      {/* "Get Started" scrolls back up to the hero's Candidates / Partners buttons */}
      <FinalCTA content={finalCta} />
    </>
  );
}
