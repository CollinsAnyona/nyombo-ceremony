import type { Metadata } from "next";
import { Cinzel, Great_Vibes, EB_Garamond, Cormorant_SC } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
});

const cormorantSC = Cormorant_SC({
  variable: "--font-cormorant-sc",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.name,
  description: siteConfig.description,
  robots: siteConfig.indexable ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${greatVibes.variable} ${ebGaramond.variable} ${cormorantSC.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-parchment">{children}</body>
    </html>
  );
}
