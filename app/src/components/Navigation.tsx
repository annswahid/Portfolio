import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogIn, LogOut, User, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Link, useNavigate } from 'react-router';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setMobileOpen(false);
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-black/50 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#hero');
            }}
            className="text-xl font-bold text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Portfolio<span className="text-white">.</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {user?.role === 'admin' && (
                  <button
                    onClick={() => navigate('/admin')}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Admin
                  </button>
                )}
                <div className="flex items-center gap-2 px-4 py-2 glass rounded-lg">
                  <User className="w-4 h-4 text-white" />
                  <span className="text-sm text-gray-300">{user?.name || 'User'}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/90 backdrop-blur-xl pt-20 px-6 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="py-3 text-lg text-gray-300 hover:text-white border-b border-white/5"
                >
                  {link.label}
                </a>
              ))}

              <div className="mt-6 pt-6 border-t border-white/10">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    {user?.role === 'admin' && (
                      <button
                        onClick={() => {
                          setMobileOpen(false);
                          navigate('/admin');
                        }}
                        className="flex items-center gap-2 py-3 text-gray-300 hover:text-white w-full"
                      >
                        <LayoutDashboard className="w-5 h-5" />
                        Admin Dashboard
                      </button>
                    )}
                    <div className="flex items-center gap-3 py-3">
                      <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-medium">{user?.name}</div>
                        <div className="text-sm text-gray-500">{user?.email}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        logout();
                      }}
                      className="flex items-center gap-2 py-3 text-white w-full"
                    >
                      <LogOut className="w-5 h-5" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 py-3 bg-purple-600 text-white rounded-lg"
                  >
                    <LogIn className="w-5 h-5" />
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
