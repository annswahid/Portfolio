import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Palette, Zap, Globe } from 'lucide-react';

const highlights = [
  { icon: Code2, label: 'Full Stack', desc: 'End-to-end development' },
  { icon: Palette, label: 'UI/UX Design', desc: 'Pixel-perfect interfaces' },
  { icon: Zap, label: 'Performance', desc: 'Optimized & scalable' },
  { icon: Globe, label: 'Global', desc: 'Remote collaboration' },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative z-10 py-32 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden aspect-[3/4] max-w-md mx-auto">
              <img
                src="/images/hero-portrait.jpg"
                alt="Portrait"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 bg-white/[0.02] backdrop-blur-3xl border border-white/[0.06] rounded-2xl p-4"
            >
              <Code2 className="w-5 h-5 text-white/40" strokeWidth={1.5} />
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-4 -left-4 bg-white/[0.02] backdrop-blur-3xl border border-white/[0.06] rounded-2xl p-4"
            >
              <Palette className="w-5 h-5 text-white/40" strokeWidth={1.5} />
            </motion.div>
          </motion.div>

          {/* Content */}
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-white/25 font-medium tracking-[0.25em] uppercase text-[10px] mb-8 block"
            >
              About Me
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-6xl font-light tracking-tighter text-white leading-[1.05] mb-8"
            >
              Building Digital
              <br />
              <span className="text-white/30">Experiences</span> That Matter
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-white/25 leading-relaxed mb-6 font-light"
            >
              I'm a passionate full-stack developer and UI/UX designer with over 5 years of
              experience crafting digital solutions. I specialize in building modern web
              applications that combine beautiful design with robust functionality.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-white/25 leading-relaxed mb-10 font-light"
            >
              My approach blends technical expertise with creative thinking. Whether it's a
              complex SaaS platform, an immersive portfolio, or an AI-powered application,
              I bring ideas to life with clean code and attention to detail.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 gap-4"
            >
              {highlights.map((item, i) => (
                <div
                  key={i}
                  className="bg-white/[0.02] backdrop-blur-3xl border border-white/[0.06] rounded-2xl p-5 hover:border-white/[0.12] hover:bg-white/[0.03] transition-all duration-500 group"
                >
                  <item.icon className="w-5 h-5 text-white/30 mb-3 group-hover:text-white/60 transition-colors" strokeWidth={1.5} />
                  <div className="font-medium text-white/70 text-sm tracking-tight">{item.label}</div>
                  <div className="text-xs text-white/20 mt-1 font-light">{item.desc}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
