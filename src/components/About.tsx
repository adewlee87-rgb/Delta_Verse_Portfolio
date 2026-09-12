"use client";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useRef } from "react";

const RevealText = ({ text }: { text: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 50%"]
  });
  
  const words = text.split(" ");
  
  return (
    <p ref={ref} className="text-xl md:text-3xl lg:text-4xl leading-tight font-medium font-body flex flex-wrap gap-[0.25em]">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
        const filter = useTransform(scrollYProgress, [start, end], ["blur(4px)", "blur(0px)"]);
        return (
          <motion.span key={i} style={{ opacity, filter }} className="inline-block text-[#E8E8E3]">
            {word}
          </motion.span>
        );
      })}
    </p>
  );
};

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bgTextX = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const springBgTextX = useSpring(bgTextX, { damping: 15, mass: 0.1, stiffness: 50 });

  const skills = [
    "Prompt Engineering", "Web Development", "Frontend", "SupaBase", 
    "Creative Director", "SEO", "Cyber Security", "Virtual Assistance", 
    "API Testing", "Brand Strategy", "Content Strategist", "AI-Video Director", 
    "SQL", "API Creation"
  ];

  return (
    <section id="about" ref={containerRef} className="relative py-40 overflow-hidden bg-[#0B0B0A]">
      
      {/* Background Scrolling Text */}
      <div className="absolute top-10 left-0 w-[200vw] overflow-hidden pointer-events-none opacity-5">
        <motion.div style={{ x: springBgTextX }} className="whitespace-nowrap font-heading text-[20vw] font-black uppercase leading-none text-[#E8E8E3]">
          IDENTITY IDENTITY IDENTITY
        </motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-16 xl:gap-8 items-center">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="xl:col-span-5 perspective-1000"
          >
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto xl:max-w-none rounded-[2rem] overflow-hidden group border border-white/10 shadow-[0_0_100px_rgba(255,255,255,0.05)]">
              {/* Overlay glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0A] via-transparent to-transparent z-10 opacity-60 pointer-events-none"></div>
              <div className="absolute inset-0 border-[4px] border-white/5 mix-blend-overlay z-20 rounded-[2rem]"></div>
              
              <video 
                src="/lovableaishopify.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
              />
              
              {/* Label */}
              <div className="absolute bottom-8 left-8 z-30 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                <span className="text-white font-bold tracking-widest uppercase text-xs">V-1.0 ACTIVE</span>
              </div>
            </div>
          </motion.div>

          <div className="xl:col-span-7 xl:pl-12 flex flex-col gap-20">
            <div className="space-y-12">
              <RevealText text="I’m a creative technologist and digital problem-solver with 5+ years of experience building digital experiences that connect technology with real business needs." />
              <RevealText text="My work sits at the intersection of creativity, strategy, and technology. Whether I’m shaping a brand’s direction, creating engaging AI-powered visuals, or developing modern web solutions, I build to create real impact." />
            </div>
            
            <div className="mt-8">
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-heading text-xl md:text-2xl uppercase tracking-[0.2em] text-white/50 mb-8 flex items-center gap-4"
              >
                <span className="w-12 h-[1px] bg-white/20 block"></span>
                The Arsenal
              </motion.h3>
              
              <div className="flex flex-wrap gap-4">
                {skills.map((skill, i) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.5, type: "spring", stiffness: 100 }}
                    className="relative group cursor-crosshair"
                  >
                    <div className="absolute inset-0 bg-[#E8E8E3] rounded-full blur-[10px] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <span className="block relative z-10 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-xs font-bold tracking-widest uppercase text-[#E8E8E3] group-hover:bg-[#E8E8E3] group-hover:text-[#0B0B0A] transition-colors duration-300">
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
