import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { PremiumPillButton } from '@/components/ui/PremiumPillButton';

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

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const displayedProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <>
      <section id="projects" className="relative z-10 py-24 md:py-32 px-6" ref={ref}>
        <div className="max-w-6xl mx-auto">
          {/* Giant Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full select-none pointer-events-none overflow-hidden mb-12 sm:mb-16"
          >
            <h2 className="text-[12vw] font-black tracking-tighter text-white/10 uppercase leading-none">
              PROJECTS
            </h2>
          </motion.div>

          {/* Section Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 md:mb-28">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6"
            >
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-sans leading-[1.15]">
                Featured <br className="hidden sm:block" /> Digital Works
              </h3>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 flex items-end"
            >
              <p className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed max-w-xl font-sans">
                A curated selection of flagship projects showcasing my expertise in full-stack architecture, AI integration, and interactive 3D design.
              </p>
            </motion.div>
          </div>

          {/* Vertical alternating list of browser mockups */}
          <div className="space-y-24 md:space-y-36">
            {displayedProjects.map((project, i) => {
              const isEven = i % 2 === 0;
              const isHovered = hoveredIndex === i;
              
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center ${
                    isEven ? '' : 'lg:flex-row-reverse'
                  }`}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Left/Right Column: Browser Mockup Card */}
                  <div className="w-full lg:w-7/12">
                    <div 
                      className="relative group/mockup rounded-2xl overflow-hidden border border-white/10 bg-[#161616] shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:border-white/20"
                      style={{
                        boxShadow: isHovered 
                          ? `0 25px 50px -12px ${project.accent}22` 
                          : '0 25px 50px -12px rgba(0,0,0,0.5)'
                      }}
                    >
                      {/* Browser Header Bar */}
                      <div className="flex items-center justify-between px-4 py-3 bg-neutral-100 border-b border-neutral-200">
                        {/* Dots */}
                        <div className="flex gap-1.5 shrink-0">
                          <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                          <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                          <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                        </div>
                        {/* Address Bar */}
                        <div className="w-3/5 py-1 px-3 bg-white border border-neutral-200 rounded-md text-[10px] text-neutral-400 text-center font-mono truncate select-none transition-colors group-hover/mockup:text-neutral-500">
                          https://{project.title.toLowerCase().replace(/\s+/g, '')}.dev
                        </div>
                        {/* Empty Space for alignment */}
                        <div className="w-10" />
                      </div>

                      {/* Image container inside the browser window */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-[#121212]">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/mockup:scale-105"
                          onError={(e) => {
                            // If mockup image fails, load a solid colored gradient block
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Left/Right Column: Project Details */}
                  <div className="w-full lg:w-5/12 space-y-5">
                    <span 
                      className="text-xs font-bold uppercase tracking-widest block transition-colors duration-300"
                      style={{ color: isHovered ? project.accent : '#9ca3af' }}
                    >
                      Project 0{i + 1}
                    </span>
                    <h3 className="text-3xl font-extrabold tracking-tight text-white font-sans">
                      {project.title}
                    </h3>
                    <p className="text-base text-white/60 font-light leading-relaxed font-sans">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags.map((tag, ti) => (
                        <span
                          key={ti}
                          className="text-xs px-3 py-1 rounded-full border transition-all duration-300"
                          style={{
                            background: isHovered ? `${project.accent}15` : 'rgba(255,255,255,0.04)',
                            borderColor: isHovered ? `${project.accent}33` : 'rgba(255,255,255,0.08)',
                            color: isHovered ? project.accent : '#9ca3af',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                      <a
                        href={project.link}
                        onClick={(e) => e.preventDefault()}
                        className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-white/90 transition-all flex items-center justify-center gap-2 group/btn shadow-md hover:scale-105 w-full sm:w-auto"
                      >
                        Live Preview
                        <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
                      </a>
                      <a
                        href={project.github}
                        onClick={(e) => e.preventDefault()}
                        className="px-6 py-2.5 rounded-full glass text-white font-semibold text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-2 group/btn hover:scale-105 w-full sm:w-auto"
                      >
                        Code
                        <Github className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Show All Projects Toggle Button */}
          <div className="flex justify-center mt-24 md:mt-32">
            <PremiumPillButton onClick={() => setShowAll(!showAll)}>
              {showAll ? 'Show Less' : 'Show All Projects'}
            </PremiumPillButton>
          </div>
        </div>
      </section>
    </>
  );
}
