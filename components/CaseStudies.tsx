import React from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, Clock, Bug, ArrowRight } from 'lucide-react';

const studies = [
  {
    company: "FinTech Global",
    metric: "40%",
    title: "Reduction in critical production bugs",
    description: "By integrating RubberDuck into their CI/CD pipeline, FinTech Global caught and fixed memory leaks before they reached production.",
    icon: <Bug className="w-6 h-6 text-cyan" />,
    timeframe: "over 3 months",
    link: "#"
  },
  {
    company: "HealthSync API",
    metric: "1,200h",
    title: "Developer hours saved on refactoring",
    description: "RubberDuck autonomously migrated legacy React class components to hooks across a 500k LOC codebase.",
    icon: <Clock className="w-6 h-6 text-yellow" />,
    timeframe: "in Q3 2025",
    link: "#"
  },
  {
    company: "E-commerce Plus",
    metric: "85%",
    title: "Faster resolution for security vulnerabilities",
    description: "Automated patching of dependabot alerts and OWASP top 10 vulnerabilities without manual intervention.",
    icon: <TrendingDown className="w-6 h-6 text-green-400" />,
    timeframe: "year-over-year",
    link: "#"
  }
];

export function CaseStudies() {
  return (
    <section className="py-32 border-t border-black/[0.06] dark:border-white/[0.06] relative overflow-hidden bg-space">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-text-primary mb-6">
            Proven at scale
          </h2>
          <p className="text-xl text-text-secondary max-w-[60ch] mx-auto">
            See how engineering teams are using RubberDuck to eliminate technical debt and ship faster.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {studies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-8 flex flex-col group hover:border-cyan/30 transition-colors"
            >
              <div className="mb-6 w-12 h-12 rounded-xl bg-black/[0.05] dark:bg-white/[0.05] flex items-center justify-center">
                {study.icon}
              </div>
              <div className="text-sm font-medium text-text-secondary mb-2 uppercase tracking-wider">
                {study.company}
              </div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-5xl font-bold text-text-primary tracking-tighter">{study.metric}</span>
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-3 leading-tight">
                {study.title}
              </h3>
              <p className="text-text-secondary mb-6 flex-1 text-sm leading-relaxed">
                {study.description}
              </p>
              <div className="text-xs text-text-muted mb-6 font-mono">
                {study.timeframe}
              </div>
              <a 
                href={study.link}
                className="inline-flex items-center gap-2 text-sm font-medium text-cyan hover:text-cyan/80 transition-colors mt-auto"
              >
                Read case study
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
