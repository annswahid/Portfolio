import { ArrowUp, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useBooking } from '@/providers/BookingProvider';
import { PremiumPillButton } from '@/components/ui/PremiumPillButton';
import { useState, useEffect } from 'react';

const socialLinks = [
  { label: 'GitHub', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Twitter / X', href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'Dribbble', href: '#' },
];

export default function Footer() {
  const { openBooking } = useBooking();
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative z-10 border-t border-white/10 bg-[#08080a] pt-20 pb-12 px-6 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-purple-600/10 via-pink-600/10 to-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">

        {/* Top Status Badge */}
        {/* <div className="flex items-center justify-between gap-4 mb-12 border-b border-white/10 pb-6 flex-wrap">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-white/10 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-widest text-white/90 font-sans">
              Available for freelance & full-time work
            </span>
          </div>
          
          <div className="flex items-center gap-6 text-xs text-neutral-400 font-medium font-sans">
            <span className="inline-flex items-center gap-1.5 font-mono">
              <Clock className="w-3.5 h-3.5 text-purple-400" /> {time || '12:00'} LOCAL
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Global Remote
            </span>
          </div>
        </div> */}

        {/* Giant Jaw-Dropping CTA Heading */}
        <div className="mb-14 select-none">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2
              onClick={openBooking}
              className="text-[11vw] font-black tracking-tighter uppercase leading-[0.85] text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:via-pink-400 hover:to-cyan-400 transition-all duration-500 cursor-pointer"
            >
              LET'S WORK <br /> TOGETHER
            </h2>
          </motion.div>
        </div>

        {/* Interactive CTA Banner Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rounded-3xl glass p-8 sm:p-12 border border-white/15 mb-16 relative overflow-hidden group shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 bg-gradient-to-r from-white/[0.04] to-white/[0.01]"
        >
          <div className="space-y-3 max-w-xl text-center lg:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-sans">
              Have a visionary project in mind?
            </h3>
            <p className="text-neutral-400 font-light text-base sm:text-lg leading-relaxed font-sans">
              Whether you need a complex web platform engineered from scratch, high-converting UI/UX design, or technical consultation, let's build something extraordinary.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-4">
            <PremiumPillButton
              onClick={openBooking}
              coloredHover
              className="text-lg px-10 py-5 shadow-[0_0_40px_rgba(139,92,246,0.25)] hover:scale-105"
            >
              Let's work
            </PremiumPillButton>
          </div>
        </motion.div>

        {/* Social Navigation & Copyright Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Social Links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-6 sm:gap-8">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.href}
                onClick={(e) => e.preventDefault()}
                className="text-sm font-medium text-neutral-400 hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-purple-400 hover:after:w-full after:transition-all after:duration-300 font-sans"
              >
                {social.label}
              </a>
            ))}
          </div>

          {/* Copyright & Back to Top */}
          <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
            <p className="text-xs text-neutral-500 font-sans">
              &copy; {new Date().getFullYear()} Muhammad Anas. All rights reserved.
            </p>

            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
              title="Scroll to top"
            >
              <ArrowUp className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}
