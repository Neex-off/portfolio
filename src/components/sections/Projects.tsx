"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Sparkles } from "lucide-react";

const techStack = [
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Supabase",
  "PostgreSQL",
  "PayPal API",
  "Vercel",
];

export default function Projects() {
  const t = useTranslations("projects");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="py-24 lg:py-32 relative" ref={ref}>
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-800/8 rounded-full blur-3xl pointer-events-none" />

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
            className="text-zinc-400 text-lg"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* WolfFuel card — large featured */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="group glass-card gradient-border rounded-3xl overflow-hidden card-hover relative"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-purple-600/10 to-blue-600/5 rounded-3xl" />
          <div className="absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-purple-500/10 blur-2xl rounded-3xl" />

          <div className="grid lg:grid-cols-2 gap-0">
            {/* Screenshot side */}
            <div className="relative h-64 lg:h-auto lg:min-h-96 overflow-hidden">
              <Image
                src="/images/projects/wolffuel.png"
                alt="WolfFuel — Comparateur de carburant"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#16161F]/80 lg:block hidden" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#16161F]/80 to-transparent lg:hidden" />

              {/* Badge on image */}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-purple-700/40">
                <Sparkles size={12} className="text-purple-400" />
                <span className="text-xs text-purple-300 font-medium">{t("wolffuel.badge")}</span>
              </div>
            </div>

            {/* Content side */}
            <div className="p-8 lg:p-10 flex flex-col justify-between">
              <div className="space-y-5">
                <div>
                  <h3 className="text-3xl lg:text-4xl font-black text-white mb-2 group-hover:text-purple-200 transition-colors">
                    {t("wolffuel.title")}
                  </h3>
                  <p className="text-purple-400 font-medium text-sm">
                    {t("wolffuel.catchphrase")}
                  </p>
                </div>

                <p className="text-zinc-400 leading-relaxed text-sm lg:text-base">
                  {t("wolffuel.description")}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg bg-purple-900/30 border border-purple-700/30 text-purple-300 text-xs font-medium group-hover:border-purple-500/50 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8">
                <a
                  href="https://wolffuel.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary relative z-10 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm shadow-lg glow-purple hover:scale-105 hover:-translate-y-0.5 transition-all duration-300"
                >
                  {t("wolffuel.cta")}
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Coming soon encart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 glass-card rounded-2xl p-6 border border-dashed border-purple-800/40 text-center"
        >
          <p className="text-zinc-500 text-sm">
            <span className="text-purple-400 font-semibold">
              {t("coming_soon.title")}
            </span>{" "}
            —{" "}
            {t("coming_soon.description")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
