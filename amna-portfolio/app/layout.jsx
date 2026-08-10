import { Fraunces, Inter, Caveat, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ChatWidget from "@/components/ChatWidget";
import CommandPalette from "@/components/CommandPalette";
import Toaster from "@/components/Toaster";
import { Analytics } from "@vercel/analytics/react";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const hand = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-hand",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata = {
  metadataBase: new URL("https://amna-portfolio-1.vercel.app"),
  title: {
    default: "Amna Mushtaq — MERN Stack Developer",
    template: "%s",
  },
  description:
    "Amna Mushtaq's portfolio — MERN stack projects, Figma designs, and a running notebook of her web development journey.",
  keywords: [
    "Amna Mushtaq",
    "MERN stack developer",
    "React developer",
    "Next.js developer",
    "frontend developer Pakistan",
    "full stack developer",
  ],
  authors: [{ name: "Amna Mushtaq" }],
  openGraph: {
    title: "Amna Mushtaq — MERN Stack Developer",
    description:
      "MERN stack projects, Figma designs, and a running notebook of a developer's journey.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Amna Mushtaq",
              jobTitle: "MERN Stack Developer",
              url: "https://amna-portfolio-1.vercel.app",
              sameAs: [
                "https://github.com/Amna-web-droid",
                "https://www.linkedin.com/in/amna-mushtaq-743380389/",
              ],
              knowsAbout: [
                "React",
                "Next.js",
                "Tailwind CSS",
                "Node.js",
                "Express",
                "PostgreSQL",
                "MongoDB",
              ],
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var stored = localStorage.getItem("theme");
                  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                  var isDark = stored ? stored === "dark" : prefersDark;
                  if (isDark) document.documentElement.classList.add("dark");
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${display.variable} ${body.variable} ${hand.variable} ${mono.variable} font-body bg-paper text-ink antialiased`}
      >
        {children}
        <ChatWidget />
        <CommandPalette />
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
