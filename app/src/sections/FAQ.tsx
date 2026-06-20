import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

const faqs = [
  {
    question: "What makes working with you different from other web designers and developers?",
    answer: "We offer full-stack web development, UI/UX design, and strategic technical consulting to help bring your vision to life. Our expertise spans from React and Next.js to complex backend architectures."
  },
  {
    question: "What's your design process like?",
    answer: "Our process is iterative and collaborative. We start with discovery and wireframes, move to high-fidelity designs, and finally implementation."
  },
  {
    question: "How long does it typically take to complete a website project?",
    answer: "Project timelines vary depending on complexity. A typical website might take 4-6 weeks, while a complex web application could take 3-6 months. We ensure transparent communication throughout the process."
  },
  {
    question: "Do you offer website maintenance services after the site is launched?",
    answer: "Yes, we offer ongoing support and maintenance packages to ensure your website remains secure, up-to-date, and fully functional."
  },
  {
    question: "How much does a typical project cost?",
    answer: "We offer both project-based pricing and retainer models depending on your needs. Let's hop on a call to discuss your specific requirements and find a structure that works best for your budget and timeline."
  },
  {
    question: "Do you work with agencies, or only direct clients?",
    answer: "We work with both! We frequently partner with creative agencies as an extension of their technical team."
  },
  {
    question: "What is GSAP, and why do you specialize in it?",
    answer: "GSAP is a robust JavaScript animation library. We use it to create complex, high-performance web animations that feel fluid and premium."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [ctaHovered, setCtaHovered] = useState(false);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ctaRef.current) return;
    const rect = ctaRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section id="faq" className="py-24 md:py-32 bg-white text-[#111] relative z-10 border-t border-white/5">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Top Section: Title & FAQ List */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 mb-24 md:mb-32">
          
          {/* Left Column: Title */}
          <div className="lg:w-5/12 shrink-0">
            <h2 className="text-5xl md:text-6xl font-medium tracking-tight sticky top-32 leading-[1.1]">
              Frequently Asked Questions
            </h2>
          </div>

          {/* Right Column: FAQs */}
          <div className="lg:w-7/12 flex flex-col w-full mt-4 lg:mt-0">
            
            {/* FAQ List */}
            <div className="flex flex-col border-t border-[#111]">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                
                return (
                  <div 
                    key={index} 
                    className="border-b border-[#111]/20 overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="w-full flex items-center justify-between py-6 md:py-8 text-left group"
                    >
                      <span className="text-xl md:text-2xl font-normal tracking-tight pr-8">
                        {faq.question}
                      </span>
                      <motion.div
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="flex-shrink-0 text-[#111] transition-colors"
                      >
                        <Plus className="w-6 h-6 stroke-[1.5]" />
                      </motion.div>
                    </button>
                    
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <div className="pb-8 text-[#111]/70 text-base md:text-lg leading-relaxed max-w-3xl pr-8">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA Box (Full Width) */}
        <a 
          ref={ctaRef}
          href="#contact" 
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setCtaHovered(true)}
          onMouseLeave={() => setCtaHovered(false)}
          className="relative overflow-hidden bg-[#1a1a1a] rounded-3xl p-8 md:p-16 lg:p-20 text-white group cursor-none transition-colors duration-500 hover:bg-[#eb5e28] block"
        >
          {/* Custom Cursor Pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: ctaHovered ? 1 : 0, 
              scale: ctaHovered ? 1 : 0,
              x: mousePos.x - 60, // center horizontally
              y: mousePos.y - 24, // center vertically
            }}
            transition={{ 
              type: "spring", 
              damping: 20, 
              stiffness: 400, 
              mass: 0.5,
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 }
            }}
            className="absolute top-0 left-0 pointer-events-none bg-white text-black font-medium text-base px-6 py-3 rounded-full shadow-2xl whitespace-nowrap z-50 flex items-center justify-center"
          >
            Let's chat
          </motion.div>

          <div className="relative z-10 pointer-events-none">
            <h3 className="text-2xl md:text-3xl font-medium mb-3">Have more questions?</h3>
            <p className="text-lg md:text-xl text-white/80 mb-20 md:mb-32 max-w-2xl leading-relaxed">
              Book a time for a short call to discuss the possibilities of working together.
            </p>
            
            <div className="flex items-center">
              {/* Sliding Arrow */}
              <motion.div
                initial={{ width: 0, opacity: 0, paddingRight: 0 }}
                animate={{ 
                  width: ctaHovered ? "auto" : 0, 
                  opacity: ctaHovered ? 1 : 0,
                  paddingRight: ctaHovered ? 24 : 0
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden flex-shrink-0"
              >
                <svg className="w-10 h-10 md:w-14 md:h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.div>
              
              <motion.span 
                animate={{ x: ctaHovered ? 0 : -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight"
              >
                Book a call
              </motion.span>
            </div>
          </div>
        </a>

      </div>
    </section>
  );
}
