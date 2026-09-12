"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  const title = "DELTA_VERSE".split("");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 * i },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 100,
      rotateY: 90,
      scale: 0.5,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <section ref={ref} className="relative min-h-screen bg-[#0B0B0A] text-[#E8E8E3] overflow-hidden flex flex-col justify-center items-center">
      
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-[#E8E8E3]/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <motion.div 
        style={{ y: textY, opacity, scale }}
        className="w-full flex flex-col items-center z-20 px-4"
      >
        <motion.p 
          initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm md:text-xl font-body font-bold text-[#E8E8E3]/50 uppercase tracking-[0.3em] md:tracking-[0.5em] mb-8 text-center"
        >
          Software Developer != Average
        </motion.p>

        <motion.h1 
          variants={container}
          initial="hidden"
          animate="visible"
          className="font-heading text-6xl md:text-9xl lg:text-[11rem] leading-[0.8] font-black text-center tracking-tighter w-full flex justify-center flex-wrap"
        >
          {title.map((char, index) => (
            <motion.span 
              variants={child} 
              key={index}
              className="inline-block transform-gpu"
              style={{ paddingRight: char === "_" ? "0.2em" : "0" }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>
      </motion.div>
    </section>
  );
}
