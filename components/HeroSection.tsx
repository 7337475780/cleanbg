import { ScrollLink as Link } from "./ScrollLink";
import { ArrowUpRight, CheckCircle } from "lucide-react";
import ProductionEditor from "@/features/editor/ProductionEditor";
import AnimatedBackground from "./AnimatedBackground";
import { FadeIn } from "./FadeIn";

export default function HeroSection() {
  const trustItems = [
    "Free to Start",
    "No Watermark",
    "Original Quality",
    "Secure & Private",
  ];

  return (
    <section
      className="relative min-h-screen pt-28 md:pt-36 pb-20 md:pb-32 overflow-hidden"
      aria-label="Hero section"
    >
      <AnimatedBackground />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 xl:gap-20">

          {/* LEFT COLUMN */}
          <div className="w-full lg:w-[52%] flex flex-col items-center lg:items-start text-center lg:text-left">

            <FadeIn delay={0}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.08em] uppercase border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-500 dark:text-gray-400 mb-7 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                AI-Powered Background Remover
              </div>
            </FadeIn>

            <FadeIn delay={0.08}>
              <h1 className="text-[42px] sm:text-[52px] md:text-[60px] lg:text-[68px] xl:text-[80px] font-black tracking-[-0.04em] leading-[1.0] text-gray-900 dark:text-white mb-6">
                Remove<br />
                Backgrounds.<br />
                <span className="gradient-text">Keep Perfection.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.16}>
              <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 leading-[1.7] max-w-md mb-8">
                Next-generation AI removes backgrounds in seconds — delivering studio-quality transparent PNGs that preserve every detail.
              </p>
            </FadeIn>

            <FadeIn delay={0.22}>
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <Link
                  href="/#upload"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-semibold text-white rounded-xl gradient-bg-primary shadow-[0_4px_20px_rgba(37,99,235,0.35)] hover:shadow-[0_6px_28px_rgba(37,99,235,0.45)] hover:-translate-y-px active:translate-y-0 transition-all duration-200"
                >
                  Start for Free
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/#how-it-works"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-semibold text-gray-700 dark:text-gray-200 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20 rounded-xl transition-all duration-200"
                >
                  See How It Works
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.30}>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 mt-6">
                {trustItems.map((t) => (
                  <span key={t} className="flex items-center gap-1.5 text-[13px] font-medium text-gray-400 dark:text-gray-500">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0" strokeWidth={2.5} />
                    {t}
                  </span>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* RIGHT COLUMN: Workflow Card */}
          <div className="w-full lg:w-[48%] max-w-[540px] mx-auto lg:mx-0">
            <FadeIn delay={0.38}>
              <ProductionEditor />
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}
