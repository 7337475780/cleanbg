import { ScrollLink as Link } from "./ScrollLink";
import { Check, X, Sparkles, ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const plans = [
  {
    name: "Free",
    price: "0",
    period: "forever",
    description: "Perfect for trying cleanBG and occasional personal use.",
    cta: "Start for Free",
    ctaHref: "/#upload",
    featured: false,
    badge: null,
    features: [
      { text: "10 images per month", included: true },
      { text: "Original resolution output", included: true },
      { text: "PNG & WebP export", included: true },
      { text: "No watermark", included: true },
      { text: "Standard edge quality", included: true },
      { text: "API access", included: false },
      { text: "Batch processing", included: false },
      { text: "Priority processing", included: false },
      { text: "Commercial license", included: false },
    ],
  },
  {
    name: "Pro",
    price: "12",
    period: "/ month",
    description: "For professionals and growing teams who need more power.",
    cta: "Join Waitlist",
    ctaHref: "/#waitlist",
    featured: true,
    badge: "Most Popular",
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
    badge: null,
    features: [
      { text: "Unlimited images", included: true },
      { text: "Original resolution output", included: true },
      { text: "PNG, WebP & SVG export", included: true },
      { text: "No watermark", included: true },
      { text: "Premium edge quality", included: true },
      { text: "API access (Unlimited)", included: true },
      { text: "Batch processing", included: true },
      { text: "Priority processing", included: true },
      { text: "Commercial license", included: true },
    ],
  },
];

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="py-24 md:py-28 px-6 relative overflow-hidden bg-white dark:bg-[#09090B]"
      aria-label="Pricing"
    >
      <div className="max-w-[1280px] mx-auto relative z-10">

        <ScrollReveal className="text-center max-w-xl mx-auto mb-14 md:mb-16">
          <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-gray-400 dark:text-gray-500 mb-3 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3 h-3" />
            Pricing
          </p>
          <h2 className="text-3xl md:text-[44px] font-extrabold tracking-[-0.03em] text-gray-900 dark:text-white">
            Start free. Scale when ready.
          </h2>
          <p className="mt-4 text-[15px] text-gray-500 dark:text-gray-400 leading-relaxed">
            No credit card required. No hidden fees.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 items-start">
          {plans.map((plan, idx) => (
            <ScrollReveal key={plan.name} delay={idx * 0.08}>
              <div
                className={`relative flex flex-col h-full rounded-2xl p-7 border transition-all duration-200 ${
                  plan.featured
                    ? "gradient-border-pro bg-white dark:bg-[#111113] shadow-[0_8px_40px_rgba(59,130,246,0.08)] dark:shadow-[0_8px_40px_rgba(59,130,246,0.06)]"
                    : "bg-white dark:bg-[#111113] border-gray-100 dark:border-white/[0.06] hover:border-gray-200 dark:hover:border-white/10 hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider gradient-bg-primary text-white">
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Header */}
                <div className="mb-7">
                  <h3 className="text-[13px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.08em] mb-3">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-3">
                    {plan.price !== "Custom" && (
                      <span className="text-[13px] text-gray-400 dark:text-gray-500 font-medium">$</span>
                    )}
                    <span className="text-[42px] font-black text-gray-900 dark:text-white tracking-[-0.04em] leading-none">{plan.price}</span>
                    {plan.period && (
                      <span className="text-[13px] text-gray-400 dark:text-gray-500">{plan.period}</span>
                    )}
                  </div>
                  <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">{plan.description}</p>
                </div>

                {/* CTA */}
                <Link
                  href={plan.ctaHref}
                  className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-[13.5px] font-semibold mb-7 transition-all duration-200 ${
                    plan.featured
                      ? "gradient-bg-primary text-white shadow-[0_2px_12px_rgba(37,99,235,0.3)] hover:shadow-[0_4px_20px_rgba(37,99,235,0.4)] hover:-translate-y-px"
                      : "bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/8"
                  }`}
                >
                  {plan.cta}
                  {plan.featured && <ArrowRight className="w-3.5 h-3.5" />}
                </Link>

                {/* Divider */}
                <div className="h-px w-full bg-gray-100 dark:bg-white/[0.05] mb-6" />

                {/* Features */}
                <ul className="flex flex-col gap-3 flex-1">
                  {plan.features.map((feat) => (
                    <li key={feat.text} className="flex items-start gap-2.5">
                      {feat.included ? (
                        <Check className="w-4 h-4 text-blue-500 dark:text-blue-400 shrink-0 mt-0.5" strokeWidth={2.5} />
                      ) : (
                        <X className="w-4 h-4 text-gray-200 dark:text-gray-700 shrink-0 mt-0.5" strokeWidth={2.5} />
                      )}
                      <span className={`text-[13px] leading-snug ${feat.included ? "text-gray-700 dark:text-gray-300" : "text-gray-300 dark:text-gray-600"}`}>
                        {feat.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <p className="text-center text-[12px] text-gray-400 dark:text-gray-600 mt-10">
            VAT may apply. Need more than 100,000 images/month?{" "}
            <a href="mailto:enterprise@cleanbg.io" className="text-blue-500 hover:underline">
              Contact us.
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
