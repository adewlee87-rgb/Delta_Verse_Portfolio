"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function TestimonialsClient({ testimonials }: { testimonials: any[] }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bgTextX = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const springBgTextX = useSpring(bgTextX, { damping: 15, mass: 0.1, stiffness: 50 });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="testimonials" ref={containerRef} className="py-40 bg-[#0B0B0A] relative overflow-hidden">
      
      {/* Background Scrolling Text */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[200vw] overflow-hidden pointer-events-none opacity-5 z-0">
        <motion.div style={{ x: springBgTextX }} className="whitespace-nowrap font-heading text-[25vw] font-black uppercase leading-none text-[#E8E8E3]">
          REVIEWS REVIEWS REVIEWS
        </motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center mb-24"
        >
          <h2 className="font-heading text-6xl md:text-[8vw] leading-none uppercase font-bold text-[#E8E8E3] tracking-tighter text-center">
            Word On The Street
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((t, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-[#111] p-10 rounded-[2rem] border border-white/5 shadow-2xl flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Glossy Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              
              <div className="mb-8 relative z-10">
                <div className="text-[#00f5ff] text-xl tracking-widest mb-8 flex gap-1">
                  {Array(5).fill('★').map((star, i) => (
                    <motion.span 
                      key={i} 
                      initial={{ opacity: 0, rotate: -45 }}
                      whileInView={{ opacity: i < t.rating ? 1 : 0.2, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, type: "spring" }}
                    >
                      {star}
                    </motion.span>
                  ))}
                </div>
                <p className="text-xl md:text-2xl text-[#E8E8E3]/80 font-body leading-relaxed">
                  "{t.quote}"
                </p>
              </div>
              
              <div className="pt-8 border-t border-white/10 relative z-10 flex items-center justify-between">
                <div>
                  <h4 className="font-heading font-bold text-[#E8E8E3] uppercase tracking-widest text-sm">{t.client_name}</h4>
                  <p className="text-xs text-white/40 mt-2 font-bold tracking-widest uppercase">
                    {[t.client_title, t.project_name].filter(Boolean).join(' • ')}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-white/50 group-hover:bg-[#E8E8E3] group-hover:text-[#0B0B0A] transition-colors duration-500 font-heading font-bold">
                  {t.client_name.charAt(0)}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
