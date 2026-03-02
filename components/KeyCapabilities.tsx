import React from 'react';
import { motion } from 'framer-motion';
import { Bug, GitCommit, ShieldAlert, Activity, GitPullRequest, Eye } from 'lucide-react';

const capabilities = [
  {
    icon: <Bug className="w-5 h-5 text-yellow" />,
    title: "Root-cause analysis",
    description: "Deep semantic understanding of your codebase to identify the source of the issue, not just the symptom."
  },
  {
    icon: <GitCommit className="w-5 h-5 text-cyan" />,
    title: "Autonomous patching",
    description: "Generates code changes that adhere to your project's style guidelines and architectural patterns."
  },
  {
    icon: <ShieldAlert className="w-5 h-5 text-yellow" />,
    title: "Test-aware changes",
    description: "Runs your test suite locally before proposing a fix. Iterates if tests fail."
  },
  {
    icon: <Activity className="w-5 h-5 text-cyan" />,
    title: "Guardrails & policies",
    description: "Define strict policies on what the agent can modify. Prevent changes to critical infrastructure code."
  },
  {
    icon: <GitPullRequest className="w-5 h-5 text-yellow" />,
    title: "PR-ready output",
    description: "Creates detailed pull requests with explanations, test results, and a clear summary of the fix."
  },
  {
    icon: <Eye className="w-5 h-5 text-cyan" />,
    title: "Observability",
    description: "Full audit trail of every action the agent takes, including reasoning and discarded approaches."
  }
];

export function KeyCapabilities() {
  return (
    <section id="features" className="py-32 border-t border-black/[0.06] dark:border-white/[0.06] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-text-primary mb-6">
            Key capabilities
          </h2>
          <p className="text-xl text-text-secondary max-w-[60ch]">
            Built for complex codebases and strict engineering standards.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilities.map((cap, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-8 hover:border-cyan/30 hover:shadow-[0_0_15px_rgba(0,245,255,0.1)] transition-all duration-300 group"
            >
              <div className="mb-6 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] inline-block group-hover:bg-white/[0.06] transition-colors">
                {cap.icon}
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3 tracking-tight">
                {cap.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {cap.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
