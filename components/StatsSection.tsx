import { Users, ImageIcon, Globe2, Clock } from "lucide-react";
import Counter from "./Counter";
import ScrollReveal from "./ScrollReveal";

const stats = [
  { icon: Users,     value: 500,  label: "Happy Users",        suffix: "K+",  prefix: "" },
  { icon: ImageIcon, value: 2,    label: "Images Processed",   suffix: "M+",  prefix: "" },
  { icon: Globe2,    value: 120,  label: "Countries",          suffix: "+",   prefix: "" },
  { icon: Clock,     value: 3,    label: "Avg Processing",     suffix: "s",   prefix: "<" },
];

const iconColors = [
  "text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border-blue-100 dark:border-blue-500/15",
  "text-purple-500 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 border-purple-100 dark:border-purple-500/15",
  "text-cyan-500 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/10 border-cyan-100 dark:border-cyan-500/15",
  "text-green-500 dark:text-green-400 bg-green-50 dark:bg-green-500/10 border-green-100 dark:border-green-500/15",
];

export default function StatsSection() {
  return (
    <section className="py-16 md:py-20 border-y border-gray-100 dark:border-white/[0.04] bg-white dark:bg-[#09090B]">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <ScrollReveal key={stat.label} delay={i * 0.08} className="flex flex-col items-center text-center group">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 border transition-transform duration-300 group-hover:scale-105 ${iconColors[i]}`}>
                  <Icon className="w-4.5 h-4.5" strokeWidth={1.75} />
                </div>
                <div className="text-[36px] md:text-[44px] font-black text-gray-900 dark:text-white tracking-[-0.04em] leading-none mb-2 flex items-baseline gap-0.5">
                  {stat.prefix && (
                    <span className="text-[18px] font-bold text-gray-400 dark:text-gray-500 mr-0.5">{stat.prefix}</span>
                  )}
                  <Counter value={stat.value} suffix="" prefix="" />
                  <span className="text-[20px] font-bold gradient-text ml-0.5">{stat.suffix}</span>
                </div>
                <p className="text-[12px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-[0.07em]">
                  {stat.label}
                </p>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
