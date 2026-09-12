"use client";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-8 bg-[#0B0B0A] text-secondary text-center text-sm font-body border-t border-border">
      <p>
        &copy; {currentYear} Delta_Verse
        <Link href="/dashboard" className="text-secondary hover:text-foreground transition-colors cursor-default no-underline ml-[1px]">.</Link> A World Of Change.
      </p>
    </footer>
  );
}
