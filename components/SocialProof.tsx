import React from 'react';
import { motion } from 'framer-motion';

export function SocialProof() {
  return (
    <section className="py-24 border-t border-white/[0.06] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm text-text-muted uppercase tracking-widest font-semibold mb-8">
            Trusted by engineering teams at
          </p>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Placeholder Logos */}
            <div className="text-2xl font-bold font-mono tracking-tighter">ACME CORP</div>
            <div className="text-2xl font-bold font-sans italic">Globex</div>
            <div className="text-2xl font-bold font-serif tracking-widest">SOYUZ</div>
            <div className="text-2xl font-bold font-mono">Initech</div>
            <div className="text-2xl font-bold tracking-tighter">Massive Dynamic</div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mt-24">
          <motion.div 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card p-8 relative"
          >
            <div className="text-yellow text-4xl font-serif absolute top-4 left-4 opacity-20">"</div>
            <p className="text-lg text-text-primary leading-relaxed mb-6 relative z-10 italic">
              RubberDuck.Space reduced our MTTR by 40% in the first month. It's like having a senior engineer on call 24/7 who never sleeps and always writes tests.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/[0.1] border border-white/[0.2]" />
              <div>
                <div className="font-semibold text-text-primary">Sarah Jenkins</div>
                <div className="text-sm text-text-secondary">VP of Engineering, Acme Corp</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card p-8 relative"
          >
            <div className="text-cyan text-4xl font-serif absolute top-4 left-4 opacity-20">"</div>
            <p className="text-lg text-text-primary leading-relaxed mb-6 relative z-10 italic">
              The audit trails and policy-based guardrails gave our security team the confidence to deploy autonomous agents in production.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/[0.1] border border-white/[0.2]" />
              <div>
                <div className="font-semibold text-text-primary">Marcus Chen</div>
                <div className="text-sm text-text-secondary">CISO, Globex</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
