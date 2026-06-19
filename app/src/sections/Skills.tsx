import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Server, Container, Figma, Sparkles } from 'lucide-react';

/* ------------------------------------------------------------------ */
//  DATA
/* ------------------------------------------------------------------ */

const skillCategories = [
  {
    title: 'Frontend',
    desc: 'React to WebGL. Every pixel considered.',
    icon: Code2,
    skills: ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'Three.js / WebGL', 'Framer Motion', 'Shadcn / Radix'],
  },
  {
    title: 'Backend',
    desc: 'Scalable APIs, robust data layer.',
    icon: Server,
    skills: ['Node.js / Express', 'Python / FastAPI', 'tRPC / GraphQL', 'PostgreSQL / MySQL', 'Redis', 'Prisma / Drizzle'],
  },
  {
    title: 'DevOps & Cloud',
    desc: 'Ship fast. Sleep well.',
    icon: Container,
    skills: ['Docker / Kubernetes', 'AWS / GCP / Azure', 'CI / GitHub Actions', 'Git / GitHub', 'Linux / Bash', 'Terraform'],
  },
  {
    title: 'Design & Tools',
    desc: 'Prototyping to production, end-to-end.',
    icon: Figma,
    skills: ['Figma / Penpot', 'Adobe Creative Suite', 'Jira / Linear', 'Notion / Obsidian', 'Postman / Insomnia', 'Slack / Discord'],
  },
];

const floatingTech = [
  'React', 'Next.js', 'TypeScript', 'Tailwind', 'Three.js',
  'Node.js', 'Python', 'PostgreSQL', 'Docker', 'AWS',
  'GraphQL', 'Redis', 'Figma', 'Git', 'Linux',
];

/* ------------------------------------------------------------------ */
//  COMPONENT
/* ------------------------------------------------------------------ */

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="relative z-10 py-32 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          <span className="text-white/25 font-medium tracking-[0.25em] uppercase text-[10px] mb-8 block">
            Expertise
          </span>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tighter text-white leading-[1.05] mb-8">
            Skills &{' '}
            <span className="text-white/30">Technologies</span>
          </h2>
          <p className="text-base text-white/25 max-w-md mx-auto font-light leading-relaxed">
            A refined toolkit built over years of shipping production-grade
            software.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-32">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={ci}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.9,
                delay: ci * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                y: -6,
                transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
              }}
              className="group relative bg-white/[0.02] backdrop-blur-3xl border border-white/[0.06] rounded-[2rem] p-8 transition-colors duration-500 hover:border-white/[0.12]"
            >
              {/* Subtle inner highlight */}
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />

              <div className="relative z-10 flex items-start justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                    <cat.icon className="w-5 h-5 text-white/60" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white tracking-tight">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-white/25 mt-1 font-light">
                      {cat.desc}
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative z-10 flex flex-wrap gap-2">
                {cat.skills.map((skill, si) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      delay: 0.5 + ci * 0.1 + si * 0.04,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="inline-flex items-center px-3.5 py-1.5 rounded-full border border-white/[0.07] text-sm text-white/35 font-light hover:text-white/80 hover:border-white/15 hover:bg-white/[0.03] transition-all duration-500 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Constellation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-white/15 font-medium tracking-[0.2em] uppercase text-[10px]">
              <Sparkles className="w-3 h-3" strokeWidth={1.5} />
              Tech Orbit
            </span>
          </div>

          <div className="relative h-[380px] sm:h-[480px] bg-white/[0.01] backdrop-blur-3xl border border-white/[0.06] rounded-[2.5rem] overflow-hidden">
            {/* Center ambient glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-28 h-28 bg-white/[0.015] rounded-full blur-3xl" />
            </div>

            {/* Orbital rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[65%] h-[65%] border border-white/[0.03] rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] border border-white/[0.02] rounded-full"
            />

            {/* Floating badges */}
            {floatingTech.map((tech, i) => {
              const angle = (i / floatingTech.length) * Math.PI * 2;
              const radiusX = 40;
              const radiusY = 34;
              const x = 50 + radiusX * Math.cos(angle);
              const y = 50 + radiusY * Math.sin(angle);
              const floatDuration = 6 + Math.random() * 4;
              const floatDelay = Math.random() * 4;

              return (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.7 + i * 0.04, duration: 1 }}
                  className="absolute"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: floatDuration,
                      repeat: Infinity,
                      delay: floatDelay,
                      ease: 'easeInOut',
                    }}
                    className="rounded-full px-4 py-2 text-xs font-light text-white/20 border border-white/[0.04] backdrop-blur-sm hover:text-white/70 hover:border-white/10 transition-colors duration-700 cursor-default select-none"
                  >
                    {tech}
                  </motion.div>
                </motion.div>
              );
            })}

            {/* Connection lines — ultra subtle */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.012]">
              {floatingTech.map((_, i) => {
                const angle = (i / floatingTech.length) * Math.PI * 2;
                const x1 = 50 + 40 * Math.cos(angle);
                const y1 = 50 + 34 * Math.sin(angle);
                return (
                  <line
                    key={i}
                    x1={`${x1}%`}
                    y1={`${y1}%`}
                    x2="50%"
                    y2="50%"
                    stroke="white"
                    strokeWidth="0.5"
                  />
                );
              })}
            </svg>

            {/* Center node */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/[0.025] border border-white/[0.08] flex items-center justify-center backdrop-blur-xl">
              <div className="w-2 h-2 bg-white/30 rounded-full" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
