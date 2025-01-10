import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Alata } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Navigation from "@/components/Navigation";
import {
  GoogleTagManagerScript,
  GoogleTagManagerNoScript,
} from "@/components/GoogleTagManager";
import "./globals.css";
import "../styles/prism.css";

const alata = Alata({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-alata",
});

export const metadata: Metadata = {
  title: "Adam Scott - Software Engineer & Technical Leader",
  description:
    "Personal portfolio and blog of Adam Scott, a software engineer and technical leader specializing in web development and cloud architecture.",
  icons: {
    icon: [
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/favicon-180x180.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    title: "Adam Scott - Software Engineer & Technical Leader",
    description:
      "Personal portfolio and blog of Adam Scott, a software engineer and technical leader specializing in web development and cloud architecture.",
    url: "https://adamscott.info",
    siteName: "Adam Scott",
    locale: "en_US",
    type: "website",
  },
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
  twitter: {
    title: "Adam Scott",
    card: "summary_large_image",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${alata.variable}`}
    >
      <head>
        <GoogleTagManagerScript />
      </head>
      <body className={alata.className}>
        <GoogleTagManagerNoScript />
        <main>{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
