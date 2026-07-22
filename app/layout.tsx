import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { SiteChrome } from "@/components/layout/SiteChrome";
import "./globals.css";
import "./responsive.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://hanaply.com"),
  title: { default: "Hanaply Vision | AI Career Radar", template: "%s" },
  description: "Explore the vision behind Hanaply, an AI Career Radar designed to discover meaningful opportunities, explain real job fit, and prepare truthful personalized Application Packs.",
  applicationName: "Hanaply Vision",
  keywords: ["Hanaply", "AI Career Radar", "job intelligence", "Application Packs", "Philippines"],
  authors: [{ name: "Hanaply" }],
  creator: "Hanaply",
  openGraph: { type: "website", locale: "en_PH", siteName: "Hanaply Vision", title: "Hanaply Vision | Your career radar never stops searching", description: "Explore a premium product vision for explainable job intelligence and truthful Application Packs.", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Hanaply Career Radar product vision" }] },
  twitter: { card: "summary_large_image", title: "Hanaply Vision", description: "Hanap smarter. Apply stronger.", images: ["/og.png"] },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  robots: { index: true, follow: true },
  other: { "theme-color": "#0B1020" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${inter.variable} ${manrope.variable}`}><body><SiteChrome>{children}</SiteChrome></body></html>;
}
