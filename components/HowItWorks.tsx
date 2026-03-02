import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: "01",
    title: "Connect repo",
    description: "Link GitHub or GitLab. We scan your codebase and test suite."
  },
  {
    number: "02",
    title: "Diagnose root cause",
    description: "When an issue is reported, the agent analyzes stack traces, git blame, and context."
  },
  {
    number: "03",
    title: "Patch → test → PR",
    description: "The agent generates a fix, runs your tests, and opens a reviewable Pull Request."
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 bg-space/50 border-t border-white/[0.06] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-text-primary mb-6">
            How it works
          </h2>
          <p className="text-xl text-text-secondary max-w-[60ch]">
            A surgical workflow designed for enterprise engineering teams.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[40px] left-0 right-0 h-[1px] bg-white/[0.06] -z-10" />

          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="w-20 h-20 rounded-full glass-card flex items-center justify-center text-2xl font-bold text-yellow mb-8 border-yellow/20 bg-yellow/5">
                {step.number}
              </div>
              <h3 className="text-2xl font-semibold text-text-primary mb-4 tracking-tight">
                {step.title}
              </h3>
              <p className="text-text-secondary leading-relaxed max-w-[40ch]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
