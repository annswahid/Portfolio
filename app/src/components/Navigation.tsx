import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, LogOut, User, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Link, useNavigate } from 'react-router';
import { PremiumPillButton } from '@/components/ui/PremiumPillButton';
import { MenuButton } from '@/components/ui/MenuButton';
import { useBooking } from '@/providers/BookingProvider';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { openBooking } = useBooking();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent pointer-events-none"
      >
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between pointer-events-auto">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#hero');
            }}
            className="text-2xl font-bold text-white tracking-tight flex gap-1 items-center"
          >
            <div className="grid grid-cols-2 gap-[2px] mr-2">
              <div className="w-2.5 h-2.5 rounded-tl-sm bg-white"></div>
              <div className="w-2.5 h-2.5 rounded-tr-full bg-white"></div>
              <div className="w-2.5 h-2.5 rounded-bl-full bg-white"></div>
              <div className="w-2.5 h-2.5 rounded-br-sm bg-white"></div>
            </div>
            Anas
          </a>

          {/* Right Actions */}
          <div className="flex items-center gap-6 md:gap-8">
            <div className="hidden sm:block">
              <PremiumPillButton 
                onClick={openBooking}
                coloredHover
              >
                Let's work
              </PremiumPillButton>
            </div>
            
            <MenuButton 
              isOpen={menuOpen} 
              onClick={() => setMenuOpen(!menuOpen)} 
            />
          </div>
        </div>
      </motion.nav>

      {/* Fullscreen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-[#111] pt-32 px-6 md:px-12 flex flex-col justify-between overflow-hidden"
          >
            <div className="max-w-7xl mx-auto w-full h-full relative">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 h-full pb-12">
                
                {/* Left Col: Nav Links & Drag Card */}
                <div className="md:col-span-4 flex flex-col justify-between h-full">
                  <div className="flex flex-col gap-6 mt-4 md:mt-12">
                    {navLinks.map((link, i) => (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          if (link.href === '#contact') {
                            setMenuOpen(false);
                            openBooking();
                          } else {
                            scrollToSection(link.href);
                          }
                        }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="text-4xl md:text-5xl lg:text-6xl font-normal text-gray-300 hover:text-white transition-colors tracking-tight"
                      >
                        {link.label}
                      </motion.a>
                    ))}
                  </div>

                  {/* Drag Card Placeholder */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="relative w-64 h-36 rounded-2xl overflow-hidden mt-12 bg-gradient-to-tr from-orange-400 to-purple-600 shadow-2xl hidden md:block"
                  >
                    <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
                    <div className="absolute bottom-4 right-4 bg-white text-black font-medium text-sm px-5 py-2.5 rounded-full cursor-grab hover:scale-105 transition-transform shadow-lg">
                      Drag
                    </div>
                  </motion.div>
                </div>

                {/* Middle Col: Socials & Auth */}
                <div className="md:col-span-3 flex flex-col justify-between mt-8 md:mt-12">
                  <div className="flex flex-col gap-3">
                    {['Instagram', 'Dribbble', 'LinkedIn'].map((social, i) => (
                      <motion.a
                        key={social}
                        href="#"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className="text-lg md:text-xl font-normal text-gray-300 hover:text-white transition-colors"
                      >
                        {social}
                      </motion.a>
                    ))}
                    <motion.a
                      href="mailto:hello@portfolio.studio"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                      className="text-lg md:text-xl font-normal text-gray-300 hover:text-white transition-colors mt-4"
                    >
                      hello@portfolio.studio
                    </motion.a>
                  </div>

                  {/* Auth Section inserted tastefully */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-12"
                  >
                    {isAuthenticated ? (
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="text-white text-sm font-medium">{user?.name}</div>
                            <div className="text-gray-400 text-xs">{user?.email}</div>
                          </div>
                        </div>
                        {user?.role === 'admin' && (
                          <button
                            onClick={() => {
                              setMenuOpen(false);
                              navigate('/admin');
                            }}
                            className="text-left text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                          >
                            <LayoutDashboard className="w-4 h-4" /> Admin
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setMenuOpen(false);
                            logout();
                          }}
                          className="text-left text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                        >
                          <LogOut className="w-4 h-4" /> Logout
                        </button>
                      </div>
                    ) : (
                      <Link
                        to="/login"
                        onClick={() => setMenuOpen(false)}
                        className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-lg"
                      >
                        <LogIn className="w-5 h-5" /> Sign In
                      </Link>
                    )}
                  </motion.div>
                </div>

                {/* Right Col: Giant Typography */}
                <div className="md:col-span-5 hidden md:flex items-center justify-end h-full">
                  <motion.h1 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-[12vw] leading-[0.8] font-black text-white tracking-tighter text-right select-none"
                  >
                    PORT<br/>FOLIO
                  </motion.h1>
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
