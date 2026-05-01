import { useTranslations } from "next-intl";
import { Mail, ExternalLink } from "lucide-react";

const navIds = ["about", "services", "projects", "skills", "process", "faq", "contact"] as const;

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="border-t border-purple-900/30 bg-[#0A0A0F] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="text-3xl font-black tracking-tighter gradient-text">Neexx</div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              {t("footer.tagline")}
            </p>
            <div className="flex items-center gap-2 badge-available w-fit px-3 py-1.5 rounded-full text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              {t("contact.available")}
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              {t("footer.links_title")}
            </h3>
            <nav className="grid grid-cols-2 gap-2" aria-label="Footer navigation">
              {navIds.map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="text-sm text-zinc-400 hover:text-purple-400 transition-colors"
                >
                  {t(`nav.${id}`)}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Contact</h3>
            <div className="space-y-3">
              <a
                href="mailto:neexx.contact@gmail.com"
                className="flex items-center gap-2 text-sm text-zinc-400 hover:text-purple-400 transition-colors"
              >
                <Mail size={14} />
                neexx.contact@gmail.com
              </a>
              <a
                href="https://www.fiverr.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-zinc-400 hover:text-purple-400 transition-colors"
              >
                <ExternalLink size={14} />
                Fiverr
              </a>
              <a
                href="https://www.malt.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-zinc-400 hover:text-purple-400 transition-colors"
              >
                <ExternalLink size={14} />
                Malt
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-purple-900/20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">{t("footer.legal")}</p>
          <p className="text-xs text-zinc-600">{t("footer.copyright")}</p>
          <p className="text-xs text-zinc-600">{t("footer.made_with")} 💜</p>
        </div>
      </div>
    </footer>
  );
}
