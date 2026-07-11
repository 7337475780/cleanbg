import { ScrollLink as Link } from "./ScrollLink";
import { Check, X, Sparkles, ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

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
    ctaHref: "/#waitlist",
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
    <section id="pricing" className="py-24 px-6 relative overflow-hidden bg-white dark:bg-[#09090B]" aria-label="Pricing">
      <div className="max-w-[1280px] mx-auto relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="inline-flex items-center gap-2 mb-4 text-[11px] font-semibold tracking-[0.08em] uppercase text-blue-500 dark:text-blue-400">
            <Sparkles className="w-3.5 h-3.5" />
            Simple Pricing
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6">
            Start Free, <span className="gradient-text">Scale When Ready</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-[#A1A1AA] leading-relaxed">
            No credit card required. No hidden fees. Upgrade when you need more power.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {plans.map((plan, idx) => (
            <ScrollReveal key={plan.name} delay={idx * 0.1}>
              <div
                className={`relative flex flex-col h-full bg-white dark:bg-[#18181B] rounded-3xl p-8 xl:p-10 border transition-all duration-300 hover:shadow-xl dark:hover:shadow-none hover:-translate-y-1 ${
                  plan.featured
                    ? "border-blue-500/50 shadow-lg shadow-blue-500/5 dark:shadow-[0_0_30px_rgba(59,130,246,0.1)] ring-1 ring-blue-500/50"
                    : "border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-sm">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-sm font-semibold text-gray-500 dark:text-[#A1A1AA]">$</span>
                    <span className="text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">{plan.price}</span>
                    {plan.period && <span className="text-sm font-medium text-gray-500 dark:text-[#A1A1AA]">/{plan.period}</span>}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-[#A1A1AA] leading-relaxed">{plan.description}</p>
                </div>

                <Link
                  href={plan.ctaHref}
                  className={`flex items-center justify-center w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 mb-8 ${
                    plan.featured
                      ? "gradient-bg-primary text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30"
                      : "bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10"
                  }`}
                >
                  {plan.cta}
                  {plan.featured && <ArrowRight className="w-4 h-4 ml-2" />}
                </Link>

                <div className="h-px w-full bg-gray-100 dark:bg-[#27272A] mb-8" />

                <ul className="flex flex-col gap-4 flex-1">
                  {plan.features.map((feat) => (
                    <li key={feat.text} className="flex items-start gap-3">
                      {feat.included ? (
                        <Check className="w-5 h-5 text-blue-500 dark:text-blue-400 shrink-0" strokeWidth={2.5} />
                      ) : (
                        <X className="w-5 h-5 text-gray-300 dark:text-[#3F3F46] shrink-0" strokeWidth={2.5} />
                      )}
                      <span className={`text-sm ${feat.included ? "text-gray-700 dark:text-gray-300 font-medium" : "text-gray-400 dark:text-[#52525B]"}`}>
                        {feat.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <p className="text-center text-sm text-gray-400 mt-12">
          VAT may apply depending on your location. Need more than 100,000 images/month? <Link href="mailto:enterprise@cleanbg.io" className="text-blue-500 hover:underline">Contact us</Link>.
        </p>
      </div>
    </section>
  );
}
