import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://neexx.dev"),
  title: {
    default: "Neexx — Développeur web full-stack freelance",
    template: "%s | Neexx",
  },
  description:
    "Arthur (Neexx) — Développeur web full-stack freelance. Sites vitrines, e-commerce, web apps, intégrations IA. Basé à Riedisheim, disponible partout.",
  keywords: [
    "développeur web freelance",
    "full-stack",
    "Next.js",
    "React",
    "TypeScript",
    "Riedisheim",
    "Alsace",
    "freelance",
    "web developer",
  ],
  authors: [{ name: "Arthur — Neexx", url: "https://neexx.dev" }],
  creator: "Neexx",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://neexx.dev",
    siteName: "Neexx — Développeur web freelance",
    title: "Neexx — Développeur web full-stack freelance",
    description:
      "Sites vitrines, e-commerce, web apps & intégrations IA. Étudiant Epitech, passionné de code depuis 13 ans.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Neexx — Développeur web freelance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Neexx — Développeur web full-stack freelance",
    description: "Sites vitrines, e-commerce, web apps & intégrations IA.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
