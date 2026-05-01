"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Code2, Briefcase, Star, Clock } from "lucide-react";

function AnimatedNumber({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <span ref={ref}>
      {inView ? value : "0"}
      {suffix}
    </span>
  );
}

const statIcons = [Code2, Briefcase, Star, Clock];

export default function About() {
  const t = useTranslations("about");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { key: "stat1_value", label: "stat1_label", icon: statIcons[0], color: "from-purple-600 to-purple-800" },
    { key: "stat2_value", label: "stat2_label", icon: statIcons[1], color: "from-blue-600 to-blue-800" },
    { key: "stat3_value", label: "stat3_label", icon: statIcons[2], color: "from-purple-500 to-pink-700" },
    { key: "stat4_value", label: "stat4_label", icon: statIcons[3], color: "from-violet-600 to-indigo-800" },
  ] as const;

  return (
    <section id="about" className="py-24 lg:py-32 relative" ref={ref}>
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-800/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-700/40 bg-purple-900/20 text-purple-400 text-sm font-medium uppercase tracking-widest">
            {t("tag")}
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative flex justify-center lg:justify-start"
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600/30 to-blue-600/20 blur-xl scale-110" />
              {/* Avatar */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-purple-700/30 glass-card">
                <Image
                  src="/avatar.png"
                  alt="Arthur — Neexx, développeur web freelance"
                  fill
                  className="object-cover"
                  sizes="320px"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-950/60 via-transparent to-transparent" />
              </div>
              {/* Decoration dots */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-purple-600/20 rounded-full blur-lg" />
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-blue-600/20 rounded-full blur-lg" />
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              {t("title")}
            </h2>
            <p className="text-xl text-purple-300 font-medium italic">
              &ldquo;{t("story")}&rdquo;
            </p>
            <p className="text-zinc-400 leading-relaxed">{t("story2")}</p>
            <p className="text-zinc-400 leading-relaxed">{t("story3")}</p>

            {/* Epitech badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass-card border border-purple-700/30 text-sm text-zinc-300">
              <span className="text-purple-400 font-bold">{t("badge_school")}</span>
              <span className="text-zinc-600">·</span>
              <span>{t("badge_location")}</span>
              <span className="text-zinc-600">·</span>
              <span className="text-green-400">{t("badge_status")}</span>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-20">
          {stats.map(({ key, label, icon: Icon, color }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="glass-card gradient-border rounded-2xl p-6 text-center card-hover group"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                <Icon size={18} className="text-white" />
              </div>
              <div className="text-4xl font-black text-white mb-1">
                <AnimatedNumber value={t(key)} />
              </div>
              <div className="text-sm text-zinc-400">{t(label)}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
