"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
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
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [isAutoPlaying, next]);

  const t = testimonials[current];

  return (
    <div
      className="relative max-w-2xl mx-auto"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Card */}
      <div className="bg-white dark:bg-[#111113] border border-gray-100 dark:border-white/[0.06] rounded-2xl p-8 md:p-10 shadow-[0_2px_16px_rgba(0,0,0,0.04)] dark:shadow-none">
        {/* Stars */}
        <div className="flex gap-1 mb-6">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
          ))}
        </div>

        {/* Quote */}
        <blockquote className="text-[17px] md:text-[19px] text-gray-800 dark:text-gray-100 font-medium leading-[1.65] mb-8 tracking-[-0.01em]">
          &ldquo;{t.quote}&rdquo;
        </blockquote>

        {/* Author */}
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-gray-100 dark:border-white/10">
            <Image
              src={t.avatar}
              alt={t.name}
              fill
              sizes="40px"
              className="object-cover"
              unoptimized
            />
          </div>
          <div>
            <div className="text-[13.5px] font-semibold text-gray-900 dark:text-white">
              {t.name}
            </div>
            <div className="text-[12px] text-gray-400 dark:text-gray-500">
              {t.role} · <span className="text-blue-500 dark:text-blue-400">{t.company}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls row */}
      <div className="flex items-center justify-between mt-5 px-1">
        {/* Dots */}
        <div className="flex gap-1.5">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                current === idx
                  ? "bg-blue-500 w-5"
                  : "bg-gray-200 dark:bg-gray-700 w-1.5 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            />
          ))}
        </div>

        {/* Arrow buttons */}
        <div className="flex gap-2">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="w-8 h-8 rounded-lg bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-white/20 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="w-8 h-8 rounded-lg bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-white/20 transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
