"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedNumber from "@/components/AnimatedNumber";
import GlobalLoader from "@/components/GlobalLoader";

export default function DashboardClient() {
  const [loading, setLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);
  const [bookings, setBookings] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  
  const [searchB, setSearchB] = useState("");
  const [searchE, setSearchE] = useState("");
  const [searchO, setSearchO] = useState("");
  const [searchT, setSearchT] = useState("");

  const [orderModal, setOrderModal] = useState(false);
  const [testModal, setTestModal] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const [{ data: b }, { data: e }, { data: o }, { data: t }] = await Promise.all([
        supabase.from("bookings").select("*").order("created_at", { ascending: false }),
        supabase.from("enquiries").select("*").order("created_at", { ascending: false }),
        supabase.from("orders").select("*").order("created_at", { ascending: false }),
        supabase.from("testimonials").select("*").order("created_at", { ascending: false })
      ]);
      if (b) setBookings(b);
      if (e) setEnquiries(e);
      if (o) setOrders(o);
      if (t) setTestimonials(t);
      
      // Simulate slight load delay to show the awesome loader
      setTimeout(() => setLoading(false), 1200);
    };
    fetchData();
  }, [supabase]);

  const updateStatus = async (table: string, id: any, status: string) => {
    await supabase.from(table).update({ status }).eq("id", id);
    if (table === "bookings") setBookings(b => b.map(x => x.id === id ? { ...x, status } : x));
    if (table === "enquiries") setEnquiries(e => e.map(x => x.id === id ? { ...x, status } : x));
    if (table === "orders") setOrders(o => o.map(x => x.id === id ? { ...x, status } : x));
  };

  const deleteRecord = async (table: string, id: any) => {
    if (!confirm("Delete this record?")) return;
    await supabase.from(table).delete().eq("id", id);
    if (table === "bookings") setBookings(b => b.filter(x => x.id !== id));
    if (table === "enquiries") setEnquiries(e => e.filter(x => x.id !== id));
    if (table === "orders") setOrders(o => o.filter(x => x.id !== id));
    if (table === "testimonials") setTestimonials(t => t.filter(x => x.id !== id));
  };

  const getBadgeColor = (s: string) => {
    if (!s) return 'bg-gray-800 text-gray-300';
    const l = s.toLowerCase();
    if (l === 'won' || l === 'confirmed' || l.includes('complet') || l === 'done') return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    if (l === 'lost' || l === 'cancelled') return 'bg-red-500/10 text-red-400 border-red-500/20';
    if (l.includes('progress') || l === 'active' || l === 'contacted') return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    if (l.includes('proposal') || l === 'new' || l === 'unread') return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  };

  const STATUS_OPTIONS = {
    bookings: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
    enquiries: ['New', 'Contacted', 'Proposal Sent', 'Won', 'Lost'],
    orders: ['Pending', 'In Progress', 'Completed']
  };

  const QUICK_REPLIES = [
    { title: 'Accepted Proposal', text: `Hi {name},\n\nThanks for the go-ahead! I'll get started right away and keep you posted on progress. You can expect a first update within 2-3 days.\n\nTalk soon,\nDelta_Verse` },
    { title: 'Need More Info', text: `Hi {name},\n\nThanks for reaching out! Before I can put together an accurate estimate, could you share a bit more detail on:\n- The core problem you're trying to solve\n- Any must-have features or integrations\n- Your target timeline\n\nLooking forward to hearing more.\n\nBest,\nDelta_Verse` },
    { title: 'Politely Decline', text: `Hi {name},\n\nThanks so much for thinking of me for this. Unfortunately this isn't the right fit for me at the moment, but I'd be happy to point you toward someone who might help, or reconnect if your scope changes.\n\nAll the best,\nDelta_Verse` },
    { title: 'Follow-Up', text: `Hi {name},\n\nJust following up on my last message — happy to answer any questions or hop on a quick call if that's easier. Let me know what works!\n\nBest,\nDelta_Verse` }
  ];

  const revenue = orders.filter(o => o.status === 'Completed').reduce((sum, o) => sum + (Number(o.price) || 0), 0);
  const openEnquiries = enquiries.filter(e => !['Won', 'Lost'].includes(e.status)).length;
  const activeOrders = orders.filter(o => !['Completed', 'Cancelled'].includes(o.status)).length;
  const winRate = enquiries.length ? Math.round((enquiries.filter(e => e.status === 'Won').length / enquiries.length) * 100) : 0;

  const matchSearch = (obj: any, term: string) => {
    if (!term) return true;
    return Object.values(obj).some(val => String(val).toLowerCase().includes(term.toLowerCase()));
  };

  const triggerModal = (type: 'order' | 'test') => {
    setModalLoading(true);
    setTimeout(() => {
      setModalLoading(false);
      if (type === 'order') setOrderModal(true);
      else setTestModal(true);
    }, 1200);
  };

  const containerVariants: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  if (loading) return <GlobalLoader />;

  return (
    <div className="bg-[#0B0B0A] min-h-screen text-[#E8E8E3] font-body relative overflow-x-hidden selection:bg-[#E8E8E3] selection:text-[#0B0B0A]">
      <AnimatePresence>
        {modalLoading && <GlobalLoader key="modalLoader" />}
      </AnimatePresence>

      {/* Grid Background Effect */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <nav className="relative z-10 border-b border-white/5 bg-[#0B0B0A]/50 backdrop-blur-xl px-8 py-4 flex justify-between items-center">
        <div className="font-heading font-bold text-xl tracking-wider">DELTA_VERSE<span className="text-[#E8E8E3]/50">.</span></div>
        <span className="text-xs uppercase tracking-[0.3em] font-bold text-white/40">Analytics OS</span>
        <form action="/auth/signout" method="post">
           <button type="submit" className="text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors">Log Out</button>
        </form>
      </nav>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 p-8 max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {/* Overview Stat Cards */}
        <div className="col-span-1 md:col-span-2 xl:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Revenue (Completed)', val: revenue, pref: '$' },
            { label: 'Open Enquiries', val: openEnquiries },
            { label: 'Active Orders', val: activeOrders },
            { label: 'Win Rate', val: winRate, suff: '%' }
          ].map((stat, i) => (
            <motion.div key={i} variants={itemVariants} className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl flex flex-col justify-center items-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="text-4xl md:text-5xl font-heading font-bold mb-2">
                <AnimatedNumber value={stat.val} prefix={stat.pref} suffix={stat.suff} />
              </div>
              <div className="text-xs uppercase tracking-widest text-white/40 font-bold">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Enquiries */}
        <motion.div variants={itemVariants} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col xl:col-span-2 min-h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-heading font-bold text-lg tracking-wider">ENQUIRIES</h2>
            <input type="text" placeholder="Search..." value={searchE} onChange={e => setSearchE(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-white/30 transition-colors" />
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead><tr className="text-white/40 border-b border-white/5"><th className="pb-3 font-normal">Date</th><th className="pb-3 font-normal">Client</th><th className="pb-3 font-normal">Status</th><th className="pb-3 font-normal text-right">Action</th></tr></thead>
              <tbody>
                <AnimatePresence>
                  {enquiries.filter(e => matchSearch(e, searchE)).map(e => (
                    <motion.tr layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key={e.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 text-white/60">{new Date(e.created_at).toLocaleDateString()}</td>
                      <td className="py-4">
                        <div className="font-bold">{e.client_name}</div>
                        <div className="text-white/40 text-xs">{e.client_email}</div>
                      </td>
                      <td className="py-4">
                        <select className={`px-3 py-1 rounded-full text-xs font-bold border outline-none appearance-none cursor-pointer transition-colors ${getBadgeColor(e.status)}`} value={e.status} onChange={(ev) => updateStatus("enquiries", e.id, ev.target.value)}>
                          {STATUS_OPTIONS.enquiries.map(o => <option className="bg-[#111]" key={o} value={o}>{o}</option>)}
                        </select>
                      </td>
                      <td className="py-4 text-right">
                        <button onClick={() => deleteRecord('enquiries', e.id)} className="text-red-400/50 hover:text-red-400 transition-colors">🗑</button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Quick Replies */}
        <motion.div variants={itemVariants} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col xl:col-span-1">
          <h2 className="font-heading font-bold text-lg tracking-wider mb-6">QUICK REPLIES</h2>
          <div className="flex flex-col gap-4 overflow-y-auto pr-2">
            {QUICK_REPLIES.map((qr, i) => (
              <motion.div key={i} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => { navigator.clipboard.writeText(qr.text); alert('Copied to clipboard!'); }} className="p-4 bg-white/5 rounded-xl cursor-pointer group relative border border-transparent hover:border-white/10 transition-colors">
                <h4 className="font-bold text-white mb-2 text-sm">{qr.title}</h4>
                <p className="text-xs text-white/40 line-clamp-2">{qr.text}</p>
                <div className="absolute inset-0 bg-[#E8E8E3] opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-xl text-[#0B0B0A] font-bold text-xs uppercase tracking-widest">Copy to Clipboard</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Orders */}
        <motion.div variants={itemVariants} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col xl:col-span-2 min-h-[400px]">
          <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
            <h2 className="font-heading font-bold text-lg tracking-wider">ORDERS</h2>
            <div className="flex gap-4">
              <input type="text" placeholder="Search..." value={searchO} onChange={e => setSearchO(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-white/30 transition-colors" />
              <button onClick={() => triggerModal('order')} className="bg-[#E8E8E3] text-[#0B0B0A] font-bold px-4 py-2 rounded-lg text-sm hover:bg-white transition-colors whitespace-nowrap">+ Add Order</button>
            </div>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead><tr className="text-white/40 border-b border-white/5"><th className="pb-3 font-normal">Date</th><th className="pb-3 font-normal">Client</th><th className="pb-3 font-normal">Status</th><th className="pb-3 font-normal text-right">Action</th></tr></thead>
              <tbody>
                <AnimatePresence>
                  {orders.filter(o => matchSearch(o, searchO)).map(o => (
                    <motion.tr layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key={o.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 text-white/60">{new Date(o.created_at).toLocaleDateString()}</td>
                      <td className="py-4">
                        <div className="font-bold">{o.client_name}</div>
                        <div className="text-white/40 text-xs">{o.project_name} - ${o.price}</div>
                      </td>
                      <td className="py-4">
                        <select className={`px-3 py-1 rounded-full text-xs font-bold border outline-none appearance-none cursor-pointer transition-colors ${getBadgeColor(o.status)}`} value={o.status} onChange={(ev) => updateStatus("orders", o.id, ev.target.value)}>
                          {STATUS_OPTIONS.orders.map(opt => <option className="bg-[#111]" key={opt} value={opt}>{opt}</option>)}
                        </select>
                      </td>
                      <td className="py-4 text-right">
                        <button onClick={() => deleteRecord('orders', o.id)} className="text-red-400/50 hover:text-red-400 transition-colors">🗑</button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div variants={itemVariants} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col xl:col-span-1 min-h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-heading font-bold text-lg tracking-wider">REVIEWS</h2>
            <button onClick={() => triggerModal('test')} className="bg-[#E8E8E3] text-[#0B0B0A] font-bold px-3 py-1 rounded-lg text-xs hover:bg-white transition-colors">+ Add</button>
          </div>
          <input type="text" placeholder="Search..." value={searchT} onChange={e => setSearchT(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-white/30 transition-colors mb-4 w-full" />
          <div className="overflow-y-auto flex-1 pr-2 space-y-4">
            <AnimatePresence>
              {testimonials.filter(t => matchSearch(t, searchT)).map(t => (
                <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} key={t.id} className="p-4 bg-white/5 rounded-xl border border-white/5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-bold text-sm">{t.client_name}</div>
                      <div className="text-xs text-white/40">{t.client_title || t.project_name}</div>
                    </div>
                    <button onClick={() => deleteRecord('testimonials', t.id)} className="text-red-400/50 hover:text-red-400 transition-colors">🗑</button>
                  </div>
                  <p className="text-xs text-white/60 line-clamp-3 mb-3 italic">"{t.quote}"</p>
                  <button 
                    onClick={async () => {
                      const next = !t.is_published;
                      await supabase.from('testimonials').update({ is_published: next }).eq('id', t.id);
                      setTestimonials(ts => ts.map(x => x.id === t.id ? { ...x, is_published: next } : x));
                    }}
                    className={`text-xs font-bold px-3 py-1 rounded-full border transition-colors ${t.is_published ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}
                  >
                    {t.is_published ? 'Published' : 'Draft'}
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
        
        {/* Bookings */}
        <motion.div variants={itemVariants} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col xl:col-span-2 min-h-[300px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-heading font-bold text-lg tracking-wider">BOOKINGS (WAITLIST)</h2>
            <input type="text" placeholder="Search..." value={searchB} onChange={e => setSearchB(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-white/30 transition-colors" />
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead><tr className="text-white/40 border-b border-white/5"><th className="pb-3 font-normal">Date</th><th className="pb-3 font-normal">Email / Project</th><th className="pb-3 font-normal">Status</th><th className="pb-3 font-normal text-right">Action</th></tr></thead>
              <tbody>
                <AnimatePresence>
                  {bookings.filter(b => matchSearch(b, searchB)).map(b => (
                    <motion.tr layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key={b.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 text-white/60">{new Date(b.created_at).toLocaleDateString()}</td>
                      <td className="py-4">
                        <div className="font-bold">{b.email || b.service_name}</div>
                        <div className="text-white/40 text-xs">{b.project_name}</div>
                      </td>
                      <td className="py-4">
                        <select className={`px-3 py-1 rounded-full text-xs font-bold border outline-none appearance-none cursor-pointer transition-colors ${getBadgeColor(b.status)}`} value={b.status} onChange={(ev) => updateStatus("bookings", b.id, ev.target.value)}>
                          {STATUS_OPTIONS.bookings.map(o => <option className="bg-[#111]" key={o} value={o}>{o}</option>)}
                        </select>
                      </td>
                      <td className="py-4 text-right">
                        <button onClick={() => deleteRecord('bookings', b.id)} className="text-red-400/50 hover:text-red-400 transition-colors">🗑</button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div variants={itemVariants} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col xl:col-span-1">
          <h2 className="font-heading font-bold text-lg tracking-wider mb-6">QUICK LINKS</h2>
          <div className="flex flex-col gap-3">
            {[
              { label: 'View Portfolio', href: '/' },
              { label: 'Upwork Profile', href: 'https://www.upwork.com/freelancers/~01bfc388a3d46826ca', blank: true },
              { label: 'Fiverr Profile', href: 'https://www.fiverr.com/tri_verse?public_mode=true', blank: true },
              { label: 'Send Email', href: 'mailto:deltaverse300@gmail.com' }
            ].map(link => (
              <motion.a 
                whileHover={{ x: 5 }} 
                key={link.label} 
                href={link.href} 
                target={link.blank ? "_blank" : "_self"} 
                className="px-4 py-4 bg-white/5 border border-white/5 rounded-xl hover:bg-[#E8E8E3] hover:text-[#0B0B0A] transition-colors text-sm font-bold tracking-widest uppercase flex items-center justify-between group"
              >
                {link.label}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </motion.a>
            ))}
          </div>
        </motion.div>

      </motion.div>

      {/* Modals */}
      <AnimatePresence>
        {orderModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0B0A]/80 backdrop-blur-md">
            <motion.form 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-[#111] border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl"
              onSubmit={async (e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const priceVal = fd.get('price');
                
                const { data, error } = await supabase.from('orders').insert({
                  client_name: fd.get('client_name')?.toString() || '',
                  project_name: fd.get('project_name')?.toString() || '',
                  platform: fd.get('platform')?.toString() || '',
                  status: fd.get('status')?.toString() || '',
                  deadline: fd.get('deadline')?.toString() || null,
                  price: priceVal ? parseFloat(priceVal.toString()) : 0
                }).select().single();
                if (error) {
                  console.error("Order Insert Error:", error);
                  alert(`Database Error: ${error.message}`);
                }
                if (data) {
                  setOrders([data, ...orders]);
                  setOrderModal(false);
                }
              }}>
              <h3 className="text-xl font-heading font-bold uppercase tracking-widest text-[#E8E8E3] mb-6">New Order</h3>
              <div className="space-y-4">
                <input required name="client_name" placeholder="Client Name" className="w-full p-3 bg-black/50 border border-white/10 focus:border-white/30 rounded-xl outline-none" />
                <input required name="project_name" placeholder="Project Name" className="w-full p-3 bg-black/50 border border-white/10 focus:border-white/30 rounded-xl outline-none" />
                <select required name="platform" defaultValue="" className="w-full p-3 bg-black/50 border border-white/10 focus:border-white/30 rounded-xl outline-none">
                  <option value="" disabled>Select platform</option>
                  <option value="Upwork">Upwork</option><option value="Fiverr">Fiverr</option><option value="Direct">Direct</option>
                </select>
                <select required name="status" defaultValue="" className="w-full p-3 bg-black/50 border border-white/10 focus:border-white/30 rounded-xl outline-none">
                  <option value="" disabled>Select status</option>
                  <option value="Pending">Pending</option><option value="In Progress">In Progress</option><option value="Completed">Completed</option>
                </select>
                <input required name="deadline" type="date" className="w-full p-3 bg-black/50 border border-white/10 focus:border-white/30 rounded-xl outline-none [color-scheme:dark]" />
                <input required name="price" type="number" placeholder="Amount ($)" className="w-full p-3 bg-black/50 border border-white/10 focus:border-white/30 rounded-xl outline-none" />
              </div>
              <div className="flex gap-4 mt-8">
                <button type="button" onClick={() => setOrderModal(false)} className="flex-1 py-3 border border-white/10 rounded-xl hover:bg-white/5 transition-colors font-bold">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-[#E8E8E3] text-[#0B0B0A] font-bold rounded-xl hover:bg-white transition-colors">Save Order</button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {testModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0B0A]/80 backdrop-blur-md">
            <motion.form 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-[#111] border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl"
              onSubmit={async (e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const { data, error } = await supabase.from('testimonials').insert({
                  client_name: fd.get('client_name')?.toString() || '',
                  client_title: fd.get('client_title')?.toString() || '',
                  project_name: fd.get('project_name')?.toString() || '',
                  rating: fd.get('rating')?.toString() || '5',
                  quote: fd.get('quote')?.toString() || '',
                  is_published: false
                }).select().single();
                if (error) {
                  console.error("Testimonial Insert Error:", error);
                  alert(`Error saving testimonial: ${error.message || JSON.stringify(error)}`);
                }
                if (data) {
                  setTestimonials([data, ...testimonials]);
                  setTestModal(false);
                }
              }}>
              <h3 className="text-xl font-heading font-bold uppercase tracking-widest text-[#E8E8E3] mb-6">New Testimonial</h3>
              <div className="space-y-4">
                <input required name="client_name" placeholder="Client Name" className="w-full p-3 bg-black/50 border border-white/10 focus:border-white/30 rounded-xl outline-none" />
                <input name="client_title" placeholder="Client Title (e.g. CEO)" className="w-full p-3 bg-black/50 border border-white/10 focus:border-white/30 rounded-xl outline-none" />
                <input required name="project_name" placeholder="Project Name" className="w-full p-3 bg-black/50 border border-white/10 focus:border-white/30 rounded-xl outline-none" />
                <select required name="rating" defaultValue="5" className="w-full p-3 bg-black/50 border border-white/10 focus:border-white/30 rounded-xl outline-none">
                  <option value="5">5 Stars</option><option value="4">4 Stars</option><option value="3">3 Stars</option>
                </select>
                <textarea required name="quote" rows={4} placeholder="Testimonial text..." className="w-full p-3 bg-black/50 border border-white/10 focus:border-white/30 rounded-xl outline-none resize-none"></textarea>
              </div>
              <div className="flex gap-4 mt-8">
                <button type="button" onClick={() => setTestModal(false)} className="flex-1 py-3 border border-white/10 rounded-xl hover:bg-white/5 transition-colors font-bold">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-[#E8E8E3] text-[#0B0B0A] font-bold rounded-xl hover:bg-white transition-colors">Save Review</button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
