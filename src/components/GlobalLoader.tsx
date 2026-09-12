"use client";

import { motion } from "framer-motion";

export default function GlobalLoader({ theme = "dark" }: { theme?: "dark" | "light" }) {
  const letters = "DELTA_VERSE".split("");

  const bg = theme === "dark" ? "bg-[#0B0B0A]/90" : "bg-white";
  const textCol = theme === "dark" ? "text-[#E8E8E3]" : "text-[#0B0B0A]";

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-md ${bg}`}
    >
      <div className="flex space-x-1 md:space-x-2">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: i * 0.05,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 1
            }}
            className={`text-4xl md:text-6xl font-bold uppercase tracking-widest font-heading ${textCol}`}
          >
            {letter}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
