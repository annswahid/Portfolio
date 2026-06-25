import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Palette, Zap, Globe, Sparkles, MapPin } from 'lucide-react';

const highlights = [
  { icon: Code2, label: 'Full Stack', desc: 'End-to-end development' },
  { icon: Palette, label: 'UI/UX Design', desc: 'Pixel-perfect interfaces' },
  { icon: Zap, label: 'Performance', desc: 'Optimized & scalable' },
  { icon: Globe, label: 'Global Remote', desc: 'Seamless collaboration' },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative z-10 py-24 md:py-32 px-6 overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Giant Section Title */}
        {/* <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full select-none pointer-events-none overflow-hidden mb-12 sm:mb-16"
        >
          <h2 className="text-[12vw] font-black tracking-tighter text-white/10 uppercase leading-none">
            ABOUT
          </h2>
        </motion.div> */}

        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-sans leading-[1.15]">
              Crafting Unique <br className="hidden sm:block" /> Digital Products
            </h3>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex items-end"
          >
            <p className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed max-w-xl font-sans">
              I blend technical architecture with sleek modern aesthetics to create premium web applications that engage users and scale effortlessly.
            </p>
          </motion.div>
        </div>

        {/* Sleek Modern Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Bento Card: Compact Profile */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 rounded-3xl glass p-6 sm:p-8 flex flex-col justify-between border border-white/10 relative overflow-hidden group shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6">
              {/* Compact Stylish Portrait Square */}
              <div className="relative w-48 sm:w-56 mx-auto aspect-square rounded-2xl overflow-hidden border border-white/15 shadow-lg group-hover:scale-[1.02] transition-transform duration-500">
                <img
                  src="/images/about-portrait.jpg"
                  alt="Muhammad Anas"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              <div className="text-center space-y-1">
                <h4 className="text-2xl font-bold text-white tracking-tight">Muhammad Anas</h4>
                <p className="text-sm font-medium text-purple-400">Full-Stack Engineer & Designer</p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Global Remote
              </span>
              <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Available
              </span>
            </div>
          </motion.div>

          {/* Right Bento Area: Bio & Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 flex flex-col justify-between gap-8"
          >
            {/* Bio Glass Card */}
            <div className="rounded-3xl glass p-8 sm:p-10 border border-white/10 space-y-6 flex-1 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-purple-400 font-semibold">
                <Sparkles className="w-4 h-4" /> About Me
              </div> */}
              <p className="text-lg sm:text-xl text-neutral-200 font-light leading-relaxed font-sans">
                I'm a passionate developer and UI/UX designer with over 5 years of experience crafting digital solutions. Whether it's a complex SaaS platform, an interactive 3D web experience, or an AI-powered application, I bring ideas to life with clean code and rigorous attention to detail.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {highlights.map((item, i) => (
                <div
                  key={i}
                  className="bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-5 hover:border-purple-500/40 hover:bg-white/[0.06] transition-all duration-500 group shadow-lg flex flex-col justify-between"
                >
                  <item.icon className="w-6 h-6 text-white/60 mb-4 group-hover:text-purple-400 group-hover:scale-110 transition-all duration-300" strokeWidth={1.5} />
                  <div>
                    <div className="font-bold text-white text-sm tracking-tight mb-1">{item.label}</div>
                    <div className="text-xs text-neutral-400 font-light leading-snug">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
