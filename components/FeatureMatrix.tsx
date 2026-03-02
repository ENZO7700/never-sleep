import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Minus } from 'lucide-react';

const features = [
  { name: 'Autonomous Bug Fixing', rubberDuck: true, copilot: false, manual: false },
  { name: 'Full Repository Context', rubberDuck: true, copilot: 'Partial', manual: true },
  { name: 'Direct PR Creation', rubberDuck: true, copilot: false, manual: true },
  { name: 'CI/CD Integration', rubberDuck: true, copilot: false, manual: false },
  { name: 'Resolution Time', rubberDuck: 'Minutes', copilot: 'Hours', manual: 'Days' },
  { name: '24/7 Availability', rubberDuck: true, copilot: true, manual: false },
  { name: 'Cost per Fix', rubberDuck: '$', copilot: '$$', manual: '$$$' },
];

export function FeatureMatrix() {
  return (
    <section className="py-32 border-t border-white/[0.06] relative overflow-hidden bg-space/30">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-text-primary mb-6">
            How we compare
          </h2>
          <p className="text-xl text-text-secondary max-w-[60ch] mx-auto">
            See why engineering teams are switching from manual reviews and basic AI assistants to autonomous agents.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card overflow-hidden border border-white/[0.08]"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-white/[0.08] bg-white/[0.02]">
                  <th className="p-6 text-text-secondary font-medium w-1/3">Feature</th>
                  <th className="p-6 text-yellow font-semibold w-1/4 bg-yellow/[0.03] border-x border-yellow/[0.05]">RubberDuck</th>
                  <th className="p-6 text-text-primary font-medium w-1/4">AI Assistants (Copilot)</th>
                  <th className="p-6 text-text-primary font-medium w-1/4">Manual Review</th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, idx) => (
                  <tr key={idx} className="border-b border-white/[0.06] last:border-0 hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 text-text-primary font-medium">{feature.name}</td>
                    <td className="p-6 bg-yellow/[0.03] border-x border-yellow/[0.05]">
                      {typeof feature.rubberDuck === 'boolean' ? (
                        feature.rubberDuck ? <Check className="w-5 h-5 text-yellow" /> : <X className="w-5 h-5 text-red-400" />
                      ) : (
                        <span className="text-yellow font-medium">{feature.rubberDuck}</span>
                      )}
                    </td>
                    <td className="p-6">
                      {typeof feature.copilot === 'boolean' ? (
                        feature.copilot ? <Check className="w-5 h-5 text-text-secondary" /> : <Minus className="w-5 h-5 text-text-muted" />
                      ) : (
                        <span className="text-text-secondary">{feature.copilot}</span>
                      )}
                    </td>
                    <td className="p-6">
                      {typeof feature.manual === 'boolean' ? (
                        feature.manual ? <Check className="w-5 h-5 text-text-secondary" /> : <Minus className="w-5 h-5 text-text-muted" />
                      ) : (
                        <span className="text-text-secondary">{feature.manual}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
