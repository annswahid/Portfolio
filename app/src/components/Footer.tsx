import { Github, Linkedin, Twitter, Instagram, Heart, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';

const socialLinks = [
  { icon: Github, href: '#' },
  { icon: Linkedin, href: '#' },
  { icon: Twitter, href: '#' },
  { icon: Instagram, href: '#' },
];

const footerLinks = [
  {
    title: 'Navigation',
    links: [
      { label: 'Home', href: '#hero' },
      { label: 'About', href: '#about' },
      { label: 'Skills', href: '#skills' },
      { label: 'Projects', href: '#projects' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Contact', href: '#contact' },
      { label: 'GitHub', href: '#' },
      { label: 'LinkedIn', href: '#' },
      { label: 'Twitter', href: '#' },
    ],
  },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/5 pt-16 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="text-2xl font-bold text-white inline-block mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Portfolio<span className="text-white">.</span>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-6">
              Crafting immersive digital experiences with cutting-edge web technologies.
              Let's build something amazing together.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center hover:bg-purple-500/20 transition-colors group"
                  onClick={(e) => e.preventDefault()}
                >
                  <social.icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((group, i) => (
            <div key={i}>
              <h4 className="text-sm font-semibold text-white mb-4">{group.title}</h4>
              <ul className="space-y-2">
                {group.links.map((link, li) => (
                  <li key={li}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        if (link.href.startsWith('#')) {
                          e.preventDefault();
                          const el = document.querySelector(link.href);
                          el?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-gray-400" /> &copy; {new Date().getFullYear()} Portfolio
          </p>
          <button
            onClick={scrollToTop}
            className="w-9 h-9 rounded-lg glass flex items-center justify-center hover:bg-purple-500/20 transition-colors group"
          >
            <ArrowUp className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
          </button>
        </div>
      </div>
    </footer>
  );
}
