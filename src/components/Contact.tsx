"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/utils/supabase/client";

export default function Contact() {
  const [formData, setFormData] = useState({ client_name: "", client_email: "", project_brief: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const { error } = await supabase.from('enquiries').insert({
      client_name: formData.client_name,
      client_email: formData.client_email,
      project_brief: formData.project_brief,
      status: 'New'
    });
    if (error) setStatus("error");
    else setStatus("success");
  };

  const containerVariants: any = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  return (
    <section id="contact" className="py-40 bg-[#0B0B0A] relative overflow-hidden text-[#E8E8E3]">
      
      {/* Abstract background blobs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24 flex flex-col items-center"
        >
          <div className="w-1px h-24 bg-gradient-to-b from-transparent to-white/20 mb-8 block mx-auto"></div>
          <h2 className="font-heading text-6xl md:text-[8vw] leading-none uppercase font-black tracking-tighter mb-6">
            Transmit
          </h2>
          <p className="text-white/40 text-lg uppercase tracking-widest font-bold max-w-lg">
            Initialize a connection. Choose your deployment package.
          </p>
        </motion.div>

        {/* Pricing Grid */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32">
          
          <motion.div variants={itemVariants} className="bg-[#111] p-10 rounded-[2.5rem] border border-white/5 flex flex-col justify-between hover:bg-white/[0.02] transition-colors duration-500">
            <div>
              <h4 className="text-white/50 uppercase tracking-[0.3em] font-bold text-xs mb-4">Starter</h4>
              <div className="text-5xl font-heading font-black mb-6">$500<span className="text-white/20 text-3xl">+</span></div>
              <p className="text-white/60 text-sm font-medium mb-8 leading-relaxed">A focused landing page or single-feature build to test an idea fast.</p>
            </div>
            <ul className="text-white/40 text-sm space-y-4 font-bold tracking-wider">
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-white/40 rounded-full"></span> 1–2 pages / screens</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-white/40 rounded-full"></span> Vanilla or no-code build</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-white/40 rounded-full"></span> 3–5 day turnaround</li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-[#E8E8E3] text-[#0B0B0A] p-10 rounded-[2.5rem] flex flex-col justify-between relative transform lg:-translate-y-8 shadow-[0_30px_100px_rgba(232,232,227,0.1)]">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00f5ff] text-black text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full shadow-lg">Most Popular</div>
            <div>
              <h4 className="text-black/50 uppercase tracking-[0.3em] font-bold text-xs mb-4">MVP</h4>
              <div className="text-5xl font-heading font-black mb-6">$1.5k<span className="text-black/20 text-3xl">+</span></div>
              <p className="text-black/70 text-sm font-medium mb-8 leading-relaxed">A working product you can put in front of real users and investors.</p>
            </div>
            <ul className="text-black/60 text-sm space-y-4 font-bold tracking-wider">
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-black/40 rounded-full"></span> Full stack capabilities</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-black/40 rounded-full"></span> Auth, DB, Payments</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-black/40 rounded-full"></span> 1–3 week turnaround</li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-[#111] p-10 rounded-[2.5rem] border border-white/5 flex flex-col justify-between hover:bg-white/[0.02] transition-colors duration-500">
            <div>
              <h4 className="text-white/50 uppercase tracking-[0.3em] font-bold text-xs mb-4">Scale</h4>
              <div className="text-5xl font-heading font-black mb-6">Custom</div>
              <p className="text-white/60 text-sm font-medium mb-8 leading-relaxed">Ongoing development, automation, or a massive multi-feature build.</p>
            </div>
            <ul className="text-white/40 text-sm space-y-4 font-bold tracking-wider">
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-white/40 rounded-full"></span> Dedicated sprint work</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-white/40 rounded-full"></span> AI & Integrations</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-white/40 rounded-full"></span> Scoped on a call</li>
            </ul>
          </motion.div>

        </motion.div>

        {/* CTAs */}
        <motion.div variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-24 flex flex-col items-center">
          <h3 className="text-3xl md:text-5xl font-black font-heading uppercase tracking-tighter mb-6">Got an idea?</h3>
          <a href="https://calendly.com/deltaverse300/30min" target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center gap-4 px-10 py-5 bg-[#E8E8E3] text-[#0B0B0A] uppercase tracking-[0.2em] font-black text-sm rounded-full overflow-hidden hover:scale-105 transition-transform duration-500">
            <span className="relative z-10">Initialize Strategy Call</span>
            <span className="relative z-10 bg-black/10 rounded-full w-8 h-8 flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">↗</span>
          </a>

          <div className="mt-16 flex flex-col sm:flex-row items-center gap-6">
             <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Or transmit via</span>
             <a href="https://www.upwork.com/freelancers/~01bfc388a3d46826ca" target="_blank" rel="noopener noreferrer" className="text-white/50 text-xs uppercase tracking-widest font-bold hover:text-white transition-colors border-b border-white/20 pb-1 hover:border-white">
               Upwork
             </a>
             <span className="hidden sm:inline text-white/20">•</span>
             <a href="https://www.fiverr.com/tri_verse?public_mode=true" target="_blank" rel="noopener noreferrer" className="text-white/50 text-xs uppercase tracking-widest font-bold hover:text-white transition-colors border-b border-white/20 pb-1 hover:border-white">
               Fiverr
             </a>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-3xl mx-auto border border-white/10 p-8 md:p-12 rounded-[3rem] bg-white/[0.01] backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] pointer-events-none"></div>
          
          <h3 className="text-sm font-black uppercase tracking-[0.3em] text-[#00f5ff] mb-12 flex items-center gap-4">
            <span className="w-2 h-2 rounded-full bg-[#00f5ff] animate-pulse"></span>
            Direct Message
          </h3>
          
          {status === "success" ? (
             <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-12 bg-emerald-500/10 text-emerald-400 text-center rounded-3xl font-bold tracking-widest uppercase border border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.1)]">
               Transmission Received. I'll be in touch within 24 hours.
             </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input required type="text" placeholder="Designation (Name)" value={formData.client_name} onChange={e=>setFormData({...formData, client_name: e.target.value})} className="w-full p-5 bg-[#050505] border border-white/10 rounded-2xl text-[#E8E8E3] focus:outline-none focus:border-white/30 font-bold tracking-wider placeholder:text-white/20 placeholder:font-medium transition-colors" />
                <input required type="email" placeholder="Comms Link (Email)" value={formData.client_email} onChange={e=>setFormData({...formData, client_email: e.target.value})} className="w-full p-5 bg-[#050505] border border-white/10 rounded-2xl text-[#E8E8E3] focus:outline-none focus:border-white/30 font-bold tracking-wider placeholder:text-white/20 placeholder:font-medium transition-colors" />
              </div>
              <textarea required placeholder="Mission Brief (Project Details)" rows={5} value={formData.project_brief} onChange={e=>setFormData({...formData, project_brief: e.target.value})} className="w-full p-5 bg-[#050505] border border-white/10 rounded-2xl text-[#E8E8E3] focus:outline-none focus:border-white/30 font-bold tracking-wider placeholder:text-white/20 placeholder:font-medium resize-none transition-colors" />
              <button disabled={status === "loading"} type="submit" className="w-full py-6 bg-white/10 text-[#E8E8E3] uppercase tracking-[0.3em] font-black text-sm rounded-2xl hover:bg-white hover:text-[#0B0B0A] transition-all duration-300 border border-white/10 disabled:opacity-50 mt-4">
                {status === "loading" ? "Transmitting..." : "Send Data"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
