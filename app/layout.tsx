import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  metadataBase: new URL("https://cleanbg.io"),
  title: {
    default: "cleanBG — AI Background Remover | Remove Backgrounds Instantly",
    template: "%s | cleanBG",
  },
  description:
    "Remove image backgrounds instantly with AI. cleanBG delivers studio-quality transparent PNGs preserving original resolution. Free, fast, and private.",
  keywords: [
    "background remover",
    "AI background removal",
    "remove background",
    "transparent PNG",
    "background eraser",
    "photo editing",
    "image background removal",
    "cleanBG",
    "free background remover",
  ],
  authors: [{ name: "cleanBG Team" }],
  creator: "cleanBG",
  publisher: "cleanBG",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cleanbg.io",
    siteName: "cleanBG",
    title: "cleanBG — AI Background Remover",
    description:
      "Remove image backgrounds instantly with AI. Studio-quality transparent PNGs in seconds.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "cleanBG — AI Background Remover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "cleanBG — AI Background Remover",
    description:
      "Remove image backgrounds instantly with AI. Studio-quality transparent PNGs in seconds.",
    images: ["/og-image.png"],
    creator: "@cleanbgio",
  },
  alternates: {
    canonical: "https://cleanbg.io",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "cleanBG",
  url: "https://cleanbg.io",
  description:
    "AI-powered background remover that delivers studio-quality transparent PNGs preserving original resolution.",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "15000",
  },
};

import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrains.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-white dark:bg-[#09090B] text-gray-900 dark:text-white transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
