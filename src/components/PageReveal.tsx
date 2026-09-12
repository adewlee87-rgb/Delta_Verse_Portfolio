"use client";

import { useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlobalLoader from "./GlobalLoader";
import SmoothScrollProvider from "./SmoothScrollProvider";

export default function PageReveal({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 2 second initial load state as requested
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SmoothScrollProvider>
      <AnimatePresence>
        {loading && <GlobalLoader key="pageLoader" theme="light" />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      )}
    </SmoothScrollProvider>
  );
}
