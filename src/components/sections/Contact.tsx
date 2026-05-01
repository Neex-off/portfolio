"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { Mail, Send, ExternalLink, CheckCircle, AlertCircle } from "lucide-react";

export default function Contact() {
  const t = useTranslations("contact");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const projectTypes = t.raw("form.project_types") as string[];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("https://formsubmit.co/ajax/neexx.contact@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          "Type de projet": form.projectType,
          message: form.message,
          _subject: `[Portfolio] Nouveau message de ${form.name}`,
          _template: "box",
        }),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", projectType: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32 relative" ref={ref}>
      <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-96 bg-purple-800/10 rounded-full blur-3xl pointer-events-none" />

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

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-flex items-center gap-2 badge-available px-4 py-2 rounded-full text-sm font-medium mt-4"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            {t("available")}
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass-card gradient-border rounded-2xl p-6 sm:p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
                    {t("form.name")}
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-900/30 text-white placeholder-zinc-600 text-sm focus:border-purple-500/60 focus:outline-none focus:ring-1 focus:ring-purple-500/40 transition-all"
                    placeholder="Arthur Dupont"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
                    {t("form.email")}
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-900/30 text-white placeholder-zinc-600 text-sm focus:border-purple-500/60 focus:outline-none focus:ring-1 focus:ring-purple-500/40 transition-all"
                    placeholder="vous@exemple.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="project-type" className="block text-sm font-medium text-zinc-300 mb-2">
                  {t("form.project_type")}
                </label>
                <select
                  id="project-type"
                  value={form.projectType}
                  onChange={(e) => setForm((f) => ({ ...f, projectType: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-900/30 text-white text-sm focus:border-purple-500/60 focus:outline-none focus:ring-1 focus:ring-purple-500/40 transition-all appearance-none"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  <option value="" className="bg-[#16161F] text-zinc-400">—</option>
                  {projectTypes.map((pt) => (
                    <option key={pt} value={pt} className="bg-[#16161F] text-white">
                      {pt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-2">
                  {t("form.message")}
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-900/30 text-white placeholder-zinc-600 text-sm focus:border-purple-500/60 focus:outline-none focus:ring-1 focus:ring-purple-500/40 transition-all resize-none"
                  placeholder="Décrivez votre projet, vos objectifs, votre budget estimé..."
                />
              </div>

              {/* Status messages */}
              {status === "success" && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-green-900/20 border border-green-700/30 text-green-400 text-sm">
                  <CheckCircle size={16} />
                  {t("form.success")}
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-900/20 border border-red-700/30 text-red-400 text-sm">
                  <AlertCircle size={16} />
                  {t("form.error")}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-primary relative z-10 w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white font-semibold text-base shadow-lg glow-purple disabled:opacity-60 hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300"
              >
                {status === "sending" ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t("form.sending")}
                  </>
                ) : (
                  <>
                    {t("form.submit")}
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact links sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Direct links */}
            <div className="glass-card gradient-border rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                {t("direct_contact")}
              </h3>
              <a
                href="mailto:neexx.contact@gmail.com"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail size={18} className="text-white" />
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("links.email")}</div>
                  <div className="text-sm text-zinc-300 group-hover:text-purple-300 transition-colors">
                    neexx.contact@gmail.com
                  </div>
                </div>
              </a>

              <a
                href="https://www.fiverr.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ExternalLink size={18} className="text-white" />
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("links.fiverr")}</div>
                  <div className="text-sm text-zinc-300 group-hover:text-green-300 transition-colors">
                    Fiverr.com
                  </div>
                </div>
              </a>

              <a
                href="https://www.malt.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-600 to-orange-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ExternalLink size={18} className="text-white" />
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("links.malt")}</div>
                  <div className="text-sm text-zinc-300 group-hover:text-orange-300 transition-colors">
                    Malt.fr
                  </div>
                </div>
              </a>
            </div>

            {/* Info cards */}
            <div className="glass-card gradient-border rounded-2xl p-6 space-y-3">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {t("practical_info")}
              </h3>
              {[
                { label: t("info_response"), value: t("info_response_value") },
                { label: t("info_availability"), value: t("info_availability_value") },
                { label: t("info_location"), value: t("info_location_value") },
                { label: t("info_remote"), value: t("info_remote_value") },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
                  <span className="text-xs text-zinc-500">{label}</span>
                  <span className="text-xs font-semibold text-purple-300">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
