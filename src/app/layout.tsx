import type { Metadata } from "next";
import { Geist, Geist_Mono, Kalam } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const kalam = Kalam({
  variable: "--font-kalam",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vicinae.com"),
  title: "Vicinae - The everything launcher for Linux",
  description:
    "Launch apps, search files, manage your clipboard, run calculations, and so much more. Extend it with React & TypeScript.",
  keywords: [
    "linux",
    "launcher",
    "productivity",
    "open source",
    "extensions",
    "raycast",
    "wayland",
    "x11",
  ],
  authors: [{ name: "Vicinae Team" }],
  openGraph: {
    title: "Vicinae - The everything launcher for Linux",
    description:
      "Launch apps, search files, manage your clipboard, run calculations, and so much more. Extend it with React & TypeScript.",
    url: "https://vicinae.com",
    siteName: "Vicinae",
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vicinae - The everything launcher for Linux"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Vicinae - The everything launcher for Linux",
    description:
      "Launch apps, search files, manage your clipboard, run calculations, and so much more. Extend it with React & TypeScript.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <head></head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${kalam.variable} font-sans antialiased bg-white dark:bg-[#121212] text-zinc-900 dark:text-[#E8E6E1]`}
      >
        {children}
      </body>
    </html>
  );
}
