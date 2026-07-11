"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 px-6" aria-label="Call to action">
      <div className="max-w-[1280px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
          className="relative overflow-hidden rounded-3xl border border-gray-200 dark:border-[#27272A] bg-gray-50 dark:bg-[#09090B] p-12 sm:p-16 text-center shadow-sm"
        >
          {/* Background orbs */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute -top-20 -right-20 w-80 h-80 rounded-full"
              style={{
                background: "radial-gradient(ellipse, rgba(139,92,246,0.1) 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />
            <div
              className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full"
              style={{
                background: "radial-gradient(ellipse, rgba(59,130,246,0.1) 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />
            <div className="absolute inset-0 grid-pattern opacity-[0.03]" />
          </div>

          <div className="relative z-10">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex justify-center mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Sparkles className="w-3 h-3" />
                Free Forever · No Card Required
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-5"
            >
              Start Removing Backgrounds
              <br />
              <span className="gradient-text">Today — For Free</span>
            </motion.h2>

            {/* Supporting text */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-gray-500 dark:text-[#9CA3AF] text-lg max-w-lg mx-auto mb-10"
            >
              Join over 500,000 professionals who use cleanBG to create pixel-perfect
              transparent images in seconds.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/signup"
                className="group inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-xl gradient-bg-primary shadow-lg shadow-blue-500/25 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-200"
              >
                Remove Background Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                href="#upload"
                className="inline-flex items-center gap-2 px-7 py-4 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-xl border border-gray-200 dark:border-[#27272A] bg-white dark:bg-[#18181B] hover:border-gray-300 dark:hover:border-[#3F3F46] hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-200 shadow-sm"
              >
                Try Demo First
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="flex flex-wrap items-center justify-center gap-6 mt-10 text-xs text-gray-400"
            >
              <span>✓ No credit card</span>
              <span>✓ 10 free removals / month</span>
              <span>✓ No watermark</span>
              <span>✓ Original resolution</span>
              <span>✓ Instant results</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
