"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Lead Product Designer",
    company: "Shopify",
    avatar: "https://ui-avatars.com/api/?name=Sarah+Chen&background=3B82F6&color=fff&size=80",
    rating: 5,
    quote: "cleanBG has completely replaced our old workflow. What used to take 20 minutes in Photoshop now takes 3 seconds. The edge quality on hair is genuinely impressive.",
  },
  {
    name: "Marcus Williams",
    role: "E-commerce Director",
    company: "Nordstrom",
    avatar: "https://ui-avatars.com/api/?name=Marcus+Williams&background=8B5CF6&color=fff&size=80",
    rating: 5,
    quote: "We process 500+ product images per week. cleanBG's API integration saved us thousands of hours and the consistency is unbeatable. Every image looks professional.",
  },
  {
    name: "Aiko Tanaka",
    role: "Creative Director",
    company: "Studio Tanaka",
    avatar: "https://ui-avatars.com/api/?name=Aiko+Tanaka&background=06B6D4&color=fff&size=80",
    rating: 5,
    quote: "I was skeptical about AI background removal after disappointing results with competitors. cleanBG surprised me — it handles fine jewelry and complex textures beautifully.",
  },
  {
    name: "James Okafor",
    role: "Full-Stack Developer",
    company: "Freelance",
    avatar: "https://ui-avatars.com/api/?name=James+Okafor&background=10B981&color=fff&size=80",
    rating: 5,
    quote: "The REST API is clean and well-documented. I integrated it into my client's e-commerce platform in under an hour. The free tier was enough to test thoroughly.",
  },
  {
    name: "Elena Rossi",
    role: "Photography Business Owner",
    company: "Rossi Photography",
    avatar: "https://ui-avatars.com/api/?name=Elena+Rossi&background=F43F5E&color=fff&size=80",
    rating: 5,
    quote: "Portrait photographers — this is the tool you've been waiting for. Hair masking is flawless and it preserves the original resolution. My clients are amazed.",
  },
  {
    name: "David Park",
    role: "Marketing Manager",
    company: "TechFlow",
    avatar: "https://ui-avatars.com/api/?name=David+Park&background=F59E0B&color=fff&size=80",
    rating: 5,
    quote: "We switched our entire marketing asset pipeline to cleanBG. It's faster, cheaper, and the output quality matches what our design team used to produce manually.",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const next = useCallback(() => setCurrent(c => (c + 1) % testimonials.length), []);
  const prev = useCallback(() => setCurrent(c => (c - 1 + testimonials.length) % testimonials.length), []);

  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [autoplay, next]);

  const visibleIndices = [
    (current - 1 + testimonials.length) % testimonials.length,
    current,
    (current + 1) % testimonials.length,
  ];

  return (
    <section className="py-24 px-6 overflow-hidden relative bg-white dark:bg-[#09090B]" aria-label="Testimonials">
      <div className="max-w-[1280px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block mb-4 text-[11px] font-semibold tracking-[0.08em] uppercase text-amber-500">
            Loved By Professionals
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Trusted by <span className="gradient-text">Thousands</span>
          </h2>
          <div className="flex items-center justify-center gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <p className="text-sm text-gray-500 dark:text-[#9CA3AF]">4.9/5 average from 15,000+ reviews</p>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setAutoplay(false)}
          onMouseLeave={() => setAutoplay(true)}
        >
          {/* Cards */}
          {/* Native scroll carousel (Mobile) */}
          <div className="flex md:hidden overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-6 px-6 touch-pan-x" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {testimonials.map((t, i) => (
              <div key={i} className="min-w-[85vw] snap-center relative p-6 rounded-2xl border border-gray-200 dark:border-[#27272A] bg-white dark:bg-[#111827] shadow-sm flex flex-col">
                  {/* Quote */}
                  <div className="mb-5 flex-1">
                    <div className="flex gap-0.5 mb-4">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                  </div>
                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-[#27272A] mt-auto">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200 dark:border-[#3F3F46]">
                      <Image src={t.avatar} alt={t.name} fill sizes="40px" className="object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{t.name}</p>
                      <p className="text-xs text-gray-500 dark:text-[#9CA3AF]">{t.role} · {t.company}</p>
                    </div>
                  </div>
              </div>
            ))}
          </div>

          {/* Grid carousel (Tablet/Desktop) */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-5">
            {visibleIndices.map((idx, pos) => {
              const t = testimonials[idx];
              const isCenter = pos === 1;
              return (
                <motion.div
                  key={`${idx}-${current}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
                  className={`relative p-6 rounded-2xl border transition-all duration-300 flex flex-col
                    ${pos === 2 ? "hidden lg:flex" : "flex"}
                    ${isCenter
                      ? "border-blue-200 dark:border-blue-500/30 bg-blue-50/50 dark:bg-blue-500/10 shadow-md shadow-blue-500/10 lg:opacity-100"
                      : "border-gray-200 dark:border-[#27272A] bg-white dark:bg-[#111827] lg:opacity-60 lg:hover:opacity-100 shadow-sm"
                    }`}
                >
                  {/* Quote */}
                  <div className="mb-5 flex-1">
                    <div className="flex gap-0.5 mb-4">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-[#27272A] mt-auto">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200 dark:border-[#3F3F46]">
                      <Image src={t.avatar} alt={t.name} fill sizes="40px" className="object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{t.name}</p>
                      <p className="text-xs text-gray-500 dark:text-[#9CA3AF]">{t.role} · {t.company}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Controls */}
          <div className="hidden md:flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="w-9 h-9 rounded-full border border-gray-200 dark:border-[#27272A] bg-white dark:bg-[#18181B] flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-[#3F3F46] transition-all hover:bg-gray-50 dark:hover:bg-white/5 shadow-sm"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Dots */}
            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === current ? "w-6 h-2 bg-blue-500" : "w-2 h-2 bg-gray-200 dark:bg-[#27272A] hover:bg-gray-300 dark:hover:bg-[#3F3F46]"
                  }`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-9 h-9 rounded-full border border-gray-200 dark:border-[#27272A] bg-white dark:bg-[#18181B] flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-[#3F3F46] transition-all hover:bg-gray-50 dark:hover:bg-white/5 shadow-sm"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
