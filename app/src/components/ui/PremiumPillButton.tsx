import React, { useState, useRef } from 'react';

interface PremiumPillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const HOVER_COLORS = [
  '#a8ffea', // Mint
  '#b3defc', // Blue
  '#ffb99b', // Peach
];

export function PremiumPillButton({ children, className = '', onMouseEnter, onMouseLeave, ...props }: PremiumPillButtonProps) {
  const [bgColor, setBgColor] = useState(HOVER_COLORS[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [origin, setOrigin] = useState<'left' | 'right'>('left');
  const colorIndexRef = useRef(0);

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextColor = HOVER_COLORS[colorIndexRef.current];
    setBgColor(nextColor);
    colorIndexRef.current = (colorIndexRef.current + 1) % HOVER_COLORS.length;
    
    setOrigin('left');
    setIsHovered(true);
    onMouseEnter?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOrigin('right');
    setIsHovered(false);
    onMouseLeave?.(e);
  };

  return (
    <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        relative overflow-hidden bg-white text-black font-medium 
        rounded-full px-7 py-3 text-sm md:text-base
        shadow-[0_4px_14px_rgba(0,0,0,0.1)]
        transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
        hover:-translate-y-[2px] hover:scale-[1.02] hover:shadow-[0_6px_20px_rgba(255,255,255,0.15)]
        active:scale-[0.98] active:translate-y-0
        flex items-center justify-center
        ${className}
      `}
      {...props}
    >
      <div 
        className="absolute inset-0 z-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
        style={{
          backgroundColor: bgColor,
          transformOrigin: origin,
          transform: isHovered ? 'scaleX(1)' : 'scaleX(0)'
        }}
      />
      <span className="relative z-10 pointer-events-none">{children}</span>
    </button>
  );
}
