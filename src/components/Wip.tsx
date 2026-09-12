"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";

export default function Wip() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const supabase = createClient();
  const sectionRef = useRef(null);

  // Setup scroll tracking for the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });

  // Complex transforms based on scroll
  const cardScale = useTransform(smoothProgress, [0, 0.4, 0.6, 1], [0.8, 1, 1, 0.9]);
  const cardRotateX = useTransform(smoothProgress, [0, 0.5, 1], [20, 0, -10]);
  const cardOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Parallax elements inside the card
  const badgeY = useTransform(smoothProgress, [0, 1], [100, -50]);
  const titleY = useTransform(smoothProgress, [0, 1], [150, -80]);
  const textY = useTransform(smoothProgress, [0, 1], [200, -100]);
  const formY = useTransform(smoothProgress, [0, 1], [250, -120]);

  // Background Orb Parallax
  const orbX = useTransform(smoothProgress, [0, 1], ["-20vw", "20vw"]);
  const orbY = useTransform(smoothProgress, [0, 1], ["0vh", "30vh"]);
  const orbScale = useTransform(smoothProgress, [0, 0.5, 1], [0.5, 1.5, 0.8]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    const { error } = await supabase.from('wip_waitlist').insert({ email });
    
    if (error) {
      console.error(error);
      setStatus("error");
    } else {
      setStatus("success");
    }
  };

  return (
    <section id="wip" ref={sectionRef} className="py-40 bg-[#E8E8E3] text-[#0B0B0A] relative overflow-hidden perspective-1000 min-h-[120vh] flex items-center">
      
      {/* Scroll-Responsive Background Orb */}
      <motion.div 
        style={{ x: orbX, y: orbY, scale: orbScale }}
        className="absolute top-0 right-1/4 w-[40vw] h-[40vw] bg-[#0B0B0A]/10 rounded-full blur-[80px] pointer-events-none"
      />
      <motion.div 
        style={{ x: orbY, y: orbX, scale: orbScale }}
        className="absolute bottom-0 left-1/4 w-[30vw] h-[30vw] bg-white rounded-full blur-[100px] pointer-events-none mix-blend-overlay"
      />

      <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
        
        {/* The Main Container reacting to scroll */}
        <motion.div 
          style={{ 
            scale: cardScale, 
            rotateX: cardRotateX,
            opacity: cardOpacity,
            transformStyle: "preserve-3d"
          }}
          className="bg-white/40 backdrop-blur-2xl border border-white p-12 md:p-24 rounded-[3rem] shadow-[0_50px_100px_rgba(11,11,10,0.1)] relative"
        >
          {/* Inner Light Sweep */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#0B0B0A]/30 to-transparent"></div>
          
          <motion.div style={{ y: badgeY, translateZ: 50 }} className="inline-block px-6 py-2 bg-[#0B0B0A] text-[#E8E8E3] rounded-full text-xs font-bold tracking-[0.3em] uppercase mb-8 shadow-2xl">
            Experiment // 001
          </motion.div>
          
          <motion.h2 style={{ y: titleY, translateZ: 80 }} className="font-heading text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter mb-8">
            R<span className="text-[#0B0B0A]/30">0</span>gue
          </motion.h2>
          
          <motion.p style={{ y: textY, translateZ: 40 }} className="text-xl md:text-3xl font-medium mb-12 max-w-3xl mx-auto text-[#0B0B0A]/70 leading-relaxed font-body">
            I am currently building a highly classified experimental product. 
            Want early access? Drop your email.
          </motion.p>
          
          <motion.div style={{ y: formY, translateZ: 60 }} className="relative z-20">
            {status === "success" ? (
               <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-8 bg-emerald-500/10 text-emerald-700 font-black tracking-[0.2em] uppercase rounded-full border border-emerald-500/20 shadow-inner">
                 Access Request Logged. Sequence Initiated.
               </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto group">
                <input 
                  type="email" 
                  placeholder="ENTER EMAIL ADDRESS" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="flex-1 px-8 py-6 bg-white/80 border border-black/5 rounded-2xl md:rounded-full text-[#0B0B0A] font-black tracking-widest uppercase placeholder:text-black/30 focus:outline-none focus:ring-4 focus:ring-black/10 transition-all shadow-inner text-sm md:text-base"
                />
                <button 
                  type="submit" 
                  disabled={status === "loading"}
                  className="px-12 py-6 bg-[#0B0B0A] text-[#E8E8E3] font-black uppercase tracking-[0.2em] rounded-2xl md:rounded-full hover:bg-black transition-colors disabled:opacity-50 hover:scale-105 active:scale-95 transform duration-300 shadow-xl text-sm md:text-base whitespace-nowrap"
                >
                  {status === "loading" ? "..." : "Join"}
                </button>
              </form>
            )}
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
