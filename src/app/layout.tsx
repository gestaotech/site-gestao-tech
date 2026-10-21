import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { siteDescription, siteName, tagline } from "@/data/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const title = `${siteName} | ${tagline}`;

export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  openGraph: {
    title,
    description: siteDescription,
    siteName,
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: siteDescription,
  },
};

export const viewport: Viewport = {
  themeColor: "#115c6b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${manrope.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
