import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prisma2TS - Convert Prisma Schema to TypeScript Interfaces",
  description: "A free developer tool that instantly transforms your Prisma schema into TypeScript interfaces. Save time and ensure type safety in your projects.",
  keywords: ["prisma", "typescript", "code generator", "schema conversion", "developer tools", "type safety"],
  authors: [{ name: "Prisma2TS Team" }],
  creator: "Prisma2TS",
  publisher: "Prisma2TS",
  openGraph: {
    title: "Prisma2TS - Convert Prisma Schema to TypeScript",
    description: "A free developer tool that instantly transforms your Prisma schema into TypeScript interfaces.",
    url: "https://prisma2ts.vercel.app",
    siteName: "Prisma2TS",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Prisma2TS - Convert Prisma Schema to TypeScript"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prisma2TS - Prisma Schema to TypeScript Converter",
    description: "A free developer tool that instantly transforms your Prisma schema into TypeScript interfaces.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#1e293b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
