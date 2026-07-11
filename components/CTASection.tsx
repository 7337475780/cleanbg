import { ScrollLink as Link } from "./ScrollLink";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export default function CTASection() {
  return (
    <section className="py-16 md:py-20 px-6" aria-label="Call to action">
      <div className="max-w-[1280px] mx-auto">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-2xl border border-gray-100 dark:border-white/[0.06] bg-gray-50 dark:bg-[#0D0D12] p-10 md:p-16 text-center">
            {/* Subtle background glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-30 dark:opacity-20"
                style={{
                  background: "radial-gradient(ellipse at center top, rgba(59,130,246,0.15) 0%, transparent 70%)",
                }}
              />
            </div>

            <div className="relative z-10 max-w-xl mx-auto">
              <p className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-[0.08em] uppercase border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-500 dark:text-gray-400 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Free Forever · No Card Required
              </p>

              <h2 className="text-3xl md:text-[44px] font-extrabold tracking-[-0.03em] text-gray-900 dark:text-white leading-[1.1] mb-4">
                Start removing backgrounds<br className="hidden sm:block" /> in seconds
              </h2>

              <p className="text-[15px] text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
                Join over 500,000 creators and businesses who use cleanBG to create professional transparent PNGs instantly.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/#upload"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-semibold text-white rounded-xl gradient-bg-primary shadow-[0_4px_20px_rgba(37,99,235,0.35)] hover:shadow-[0_6px_28px_rgba(37,99,235,0.45)] hover:-translate-y-px transition-all duration-200"
                >
                  Upload an Image
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/#pricing"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-semibold text-gray-700 dark:text-gray-200 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 rounded-xl transition-all duration-200"
                >
                  View Pricing
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
