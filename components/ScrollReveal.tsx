"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function ScrollReveal({ children, delay = 0, className = "" }: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1], // Apple-style fluid ease out
        delay: delay,
      }}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
}
