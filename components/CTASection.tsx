import { ScrollLink as Link } from "./ScrollLink";
import { ArrowRight, Sparkles } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export default function CTASection() {
  return (
    <section className="py-24 px-6" aria-label="Call to action">
      <div className="max-w-[1280px] mx-auto">
        <ScrollReveal
          delay={0}
          className="relative overflow-hidden rounded-3xl border border-gray-200 dark:border-[#27272A] bg-gray-50 dark:bg-[#09090B] p-12 sm:p-16 text-center shadow-sm"
        >
          {/* Background orbs */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute -top-20 -right-20 w-80 h-80 rounded-full"
              style={{
                background: "radial-gradient(ellipse, rgba(139,92,246,0.1) 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />
            <div
              className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full"
              style={{
                background: "radial-gradient(ellipse, rgba(59,130,246,0.1) 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />
            <div className="absolute inset-0 grid-pattern opacity-[0.03]" />
          </div>

          <div className="relative z-10">
            {/* Badge */}
            <ScrollReveal delay={0.1} className="flex justify-center mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Sparkles className="w-3 h-3" />
                Free Forever · No Card Required
              </span>
            </ScrollReveal>

            {/* Headline */}
            <ScrollReveal delay={0.15}>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-5">
                Start Removing Backgrounds
                <br className="hidden sm:block" />
                <span className="gradient-text">In Seconds</span>
              </h2>
            </ScrollReveal>

            {/* Subheadline */}
            <ScrollReveal delay={0.2}>
              <p className="text-lg text-gray-600 dark:text-[#A1A1AA] max-w-xl mx-auto mb-10 leading-relaxed">
                Join over 500,000 creators and businesses who use cleanBG to create professional, transparent PNGs instantly.
              </p>
            </ScrollReveal>

            {/* CTA Buttons */}
            <ScrollReveal delay={0.25} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/#upload"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-xl gradient-bg-primary shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-px transition-all duration-200"
              >
                Upload an Image
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/#pricing"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-gray-700 dark:text-gray-200 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20 rounded-xl transition-all duration-200"
              >
                View Pricing
              </Link>
            </ScrollReveal>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
