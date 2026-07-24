import { Playfair_Display, Work_Sans, Caveat, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const body = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
  metadataBase: new URL("https://amna-portfolio.vercel.app"),
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
      <body
        className={`${display.variable} ${body.variable} ${hand.variable} ${mono.variable} font-body bg-paper text-ink antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
