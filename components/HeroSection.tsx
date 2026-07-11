import Link from "next/link";
import { Play, CheckCircle } from "lucide-react";
import HeroWorkflowCard from "./HeroWorkflowCard";
import AnimatedBackground from "./AnimatedBackground";
import { FadeIn } from "./FadeIn";

export default function HeroSection() {
  const trustItems = ["100% Free to Start", "No Watermark", "Original Quality", "Secure & Private"];

  return (
    <section className="relative min-h-screen pt-[120px] pb-24 overflow-hidden" aria-label="Hero section">
      <AnimatedBackground />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-10 lg:gap-16">
        
        {/* LEFT COLUMN: Copy & CTA */}
        <div className="w-full md:w-[55%] lg:flex-1 flex flex-col items-start lg:pt-10">
          <FadeIn delay={0}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-gray-200 bg-gray-50 text-gray-600 mb-8 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              AI-Powered Background Remover
            </span>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-[56px] lg:text-[72px] xl:text-[88px] md:leading-[1.1] lg:leading-[1.05] font-extrabold tracking-tight text-gray-900 mb-6">
              Remove Backgrounds.<br />
              Keep <span className="gradient-text">Perfection.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-lg text-gray-600 leading-relaxed max-w-lg mb-[72px]">
              cleanBG uses next-generation AI to remove backgrounds in seconds — delivering studio-quality transparent PNGs that preserve every pixel of your original image.
            </p>
          </FadeIn>

          <FadeIn delay={0.3} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              href="#upload"
              className="w-full sm:w-auto text-center px-8 py-4 text-base font-semibold text-white rounded-xl gradient-bg-primary shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-px transition-all duration-200"
            >
              Start Free
            </Link>
            <button className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 px-7 py-4 text-base font-semibold text-gray-700 dark:text-gray-200 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 rounded-xl border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 shadow-sm transition-all duration-200">
              <span className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center group-hover:bg-gray-200 dark:group-hover:bg-white/20 transition-colors">
                <Play className="w-3.5 h-3.5 text-gray-700 dark:text-white translate-x-0.5" fill="currentColor" />
              </span>
              Watch Demo
            </button>
          </FadeIn>

          <FadeIn delay={0.4} className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-500 dark:text-gray-400 mt-[40px]">
            {trustItems.map((t) => (
              <span key={t} className="flex items-center gap-1.5 font-medium">
                <CheckCircle className="w-4 h-4 text-green-500" />
                {t}
              </span>
            ))}
          </FadeIn>
        </div>

        {/* RIGHT COLUMN: Unified Workflow Card */}
        <div className="w-full md:w-[45%] lg:flex-1 max-w-lg md:max-w-none mx-auto md:mx-0 mt-8 md:mt-0 relative z-10">
          {/* Inner subtle glow for the card container area */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-blue-500/10 dark:bg-blue-500/20 blur-[100px] pointer-events-none rounded-full" />
          
          <FadeIn delay={0.6}>
            <HeroWorkflowCard />
          </FadeIn>
        </div>

      </div>
    </section>
  );
}
