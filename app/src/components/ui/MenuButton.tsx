import { useState } from 'react';

export function MenuButton({ onClick, isOpen }: { onClick: () => void; isOpen?: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const active = isHovered || isOpen;

  return (
    <button 
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex items-center gap-3 group focus:outline-none transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-[2px] hover:scale-[1.02]"
    >
      <span className="text-white font-medium text-base md:text-lg transition-colors group-hover:text-gray-300">
        {isOpen ? 'Close' : 'Menu'}
      </span>
      {/* Fixed-size container prevents layout shifts when the dot expands */}
      <div className="relative w-14 h-14 flex items-center justify-center">
        <div 
          className={`
            absolute rounded-full bg-white flex items-center justify-center 
            transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
            ${active ? 'w-14 h-14 shadow-[0_8px_20px_rgba(255,255,255,0.15)]' : 'w-3 h-3 shadow-none'}
          `}
        >
          <div 
            className={`
              relative w-5 h-5 flex flex-col justify-center items-center 
              transition-opacity duration-300 ${active ? 'opacity-100 delay-100' : 'opacity-0 delay-0'}
            `}
          >
            <span 
              className={`absolute bg-[#111] w-5 h-[2px] transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-full ${isOpen ? 'rotate-45' : isHovered ? '-translate-y-[5px]' : 'translate-y-0'}`} 
            />
            <span 
              className={`absolute bg-[#111] w-5 h-[2px] transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-full ${isOpen ? '-rotate-45' : isHovered ? 'translate-y-[5px]' : 'translate-y-0'}`} 
            />
          </div>
        </div>
      </div>
    </button>
  );
}
