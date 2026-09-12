import type { Metadata } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import KeyboardShortcut from "@/components/KeyboardShortcut";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Delta_Verse | Software Developer",
  description: "Startup Software Developer | AI-powered websites + Brand Strategy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="antialiased">
        <KeyboardShortcut />
        {children}
      </body>
    </html>
  );
}
