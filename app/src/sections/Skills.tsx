import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Languages,
  Server,
  Gauge,
  Radio,
  Database,
  Brain,
  Cloud,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
//  DATA
/* ------------------------------------------------------------------ */

const stackCategories = [
  {
    title: 'Languages',
    icon: Languages,
    items: [
      { name: 'JavaScript', note: 'ES6+' },
      { name: 'TypeScript', note: 'strict mode' },
      { name: 'Python', note: 'async · concurrency' },
      { name: 'SQL', note: 'PostgreSQL, MySQL' },
      { name: 'Bash', note: '' },
      { name: 'HTML / CSS', note: '' },
    ],
  },
  {
    title: 'Frontend',
    icon: Server,
    items: [
      { name: 'React', note: 'Hooks, Context' },
      { name: 'Next.js', note: 'App Router, SSR' },
      { name: 'Tailwind CSS', note: 'utility-first' },
      { name: 'Three.js / WebGL', note: '3D · shaders' },
      { name: 'Framer Motion', note: 'animations' },
      { name: 'Shadcn / Radix', note: 'accessible UI' },
    ],
  },
  {
    title: 'Backend & APIs',
    icon: Database,
    items: [
      { name: 'Node.js / Express', note: '' },
      { name: 'tRPC / GraphQL', note: 'type-safe APIs' },
      { name: 'REST / OpenAPI', note: '' },
      { name: 'WebSocket / SSE', note: 'real-time' },
      { name: 'FastAPI', note: 'Python async' },
      { name: 'Microservices', note: 'event-driven' },
    ],
  },
  {
    title: 'Data & Infra',
    icon: Gauge,
    items: [
      { name: 'PostgreSQL', note: 'relational' },
      { name: 'Redis', note: 'caching' },
      { name: 'Prisma / Drizzle', note: 'ORM' },
      { name: 'Docker', note: 'containerization' },
      { name: 'Kubernetes', note: 'orchestration' },
      { name: 'Kafka', note: 'event streaming' },
    ],
  },
  {
    title: 'Cloud & DevOps',
    icon: Cloud,
    items: [
      { name: 'AWS', note: 'EC2, S3, Lambda' },
      { name: 'GCP', note: 'Cloud Run, GKE' },
      { name: 'CI / CD', note: 'GitHub Actions' },
      { name: 'Terraform', note: 'IaC' },
      { name: 'Git / GitHub', note: '' },
      { name: 'Linux / Nginx', note: 'server config' },
    ],
  },
  {
    title: 'AI / ML',
    icon: Brain,
    items: [
      { name: 'LLM Integration', note: 'OpenAI, Claude' },
      { name: 'RAG', note: 'retrieval-augmented' },
      { name: 'LangChain', note: 'agentic workflows' },
      { name: 'Vector Search', note: 'Pinecone, Chroma' },
      { name: 'Hugging Face', note: 'transformers' },
      { name: 'Fine-tuning', note: 'LoRA / QLoRA' },
    ],
  },
  {
    title: 'Design & Tools',
    icon: Radio,
    items: [
      { name: 'Figma', note: 'prototyping' },
      { name: 'Adobe Creative Suite', note: '' },
      { name: 'Postman / Insomnia', note: 'API testing' },
      { name: 'Notion / Obsidian', note: 'docs' },
      { name: 'Jira / Linear', note: 'project mgmt' },
      { name: 'Vercel / Netlify', note: 'deployment' },
    ],
  },
];

/* ------------------------------------------------------------------ */
//  COMPONENT
/* ------------------------------------------------------------------ */

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="relative z-10 py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <span className="text-white/25 font-medium tracking-[0.25em] uppercase text-[10px] mb-6 block">
            Stack
          </span>
          <h2 className="text-4xl sm:text-5xl font-light tracking-tighter text-white leading-[1.1] mb-4">
            What I run in production.
          </h2>
          <p className="text-sm text-white/30 font-light max-w-lg leading-relaxed">
            Profiled under load. Not just imported.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {stackCategories.map((cat, ci) => (
            <motion.div
              key={ci}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: ci * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Category Title */}
              <div className="flex items-center gap-2.5 mb-5">
                <cat.icon className="w-4 h-4 text-white/40" strokeWidth={1.5} />
                <h3 className="text-sm font-medium text-white/80 tracking-tight">
                  {cat.title}
                </h3>
              </div>

              {/* Skill Items */}
              <ul className="space-y-2.5">
                {cat.items.map((item, si) => (
                  <motion.li
                    key={si}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      delay: 0.3 + ci * 0.05 + si * 0.03,
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group flex items-baseline gap-1.5 cursor-default"
                  >
                    <span className="text-[13px] text-white/50 font-light tracking-wide group-hover:text-white/80 transition-colors duration-300">
                      {item.name}
                    </span>
                    {item.note && (
                      <span className="text-[11px] text-white/20 font-light">
                        {item.note}
                      </span>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
