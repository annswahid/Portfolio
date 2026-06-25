import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const services = [
  {
    title: 'Website Design',
    description:
      'Crafting beautiful, high-converting websites tailored to your brand. We focus on modern user interfaces, seamless interactions, and clear information architecture to deliver premium visual experiences.',
    image: '/images/service_design.png',
    tags: ['UI/UX Design', 'Wireframing', 'Prototyping', 'Design System'],
  },
  {
    title: 'Web Development',
    description:
      'Building fast, secure, and scalable web applications using cutting-edge technologies. From custom databases to complex frontend logic, we code for maximum performance and fluid animations.',
    image: '/images/service_dev.png',
    tags: ['Frontend Dev', 'Backend API', 'Performance Opt', 'Headless CMS'],
  },
  {
    title: '3D Animation',
    description:
      'Bringing your products and concepts to life with stunning 3D visuals and interactive animations. We create immersive web GL environments and motion graphics that captivate your audience.',
    image: '/images/service_3d.png',
    tags: ['Three.js / WebGL', 'Motion Design', '3D Modeling', 'Custom Shaders'],
  },
  {
    title: 'E-commerce',
    description:
      'Designing and developing robust online stores that drive sales and streamline operations. We integrate secure payment gateways, automated inventory sync, and seamless custom checkouts.',
    image: '/images/service_ecommerce.png',
    tags: ['Stripe Integration', 'Shopify Custom', 'Cart Optimization', 'Analytics Setup'],
  },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section 
      id="services" 
      className="relative z-10 py-24 md:py-32 px-6 bg-[#f4f4f0] text-black overflow-hidden" 
      ref={ref}
    >
      <div className="max-w-6xl mx-auto">
        {/* Giant Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full select-none pointer-events-none overflow-hidden mb-12 sm:mb-16"
        >
          <h2 className="text-[12vw] font-black tracking-tighter text-black uppercase leading-none">
            SERVICES
          </h2>
        </motion.div>

        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 md:mb-28">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-black font-sans leading-[1.15]">
              Comprehensive <br className="hidden sm:block" /> Digital Solutions
            </h3>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex items-end"
          >
            <p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed max-w-xl font-sans">
              We blend strategy, design, and development to create custom digital experiences that help your brand stand out and scale dynamically.
            </p>
          </motion.div>
        </div>

        {/* Services Cards List */}
        <div className="space-y-8">
          {services.map((service, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-3xl overflow-hidden bg-white border border-neutral-200/60 shadow-[0_4px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 flex flex-col lg:flex-row"
              >
                {/* Left side: Text content grid */}
                <div className="w-full lg:w-8/12 p-6 sm:p-10 md:p-14 flex flex-col justify-between">
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-start">
                    {/* Title & Description */}
                    <div className="sm:col-span-8 space-y-4">
                      <h4 className="text-2xl sm:text-3xl font-extrabold text-black font-sans tracking-tight">
                        {service.title}
                      </h4>
                      <p className="text-sm sm:text-base text-neutral-500 font-light leading-relaxed font-sans">
                        {service.description}
                      </p>
                    </div>

                    {/* Tag List */}
                    <div className="sm:col-span-4 pt-1">
                      <ul className="space-y-3">
                        {service.tags.map((tag, ti) => (
                          <li 
                            key={ti}
                            className="text-xs sm:text-sm text-neutral-600 font-medium font-sans border-b border-neutral-100 pb-2 hover:text-black transition-colors"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Right side: Abstract Image crop */}
                <div className="w-full lg:w-4/12 relative aspect-[16/10] lg:aspect-auto min-h-[250px] lg:min-h-full overflow-hidden bg-[#fafafa]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle lighting overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
