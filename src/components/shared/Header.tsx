"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { cn } from "@/lib/utils";

const navIds = ["about", "services", "projects", "skills", "process", "faq", "contact"] as const;

export default function Header() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          scrolled
            ? "bg-[#0A0A0F]/90 backdrop-blur-xl border-b border-purple-900/30 shadow-lg shadow-purple-950/20"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-xl font-black tracking-tighter gradient-text hover:scale-105 transition-transform"
              aria-label="Neexx — Retour en haut"
            >
              Neexx
            </button>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Navigation principale">
              {navIds.map((id) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="px-3 py-2 text-sm text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                >
                  {t(id)}
                </button>
              ))}
            </nav>

            {/* Right side */}
            <div className="hidden lg:flex items-center gap-3">
              <div className="flex items-center gap-2 badge-available px-3 py-1.5 rounded-full text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                {t("available")}
              </div>
              <LanguageSwitcher />
            </div>

            {/* Mobile burger */}
            <div className="flex lg:hidden items-center gap-2">
              <LanguageSwitcher />
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="p-2 text-zinc-400 hover:text-white transition-colors"
                aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-30 pt-16 bg-[#0A0A0F]/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col items-center justify-center gap-2 h-full -mt-16" aria-label="Navigation mobile">
              {navIds.map((id, i) => (
                <motion.button
                  key={id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(id)}
                  className="text-2xl font-semibold text-zinc-300 hover:text-white transition-colors py-3"
                >
                  {t(id)}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="mt-6 flex items-center gap-2 badge-available px-4 py-2 rounded-full text-sm font-medium"
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                {t("available")}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
