"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Check, Globe, Briefcase, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = { Globe, Briefcase, Crown };

function AnimatedPrice({ target, inView }: { target: number; inView: boolean }) {
  const [displayed, setDisplayed] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    const duration = 1200;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), target);
      setDisplayed(current);
      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [inView, target]);

  return <>{displayed}</>;
}

type PricingCardProps = {
  icon: string;
  name: string;
  tagline: string;
  price: string;
  subtitle: string;
  features: string[];
  cta: string;
  isPopular: boolean;
  popularBadge: string;
  ctaLink: string;
  delay: number;
  inView: boolean;
};

export default function PricingCard({
  icon,
  name,
  tagline,
  price,
  subtitle,
  features,
  cta,
  isPopular,
  popularBadge,
  ctaLink,
  delay,
  inView,
}: PricingCardProps) {
  const Icon = iconMap[icon] ?? Globe;
  const priceNum = parseInt(price, 10);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={cn(
        "relative flex flex-col rounded-2xl p-7 transition-all duration-300 group",
        "hover:-translate-y-2",
        isPopular
          ? [
              "bg-gradient-to-b from-purple-950/80 to-[#16161F]",
              "border-2 border-purple-500/70",
              "shadow-[0_0_40px_rgba(168,85,247,0.25)]",
              "hover:shadow-[0_0_60px_rgba(168,85,247,0.45)]",
              "scale-105 z-10",
            ]
          : [
              "bg-gradient-to-b from-[#16161F] to-[#111118]",
              "border border-purple-900/30",
              "hover:border-purple-600/50",
              "hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]",
            ]
      )}
    >
      {/* Popular badge */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <motion.span
            animate={{ boxShadow: ["0 0 10px rgba(168,85,247,0.4)", "0 0 20px rgba(168,85,247,0.7)", "0 0 10px rgba(168,85,247,0.4)"] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-600 text-white text-xs font-bold uppercase tracking-wider whitespace-nowrap"
          >
            {popularBadge}
          </motion.span>
        </div>
      )}

      {/* Icon */}
      <div
        className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110",
          isPopular
            ? "bg-gradient-to-br from-purple-500 to-purple-700"
            : "bg-gradient-to-br from-purple-700/60 to-purple-900/60"
        )}
      >
        <Icon size={22} className="text-white" />
      </div>

      {/* Name & tagline */}
      <h3
        className={cn(
          "text-xl font-black mb-1",
          isPopular ? "text-white" : "text-zinc-100"
        )}
      >
        {name}
      </h3>
      <p className="text-sm text-zinc-400 mb-6 leading-relaxed">{tagline}</p>

      {/* Price */}
      <div className="mb-1">
        <span className="text-zinc-500 text-sm align-top leading-8">€</span>
        <span
          className={cn(
            "text-5xl font-black",
            isPopular ? "text-white" : "text-zinc-100"
          )}
        >
          <AnimatedPrice target={priceNum} inView={inView} />
        </span>
      </div>
      <p className="text-xs text-zinc-500 mb-6">{subtitle}</p>

      {/* Divider */}
      <div
        className={cn(
          "h-px mb-6",
          isPopular
            ? "bg-gradient-to-r from-purple-600/0 via-purple-500/60 to-purple-600/0"
            : "bg-white/5"
        )}
      />

      {/* Features */}
      <ul className="space-y-3 mb-8 flex-1">
        {features.map((feat, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-300">
            <Check
              size={15}
              className={cn(
                "mt-0.5 flex-shrink-0",
                isPopular ? "text-purple-400" : "text-purple-600"
              )}
            />
            {feat}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href={ctaLink}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "relative z-10 flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300",
          isPopular
            ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-500 hover:to-purple-400 shadow-lg shadow-purple-900/40 hover:shadow-purple-700/50 hover:scale-[1.02]"
            : "border border-purple-700/50 text-purple-300 hover:bg-purple-600 hover:text-white hover:border-purple-600 hover:scale-[1.02]"
        )}
      >
        {cta}
      </a>
    </motion.div>
  );
}
