"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Check, X, Sparkles, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "0",
    period: "forever",
    description: "Perfect for trying cleanBG and occasional use.",
    cta: "Start for Free",
    ctaHref: "/signup",
    featured: false,
    badge: null,
    features: [
      { text: "10 images per month", included: true },
      { text: "Original resolution output", included: true },
      { text: "PNG & WebP export", included: true },
      { text: "No watermark", included: true },
      { text: "Basic edge quality", included: true },
      { text: "API access", included: false },
      { text: "Batch processing", included: false },
      { text: "Priority processing", included: false },
      { text: "Commercial license", included: false },
    ],
  },
  {
    name: "Pro",
    price: "12",
    period: "per month",
    description: "For professionals and growing teams who need more power.",
    cta: "Join Waitlist",
    ctaHref: "#waitlist",
    featured: true,
    badge: "Coming Soon",
    features: [
      { text: "Unlimited images", included: true },
      { text: "Original resolution output", included: true },
      { text: "PNG, WebP & SVG export", included: true },
      { text: "No watermark", included: true },
      { text: "Premium edge quality", included: true },
      { text: "API access (1,000 req/mo)", included: true },
      { text: "Batch processing", included: true },
      { text: "Priority processing", included: true },
      { text: "Commercial license", included: true },
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large teams needing scale, SLAs, and dedicated support.",
    cta: "Contact Sales",
    ctaHref: "mailto:enterprise@cleanbg.io",
    featured: false,
    badge: "Coming Soon",
    features: [
      { text: "Unlimited images", included: true },
      { text: "Original resolution output", included: true },
      { text: "All export formats", included: true },
      { text: "No watermark", included: true },
      { text: "Maximum edge quality", included: true },
      { text: "Unlimited API access", included: true },
      { text: "Batch processing", included: true },
      { text: "Dedicated GPU priority", included: true },
      { text: "SLA + dedicated support", included: true },
    ],
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const cardVar: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0, 0, 0.2, 1] } },
};

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-6 relative overflow-hidden bg-white dark:bg-[#09090B]" aria-label="Pricing">
      <div className="max-w-[1280px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 mb-4 text-[11px] font-semibold tracking-[0.08em] uppercase text-blue-500 dark:text-blue-400">
            <Sparkles className="w-3.5 h-3.5" />
            Simple Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Start Free,{" "}
            <span className="gradient-text">Scale When Ready</span>
          </h2>
          <p className="text-gray-500 dark:text-[#9CA3AF] max-w-md mx-auto">
            No credit card required. No hidden fees. Upgrade when you need more power.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardVar}
              whileHover={plan.featured ? {} : { y: -4, transition: { type: "spring", stiffness: 200, damping: 25 } }}
              className={`relative rounded-2xl p-6 border transition-all duration-300
                ${plan.featured
                  ? "border-blue-500/40 dark:border-blue-500/30 bg-blue-50/50 dark:bg-blue-500/10 shadow-xl shadow-blue-500/10 scale-[1.03] md:scale-105"
                  : "border-gray-200 dark:border-[#27272A] bg-white dark:bg-[#111827] hover:border-gray-300 dark:hover:border-[#3F3F46] shadow-sm"
                }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap
                    ${plan.featured
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md shadow-blue-500/30"
                      : "bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30"
                    }`}>
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan name */}
              <div className="mb-5">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1.5">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  {plan.price === "Custom" ? (
                    <span className="text-3xl font-extrabold text-gray-900 dark:text-white">Custom</span>
                  ) : (
                    <>
                      <span className="text-sm text-gray-500 dark:text-[#9CA3AF]">$</span>
                      <span className="text-4xl font-extrabold text-gray-900 dark:text-white">{plan.price}</span>
                    </>
                  )}
                  {plan.period && (
                    <span className="text-sm text-gray-500 dark:text-[#9CA3AF]">/{plan.period.replace("per ", "")}</span>
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-[#9CA3AF]">{plan.description}</p>
              </div>

              {/* CTA */}
              <Link
                href={plan.ctaHref}
                className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold mb-6 transition-all duration-200
                  ${plan.featured
                    ? "gradient-bg-primary text-white shadow-lg shadow-blue-500/25 hover:-translate-y-px hover:shadow-xl hover:shadow-blue-500/40"
                    : "border border-gray-200 dark:border-[#27272A] bg-white dark:bg-[#18181B] text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-[#3F3F46] hover:bg-gray-50 dark:hover:bg-white/5 shadow-sm"
                  }`}
              >
                {plan.cta}
                {plan.featured && <ArrowRight className="w-4 h-4" />}
              </Link>

              {/* Divider */}
              <div className="h-px bg-gray-100 dark:bg-white/10 mb-5" />

              {/* Features */}
              <ul className="space-y-3">
                {plan.features.map((feat) => (
                  <li key={feat.text} className="flex items-center gap-3">
                    {feat.included ? (
                      <Check className="w-4 h-4 text-blue-500 dark:text-blue-400 shrink-0" />
                    ) : (
                      <X className="w-4 h-4 text-gray-300 dark:text-[#3F3F46] shrink-0" />
                    )}
                    <span className={`text-sm ${feat.included ? "text-gray-700 dark:text-gray-300" : "text-gray-400 dark:text-[#52525B]"}`}>
                      {feat.text}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Reassurance */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="text-center text-sm text-gray-400 mt-12"
        >
          No credit card required · Cancel anytime · All plans include standard SLA
        </motion.p>
      </div>
    </section>
  );
}
