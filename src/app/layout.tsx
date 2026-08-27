import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";

import Nav from "@/components/Nav";
import Preloader from "@/components/Preloader";
import { ReadyProvider } from "@/components/ReadyProvider";
import SiteBackground from "@/components/SiteBackground";
import SmoothScroll from "@/components/SmoothScroll";

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const display = Inter_Tight({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Barnett USA — Ice-Making, Water Treatment & Refrigeration",
  description:
    "Turnkey ice plants, reverse-osmosis water treatment and industrial refrigeration, engineered in Houston and shipped to 40+ countries.",
};

export const viewport: Viewport = {
  themeColor: "#04070d",
  width: "device-width",
  initialScale: 1,
  // Keeps iOS from zooming form fields without disabling pinch-zoom entirely.
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable}`}>
      <body className="relative antialiased">
        <ReadyProvider>
          <Preloader />
          <SmoothScroll />
          <SiteBackground />
          <Nav />
          <main className="relative z-10">{children}</main>
        </ReadyProvider>
      </body>
    </html>
  );
}
