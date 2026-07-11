"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
}

function BeforeAfterSlider({ beforeSrc, afterSrc, beforeAlt = "Original image", afterAlt = "Background removed" }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setPosition(pct);
  }, []);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (dragging) updatePosition(e.clientX);
  }, [dragging, updatePosition]);

  const onTouchMove = useCallback((e: TouchEvent) => {
    if (dragging && e.touches[0]) {
      e.preventDefault();
      updatePosition(e.touches[0].clientX);
    }
  }, [dragging, updatePosition]);

  const stopDragging = useCallback(() => setDragging(false), []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", stopDragging);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", stopDragging);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", stopDragging);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", stopDragging);
    };
  }, [onMouseMove, onTouchMove, stopDragging]);

  return (
    <div
      ref={containerRef}
      className="relative select-none overflow-hidden rounded-2xl border border-[#27272A] cursor-col-resize"
      style={{ aspectRatio: "16/10" }}
      onMouseDown={(e) => { setDragging(true); updatePosition(e.clientX); }}
      onTouchStart={(e) => { setDragging(true); updatePosition(e.touches[0].clientX); }}
      role="slider"
      aria-label="Before/After comparison slider"
      aria-valuenow={Math.round(position)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPosition(p => Math.max(0, p - 5));
        if (e.key === "ArrowRight") setPosition(p => Math.min(100, p + 5));
      }}
    >
      {/* After (result) — full width checkerboard */}
      <div className="absolute inset-0 checkerboard">
        <Image
          src={afterSrc}
          alt={afterAlt}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover"
          draggable={false}
        />
      </div>

      {/* Before (original) — clipped left side */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover"
          draggable={false}
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white/80 shadow-[0_0_8px_rgba(0,0,0,0.5)]"
        style={{ left: `${position}%` }}
      />

      {/* Handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-[0_0_0_2px_rgba(255,255,255,0.3),0_4px_20px_rgba(0,0,0,0.4)] flex items-center justify-center z-10"
        style={{ left: `${position}%` }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M5 4L2 8L5 12" stroke="#09090B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11 4L14 8L11 12" stroke="#09090B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Labels */}
      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-sm text-xs font-semibold text-white border border-white/10">
        Original
      </div>
      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-sm text-xs font-semibold text-white border border-white/10">
        Result
      </div>
    </div>
  );
}

const examples = [
  {
    label: "Product Photography",
    before: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    after: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    tag: "E-commerce",
  },
  {
    label: "Portrait",
    before: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80",
    after: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80",
    tag: "Photography",
  },
  {
    label: "Complex Background",
    before: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    after: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    tag: "Interior",
  },
];

export default function BeforeAfterSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-24 px-6 relative" aria-label="Before and after comparison">
      <div className="max-w-[1280px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
          className="text-center mb-12"
        >
          <span className="inline-block mb-3 text-[11px] font-semibold tracking-[0.08em] uppercase text-cyan-400">
            Before / After
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            See the Difference <span className="gradient-text">Instantly</span>
          </h2>
          <p className="text-[#9CA3AF] max-w-md mx-auto">
            Drag the slider to compare before and after. Studio quality on every image.
          </p>
        </motion.div>

        {/* Example tabs */}
        <div className="flex justify-center gap-2 mb-8">
          {examples.map((ex, i) => (
            <button
              key={ex.label}
              onClick={() => setActive(i)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                active === i
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  : "text-[#9CA3AF] hover:text-white border border-transparent hover:border-[#27272A]"
              }`}
            >
              {ex.tag}
            </button>
          ))}
        </div>

        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
        >
          <BeforeAfterSlider
            beforeSrc={examples[active].before}
            afterSrc={examples[active].after}
            beforeAlt={`${examples[active].label} - original`}
            afterAlt={`${examples[active].label} - background removed`}
          />
        </motion.div>

        <p className="text-center text-xs text-[#52525B] mt-4">
          ← Drag the handle to compare → · Use arrow keys for precise control
        </p>
      </div>
    </section>
  );
}
