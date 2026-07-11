import { Upload, Sparkles, Download } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload Your Image",
    description: "Drag & drop, paste, or browse. Supports JPEG, PNG, and WebP up to 20MB.",
    color: "blue",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "AI Removes Background",
    description: "BiRefNet AI detects your subject and removes the background with pixel-perfect accuracy.",
    color: "purple",
  },
  {
    number: "03",
    icon: Download,
    title: "Download Your PNG",
    description: "Get a transparent PNG at full original resolution, ready to use anywhere.",
    color: "cyan",
  },
];

const colorMap: Record<string, { bg: string; icon: string; number: string; ring: string }> = {
  blue:   { bg: "bg-blue-50 dark:bg-blue-500/10",    icon: "text-blue-500 dark:text-blue-400",    number: "text-blue-500 dark:text-blue-400",    ring: "ring-blue-100 dark:ring-blue-500/10" },
  purple: { bg: "bg-purple-50 dark:bg-purple-500/10", icon: "text-purple-500 dark:text-purple-400", number: "text-purple-500 dark:text-purple-400", ring: "ring-purple-100 dark:ring-purple-500/10" },
  cyan:   { bg: "bg-cyan-50 dark:bg-cyan-500/10",    icon: "text-cyan-500 dark:text-cyan-400",    number: "text-cyan-500 dark:text-cyan-400",    ring: "ring-cyan-100 dark:ring-cyan-500/10" },
};

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="py-24 md:py-28 px-6 relative overflow-hidden bg-white dark:bg-[#09090B]"
      aria-label="How it works"
    >
      <div className="max-w-[900px] mx-auto relative z-10">
        <ScrollReveal delay={0} className="text-center mb-16 md:mb-20">
          <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-gray-400 dark:text-gray-500 mb-3">
            How It Works
          </p>
          <h2 className="text-3xl md:text-[44px] font-extrabold tracking-[-0.03em] text-gray-900 dark:text-white">
            Three steps to a perfect result
          </h2>
        </ScrollReveal>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
          {/* Connecting line — desktop only */}
          <div
            className="hidden md:block absolute top-10 left-[calc(16.66%+28px)] right-[calc(16.66%+28px)] h-px"
            style={{
              background: "linear-gradient(90deg, transparent 0%, #E4E4E7 20%, #E4E4E7 80%, transparent 100%)",
            }}
          />
          <div
            className="hidden md:dark:block absolute top-10 left-[calc(16.66%+28px)] right-[calc(16.66%+28px)] h-px"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.06) 80%, transparent 100%)",
            }}
          />

          {steps.map((step, i) => {
            const Icon = step.icon;
            const theme = colorMap[step.color];

            return (
              <ScrollReveal key={step.number} delay={i * 0.1} className="flex flex-col items-center text-center group">
                {/* Icon circle */}
                <div className="relative mb-7">
                  <div className={`w-20 h-20 rounded-full ${theme.bg} ring-4 ${theme.ring} flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}>
                    <Icon className={`w-7 h-7 ${theme.icon}`} strokeWidth={1.75} />
                  </div>
                  {/* Step badge */}
                  <div className={`absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-white dark:bg-[#09090B] border border-gray-100 dark:border-white/10 flex items-center justify-center`}>
                    <span className={`text-[10px] font-black ${theme.number}`}>{i + 1}</span>
                  </div>
                </div>

                <h3 className="text-[17px] font-bold text-gray-900 dark:text-white mb-2 tracking-[-0.02em]">
                  {step.title}
                </h3>
                <p className="text-[13.5px] text-gray-500 dark:text-gray-400 leading-[1.65] max-w-[200px] mx-auto">
                  {step.description}
                </p>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
