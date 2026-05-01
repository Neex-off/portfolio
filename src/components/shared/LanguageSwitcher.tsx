"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (nextLocale: string) => {
    if (nextLocale === locale) return;
    startTransition(() => {
      const segments = pathname.split("/");
      segments[1] = nextLocale;
      router.replace(segments.join("/"));
    });
  };

  return (
    <div
      className="flex items-center gap-1 rounded-lg border border-purple-800/40 bg-white/5 p-1"
      role="group"
      aria-label="Language switcher"
    >
      {(["fr", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => switchLocale(l)}
          disabled={isPending}
          className={cn(
            "px-2.5 py-1 text-xs font-semibold rounded-md transition-all duration-200 uppercase tracking-wider",
            locale === l
              ? "bg-purple-600 text-white shadow-sm"
              : "text-zinc-400 hover:text-white hover:bg-white/10"
          )}
          aria-current={locale === l ? "true" : "false"}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
