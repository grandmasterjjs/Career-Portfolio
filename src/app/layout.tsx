import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/layout/Footer";
import { profile } from "@/data/profile";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";
import { VercelPageViews } from "@/components/analytics/VercelPageViews";
import { projects } from "@/data/projects";
import { getAllPostSlugs } from "@/lib/mdx";

const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title: {
    default: `${profile.shortName} — ${profile.headline}`,
    template: `%s — ${profile.shortName}`,
  },
  description: profile.tagline,
  keywords: [
    "IT Service Desk Manager",
    "IT Operations Leader",
    "PowerShell Automation",
    "Automation Engineer",
    "Homelab",
    "Proxmox",
    "IT Director",
    "Infrastructure Manager",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.shortName} — ${profile.headline}`,
    description: profile.tagline,
    url: profile.site,
    siteName: profile.shortName,
    type: "website",
    images: [{ url: "/images/photos/resume-portrait.jpg", width: 1200, height: 1000, alt: profile.shortName }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.shortName} — ${profile.headline}`,
    description: profile.tagline,
    images: ["/images/photos/resume-portrait.jpg"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const analyticsConfig = {
    enabled: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true",
    measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "",
    production: process.env.NODE_ENV === "production" &&
      (process.env.VERCEL_ENV || process.env.ANALYTICS_DEPLOYMENT_ENV) === "production",
    pages: [
      ...["/", "/about", "/projects", "/blog", "/resume", "/skills", "/homelab", "/contact", "/privacy"]
        .map((path) => ({ path, title: path === "/" ? "Home" : path.slice(1) })),
      ...projects.map((project) => ({ path: `/projects/${project.slug}`, title: project.name })),
      ...getAllPostSlugs().map((slug) => ({ path: `/blog/${slug}`, title: "Blog article" })),
    ],
  };
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${body.variable} ${display.variable} ${mono.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AnalyticsProvider config={analyticsConfig}>
            <div className="relative flex min-h-screen flex-col bg-paper dark:bg-ink">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <VercelPageViews config={{
              enabled: process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ENABLED === "true",
              production: analyticsConfig.production,
              pages: analyticsConfig.pages,
            }} />
          </AnalyticsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
