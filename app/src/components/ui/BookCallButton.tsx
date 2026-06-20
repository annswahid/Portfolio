import { useState, useRef, MouseEvent } from 'react';
import { motion } from 'framer-motion';

export function BookCallButton() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    
    // Calculate distance from center
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);

    setPosition({ x: x * 0.2, y: y * 0.2 }); // dampening factor
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onClick={() => {
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }}
      className="relative overflow-hidden rounded-full border border-white/20 bg-transparent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:border-white group"
    >
      <span className="relative z-10 flex items-center gap-2 mix-blend-difference text-white">
        Book a call
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </span>
      <div className="absolute inset-0 z-0 scale-0 rounded-full bg-white transition-transform duration-500 ease-out group-hover:scale-150" />
    </motion.button>
  );
}
