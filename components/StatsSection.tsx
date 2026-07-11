"use client";

import { motion } from "framer-motion";
import { Users, ImageIcon, Globe2, Clock } from "lucide-react";

const stats = [
  { icon: Users,     value: 500000,  label: "Happy Users",          suffix: "+",  prefix: "",  display: "500K+" },
  { icon: ImageIcon, value: 2000000, label: "Images Processed",     suffix: "+",  prefix: "",  display: "2M+" },
  { icon: Globe2,    value: 120,     label: "Countries",            suffix: "+",  prefix: "",  display: "120+" },
  { icon: Clock,     value: 3,       label: "Avg Processing Time",  suffix: "s",  prefix: "",  display: "3s" },
];

import Counter from "./Counter";

export default function StatsSection() {
  return (
    <section className="py-24 border-y border-gray-100 dark:border-white/[0.05] bg-white dark:bg-[#09090B] relative overflow-hidden">
      
      <div className="max-w-[1280px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            // Simplify value for Counter since it handles formatting differently or we can format suffix
            const displayVal = stat.value >= 1000000 ? stat.value / 1000000 : stat.value >= 1000 ? stat.value / 1000 : stat.value;
            const suffix = stat.value >= 1000000 ? "M+" : stat.value >= 1000 ? "K+" : stat.suffix;
            
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0, 0, 0.2, 1] }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 border border-blue-100 dark:border-blue-500/20">
                  <Icon className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                </div>
                <div className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight flex items-baseline justify-center">
                  <Counter 
                    value={displayVal} 
                    suffix={suffix} 
                    prefix={stat.prefix} 
                  />
                </div>
                <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
