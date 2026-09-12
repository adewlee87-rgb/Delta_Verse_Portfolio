"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Header() {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 w-full z-50 p-6 mix-blend-difference text-white"
    >
      <div className="flex justify-between items-center w-full">
        <Link href="/" className="font-heading font-bold text-xl md:text-2xl tracking-tight uppercase no-underline">
          Delta_Verse
        </Link>
        <nav className="hidden md:flex gap-12 items-center">
          <Link href="/skills" className="text-sm font-black uppercase tracking-[0.2em] hover:text-[#00f5ff] transition-colors flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f5ff] animate-pulse"></span>
            The Arsenal
          </Link>
          <a href="/#work" className="text-sm font-medium uppercase tracking-widest hover:opacity-50 transition-opacity">Works</a>
          <a href="/#about" className="text-sm font-medium uppercase tracking-widest hover:opacity-50 transition-opacity">About</a>
          <a href="/#contact" className="text-sm font-medium uppercase tracking-widest hover:opacity-50 transition-opacity">Contact</a>
        </nav>
      </div>
    </motion.header>
  );
}
