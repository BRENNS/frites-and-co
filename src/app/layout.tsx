import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import { Providers } from "./providers";
import { StructuredData } from "@/components/seo/structured-data";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = "https://frites-and-co.fr";

export const metadata: Metadata = {
  // Base
  metadataBase: new URL(siteUrl),
  title: {
    default: "Frites & Co | Restaurant Burgers Artisanaux Charleville-Mézières",
    template: "%s | Frites & Co",
  },
  description:
    "Restaurant de burgers artisanaux à Charleville-Mézières, Place Ducale. Frites maison double cuisson, sauces artisanales. Depuis 2010. Réservez votre table !",
  keywords: [
    "restaurant burger Charleville-Mézières",
    "burger artisanal Ardennes",
    "frites maison Place Ducale",
    "meilleur burger Charleville",
    "restaurant Place Ducale",
    "Frites and Co",
    "burger fait maison",
    "frites belges Ardennes",
    "restaurant Ardennes",
    "burger gourmet 08000",
  ],
  authors: [{ name: "Frites & Co" }],
  creator: "Frites & Co",
  publisher: "Frites & Co",

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Open Graph (Facebook, LinkedIn)
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: ["en_GB", "nl_NL"],
    url: siteUrl,
    siteName: "Frites & Co",
    title: "Frites & Co | Burgers Artisanaux à Charleville-Mézières",
    description:
      "Découvrez nos burgers faits maison et nos frites double cuisson à la belge. Restaurant Place Ducale, Charleville-Mézières. Depuis 2010.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Frites & Co - Restaurant Burgers Artisanaux",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Frites & Co | Burgers Artisanaux Charleville-Mézières",
    description:
      "Burgers faits maison, frites double cuisson à la belge. Place Ducale. Depuis 2010.",
    images: ["/og-image.jpg"],
    creator: "@fritesandco",
  },

  // Verification (à compléter avec vos codes)
  verification: {
    google: "votre-code-google-search-console",
    // yandex: "votre-code-yandex",
    // bing: "votre-code-bing",
  },

  // Alternates (langues)
  alternates: {
    canonical: siteUrl,
    languages: {
      "fr-FR": `${siteUrl}/fr`,
      "en-GB": `${siteUrl}/en`,
      "nl-NL": `${siteUrl}/nl`,
    },
  },

  // App
  applicationName: "Frites & Co",
  category: "restaurant",

  // Icons
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        url: "/icon-192x192.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "512x512",
        url: "/icon-512x512.png",
      },
    ],
  },

  // Manifest
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body className={`${spaceGrotesk.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
