import React from 'react';
import { motion } from 'framer-motion';

interface PageTemplateProps {
  title: string;
  description: string;
}

export function PageTemplate({ title, description }: PageTemplateProps) {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-text-primary mb-6">
            {title}
          </h1>
          <p className="text-xl text-text-secondary max-w-[60ch]">
            {description}
          </p>
        </motion.div>

        <div className="glass-card p-12 min-h-[400px] flex items-center justify-center border-dashed border-2 border-white/[0.1]">
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow mb-4">Coming Soon</div>
            <p className="text-text-secondary">
              We're currently building out this section. Check back shortly!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
