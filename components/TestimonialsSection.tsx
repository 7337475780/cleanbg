import { TestimonialCarousel } from "./TestimonialCarousel";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Lead Product Designer",
    company: "Shopify",
    avatar: "https://ui-avatars.com/api/?name=Sarah+Chen&background=3B82F6&color=fff&size=80",
    rating: 5,
    quote: "cleanBG has completely replaced our old workflow. What used to take 20 minutes in Photoshop now takes 3 seconds. The edge quality on hair is genuinely impressive.",
  },
  {
    name: "Marcus Williams",
    role: "E-commerce Director",
    company: "Nordstrom",
    avatar: "https://ui-avatars.com/api/?name=Marcus+Williams&background=8B5CF6&color=fff&size=80",
    rating: 5,
    quote: "We process 500+ product images per week. cleanBG's API integration saved us thousands of hours and the consistency is unbeatable. Every image looks professional.",
  },
  {
    name: "Aiko Tanaka",
    role: "Creative Director",
    company: "Studio Tanaka",
    avatar: "https://ui-avatars.com/api/?name=Aiko+Tanaka&background=06B6D4&color=fff&size=80",
    rating: 5,
    quote: "I was skeptical about AI background removal after disappointing results with competitors. cleanBG surprised me — it handles fine jewelry and complex textures beautifully.",
  },
  {
    name: "James Okafor",
    role: "Full-Stack Developer",
    company: "Freelance",
    avatar: "https://ui-avatars.com/api/?name=James+Okafor&background=10B981&color=fff&size=80",
    rating: 5,
    quote: "The REST API is clean and well-documented. I integrated it into my client's e-commerce platform in under an hour. The free tier was enough to test thoroughly.",
  },
  {
    name: "Elena Rossi",
    role: "Photography Business Owner",
    company: "Rossi Photography",
    avatar: "https://ui-avatars.com/api/?name=Elena+Rossi&background=F43F5E&color=fff&size=80",
    rating: 5,
    quote: "Portrait photographers — this is the tool you've been waiting for. Hair masking is flawless and it preserves the original resolution. My clients are amazed.",
  },
  {
    name: "David Park",
    role: "Marketing Manager",
    company: "TechFlow",
    avatar: "https://ui-avatars.com/api/?name=David+Park&background=F59E0B&color=fff&size=80",
    rating: 5,
    quote: "We switched our entire marketing asset pipeline to cleanBG. It's faster, cheaper, and the output quality matches what our design team used to produce manually.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 md:py-32 bg-gray-50/50 dark:bg-[#09090B] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6">
            Loved by <span className="gradient-text">creators</span> & teams
          </h2>
          <p className="text-lg text-gray-600 dark:text-[#A1A1AA] leading-relaxed">
            Join thousands of professionals who have already upgraded their workflow with cleanBG.
          </p>
        </div>

        <TestimonialCarousel testimonials={testimonials} />
      </div>
    </section>
  );
}
