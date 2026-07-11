import {
  Camera, ShoppingBag, Code2, PenTool,
  Video, Megaphone, GraduationCap, Building2,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const useCases = [
  { icon: Camera,      title: "Photographers",     description: "Remove complex backgrounds from portraits, fashion shots, and event photography instantly.", color: "blue" },
  { icon: ShoppingBag, title: "E-commerce",         description: "Create clean product images on white or transparent backgrounds for Shopify, Amazon, and Etsy.", color: "cyan" },
  { icon: Code2,       title: "Developers",         description: "Integrate background removal into your apps via the cleanBG REST API in minutes.", color: "purple" },
  { icon: PenTool,     title: "Designers",          description: "Get cut-out assets ready for Figma, Photoshop, or Canva in seconds — no pen tool required.", color: "purple" },
  { icon: Video,       title: "Content Creators",   description: "Produce professional thumbnails, channel art, and social assets with clean transparent PNGs.", color: "cyan" },
  { icon: Megaphone,   title: "Marketing Teams",    description: "Build campaign assets at scale — remove backgrounds from hundreds of product shots in minutes.", color: "amber" },
  { icon: GraduationCap, title: "Students",         description: "Create polished presentations and portfolios without expensive software.", color: "green" },
  { icon: Building2,   title: "Businesses",         description: "Standardize headshots, product catalogs, and marketing materials at enterprise scale.", color: "blue" },
];

const colorMap: Record<string, { bg: string; icon: string }> = {
  blue:   { bg: "bg-blue-50 dark:bg-blue-500/10",    icon: "text-blue-500 dark:text-blue-400" },
  cyan:   { bg: "bg-cyan-50 dark:bg-cyan-500/10",    icon: "text-cyan-500 dark:text-cyan-400" },
  purple: { bg: "bg-purple-50 dark:bg-purple-500/10", icon: "text-purple-500 dark:text-purple-400" },
  amber:  { bg: "bg-amber-50 dark:bg-amber-500/10",   icon: "text-amber-500 dark:text-amber-400" },
  green:  { bg: "bg-green-50 dark:bg-green-500/10",   icon: "text-green-500 dark:text-green-400" },
};

export default function UseCasesSection() {
  return (
    <section className="py-24 md:py-28 px-6 bg-gray-50/40 dark:bg-[#09090B] border-y border-gray-100 dark:border-white/[0.04]">
      <div className="max-w-[1280px] mx-auto">

        <ScrollReveal className="text-center max-w-xl mx-auto mb-14">
          <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-gray-400 dark:text-gray-500 mb-3">
            Use Cases
          </p>
          <h2 className="text-3xl md:text-[44px] font-extrabold tracking-[-0.03em] text-gray-900 dark:text-white">
            Built for every workflow
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {useCases.map((uc, idx) => {
            const Icon = uc.icon;
            const theme = colorMap[uc.color];

            return (
              <ScrollReveal key={idx} delay={idx * 0.04}>
                <div className="group flex flex-col p-6 rounded-xl bg-white dark:bg-[#111113] border border-gray-100 dark:border-white/[0.06] card-transition hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 hover:border-gray-200 dark:hover:border-white/10">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-105 ${theme.bg}`}>
                    <Icon className={`w-4 h-4 ${theme.icon}`} strokeWidth={1.75} />
                  </div>
                  <h3 className="text-[14px] font-semibold text-gray-900 dark:text-white mb-1.5 tracking-[-0.01em]">
                    {uc.title}
                  </h3>
                  <p className="text-[12.5px] text-gray-500 dark:text-gray-400 leading-[1.6]">
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
