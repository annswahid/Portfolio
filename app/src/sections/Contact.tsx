import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const socialLinks = [
  { icon: Github, label: 'GitHub', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
];

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'hello@creative.dev' },
  { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
  { icon: MapPin, label: 'Location', value: 'San Francisco, CA' },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <section id="contact" className="relative z-10 py-24 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gray-400 font-medium tracking-wide uppercase text-sm">
            Contact
          </span>
          <h2
            className="text-4xl sm:text-5xl font-bold mt-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Let's <span className="text-white">Collaborate</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Have a project in mind? I'd love to hear about it. Let's create something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass rounded-2xl p-6 space-y-5">
              {contactInfo.map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase">{item.label}</div>
                    <div className="text-sm text-gray-200">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-gray-300 mb-4">Follow Me</h3>
              <div className="flex gap-3">
                {socialLinks.map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:bg-purple-500/20 transition-colors group"
                    onClick={(e) => e.preventDefault()}
                  >
                    <social.icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 sm:p-8">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500"
                    required
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm text-gray-400 mb-2">Message</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project..."
                  rows={5}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500 resize-none"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={submitted}
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold py-6 rounded-xl transition-all duration-300"
              >
                {submitted ? (
                  <span className="flex items-center gap-2">
                    Message Sent!
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Send Message
                  </span>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
