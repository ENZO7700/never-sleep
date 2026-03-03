import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mascot } from './Mascot';
import { X } from 'lucide-react';

const messages = [
  "Need a hand with that bug?",
  "I've analyzed 42 repos today!",
  "MTTR is looking good!",
  "Ready to fix some code?",
  "RubberDuck never sleeps.",
  "Check out our new docs!",
];

export function FloatingMascot() {
  const [isVisible, setIsVisible] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setMessageIndex((prev) => (prev + 1) % messages.length);
        setShowBubble(true);
        setTimeout(() => setShowBubble(false), 5000);
      }, 15000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-[60] flex flex-col items-end">
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            className="mb-4 bg-white dark:bg-white/10 backdrop-blur-xl border border-black/10 dark:border-white/20 p-4 rounded-2xl rounded-br-none shadow-2xl max-w-[200px]"
          >
            <p className="text-sm font-medium text-text-primary leading-tight">
              {messages[messageIndex]}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        drag
        dragConstraints={{ left: -100, right: 0, top: -100, bottom: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="cursor-grab active:cursor-grabbing"
      >
        <Mascot size={80} />
      </motion.div>
      
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute -top-2 -right-2 bg-black/50 hover:bg-black/80 text-white rounded-full p-1 transition-colors"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
}
