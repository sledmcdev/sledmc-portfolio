import HeroSection from "@/components/home/HeroSection";
import TrustedBy from "@/components/home/TrustedBy";
import AudienceGateway from "@/components/home/AudienceGateway";
import CompanyIntro from "@/components/home/CompanyIntro";
import FounderVision from "@/components/home/FounderVision";
import KeyStats from "@/components/home/KeyStats";
import ServicesGrid from "@/components/home/ServicesGrid";
import IndustriesGrid from "@/components/home/IndustriesGrid";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ApproachTimeline from "@/components/home/ApproachTimeline";
import SuccessStories from "@/components/home/SuccessStories";
import AwardsSection from "@/components/home/AwardsSection";
import TestimonialsSlider from "@/components/home/TestimonialsSlider";
import FinalCTA from "@/components/shared/FinalCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustedBy />
      <AudienceGateway />
      <CompanyIntro />
      <FounderVision />
      <KeyStats />
      <ServicesGrid />
      <IndustriesGrid />
      <WhyChooseUs />
      <ApproachTimeline />
      <SuccessStories />
      <AwardsSection />
      <TestimonialsSlider />
      <FinalCTA />
    </>
  );
}
