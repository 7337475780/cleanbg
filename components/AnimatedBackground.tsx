"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function AnimatedBackground() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Base radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white dark:from-blue-900/20 dark:via-[#09090b] dark:to-[#09090b]" />

      {/* Floating Blob 1 - Blue */}
      <motion.div
        className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] rounded-full bg-blue-400/20 dark:bg-blue-600/10 mix-blend-multiply dark:mix-blend-screen blur-[120px]"
        animate={{
          x: ["0%", "10%", "-5%", "0%"],
          y: ["0%", "15%", "-10%", "0%"],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ willChange: "transform" }}
      />

      {/* Floating Blob 2 - Purple */}
      <motion.div
        className="absolute top-[20%] -right-[10%] w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full bg-purple-400/20 dark:bg-purple-600/10 mix-blend-multiply dark:mix-blend-screen blur-[120px]"
        animate={{
          x: ["0%", "-15%", "10%", "0%"],
          y: ["0%", "-10%", "15%", "0%"],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
          delay: 2,
        }}
        style={{ willChange: "transform" }}
      />

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
           style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, black 1px, transparent 0)', backgroundSize: '40px 40px' }} 
      />
    </div>
  );
}
