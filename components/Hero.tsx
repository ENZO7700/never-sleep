import React from 'react';
import { motion } from 'framer-motion';
import { TerminalDemo } from './TerminalDemo';

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Copy */}
        <div className="lg:col-span-6 flex flex-col items-start z-10">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-sm text-text-secondary font-mono">
              <span className="text-yellow opacity-80">/* The best code is code that fixes itself */</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.1] mb-6">
              <span className="text-gradient-yellow">The AI engineer</span><br />
              that never sleeps.
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-xl text-text-secondary mb-2 max-w-[60ch]">
              Stop drowning in technical debt. RubberDuck autonomously finds root causes, writes patches, runs tests, and opens PRs.
            </p>
            <p className="text-lg text-text-muted mb-10 max-w-[60ch]">
              You just review and merge.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <button 
              data-testid="hero-cta-start"
              className="bg-yellow text-space font-semibold px-8 py-4 rounded-xl text-base transition-all hover:scale-[1.03] active:scale-[0.99] glow-yellow flex items-center justify-center gap-2"
            >
              Start fixing code
            </button>
            <button 
              data-testid="hero-cta-docs"
              className="glass-card px-8 py-4 rounded-xl text-base font-medium text-text-primary transition-all hover:border-cyan/50 hover:shadow-[0_1px_0_0_#00F5FF_inset] flex items-center justify-center"
            >
              View Documentation
            </button>
          </motion.div>
        </div>

        {/* Right Column: Visuals */}
        <div className="lg:col-span-6 relative z-10 h-[500px] w-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-full max-w-lg h-full relative"
          >
            {/* Main Terminal */}
            <div className="absolute inset-0 z-20">
              <TerminalDemo />
            </div>

            {/* Side Glass Card (Metrics) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute -right-12 top-12 z-30 w-64 glass-card p-5 hidden md:block"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
                <span className="text-xs font-medium text-text-primary uppercase tracking-wider">Repo Connected</span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="text-2xl font-bold text-text-primary">2</div>
                  <div className="text-xs text-text-secondary">Issues fixed today</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow">31%</div>
                  <div className="text-xs text-text-secondary">MTTR reduction</div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06]">
                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-2">Audit Trail</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-text-secondary">10:42 AM</span>
                    <span className="text-cyan">PR Merged</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-text-secondary">09:15 AM</span>
                    <span className="text-yellow">Patch Generated</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
