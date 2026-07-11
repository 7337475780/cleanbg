"use client";

import { motion, Variants } from "framer-motion";
import {
  Camera, ShoppingBag, Code2, PenTool,
  Video, Megaphone, GraduationCap, Building2,
} from "lucide-react";

const useCases = [
  {
    icon: Camera,
    title: "Photographers",
    description: "Eliminate complex backgrounds from portraits, fashion shots, and event photography without manual masking.",
    color: "blue",
  },
  {
    icon: ShoppingBag,
    title: "E-commerce Sellers",
    description: "Create clean product images on white or transparent backgrounds for Amazon, Shopify, and Etsy listings.",
    color: "cyan",
  },
  {
    icon: Code2,
    title: "Developers",
    description: "Integrate background removal into your own apps via the cleanBG REST API with just a few lines of code.",
    color: "purple",
  },
  {
    icon: PenTool,
    title: "Designers",
    description: "Get cut-out assets ready for Figma, Photoshop, or Canva in seconds — no pen tool required.",
    color: "purple",
  },
  {
    icon: Video,
    title: "Content Creators",
    description: "Produce professional thumbnails, channel art, and social assets with clean transparent PNGs.",
    color: "cyan",
  },
  {
    icon: Megaphone,
    title: "Marketing Teams",
    description: "Build campaign assets at scale. Remove backgrounds from hundreds of product shots in minutes.",
    color: "amber",
  },
  {
    icon: GraduationCap,
    title: "Students",
    description: "Create polished presentations, class projects, and portfolios without paying for expensive software.",
    color: "green",
  },
  {
    icon: Building2,
    title: "Businesses",
    description: "Standardize employee headshots, product catalogs, and marketing materials at enterprise scale.",
    color: "blue",
  },
];

const colorMap: Record<string, { bg: string; icon: string; glow: string }> = {
  blue:   { bg: "bg-blue-50 dark:bg-blue-500/10",   icon: "text-blue-500 dark:text-blue-400",   glow: "rgba(59,130,246,0.15)" },
  purple: { bg: "bg-purple-50 dark:bg-purple-500/10",  icon: "text-purple-500 dark:text-purple-400", glow: "rgba(139,92,246,0.15)" },
  cyan:   { bg: "bg-cyan-50 dark:bg-cyan-500/10",   icon: "text-cyan-500 dark:text-cyan-400",   glow: "rgba(6,182,212,0.12)" },
  green:  { bg: "bg-green-50 dark:bg-green-500/10",  icon: "text-green-500 dark:text-green-400",  glow: "rgba(10,185,129,0.12)" },
  amber:  { bg: "bg-amber-50 dark:bg-amber-500/10",  icon: "text-amber-500 dark:text-amber-400",  glow: "rgba(245,158,11,0.12)" },
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVar: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0, 0, 0.2, 1] } },
};

export default function UseCasesSection() {
  return (
    <section className="py-24 px-6 bg-gray-50 dark:bg-[#09090B]" aria-label="Use cases">
      <div className="max-w-[1280px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block mb-4 text-[11px] font-semibold tracking-[0.08em] uppercase text-green-500 dark:text-green-400">
            Who Uses cleanBG
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Built for <span className="gradient-text">Every Creative</span>
          </h2>
          <p className="text-gray-500 dark:text-[#9CA3AF] max-w-md mx-auto">
            From solo freelancers to enterprise teams — cleanBG adapts to your workflow.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {useCases.map((uc) => {
            const colors = colorMap[uc.color];
            const Icon = uc.icon;
            return (
              <motion.div
                key={uc.title}
                variants={cardVar}
                whileHover={{
                  y: -4,
                  boxShadow: `0 10px 30px ${colors.glow}, 0 4px 12px rgba(0,0,0,0.05)`,
                  transition: { type: "spring", stiffness: 200, damping: 25 },
                }}
                className="group p-5 rounded-2xl border border-gray-200 dark:border-[#27272A] bg-white dark:bg-[#111827] cursor-default transition-all duration-200 hover:border-gray-300 dark:hover:border-[#3F3F46] shadow-sm hover:shadow-md dark:shadow-none"
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${colors.bg}`}
                >
                  <Icon className={`w-5 h-5 ${colors.icon}`} strokeWidth={1.75} />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{uc.title}</h3>
                <p className="text-xs text-gray-500 dark:text-[#9CA3AF] leading-relaxed">{uc.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
