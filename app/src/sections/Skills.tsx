import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// SVG Logo components styled inline for responsiveness and colors
const JSLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 rounded-md" fill="#F7DF1E">
    <rect width="24" height="24" rx="4" />
    <text x="18" y="19" fill="#000" fontSize="10" fontWeight="900" textAnchor="end">JS</text>
  </svg>
);

const TSLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 rounded-md" fill="#3178C6">
    <rect width="24" height="24" rx="4" />
    <text x="18" y="19" fill="#fff" fontSize="10" fontWeight="900" textAnchor="end">TS</text>
  </svg>
);

const PythonLogo = () => (
  <svg viewBox="0 0 448 512" className="w-8 h-8 fill-[#3776AB]">
    <path d="M439.4 153c-.5-1.1-1.1-2.2-1.8-3.1-10-13-33-22.3-64.6-22.3h-44.2v-44.3c0-31.6-9.3-54.6-22.3-64.6-10-7.7-22-11.8-35.3-11.8h-110c-13.3 0-25.3 4-35.3 11.8-13 10-22.3 33-22.3 64.6v22.2H64.6C33 105.7 10 115 0 128c-7.7 10-11.8 22-11.8 35.3v110c0 13.3 4 25.3 11.8 35.3 10 13 33 22.3 64.6 22.3h44.2V375c0 31.6 9.3 54.6 22.3 64.6 10 7.7 22 11.8 35.3 11.8h110c13.3 0 25.3-4 35.3-11.8 13-10 22.3-33 22.3-64.6v-22.2h39.7c31.6 0 54.6-9.3 64.6-22.3 7.7-10 11.8-22 11.8-35.3V188.3c0-13.3-4.1-25.3-11.8-35.3zM250 82.5c8.3 0 15 6.7 15 15s-6.7 15-15 15-15-6.7-15-15 6.7-15 15-15zm-83.3 317c-8.3 0-15-6.7-15-15s6.7-15 15-15 15 6.7 15 15-6.7 15-15 15z" />
  </svg>
);

const ReactLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-[#61DAFB] animate-[spin_20s_linear_infinite]" strokeWidth="2">
    <ellipse cx="12" cy="12" rx="10" ry="4.5" />
    <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
    <circle cx="12" cy="12" r="2" fill="#61DAFB" />
  </svg>
);

const NextLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white stroke-white" strokeWidth="0.5">
    <circle cx="12" cy="12" r="11" fill="black" />
    <path d="M16.5 17.5L8.5 7.5v9h-1.5v-12h1.5l8 10v-10h1.5v13z" fill="white" />
  </svg>
);

const SQLLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-[#336791]" strokeWidth="2">
    <ellipse cx="12" cy="5" rx="9" ry="3" fill="#336791" fillOpacity="0.2" />
    <path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    <path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6" />
  </svg>
);

const HTMLLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-[#E34F26]">
    <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm15.1 6.5H7.1l.3 3h9.1l-.6 6.5-3.9 1.3-3.9-1.3-.2-2.5h-3l.5 5.5 6.6 2.2 6.6-2.2.8-9h-9.9l-.3-3h11.2l-.2-2.5z" />
  </svg>
);

const TailwindLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-[#38BDF8]">
    <path d="M12 6.002C12.002 6 15 2 19 2s5 3.5 5 7.5-3.5 6.5-7.5 6.5c-3.4 0-5.5-2.2-6.5-3.7-1 1.5-3.1 3.7-6.5 3.7C3.5 16 0 13 0 9s3.5-7.5 7.5-7.5c4 0 4.498 4 4.5 4.002z" />
  </svg>
);

const GraphQLLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-[#E10098] fill-none animate-[pulse_3s_ease-in-out_infinite]" strokeWidth="2">
    <polygon points="12,2 20,7 20,17 12,22 4,17 4,7" />
    <line x1="12" y1="2" x2="12" y2="22" />
    <line x1="4" y1="7" x2="20" y2="17" />
    <line x1="20" y1="7" x2="4" y2="17" />
    <circle cx="12" cy="2" r="1.5" fill="#E10098" />
    <circle cx="20" cy="7" r="1.5" fill="#E10098" />
    <circle cx="20" cy="17" r="1.5" fill="#E10098" />
    <circle cx="12" cy="22" r="1.5" fill="#E10098" />
    <circle cx="4" cy="17" r="1.5" fill="#E10098" />
    <circle cx="4" cy="7" r="1.5" fill="#E10098" />
    <circle cx="12" cy="12" r="2.5" fill="#E10098" />
  </svg>
);

const LangChainLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-[#13EF95]" strokeWidth="2" strokeLinecap="round">
    <rect x="3" y="11" width="10" height="6" rx="3" transform="rotate(-45 8 14)" />
    <rect x="11" y="7" width="10" height="6" rx="3" transform="rotate(-45 16 10)" />
    <path d="M12 4c2.5 0 4.5 2 4.5 4.5S14.5 13 12 13s-4.5-2-4.5-4.5S9.5 4 12 4z" fill="#13EF95" fillOpacity="0.2" />
  </svg>
);

const LangGraphLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-[#FF5A5F]" strokeWidth="2">
    <circle cx="6" cy="18" r="3" fill="#FF5A5F" />
    <circle cx="18" cy="6" r="3" fill="#FF5A5F" />
    <circle cx="12" cy="10" r="3" fill="#FF5A5F" />
    <line x1="6" y1="18" x2="12" y2="10" />
    <line x1="12" y1="10" x2="18" y2="6" />
    <path d="M6 18c6-2 6-8 12-12" strokeDasharray="3 3" />
  </svg>
);

const LLMLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-[#A855F7]" strokeWidth="2">
    <path d="M12 2v20M2 12h20M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2z" strokeOpacity="0.3" />
    <path d="M9.5 9.5l2.5-2.5 2.5 2.5-2.5 2.5z" fill="#A855F7" fillOpacity="0.2" />
    <circle cx="12" cy="12" r="5" fill="#A855F7" fillOpacity="0.4" />
    <path d="M12 7v10M7 12h10" />
  </svg>
);

const skillsData = [
  {
    name: 'JavaScript',
    note: 'ES6+ · Async / Await',
    logo: JSLogo,
    glowColor: 'rgba(247, 223, 30, 0.15)',
  },
  {
    name: 'TypeScript',
    note: 'Strict Types · Interfaces',
    logo: TSLogo,
    glowColor: 'rgba(49, 120, 198, 0.15)',
  },
  {
    name: 'Python',
    note: 'Concurrency · Scripts',
    logo: PythonLogo,
    glowColor: 'rgba(55, 118, 171, 0.15)',
  },
  {
    name: 'React',
    note: 'Hooks · State Management',
    logo: ReactLogo,
    glowColor: 'rgba(97, 218, 251, 0.15)',
  },
  {
    name: 'Next.js',
    note: 'App Router · SSR / SSG',
    logo: NextLogo,
    glowColor: 'rgba(255, 255, 255, 0.12)',
  },
  {
    name: 'GraphQL',
    note: 'Schemas · Client / Server APIs',
    logo: GraphQLLogo,
    glowColor: 'rgba(225, 0, 152, 0.15)',
  },
  {
    name: 'SQL & Database',
    note: 'PostgreSQL · Queries',
    logo: SQLLogo,
    glowColor: 'rgba(51, 103, 145, 0.15)',
  },
  {
    name: 'HTML & CSS',
    note: 'Flex & Grid Layouts',
    logo: HTMLLogo,
    glowColor: 'rgba(227, 79, 38, 0.15)',
  },
  {
    name: 'Tailwind CSS',
    note: 'Responsive utility styling',
    logo: TailwindLogo,
    glowColor: 'rgba(56, 189, 248, 0.15)',
  },
  {
    name: 'LangChain',
    note: 'AI agent workflows · Chains',
    logo: LangChainLogo,
    glowColor: 'rgba(19, 239, 149, 0.15)',
  },
  {
    name: 'LangGraph',
    note: 'Multi-agent graph systems',
    logo: LangGraphLogo,
    glowColor: 'rgba(255, 90, 95, 0.15)',
  },
  {
    name: 'LLM Integration',
    note: 'OpenAI, Claude, Llama · RAG',
    logo: LLMLogo,
    glowColor: 'rgba(168, 85, 247, 0.15)',
  },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="relative z-10 py-24 md:py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Giant Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full select-none pointer-events-none overflow-hidden mb-12 sm:mb-16"
        >
          <h2 className="text-[12vw] font-black tracking-tighter text-white/10 uppercase leading-none">
            SKILLS
          </h2>
        </motion.div>

        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-sans leading-[1.15]">
              Core Tech Stack <br className="hidden sm:block" /> & Capabilities
            </h3>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex items-end"
          >
            <p className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed max-w-xl font-sans">
              The core languages, frameworks, and tools I utilize to build interactive, scalable, and high-performance digital systems.
            </p>
          </motion.div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {skillsData.map((skill, index) => {
            const Logo = skill.logo;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative rounded-2xl p-6 bg-white/[0.02] backdrop-blur-md border border-white/[0.05] hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-500 flex items-center gap-4 cursor-default overflow-hidden"
                style={{
                  // Dynamic subtle glow on group hover using CSS variable
                  '--glow-color': skill.glowColor,
                } as React.CSSProperties}
              >
                {/* Glow Background effect on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle 100px at center, ${skill.glowColor}, transparent)`,
                  }}
                />

                {/* Left Side: Logo */}
                <div className="relative z-10 shrink-0 group-hover:scale-110 transition-transform duration-500">
                  <Logo />
                </div>

                {/* Right Side: Details */}
                <div className="relative z-10 min-w-0">
                  <h3 className="text-base font-semibold text-white group-hover:text-white transition-colors">
                    {skill.name}
                  </h3>
                  <p className="text-xs text-white/40 group-hover:text-white/60 transition-colors mt-0.5 font-light truncate">
                    {skill.note}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
