import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";


// Dynamic imports for code-split heavy sections
const FeaturesSection = dynamic(() => import("@/components/FeaturesSection"));
const UseCasesSection = dynamic(() => import("@/components/UseCasesSection"));
const HowItWorksSection = dynamic(() => import("@/components/HowItWorksSection"));
const TestimonialsSection = dynamic(() => import("@/components/TestimonialsSection"));
const PricingSection = dynamic(() => import("@/components/PricingSection"));
const StatsSection = dynamic(() => import("@/components/StatsSection"));
const FAQSection = dynamic(() => import("@/components/FAQSection"));
const CTASection = dynamic(() => import("@/components/CTASection"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <StatsSection />
      <UseCasesSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
