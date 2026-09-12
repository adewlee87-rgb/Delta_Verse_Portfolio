"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import GlobalLoader from "@/components/GlobalLoader";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const FLOORS = [
  { id: "f1", name: "Floor 01", category: "Web Development", status: "Open" },
  { id: "f2", name: "Floor 02", category: "Creative Direction", status: "Coming Soon" },
  { id: "f3", name: "Floor 03", category: "AI & Automations", status: "Coming Soon" },
];

const WEB_PROJECTS = [
  {
    title: "GetMyShade",
    desc: "A massive, scalable e-commerce web application with a bespoke frontend and high-converting user flow.",
    tags: ["React", "Next.js", "E-Commerce", "Full-Stack"],
    image: "/videoport/getmyshade/Getmyshadeapptour1.png",
    link: "https://getmyshade.com"
  },
  {
    title: "Try Mood",
    desc: "A sleek, authenticated dashboard application built for SaaS metrics and deep user engagement.",
    tags: ["SaaS", "Dashboard", "Auth", "Analytics"],
    image: "/videoport/Trymood.co/trymood.co.png",
    link: "https://www.trymood.co/?srsltid=AfmBOoqzN1KeMAFYL5JLUFb4ksHVOkbVUF8tM7IWxnwy8hdhxkPn1J_V"
  },
  {
    title: "Skyline",
    desc: "A corporate real-estate CMS designed to handle property listings with ultra-premium UI/UX.",
    tags: ["Corporate", "Real Estate", "CMS"],
    image: "/videoport/skyline.cre/Skylinecre2.png",
    link: "https://skylinecre.com"
  }
];

export default function SkillsClient() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SmoothScrollProvider>
      <AnimatePresence>
        {loading && <GlobalLoader key="mallLoader" theme="dark" />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="min-h-screen bg-[#050505] text-[#E8E8E3] selection:bg-[#E8E8E3] selection:text-[#050505]"
        >
          {/* Minimal Nav */}
          <nav className="fixed top-0 w-full p-6 z-50 mix-blend-difference pointer-events-none">
            <div className="flex justify-between items-center w-full max-w-[1400px] mx-auto pointer-events-auto">
              <Link href="/" className="font-heading font-bold text-xl uppercase hover:opacity-50 transition-opacity flex items-center gap-2">
                <span>←</span> Exit Mall
              </Link>
              <div className="text-sm font-bold tracking-[0.3em] uppercase opacity-50">
                The Arsenal
              </div>
            </div>
          </nav>

          <div className="max-w-[1400px] mx-auto px-6 pt-32 pb-64 flex flex-col lg:flex-row gap-16 lg:gap-24 relative perspective-1000">
            
            {/* Left Sidebar - Directory */}
            <aside className="lg:w-1/4 lg:sticky lg:top-1/3 h-fit z-20 pointer-events-none">
              <div className="mb-12 pointer-events-auto">
                <h1 className="font-heading text-5xl font-black uppercase tracking-tighter mb-4">
                  Directory
                </h1>
                <p className="text-white/40 font-bold uppercase tracking-widest text-xs">
                  Scroll to rotate the display wheel.
                </p>
              </div>

              <div className="flex flex-col gap-6 pointer-events-auto">
                {FLOORS.map((floor) => (
                  <a href={`#${floor.id}`} key={floor.id} className="group flex flex-col gap-2 p-4 -mx-4 rounded-2xl hover:bg-white/5 transition-colors">
                    <div className="flex justify-between items-center text-xs font-black uppercase tracking-[0.2em] text-white/30 group-hover:text-white/70 transition-colors">
                      <span>{floor.name}</span>
                      {floor.status === "Coming Soon" && (
                        <span className="bg-white/10 px-2 py-1 rounded text-[9px]">WIP</span>
                      )}
                    </div>
                    <div className="font-heading text-2xl uppercase font-bold tracking-tight text-white/70 group-hover:text-white transition-colors">
                      {floor.category}
                    </div>
                  </a>
                ))}
              </div>
            </aside>

            {/* Right Main Content - The Wheel */}
            <main className="lg:w-3/4 flex flex-col gap-32 pt-[20vh] pb-[20vh] perspective-1000">
              
              {/* Floor 01: Web Development */}
              <section id="f1" className="scroll-mt-[40vh] relative z-10">
                <div className="mb-24 flex items-end justify-end border-b border-white/10 pb-8 sticky top-[20vh] z-0 mix-blend-difference pointer-events-none">
                  <div className="text-right">
                    <div className="text-[#00f5ff] text-xs font-black tracking-[0.3em] uppercase mb-4 flex items-center justify-end gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00f5ff] animate-pulse"></span>
                      Now Open
                    </div>
                    <h2 className="font-heading text-6xl md:text-8xl font-black uppercase tracking-tighter">
                      Web Dev
                    </h2>
                  </div>
                </div>

                <div className="flex flex-col gap-[20vh]">
                  {WEB_PROJECTS.map((project, idx) => (
                    <ProjectDisplayWheelItem key={idx} project={project} index={idx} />
                  ))}
                </div>
              </section>

              {/* Floor 02: Creative Direction */}
              <section id="f2" className="scroll-mt-[40vh] relative z-10 mt-[20vh]">
                 <div className="mb-24 flex items-end justify-end border-b border-white/10 pb-8 sticky top-[20vh] z-0 mix-blend-difference pointer-events-none">
                  <div className="text-right">
                    <div className="text-white/30 text-xs font-black tracking-[0.3em] uppercase mb-4 flex items-center justify-end gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
                      Under Construction
                    </div>
                    <h2 className="font-heading text-6xl md:text-8xl font-black uppercase tracking-tighter">
                      Creative
                    </h2>
                  </div>
                </div>
                <EmptyDisplayWheelItem />
              </section>

              {/* Floor 03: AI */}
              <section id="f3" className="scroll-mt-[40vh] relative z-10 mt-[20vh]">
                <div className="mb-24 flex items-end justify-end border-b border-white/10 pb-8 sticky top-[20vh] z-0 mix-blend-difference pointer-events-none">
                  <div className="text-right">
                    <div className="text-white/30 text-xs font-black tracking-[0.3em] uppercase mb-4 flex items-center justify-end gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
                      Under Construction
                    </div>
                    <h2 className="font-heading text-6xl md:text-8xl font-black uppercase tracking-tighter">
                      AI & Auto
                    </h2>
                  </div>
                </div>
                <EmptyDisplayWheelItem />
              </section>

            </main>

          </div>
        </motion.div>
      )}
    </SmoothScrollProvider>
  );
}

// Wheel Item Component
function ProjectDisplayWheelItem({ project, index }: { project: any, index: number }) {
  const ref = useRef(null);
  
  // Track this item's position relative to the viewport
  // 0 = just entering bottom, 0.5 = dead center, 1 = exiting top
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });

  // Wheel transformations
  // As it moves from 0 to 0.5 to 1:
  // RotateX: curves towards the user, straightens out, curves away
  // Scale: small -> full -> small
  // Opacity: faded -> opaque -> faded
  // Z-index/Z-translate: pushed back -> brought forward -> pushed back
  const rotateX = useTransform(smoothProgress, [0, 0.5, 1], [-45, 0, 45]);
  const scale = useTransform(smoothProgress, [0, 0.4, 0.6, 1], [0.6, 1, 1, 0.6]);
  const opacity = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.2, 1, 1, 0.2]);
  const y = useTransform(smoothProgress, [0, 0.5, 1], [100, 0, -100]);
  
  // Detail text opacity - strictly visible only in the middle
  const detailsOpacity = useTransform(smoothProgress, [0.35, 0.45, 0.55, 0.65], [0, 1, 1, 0]);
  const detailsY = useTransform(smoothProgress, [0.35, 0.5, 0.65], [20, 0, -20]);

  return (
    <motion.article 
      ref={ref}
      style={{
        rotateX,
        scale,
        opacity,
        y,
        transformStyle: "preserve-3d"
      }}
      className="group relative z-10 w-full"
    >
      <div className="bg-[#0B0B0A] rounded-[2rem] md:rounded-[3rem] p-4 md:p-8 border border-white/5 shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden relative">
        
        {/* Glow behind image - tied to center position */}
        <motion.div style={{ opacity: detailsOpacity }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-white/5 blur-[100px] pointer-events-none"></motion.div>

        {/* Display Glass / Image Container */}
        <div className="relative w-full aspect-video md:aspect-[21/9] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-black/50 mb-8 border border-white/5">
          <Image 
            src={project.image} 
            alt={project.title}
            fill
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-black opacity-60 pointer-events-none mix-blend-overlay"></div>
        </div>

        {/* Product Details Area - ONLY VISIBLE AT CENTER */}
        <motion.div 
          style={{ opacity: detailsOpacity, y: detailsY }}
          className="flex flex-col md:flex-row justify-between items-start gap-8 px-4 md:px-8 pb-4 pointer-events-none group-hover:pointer-events-auto"
        >
          <div className="max-w-xl">
            <h3 className="font-heading text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-[#E8E8E3]">
              {project.title}
            </h3>
            <p className="text-white/50 text-sm md:text-base font-medium leading-relaxed font-body mb-6">
              {project.desc}
            </p>
            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag: string, i: number) => (
                <span key={i} className="px-4 py-2 border border-white/10 bg-white/5 rounded-full text-[10px] font-black tracking-widest uppercase text-white/70">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="shrink-0 pointer-events-auto">
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:bg-white hover:text-black hover:border-white transition-all duration-500"
            >
              <span className="font-heading font-black text-xl md:text-2xl">
                ↗
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}

function EmptyDisplayWheelItem() {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });

  const rotateX = useTransform(smoothProgress, [0, 0.5, 1], [-45, 0, 45]);
  const scale = useTransform(smoothProgress, [0, 0.4, 0.6, 1], [0.6, 1, 1, 0.6]);
  const opacity = useTransform(smoothProgress, [0, 0.5, 1], [0.1, 0.3, 0.1]);

  return (
    <motion.article 
      ref={ref}
      style={{
        rotateX,
        scale,
        opacity,
        transformStyle: "preserve-3d"
      }}
      className="w-full h-64 border border-dashed border-white/20 rounded-3xl flex items-center justify-center bg-white/[0.02]"
    >
      <span className="text-white/30 uppercase tracking-[0.3em] font-bold text-sm">Storefront empty. Stock arriving soon.</span>
    </motion.article>
  )
}
