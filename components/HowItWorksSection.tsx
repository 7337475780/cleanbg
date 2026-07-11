"use client";

import { motion } from "framer-motion";
import { Upload, Sparkles, Download } from "lucide-react";

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
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
          className="text-center mb-20"
        >
          <span className="inline-block mb-3 text-[11px] font-bold tracking-[0.1em] uppercase text-gray-400 dark:text-gray-500">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Three Steps to <span className="gradient-text">Perfection</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-12 left-[16.66%] right-[16.66%] h-px">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, delay: 0.3, ease: [0, 0, 0.2, 1] }}
              className="h-px origin-left bg-gray-200 dark:bg-white/10"
            />
          </div>

          {/* Connecting line (mobile vertical) */}
          <div className="block md:hidden absolute top-[10%] bottom-[10%] left-1/2 -translate-x-1/2 w-px">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, delay: 0.3, ease: [0, 0, 0.2, 1] }}
              className="w-full h-full origin-top bg-gray-200 dark:bg-white/10"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-4 relative z-10">
            {steps.map((step, i) => {
              const colors = colorMap[step.color];
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0, 0, 0.2, 1] }}
                  className="relative flex flex-col items-center text-center gap-5"
                >
                  {/* Circle + Icon */}
                  <div className="relative">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={`w-24 h-24 rounded-full flex items-center justify-center border-2 border-white dark:border-[#09090B] shadow-sm relative z-10 ${colors.bg}`}
                    >
                      <Icon className={`w-10 h-10 ${colors.icon}`} strokeWidth={1.5} />
                    </motion.div>
                    {/* Number */}
                    <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-white dark:bg-[#18181B] border border-gray-100 dark:border-white/10 shadow-sm flex items-center justify-center z-20">
                      <span className={`text-[11px] font-bold ${colors.number}`}>{i + 1}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                    <p className="text-[15px] text-gray-500 dark:text-gray-400 leading-relaxed max-w-[220px] mx-auto">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
