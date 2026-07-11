import ScrollReveal from "./ScrollReveal";
import { FAQAccordion } from "./FAQAccordion";

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

export default function FAQSection() {
  return (
    <section id="faq" className="py-24 md:py-32 px-6 bg-white dark:bg-[#09090B] border-y border-gray-100 dark:border-white/5" aria-label="FAQ">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24">
          
          <ScrollReveal delay={0} className="w-full lg:w-[40%] flex-shrink-0">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6">
              Frequently asked<br className="hidden lg:block" />
              <span className="gradient-text">questions</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-[#A1A1AA] leading-relaxed mb-8">
              Everything you need to know about the product, billing, and how we protect your data.
            </p>
            <div className="p-6 md:p-8 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Still have questions?</h3>
              <p className="text-sm text-gray-500 dark:text-[#A1A1AA] mb-4">
                Can't find the answer you're looking for? Please chat to our friendly team.
              </p>
              <a href="mailto:support@cleanbg.io" className="inline-flex items-center text-sm font-semibold text-blue-500 hover:text-blue-600 transition-colors">
                Contact Support →
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="w-full lg:w-[60%] flex-1">
            <div className="bg-white dark:bg-[#18181B] rounded-3xl border border-gray-200 dark:border-white/10 shadow-sm p-4 md:p-8">
              <FAQAccordion faqs={faqs} />
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
