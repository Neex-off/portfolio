"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PricingCard from "@/components/ui/PricingCard";

const FIVERR_URL = "https://fiverr.com/neexx";

type Package = {
  icon: string;
  name: string;
  tagline: string;
  price: string;
  subtitle: string;
  cta: string;
  isPopular: boolean;
  features: string[];
};

export default function Services() {
  const t = useTranslations("services");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const packages = t.raw("packages") as Package[];

  return (
    <section id="services" className="py-24 lg:py-32 relative bg-bg-secondary" ref={ref}>
      {/* Background accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-800/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-800/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-[0.07] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Pricing cards — staggered */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center mb-14">
          {packages.map((pkg, i) => (
            <PricingCard
              key={pkg.name}
              {...pkg}
              popularBadge={t("popular_badge")}
              ctaLink={FIVERR_URL}
              delay={0.15 + i * 0.15}
              inView={inView}
            />
          ))}
        </div>

        {/* Custom project encart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="glass-card gradient-border rounded-2xl p-6 sm:p-8 text-center max-w-2xl mx-auto"
        >
          <p className="text-white font-semibold text-base mb-1">
            {t("custom_title")}
          </p>
          <p className="text-zinc-400 text-sm mb-5">
            {t("custom_description")}
          </p>
          <button
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-purple-600/60 text-purple-300 text-sm font-semibold hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all duration-300 hover:scale-105"
          >
            {t("custom_cta")}
            <ArrowRight size={15} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
