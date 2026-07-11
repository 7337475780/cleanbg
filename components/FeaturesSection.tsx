import { Layers, Wand2, Zap, FileImage, Shield } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const features = [
  {
    icon: Layers,
    title: "Original Resolution",
    description: "Download at the exact same pixel dimensions — zero quality loss, zero compression.",
    color: "blue",
  },
  {
    icon: Wand2,
    title: "AI Hair Detection",
    description: "Fine hair strands and complex edges detected with pixel-perfect precision.",
    color: "purple",
  },
  {
    icon: Zap,
    title: "Under 3 Seconds",
    description: "Average background removal completes in under 3 seconds on any image.",
    color: "cyan",
  },
  {
    icon: FileImage,
    title: "Transparent PNG",
    description: "Get clean, composable transparent PNGs ready to drop directly into any design tool.",
    color: "green",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your images are processed and immediately discarded. We never store your files.",
    color: "amber",
  },
];

const colorMap: Record<string, { bg: string; icon: string; border: string }> = {
  blue:   { bg: "bg-blue-50 dark:bg-blue-500/10",    icon: "text-blue-600 dark:text-blue-400",    border: "border-blue-100 dark:border-blue-500/15" },
  purple: { bg: "bg-purple-50 dark:bg-purple-500/10", icon: "text-purple-600 dark:text-purple-400", border: "border-purple-100 dark:border-purple-500/15" },
  cyan:   { bg: "bg-cyan-50 dark:bg-cyan-500/10",    icon: "text-cyan-600 dark:text-cyan-400",    border: "border-cyan-100 dark:border-cyan-500/15" },
  green:  { bg: "bg-green-50 dark:bg-green-500/10",   icon: "text-green-600 dark:text-green-400",   border: "border-green-100 dark:border-green-500/15" },
  amber:  { bg: "bg-amber-50 dark:bg-amber-500/10",   icon: "text-amber-600 dark:text-amber-400",   border: "border-amber-100 dark:border-amber-500/15" },
};

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-24 md:py-28 px-6 bg-gray-50/40 dark:bg-[#09090B] border-y border-gray-100 dark:border-white/[0.04]"
      aria-label="Features"
    >
      <div className="max-w-[1280px] mx-auto">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-14">
            <div>
              <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-gray-400 dark:text-gray-500 mb-3">
                Why cleanBG
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.15]">
                Studio quality.<br className="hidden md:block" /> Lightning fast.
              </h2>
            </div>
            <p className="text-[15px] text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed md:text-right">
              Everything you need to process images automatically with professional precision.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            const theme = colorMap[feat.color];

            return (
              <ScrollReveal key={idx} delay={idx * 0.07}>
                <div
                  className={`group flex flex-col p-7 rounded-2xl bg-white dark:bg-[#111113] border card-transition
                    shadow-[0_1px_4px_rgba(0,0,0,0.04)] dark:shadow-none
                    hover:shadow-[0_8px_32px_rgba(0,0,0,0.07)] dark:hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]
                    hover:-translate-y-1 ${theme.border}
                    hover:border-gray-200 dark:hover:border-white/10`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-105 ${theme.bg} ${theme.border} border`}
                  >
                    <Icon className={`w-4.5 h-4.5 ${theme.icon}`} strokeWidth={2} />
                  </div>
                  <h3 className="text-[14px] font-semibold text-gray-900 dark:text-white mb-1.5 tracking-[-0.01em]">
                    {feat.title}
                  </h3>
                  <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-[1.6] flex-1">
                    {feat.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
