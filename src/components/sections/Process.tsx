"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { MessageCircle, FileText, Code2, Rocket } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  MessageCircle,
  FileText,
  Code2,
  Rocket,
};

const stepColors = [
  { gradient: "from-purple-600 to-purple-800", glow: "rgba(124, 58, 237, 0.4)", num: "#7C3AED" },
  { gradient: "from-blue-600 to-blue-800", glow: "rgba(59, 130, 246, 0.4)", num: "#3B82F6" },
  { gradient: "from-violet-600 to-violet-800", glow: "rgba(139, 92, 246, 0.4)", num: "#8B5CF6" },
  { gradient: "from-indigo-600 to-indigo-800", glow: "rgba(99, 102, 241, 0.4)", num: "#6366F1" },
];

export default function Process() {
  const t = useTranslations("process");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const steps = t.raw("steps") as { icon: string; title: string; description: string }[];

  return (
    <section id="process" className="py-24 lg:py-32 relative" ref={ref}>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-800/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-700/40 bg-purple-900/20 text-purple-400 text-sm font-medium uppercase tracking-widest mb-6"
          >
            {t("tag")}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl lg:text-5xl font-black text-white tracking-tight mb-4"
          >
            {t("title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-400 text-lg max-w-xl mx-auto"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* Steps — desktop horizontal, mobile vertical */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-14 left-0 right-0 h-0.5 bg-linear-to-r from-purple-600/0 via-purple-600/40 to-purple-600/0 mx-32" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => {
              const Icon = iconMap[step.icon] ?? MessageCircle;
              const colors = stepColors[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
                  className="relative flex flex-col items-center text-center group"
                >
                  {/* Step number + icon */}
                  <div className="relative mb-6">
                    {/* Number badge */}
                    <div
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white z-10 border-2 border-bg-primary"
                      style={{ background: colors.num }}
                    >
                      {i + 1}
                    </div>
                    {/* Icon circle */}
                    <div
                      className={`w-20 h-20 rounded-2xl bg-linear-to-br ${colors.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      style={{ boxShadow: `0 0 30px ${colors.glow}` }}
                    >
                      <Icon size={32} className="text-white" />
                    </div>
                  </div>

                  {/* Arrow connector (mobile) */}
                  {i < steps.length - 1 && (
                    <div className="lg:hidden w-0.5 h-8 bg-linear-to-b from-purple-600/40 to-transparent mb-6" />
                  )}

                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center mt-16"
        >
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-primary relative z-10 inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-semibold shadow-lg glow-purple hover:scale-105 hover:-translate-y-0.5 transition-all duration-300"
          >
            {t("cta")}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
