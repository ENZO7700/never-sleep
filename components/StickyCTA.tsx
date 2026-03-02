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
            <div className="flex items-center gap-2 font-bold text-text-primary">
              <Terminal className="w-5 h-5 text-yellow" />
              <span className="hidden sm:inline">RubberDuck.Space</span>
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
