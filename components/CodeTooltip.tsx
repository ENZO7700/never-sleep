import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CodeTooltipProps {
  children: React.ReactNode;
  code: string;
  language?: string;
}

export function CodeTooltip({ children, code, language = 'json' }: CodeTooltipProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span 
      className="relative inline-block border-b border-dashed border-yellow/50 cursor-help text-text-primary transition-colors hover:text-yellow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-max max-w-xs md:max-w-md bg-[#0d1117] border border-white/[0.1] rounded-lg shadow-2xl overflow-hidden text-left pointer-events-none"
          >
            <div className="bg-white/[0.05] px-3 py-1.5 border-b border-white/[0.1] text-[10px] font-mono text-text-secondary uppercase tracking-wider">
              {language}
            </div>
            <pre className="p-3 text-xs font-mono text-cyan/90 overflow-x-auto m-0 leading-relaxed">
              <code>{code}</code>
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
