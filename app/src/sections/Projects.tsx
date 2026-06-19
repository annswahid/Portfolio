import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'Nexus Commerce',
    description:
      'A full-featured e-commerce platform with real-time analytics, inventory management, and AI-powered product recommendations.',
    image: '/images/project-ecommerce.jpg',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
    link: '#',
    github: '#',
    accent: '#8b5cf6',
  },
  {
    title: 'AI Conversational Platform',
    description:
      'An intelligent chatbot framework with multi-model support, conversation memory, and custom agent builder interface.',
    image: '/images/project-ai-chat.jpg',
    tags: ['React', 'Python', 'OpenAI', 'WebSocket'],
    link: '#',
    github: '#',
    accent: '#22d3ee',
  },
  {
    title: 'Immersive Portfolio Engine',
    description:
      'A 3D portfolio generator with particle effects, scroll-based animations, and WebGL-powered visual experiences.',
    image: '/images/project-portfolio.jpg',
    tags: ['Three.js', 'GSAP', 'React', 'WebGL'],
    link: '#',
    github: '#',
    accent: '#e879f9',
  },
  {
    title: 'FitTrack Pro',
    description:
      'A comprehensive fitness tracking app with workout plans, nutrition logging, and progress visualization dashboards.',
    image: '/images/project-fitness.jpg',
    tags: ['React Native', 'Firebase', 'Chart.js', 'Node.js'],
    link: '#',
    github: '#',
    accent: '#60a5fa',
  },
  {
    title: 'DataVision Analytics',
    description:
      'Enterprise-grade analytics dashboard with real-time data streams, customizable widgets, and collaborative features.',
    image: '/images/project-analytics.jpg',
    tags: ['Vue.js', 'D3.js', 'GraphQL', 'AWS'],
    link: '#',
    github: '#',
    accent: '#f472b6',
  },
  {
    title: 'SocialSync Manager',
    description:
      'A social media management tool with content scheduling, engagement analytics, and multi-platform publishing.',
    image: '/images/project-social.jpg',
    tags: ['Next.js', 'tRPC', 'Tailwind', 'Redis'],
    link: '#',
    github: '#',
    accent: '#a78bfa',
  },
];

function TiltCard({
  children,
  accent,
  index,
  isInView,
}: {
  children: React.ReactNode;
  accent: string;
  index: number;
  isInView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [shimmerPos, setShimmerPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -12, y: dx * 12 });

    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    setShimmerPos({ x: px, y: py });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: 'easeOut' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.04)`
          : 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)',
        transition: isHovered
          ? 'transform 0.05s ease-out'
          : 'transform 0.45s cubic-bezier(0.23, 1, 0.32, 1)',
        position: 'relative',
        borderRadius: '1rem',
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '1rem',
          padding: '1.5px',
          background: isHovered
            ? `linear-gradient(135deg, ${accent}, transparent, ${accent}88, transparent, ${accent})`
            : 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          transition: 'background 0.4s ease',
          backgroundSize: isHovered ? '300% 300%' : '100% 100%',
          animation: isHovered ? 'borderSpin 2s linear infinite' : 'none',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: '-2px',
          borderRadius: '1.15rem',
          background: `radial-gradient(ellipse at center, ${accent}33, transparent 70%)`,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.4s ease',
          filter: 'blur(12px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '1rem',
          background: isHovered
            ? `radial-gradient(circle at ${shimmerPos.x}% ${shimmerPos.y}%, rgba(255,255,255,0.12) 0%, transparent 60%)`
            : 'transparent',
          transition: 'background 0.05s ease',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      <style>{`
        @keyframes borderSpin {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes tagPop {
          0%   { opacity: 0; transform: translateY(6px) scale(0.85); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      <section id="projects" className="relative z-10 py-24 px-4" ref={ref}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-purple-400 font-medium tracking-wide uppercase text-sm">
              Portfolio
            </span>
            <h2
              className="text-4xl sm:text-5xl font-bold mt-3 text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Projects</span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto">
              A curated selection of projects showcasing my expertise in design and development
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {projects.map((project, i) => (
              <TiltCard key={i} accent={project.accent} index={i} isInView={isInView}>
                <div
                  className="glass rounded-2xl overflow-hidden"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700"
                      style={{
                        transform: hoveredIndex === i ? 'scale(1.12)' : 'scale(1)',
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <motion.div
                      animate={{ opacity: hoveredIndex === i ? 1 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="absolute inset-0 flex items-center justify-center gap-4"
                      style={{
                        background: `linear-gradient(135deg, ${project.accent}22, rgba(0,0,0,0.5))`,
                        backdropFilter: 'blur(4px)',
                      }}
                    >
                      {[
                        { href: project.link, Icon: ExternalLink, label: 'Live' },
                        { href: project.github, Icon: Github, label: 'Code' },
                      ].map(({ href, Icon, label }) => (
                        <motion.a
                          key={label}
                          href={href}
                          animate={{ y: hoveredIndex === i ? 0 : 16, opacity: hoveredIndex === i ? 1 : 0 }}
                          transition={{ duration: 0.3, delay: label === 'Code' ? 0.05 : 0 }}
                          onClick={(e) => e.preventDefault()}
                          className="flex flex-col items-center gap-1 group/btn"
                        >
                          <span className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110">
                            <Icon className="w-5 h-5 text-white" />
                          </span>
                          <span className="text-xs text-white/70">{label}</span>
                        </motion.a>
                      ))}
                    </motion.div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3
                        className="text-lg font-bold text-white transition-all duration-300"
                        style={{ color: hoveredIndex === i ? project.accent : 'white' }}
                      >
                        {project.title}
                      </h3>
                      <motion.div
                        animate={{
                          rotate: hoveredIndex === i ? 45 : 0,
                          color: hoveredIndex === i ? project.accent : '#6b7280',
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </motion.div>
                    </div>

                    <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, ti) => (
                        <span
                          key={ti}
                          className="text-xs px-2.5 py-1 rounded-full border transition-all duration-300"
                          style={{
                            background: hoveredIndex === i ? `${project.accent}18` : 'rgba(255,255,255,0.04)',
                            borderColor: hoveredIndex === i ? `${project.accent}55` : 'rgba(255,255,255,0.06)',
                            color: hoveredIndex === i ? project.accent : '#9ca3af',
                            animation: hoveredIndex === i
                              ? `tagPop 0.3s ease forwards ${ti * 0.06}s`
                              : 'none',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
