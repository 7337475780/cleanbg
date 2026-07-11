import { Upload, Sparkles, Download } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload Image",
    description: "Drag & drop or browse your file.",
    color: "blue",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Auto Remove Background",
    description: "AI perfectly masks subjects in seconds.",
    color: "purple",
  },
  {
    number: "03",
    icon: Download,
    title: "Download Result",
    description: "Get a transparent PNG immediately.",
    color: "cyan",
  },
];

const colorMap: Record<string, { bg: string; icon: string; line: string; number: string }> = {
  blue:   { bg: "bg-blue-50 dark:bg-blue-500/10",   icon: "text-blue-500 dark:text-blue-400",   line: "#3B82F6", number: "text-blue-600 dark:text-blue-400" },
  purple: { bg: "bg-purple-50 dark:bg-purple-500/10", icon: "text-purple-500 dark:text-purple-400", line: "#8B5CF6", number: "text-purple-600 dark:text-purple-400" },
  cyan:   { bg: "bg-cyan-50 dark:bg-cyan-500/10",   icon: "text-cyan-500 dark:text-cyan-400",   line: "#06B6D4", number: "text-cyan-600 dark:text-cyan-400" },
};

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 px-6 relative overflow-hidden bg-white dark:bg-[#09090B]" aria-label="How it works">
      <div className="max-w-[1000px] mx-auto relative z-10">
        <ScrollReveal delay={0} className="text-center mb-20">
          <span className="inline-block mb-3 text-[11px] font-bold tracking-[0.1em] uppercase text-gray-400 dark:text-gray-500">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Three Steps to <span className="gradient-text">Perfection</span>
          </h2>
        </ScrollReveal>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-12 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const theme = colorMap[step.color];

              return (
                <ScrollReveal key={step.number} delay={i * 0.1} className="relative flex flex-col items-center group">
                  <div className="relative z-10">
                    <div className="absolute inset-0 bg-white dark:bg-[#09090B] rounded-full scale-[1.2]" />
                    <div className={`relative w-24 h-24 rounded-full flex items-center justify-center border-4 border-white dark:border-[#09090B] shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_0_30px_rgba(0,0,0,0.2)] transition-transform duration-500 group-hover:scale-110 ${theme.bg}`}>
                      <Icon className={`w-8 h-8 ${theme.icon}`} strokeWidth={1.5} />
                    </div>
                  </div>

                  <div className="text-center mt-8 px-4">
                    <div className={`text-sm font-black mb-2 tracking-widest ${theme.number}`}>
                      STEP {step.number}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-[15px] text-gray-500 dark:text-[#A1A1AA] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
