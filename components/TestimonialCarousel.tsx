"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  quote: string;
}

export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, next]);

  return (
    <div 
      className="relative max-w-4xl mx-auto"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 z-10">
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white dark:bg-[#18181B] border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-[#09090B]"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      <div className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 z-10">
        <button
          onClick={next}
          aria-label="Next testimonial"
          className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white dark:bg-[#18181B] border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-[#09090B]"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      <div className="overflow-hidden px-4 py-8">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {testimonials.map((t, idx) => (
            <div key={idx} className="w-full flex-shrink-0 px-2 md:px-4">
              <div className="bg-white dark:bg-[#18181B] border border-gray-100 dark:border-white/5 rounded-3xl p-8 md:p-10 shadow-[0_2px_20px_rgba(0,0,0,0.03)] dark:shadow-none h-full flex flex-col items-center text-center group">
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <blockquote className="text-xl md:text-2xl text-gray-900 dark:text-gray-100 font-medium leading-relaxed mb-8">
                  &quot;{t.quote}&quot;
                </blockquote>
                <div className="mt-auto">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mb-4 mx-auto border-2 border-white dark:border-[#27272A] shadow-md group-hover:scale-105 transition-transform duration-300">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="font-semibold text-gray-900 dark:text-white text-lg">
                    {t.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-[#A1A1AA]">
                    {t.role}, <span className="text-blue-500 dark:text-blue-400 font-medium">{t.company}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to testimonial ${idx + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              current === idx 
                ? "bg-blue-500 w-6" 
                : "bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
