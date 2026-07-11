import {
  Camera, ShoppingBag, Code2, PenTool,
  Video, Megaphone, GraduationCap, Building2,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const useCases = [
  {
    icon: Camera,
    title: "Photographers",
    description: "Eliminate complex backgrounds from portraits, fashion shots, and event photography without manual masking.",
    color: "blue",
  },
  {
    icon: ShoppingBag,
    title: "E-commerce Sellers",
    description: "Create clean product images on white or transparent backgrounds for Amazon, Shopify, and Etsy listings.",
    color: "cyan",
  },
  {
    icon: Code2,
    title: "Developers",
    description: "Integrate background removal into your own apps via the cleanBG REST API with just a few lines of code.",
    color: "purple",
  },
  {
    icon: PenTool,
    title: "Designers",
    description: "Get cut-out assets ready for Figma, Photoshop, or Canva in seconds — no pen tool required.",
    color: "purple",
  },
  {
    icon: Video,
    title: "Content Creators",
    description: "Produce professional thumbnails, channel art, and social assets with clean transparent PNGs.",
    color: "cyan",
  },
  {
    icon: Megaphone,
    title: "Marketing Teams",
    description: "Build campaign assets at scale. Remove backgrounds from hundreds of product shots in minutes.",
    color: "amber",
  },
  {
    icon: GraduationCap,
    title: "Students",
    description: "Create polished presentations, class projects, and portfolios without paying for expensive software.",
    color: "green",
  },
  {
    icon: Building2,
    title: "Businesses",
    description: "Standardize employee headshots, product catalogs, and marketing materials at enterprise scale.",
    color: "blue",
  },
];

const colorMap: Record<string, { bg: string; icon: string; glow: string }> = {
  blue:   { bg: "bg-blue-50/50 dark:bg-blue-500/10",   icon: "text-blue-500 dark:text-blue-400",   glow: "group-hover:bg-blue-500/5 dark:group-hover:bg-blue-500/20" },
  cyan:   { bg: "bg-cyan-50/50 dark:bg-cyan-500/10",   icon: "text-cyan-500 dark:text-cyan-400",   glow: "group-hover:bg-cyan-500/5 dark:group-hover:bg-cyan-500/20" },
  purple: { bg: "bg-purple-50/50 dark:bg-purple-500/10", icon: "text-purple-500 dark:text-purple-400", glow: "group-hover:bg-purple-500/5 dark:group-hover:bg-purple-500/20" },
  amber:  { bg: "bg-amber-50/50 dark:bg-amber-500/10",  icon: "text-amber-500 dark:text-amber-400",  glow: "group-hover:bg-amber-500/5 dark:group-hover:bg-amber-500/20" },
  green:  { bg: "bg-green-50/50 dark:bg-green-500/10",  icon: "text-green-500 dark:text-green-400",  glow: "group-hover:bg-green-500/5 dark:group-hover:bg-green-500/20" },
};

export default function UseCasesSection() {
  return (
    <section className="py-24 md:py-32 px-6 relative overflow-hidden bg-white dark:bg-[#09090B]">
      <div className="max-w-[1280px] mx-auto relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6">
            Built for <span className="gradient-text">every workflow</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-[#A1A1AA] leading-relaxed">
            Whether you're editing single photos or building automated pipelines, cleanBG adapts to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {useCases.map((uc, idx) => {
            const Icon = uc.icon;
            const theme = colorMap[uc.color];
            
            return (
              <ScrollReveal key={idx} delay={idx * 0.05}>
                <div
                  className="group relative flex flex-col p-6 rounded-3xl bg-white dark:bg-[#18181B] border border-gray-100 dark:border-white/5 shadow-sm transition-all duration-300 hover:shadow-xl dark:hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] hover:-translate-y-1 hover:border-gray-300 dark:hover:border-white/10 overflow-hidden"
                >
                  <div className={`absolute inset-0 transition-colors duration-500 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 ${theme.glow}`} />
                  
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 ${theme.bg}`}>
                    <Icon className={`w-6 h-6 ${theme.icon}`} strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="text-[17px] font-bold text-gray-900 dark:text-white mb-2 relative z-10">
                    {uc.title}
                  </h3>
                  <p className="text-[14px] text-gray-500 dark:text-[#A1A1AA] leading-relaxed relative z-10">
                    {uc.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
