"use client";

import { useEffect, useRef } from "react";
import { motion, useSpring, useTransform, useInView, useReducedMotion } from "framer-motion";

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export default function Counter({ value, suffix = "", prefix = "", className = "" }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();
  const hasAnimated = useRef(false);

  const springValue = useSpring(0, {
    stiffness: 100,
    damping: 30,
    mass: 1,
  });

  const displayValue = useTransform(springValue, (current) => {
    return Math.round(current).toString();
  });

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      springValue.set(value);
      hasAnimated.current = true;
    }
  }, [isInView, springValue, value]);

  if (prefersReducedMotion) {
    return (
      <span className={className}>
        {prefix}{value}{suffix}
      </span>
    );
  }

  return (
    <span className={className} ref={ref}>
      {prefix}
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
}
