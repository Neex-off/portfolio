"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";

type Skill = { name: string; level: number };

const skillData: Record<string, Skill[]> = {
  frontend: [
    { name: "Next.js / React", level: 92 },
    { name: "TypeScript", level: 88 },
    { name: "Tailwind CSS", level: 90 },
    { name: "HTML5 / CSS3", level: 95 },
    { name: "Framer Motion", level: 80 },
  ],
  backend: [
    { name: "Node.js", level: 82 },
    { name: "Python", level: 75 },
    { name: "Supabase", level: 85 },
    { name: "PostgreSQL", level: 78 },
    { name: "REST API", level: 88 },
  ],
  ai: [
    { name: "OpenAI API", level: 80 },
    { name: "Mistral / Ollama", level: 72 },
    { name: "Discord.py", level: 82 },
    { name: "LLM Automation", level: 70 },
  ],
  tools: [
    { name: "Git / GitHub", level: 90 },
    { name: "Vercel", level: 88 },
    { name: "Figma", level: 72 },
    { name: "VS Code", level: 95 },
  ],
};

const categoryColors: Record<string, string> = {
  frontend: "from-purple-600 to-purple-800",
  backend: "from-blue-600 to-blue-800",
  ai: "from-violet-600 to-violet-800",
  tools: "from-indigo-600 to-indigo-800",
};

function SkillBar({ name, level, inView, delay }: Skill & { inView: boolean; delay: number }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-zinc-300">{name}</span>
        <span className="text-xs text-zinc-500 font-mono">{level}%</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          className="h-full skill-bar-fill rounded-full"
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const t = useTranslations("skills");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="py-24 lg:py-32 relative bg-[#111118]" ref={ref}>
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-800/10 rounded-full blur-3xl pointer-events-none" />

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

        {/* Skill categories */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(Object.entries(skillData) as [string, Skill[]][]).map(([cat, skills], ci) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + ci * 0.1 }}
              className="glass-card gradient-border rounded-2xl p-6 space-y-5"
            >
              {/* Category header */}
              <div className={`inline-flex px-3 py-1 rounded-lg bg-gradient-to-r ${categoryColors[cat]} text-white text-xs font-bold uppercase tracking-wider`}>
                {t(`categories.${cat}`)}
              </div>

              {/* Skill bars */}
              <div className="space-y-4">
                {skills.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    {...skill}
                    inView={inView}
                    delay={0.3 + ci * 0.1 + si * 0.08}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
