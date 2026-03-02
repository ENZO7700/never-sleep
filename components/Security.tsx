import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Server, FileText, Database, Cloud } from 'lucide-react';

const securityFeatures = [
  {
    icon: <FileText className="w-5 h-5 text-yellow" />,
    title: "SBOM / Provenance",
    description: "Every patch includes a Software Bill of Materials and provenance data for audit readiness."
  },
  {
    icon: <Lock className="w-5 h-5 text-cyan" />,
    title: "Least-privilege tokens",
    description: "The agent operates with scoped, short-lived tokens. It only accesses what it needs to fix the issue."
  },
  {
    icon: <Server className="w-5 h-5 text-yellow" />,
    title: "Optional self-host / VPC",
    description: "Deploy RubberDuck.Space within your own Virtual Private Cloud for maximum data isolation."
  },
  {
    icon: <Shield className="w-5 h-5 text-cyan" />,
    title: "Policy-based privacy",
    description: "Your code is not used to train public models. Data retention controls are configurable per repository."
  }
];

export function Security() {
  return (
    <section id="security" className="py-32 bg-space/50 border-t border-white/[0.06] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-text-primary mb-6">
                Enterprise-grade security architecture
              </h2>
              <p className="text-xl text-text-secondary">
                Your code never leaves your control. Deploy in your VPC or use our SOC2 compliant cloud.
              </p>
            </motion.div>

            <div className="space-y-8">
              {securityFeatures.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-6 items-start"
                >
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-text-primary mb-2 tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed max-w-[40ch]">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Animated Architecture Diagram */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="glass-card p-8 aspect-square flex flex-col justify-between relative overflow-hidden">
              {/* Animated background grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]" />
              
              {/* Top Node: User VPC */}
              <div className="relative z-10 bg-[#161b22] border border-white/[0.1] rounded-xl p-6 shadow-2xl w-3/4 mx-auto">
                <div className="flex items-center gap-3 mb-4">
                  <Database className="w-6 h-6 text-text-primary" />
                  <span className="font-semibold text-text-primary">Your Environment (VPC)</span>
                </div>
                <div className="flex gap-2">
                  <div className="bg-white/[0.05] px-3 py-1 rounded text-xs text-text-secondary">Source Code</div>
                  <div className="bg-white/[0.05] px-3 py-1 rounded text-xs text-text-secondary">Secrets</div>
                </div>
              </div>

              {/* Middle: Encrypted Tunnel */}
              <div className="relative z-10 flex flex-col items-center justify-center py-8">
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-12 bg-gradient-to-b from-white/[0.2] to-cyan/50 relative">
                    <motion.div 
                      animate={{ y: [0, 48] }} 
                      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan shadow-[0_0_10px_#00F5FF]"
                    />
                  </div>
                  <div className="bg-cyan/10 border border-cyan/30 px-4 py-2 rounded-full flex items-center gap-2 my-2 backdrop-blur-md">
                    <Lock className="w-4 h-4 text-cyan" />
                    <span className="text-xs font-medium text-cyan">TLS 1.3 Encrypted Tunnel</span>
                  </div>
                  <div className="w-0.5 h-12 bg-gradient-to-b from-cyan/50 to-yellow/50 relative">
                    <motion.div 
                      animate={{ y: [0, 48] }} 
                      transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: 0.75 }}
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-yellow shadow-[0_0_10px_#FFD700]"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Node: RubberDuck Cloud */}
              <div className="relative z-10 bg-[#161b22] border border-yellow/30 rounded-xl p-6 shadow-2xl shadow-yellow/5 w-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Cloud className="w-6 h-6 text-yellow" />
                    <span className="font-semibold text-text-primary">RubberDuck Cloud</span>
                  </div>
                  <span className="text-[10px] font-mono bg-yellow/10 text-yellow px-2 py-1 rounded">SOC2 Type II</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/[0.05] border border-white/[0.05] p-3 rounded-lg text-center">
                    <div className="text-xs text-text-secondary mb-1">Ephemeral Agent</div>
                    <div className="w-full h-1 bg-white/[0.1] rounded-full overflow-hidden">
                      <motion.div animate={{ x: ['-100%', '100%'] }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="h-full bg-yellow w-1/2" />
                    </div>
                  </div>
                  <div className="bg-white/[0.05] border border-white/[0.05] p-3 rounded-lg text-center">
                    <div className="text-xs text-text-secondary mb-1">Zero Retention</div>
                    <Shield className="w-4 h-4 text-green-400 mx-auto" />
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
