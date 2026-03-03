import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past the hero section (approx 600px)
      setIsVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-40 bg-space/90 backdrop-blur-md border-b border-black/[0.06] dark:border-white/[0.06] py-3 px-6 flex justify-between items-center shadow-lg"
        >
          <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
            <div className="flex items-center gap-3 font-bold text-text-primary group">
              <div className="relative w-6 h-6 overflow-hidden rounded bg-yellow/10 flex items-center justify-center border border-yellow/20 group-hover:border-yellow/50 transition-colors">
                <img 
                  src="/logo.png" 
                  alt="Logo" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      const icon = document.createElement('div');
                      icon.innerHTML = '🦆';
                      icon.className = 'text-sm';
                      parent.appendChild(icon);
                    }
                  }}
                />
              </div>
              <span className="hidden sm:inline">RubberDuck<span className="text-yellow">.</span>Space</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-sm text-text-secondary hidden md:block font-medium">
                Ready to eliminate technical debt?
              </span>
              <button className="bg-yellow text-white dark:text-space font-semibold px-5 py-2 rounded-lg text-sm transition-all hover:scale-[1.03] active:scale-[0.99] glow-yellow">
                Start fixing code
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
