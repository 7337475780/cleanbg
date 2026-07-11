"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const faqs = [
  {
    q: "Is cleanBG really free?",
    a: "Yes! The free plan gives you 10 background removals per month with no watermarks and no credit card required. Upgrade to Pro when you need unlimited processing.",
  },
  {
    q: "What image formats are supported?",
    a: "cleanBG accepts JPEG, PNG, and WebP images up to 20MB. Output is always a transparent PNG (or WebP if you prefer), preserving your original resolution.",
  },
  {
    q: "How does the AI remove backgrounds?",
    a: "We use BiRefNet, a state-of-the-art bi-directional recurrent neural network specifically designed for high-accuracy image matting. It processes foreground and background context simultaneously for pixel-perfect edges.",
  },
  {
    q: "Are my images stored or shared?",
    a: "No. Your images are processed in memory and immediately discarded after you download the result. We never store, analyze, or share your images. Your privacy is our top priority.",
  },
  {
    q: "What is the maximum image size or resolution?",
    a: "File size limit is 20MB. Resolution limit is 8000×8000 pixels. The output is always the same resolution as your input — no downscaling.",
  },
  {
    q: "Does cleanBG handle hair and fine details?",
    a: "Yes. Our AI model is specifically trained to handle fine hair strands, flyaways, fur, feathers, and other complex edge cases that traditionally require manual masking.",
  },
  {
    q: "Is there a REST API available?",
    a: "An API is in development and will be available in the Pro plan. You'll be able to integrate background removal directly into your own applications with just a few lines of code.",
  },
  {
    q: "Can I use cleanBG output images commercially?",
    a: "Free plan images are for personal and educational use. Pro and Enterprise plans include a full commercial license for use in client work, products, and marketing.",
  },
  {
    q: "How fast is the processing?",
    a: "Most images are processed in under 3 seconds. Complex images with intricate backgrounds may take up to 10 seconds. Pro users get priority GPU processing.",
  },
];

function FAQItem({ q, a, isOpen, onToggle }: {
  q: string; a: string; isOpen: boolean; onToggle: () => void;
}) {
  return (
    <div className="border-b border-gray-100 dark:border-white/10 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-4 md:py-5 min-h-[56px] text-left group"
        aria-expanded={isOpen}
      >
        <span className={`text-base font-medium transition-colors duration-200 ${isOpen ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"}`}>
          {q}
        </span>
        <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-200
          ${isOpen ? "bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/30 text-blue-500 dark:text-blue-400" : "border-gray-200 dark:border-[#3F3F46] text-gray-400 dark:text-[#52525B] group-hover:border-gray-300 dark:group-hover:border-[#52525B] group-hover:text-gray-600 dark:group-hover:text-[#A1A1AA]"}`}>
          {isOpen ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-gray-500 dark:text-[#9CA3AF] leading-relaxed max-w-[600px]">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-6 bg-gray-50 dark:bg-[#09090B] border-t border-gray-200 dark:border-[#27272A]" aria-label="Frequently asked questions">
      <div className="max-w-[768px] mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="inline-block mb-4 text-[11px] font-semibold tracking-[0.08em] uppercase text-purple-500 dark:text-purple-400">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You <span className="gradient-text">Need to Know</span>
            </h2>
            <p className="text-gray-500 dark:text-[#9CA3AF]">
              Can&apos;t find the answer you&apos;re looking for?{" "}
              <a href="mailto:hello@cleanbg.io" className="text-blue-500 hover:text-blue-600 underline underline-offset-2 transition-colors">
                Contact our support team
              </a>
            </p>
          </div>
        </ScrollReveal>

        <div className="rounded-2xl border border-gray-200 dark:border-[#27272A] bg-white dark:bg-[#111827] px-6 sm:px-8 shadow-sm">
          {faqs.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <FAQItem
                q={faq.q}
                a={faq.a}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
