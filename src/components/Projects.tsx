"use client";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, MouseEvent, useState, useEffect } from "react";

const ProjectCard = ({ images, title, tags, link, className }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-playing slideshow
  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3500); // Change image every 3.5s
    return () => clearInterval(interval);
  }, [images]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXVal = ((y - centerY) / centerY) * -5;
    const rotateYVal = ((x - centerX) / centerX) * 5;
    
    setRotateX(rotateXVal);
    setRotateY(rotateYVal);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.article 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      animate={{ rotateX, rotateY }}
      style={{ perspective: 1000 }}
      className={`group relative rounded-[2rem] overflow-hidden bg-[#111] border border-white/5 shadow-2xl transform-gpu transition-transform ease-out ${className}`}
    >
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#050505]">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.6, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full group-hover:!opacity-100 group-hover:scale-105 transition-transform duration-1000"
          >
            <Image 
              src={images[currentIndex]} 
              alt={`${title} slide ${currentIndex + 1}`} 
              fill 
              className="object-cover"
              priority={currentIndex === 0}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0A] via-[#0B0B0A]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500 z-10"></div>
      
      {/* Slide indicators */}
      <div className="absolute top-8 left-8 right-8 z-30 flex gap-2">
        {images.map((_: any, i: number) => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${i === currentIndex ? 'bg-white' : 'bg-white/20'}`}></div>
        ))}
      </div>
      
      <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end z-20 pointer-events-none">
        <h3 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-[#E8E8E3] uppercase tracking-tighter mb-4 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1]">
          {title}
        </h3>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end overflow-hidden gap-6 pointer-events-auto">
          <div className="flex flex-wrap gap-4 text-xs md:text-sm font-bold tracking-widest uppercase text-white/50 transform translate-y-16 group-hover:translate-y-0 transition-transform duration-700 delay-100 ease-[0.16,1,0.3,1]">
            {tags?.map((t: string, i: number) => (
              <span key={i} className="px-4 py-2 border border-white/10 rounded-full backdrop-blur-md bg-black/20">{t}</span>
            ))}
          </div>
          
          <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-[#E8E8E3] text-[#0B0B0A] rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform transform translate-y-24 group-hover:translate-y-0 duration-700 delay-150 ease-[0.16,1,0.3,1]">
            <span>View Live</span>
            <span className="text-lg leading-none">↗</span>
          </a>
        </div>
      </div>
    </motion.article>
  );
};

export default function Projects() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bgTextX = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const springBgTextX = useSpring(bgTextX, { damping: 15, mass: 0.1, stiffness: 50 });

  return (
    <section id="work" ref={containerRef} className="py-40 bg-[#0B0B0A] relative overflow-hidden">
      
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[200vw] overflow-hidden pointer-events-none opacity-5 z-0">
        <motion.div style={{ x: springBgTextX }} className="whitespace-nowrap font-heading text-[25vw] font-black uppercase leading-none text-[#E8E8E3]">
          MY WORK MY WORK MY WORK
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
          <h2 className="font-heading text-[11vw] md:text-[8vw] leading-none uppercase font-bold text-[#E8E8E3] tracking-tighter text-center">
            My Work
          </h2>
          <p className="text-[#E8E8E3]/50 mt-6 max-w-lg text-center font-body text-lg uppercase tracking-widest font-bold">
            A curated selection of scalable applications and digital experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 mb-40">
          <ProjectCard 
            images={[
              "/videoport/yellolog/1.png",
              "/videoport/yellolog/2.png",
              "/videoport/yellolog/3.png",
              "/videoport/yellolog/4.png",
              "/videoport/yellolog/5.png"
            ]}
            title="Y'ello Log"
            tags={["Dashboard", "Auth", "Educational"]}
            link="https://e-logbook-cyan.vercel.app/"
            className="md:col-span-12 h-[60vh] md:h-[80vh]"
          />

          <ProjectCard 
            images={[
              "/videoport/getmyshade/Getmyshadeapptour1.png",
              "/videoport/getmyshade/Getmyshadeapptour2.png",
              "/videoport/getmyshade/Getmyshadeapptour3.png",
              "/videoport/getmyshade/Getmyshadeapptour4.png",
              "/videoport/getmyshade/Getmyshadeapptour5.png",
              "/videoport/getmyshade/Getmyshadeapptour6.png",
              "/videoport/getmyshade/Getmyshadeapptour7.png"
            ]}
            title="GetMyShade"
            tags={["Web App", "E-Commerce", "React"]}
            link="https://getmyshade.com"
            className="md:col-span-12 h-[60vh] md:h-[80vh]"
          />

          <ProjectCard 
            images={[
              "/videoport/Trymood.co/trymood.co.png",
              "/videoport/Trymood.co/trymood.co2.png",
              "/videoport/Trymood.co/trymood.co3.png",
              "/videoport/Trymood.co/trymood.co4.png",
              "/videoport/Trymood.co/trymood.co7.png",
              "/videoport/Trymood.co/trymood.co9.png"
            ]}
            title="Try Mood"
            tags={["SaaS", "Dashboard", "Auth"]}
            link="https://www.trymood.co/?srsltid=AfmBOoqzN1KeMAFYL5JLUFb4ksHVOkbVUF8tM7IWxnwy8hdhxkPn1J_V"
            className="md:col-span-6 h-[50vh] md:h-[60vh]"
          />

          <ProjectCard 
            images={[
              "/videoport/skyline.cre/Skylinecre2.png",
              "/videoport/skyline.cre/Skylinecreimage.png",
              "/videoport/skyline.cre/skyline%20cre3.png",
              "/videoport/skyline.cre/skyline%20cre4.png",
              "/videoport/skyline.cre/skyline%20cre%205.png",
              "/videoport/skyline.cre/skyline%20cre8.png"
            ]}
            title="Skyline"
            tags={["Corporate", "Real Estate", "CMS"]}
            link="https://skylinecre.com"
            className="md:col-span-6 h-[50vh] md:h-[60vh]"
          />
        </div>

        {/* CURIOSITY CTA TO ARSENAL */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-5xl mx-auto rounded-[3rem] p-12 md:p-24 overflow-hidden border border-white/5 bg-white/[0.02] backdrop-blur-sm flex flex-col items-center text-center group cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#00f5ff]/0 via-[#00f5ff]/5 to-[#00f5ff]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
          
          <div className="text-[#00f5ff] text-xs font-black tracking-[0.3em] uppercase mb-8 flex items-center justify-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f5ff] animate-pulse"></span>
            System Capacity Exceeds Web Development
          </div>

          <h3 className="font-heading text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-[#E8E8E3] mb-8 leading-[0.9]">
            This is only <br/> <span className="text-white/30">Floor 01.</span>
          </h3>

          <p className="text-white/50 text-lg md:text-xl font-body max-w-xl mx-auto mb-12">
            My capabilities span far beyond writing code. Dive into the complete catalog of my skills, including Brand Strategy, AI Automation, and Creative Direction.
          </p>

          <Link href="/skills" className="relative inline-flex items-center gap-4 px-12 py-6 bg-white/5 border border-white/20 text-white uppercase tracking-[0.2em] font-black text-sm rounded-full overflow-hidden hover:scale-105 transition-all duration-500 group/btn">
             <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]"></div>
             <span className="relative z-10 group-hover/btn:text-black transition-colors duration-500">Access The Arsenal</span>
             <span className="relative z-10 w-8 h-8 rounded-full bg-white/10 group-hover/btn:bg-black/10 flex items-center justify-center group-hover/btn:text-black transition-colors duration-500">→</span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
