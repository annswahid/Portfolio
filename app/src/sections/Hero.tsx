import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      const opacity = Math.max(0, 1 - scrollY / 700);
      const translateY = scrollY * 0.4;
      heroRef.current.style.opacity = String(opacity);
      heroRef.current.style.transform = `translateY(${translateY}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div ref={heroRef} className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8"
        >
          <Sparkles className="w-4 h-4 text-white" />
          <span className="text-sm text-gray-300">Available for freelance work</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <span className="text-white">Creative</span>{' '}
          <span className="text-white">Developer</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          I craft immersive digital experiences with cutting-edge web technologies.
          Turning ideas into elegant, performant, and visually stunning applications.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#projects"
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full text-white font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-4 glass rounded-full text-white font-semibold text-lg hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
            Get in Touch
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { value: '5+', label: 'Years Exp.' },
            { value: '50+', label: 'Projects' },
            { value: '30+', label: 'Clients' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-gray-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
