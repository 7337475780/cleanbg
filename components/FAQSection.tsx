import ScrollReveal from "./ScrollReveal";
import { FAQAccordion } from "./FAQAccordion";

const faqs = [
  {
    q: "Is cleanBG really free?",
    a: "Yes. The free plan gives you 10 background removals per month with no watermarks and no credit card required. Upgrade to Pro when you need unlimited processing.",
  },
  {
    q: "What image formats are supported?",
    a: "cleanBG accepts JPEG, PNG, and WebP images up to 20MB. Output is always a transparent PNG (or WebP if preferred), preserving your original resolution.",
  },
  {
    q: "How does the AI remove backgrounds?",
    a: "We use BiRefNet — a state-of-the-art bi-directional recurrent neural network designed for high-accuracy image matting. It processes foreground and background context simultaneously for pixel-perfect edges.",
  },
  {
    q: "Are my images stored or shared?",
    a: "No. Your images are processed in memory and immediately discarded after you download the result. We never store, analyze, or share your images.",
  },
  {
    q: "What is the maximum image size?",
    a: "File size limit is 20MB. Resolution limit is 8000×8000 pixels. Output is always the same resolution as your input — no downscaling.",
  },
  {
    q: "Does cleanBG handle hair and fine details?",
    a: "Yes. Our AI model is specifically trained for fine hair strands, flyaways, fur, feathers, and complex edge cases that traditionally require manual masking.",
  },
  {
    q: "Is there a REST API available?",
    a: "An API is in development and will be available in the Pro plan. You'll be able to integrate background removal directly into your applications with just a few lines of code.",
  },
  {
    q: "Can I use cleanBG images commercially?",
    a: "Free plan images are for personal and educational use. Pro and Enterprise plans include a full commercial license.",
  },
];

export default function FAQSection() {
  return (
    <section
      id="faq"
      className="py-24 md:py-28 px-6 bg-white dark:bg-[#09090B]"
      aria-label="FAQ"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-14 lg:gap-20 xl:gap-28">

          {/* Left: heading & support */}
          <ScrollReveal delay={0} className="lg:w-[38%] flex-shrink-0">
            <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-gray-400 dark:text-gray-500 mb-3">
              FAQ
            </p>
            <h2 className="text-3xl md:text-[40px] font-extrabold tracking-[-0.03em] text-gray-900 dark:text-white leading-[1.15] mb-5">
              Frequently asked questions
            </h2>
            <p className="text-[15px] text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
              Everything you need to know about the product and how we protect your data.
            </p>
            <div className="p-5 bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.06] rounded-xl">
              <p className="text-[13.5px] font-semibold text-gray-900 dark:text-white mb-1">
                Still have questions?
              </p>
              <p className="text-[12.5px] text-gray-500 dark:text-gray-400 mb-3">
                We&apos;re happy to help.
              </p>
              <a
                href="mailto:support@cleanbg.io"
                className="text-[13px] font-semibold text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Contact Support →
              </a>
            </div>
          </ScrollReveal>

          {/* Right: accordion */}
          <ScrollReveal delay={0.08} className="flex-1 min-w-0">
            <FAQAccordion faqs={faqs} />
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
