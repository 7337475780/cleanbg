"use client";

import { motion, Variants } from "framer-motion";
import { Layers, Wand2, Zap, FileImage, Shield } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const features = [
  {
    icon: Layers,
    title: "Original Resolution",
    description: "Download at the same pixel dimensions — no quality loss.",
    color: "blue",
  },
  {
    icon: Wand2,
    title: "AI Hair Detection",
    description: "Fine strands and complex edges detected with precision.",
    color: "purple",
  },
  {
    icon: Zap,
    title: "Fast Processing",
    description: "Average background removal completes in under 3 seconds.",
    color: "cyan",
  },
  {
    icon: FileImage,
    title: "Transparent PNG",
    description: "Get clean, composable transparent PNGs ready to drop in.",
    color: "green",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Images are processed and immediately discarded.",
    color: "amber",
  },
];

const colorMap: Record<string, { bg: string; icon: string; border: string }> = {
  blue:   { bg: "bg-blue-50 dark:bg-blue-500/10",   icon: "text-blue-500 dark:text-blue-400",   border: "border-blue-100 dark:border-blue-500/20" },
  purple: { bg: "bg-purple-50 dark:bg-purple-500/10", icon: "text-purple-500 dark:text-purple-400", border: "border-purple-100 dark:border-purple-500/20" },
  cyan:   { bg: "bg-cyan-50 dark:bg-cyan-500/10",   icon: "text-cyan-500 dark:text-cyan-400",   border: "border-cyan-100 dark:border-cyan-500/20" },
  green:  { bg: "bg-green-50 dark:bg-green-500/10",  icon: "text-green-500 dark:text-green-400",  border: "border-green-100 dark:border-green-500/20" },
  amber:  { bg: "bg-amber-50 dark:bg-amber-500/10",  icon: "text-amber-500 dark:text-amber-400",  border: "border-amber-100 dark:border-amber-500/20" },
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0, 0, 0.2, 1] } },
};

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 md:py-32 px-6 bg-gray-50/50 dark:bg-[#09090B] border-y border-gray-100 dark:border-white/[0.05]" aria-label="Features">
      <div className="max-w-[1280px] mx-auto">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Studio quality.<br className="hidden md:block" /> Lightning fast.
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-md text-lg">
              Everything you need to process thousands of images automatically with flawless precision.
            </p>
          </div>
        </ScrollReveal>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            const theme = colorMap[feat.color];
            
            return (
              <motion.div
                key={idx}
                variants={cardVariant}
                whileHover={{ y: -5, scale: 1.01 }}
                className={`group flex flex-col p-8 rounded-3xl bg-white dark:bg-[#18181B] border transition-all duration-300 ease-out shadow-[0_2px_12px_rgba(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] ${theme.border} hover:border-gray-300 dark:hover:border-white/20`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 ${theme.bg} ${theme.border} border`}
                >
                  <Icon className={`w-5 h-5 ${theme.icon}`} strokeWidth={2} />
                </div>
                <h3 className="text-[15px] font-semibold text-gray-900 dark:text-white mb-1.5">{feat.title}</h3>
                <p className="text-[13px] text-gray-500 dark:text-[#9CA3AF] leading-relaxed flex-1">{feat.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
