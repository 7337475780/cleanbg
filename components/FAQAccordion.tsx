"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

function FAQItem({ q, a, isOpen, onToggle }: {
  q: string; a: string; isOpen: boolean; onToggle: () => void;
}) {
  return (
    <div className="border-b border-gray-100 dark:border-white/[0.06] last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 py-4 text-left group"
        aria-expanded={isOpen}
      >
        <span className={`text-[14.5px] font-medium leading-snug transition-colors duration-200 pt-0.5 ${
          isOpen ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
        }`}>
          {q}
        </span>
        <span className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center border transition-all duration-200 mt-0.5 ${
          isOpen
            ? "border-blue-500 bg-blue-500 text-white rotate-45"
            : "border-gray-200 dark:border-white/15 text-gray-400 group-hover:border-gray-300 dark:group-hover:border-white/25"
        }`}>
          <Plus className="w-3 h-3" strokeWidth={2.5} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <p className="pb-4 text-[13.5px] text-gray-500 dark:text-gray-400 leading-[1.7]">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQAccordion({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="w-full">
      {faqs.map((faq, idx) => (
        <FAQItem
          key={idx}
          q={faq.q}
          a={faq.a}
          isOpen={openIndex === idx}
          onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
        />
      ))}
    </div>
  );
}
