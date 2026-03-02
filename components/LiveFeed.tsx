import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitPullRequest, CheckCircle2, Clock, Zap } from 'lucide-react';

const feedItems = [
  {
    id: 1,
    action: 'Merged PR',
    description: 'Fixed memory leak in auth.ts',
    saved: '4 hours',
    icon: <GitPullRequest className="w-4 h-4 text-cyan" />,
    time: 'Just now'
  },
  {
    id: 2,
    action: 'Generated Patch',
    description: 'Resolved null pointer exception in user service',
    saved: '2.5 hours',
    icon: <Zap className="w-4 h-4 text-yellow" />,
    time: '2 mins ago'
  },
  {
    id: 3,
    action: 'Tests Passed',
    description: 'Verified fix for race condition in payment gateway',
    saved: '6 hours',
    icon: <CheckCircle2 className="w-4 h-4 text-green-400" />,
    time: '5 mins ago'
  },
  {
    id: 4,
    action: 'Root Cause Found',
    description: 'Identified slow query in dashboard load',
    saved: '1.5 hours',
    icon: <Clock className="w-4 h-4 text-blue-400" />,
    time: '12 mins ago'
  }
];

export function LiveFeed() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false); // Fade out
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % feedItems.length);
        setIsVisible(true); // Fade in new item
      }, 500); // Wait for fade out
    }, 8000); // Change every 8 seconds

    return () => clearInterval(interval);
  }, []);

  const currentItem = feedItems[currentIndex];

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none hidden md:block">
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="glass-card p-4 rounded-xl shadow-2xl border border-white/[0.08] w-80 pointer-events-auto cursor-pointer hover:border-cyan/30 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="mt-1 p-2 rounded-lg bg-white/[0.05]">
                {currentItem.icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-semibold text-text-primary">{currentItem.action}</span>
                  <span className="text-[10px] text-text-muted">{currentItem.time}</span>
                </div>
                <p className="text-xs text-text-secondary leading-snug mb-2">
                  {currentItem.description}
                </p>
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-yellow/10 text-yellow text-[10px] font-medium">
                  <span>Saved {currentItem.saved}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
