import type { Metadata } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Vicinae - A focused launcher for your desktop",
  description:
    "A focused launcher for your desktop - native, fast, extensible.",
  keywords: [
    "linux",
    "launcher",
    "productivity",
    "open source",
    "extensions",
    "wayland",
    "x11",
  ],
  authors: [{ name: "Vicinae" }],
  openGraph: {
    title: "Vicinae - A focused launcher for your desktop",
    description:
      "A focused launcher for your desktop - native, fast, extensible.",
    url: "https://vicinae.com",
    siteName: "Vicinae",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vicinae - A focused launcher for your desktop",
    description:
      "A focused launcher for your desktop - native, fast, extensible.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body
        className={`${outfit.variable} ${geistMono.variable} font-sans antialiased bg-ink-900 text-stone-200 grain`}
      >
        {children}
      </body>
    </html>
  );
}
