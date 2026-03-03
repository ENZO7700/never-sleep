import React from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  Gitlab, 
  Slack, 
  Trello, 
  Activity, 
  Database, 
  Cloud, 
  MessageSquare, 
  Terminal,
  Cpu
} from 'lucide-react';

const integrations = [
  { name: 'GitHub', icon: <Github className="w-6 h-6" /> },
  { name: 'GitLab', icon: <Gitlab className="w-6 h-6" /> },
  { name: 'Slack', icon: <Slack className="w-6 h-6" /> },
  { name: 'Jira', icon: <Trello className="w-6 h-6" /> },
  { name: 'Datadog', icon: <Activity className="w-6 h-6" /> },
  { name: 'Linear', icon: <Database className="w-6 h-6" /> },
  { name: 'AWS', icon: <Cloud className="w-6 h-6" /> },
  { name: 'Discord', icon: <MessageSquare className="w-6 h-6" /> },
  { name: 'Azure', icon: <Cpu className="w-6 h-6" /> },
  { name: 'Sentry', icon: (
    <div className="w-6 h-6 overflow-hidden rounded bg-yellow/10 flex items-center justify-center border border-yellow/20">
      <img src="/logo.png" alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
    </div>
  ) },
];

export function Integrations() {
  return (
    <section className="py-24 border-y border-white/[0.06] relative overflow-hidden bg-space/30">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-yellow/10 text-yellow text-xs font-semibold uppercase tracking-wider mb-4 border border-yellow/20">
            Ecosystem
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary mb-4">
            Works with your existing tools
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            RubberDuck seamlessly plugs into your development workflow, monitoring your stack and fixing issues before they reach production.
          </p>
        </motion.div>
      </div>

      <div className="relative flex flex-col gap-8">
        {/* First Row: Left to Right */}
        <div className="relative flex overflow-hidden py-4">
          <div className="absolute top-0 left-0 w-40 h-full bg-gradient-to-r from-space to-transparent z-10" />
          <div className="absolute top-0 right-0 w-40 h-full bg-gradient-to-l from-space to-transparent z-10" />
          
          <motion.div 
            className="flex whitespace-nowrap gap-12 items-center"
            animate={{ x: [0, -1920] }}
            transition={{ 
              duration: 40, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            {[...integrations, ...integrations, ...integrations].map((item, index) => (
              <div 
                key={index} 
                className="flex items-center gap-4 px-8 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.08] hover:border-yellow/30 transition-all duration-300 group cursor-pointer"
              >
                <div className="text-text-secondary group-hover:text-yellow transition-colors duration-300">
                  {item.icon}
                </div>
                <span className="text-lg font-medium text-text-secondary group-hover:text-text-primary transition-colors duration-300">
                  {item.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Second Row: Right to Left */}
        <div className="relative flex overflow-hidden py-4">
          <div className="absolute top-0 left-0 w-40 h-full bg-gradient-to-r from-space to-transparent z-10" />
          <div className="absolute top-0 right-0 w-40 h-full bg-gradient-to-l from-space to-transparent z-10" />
          
          <motion.div 
            className="flex whitespace-nowrap gap-12 items-center"
            animate={{ x: [-1920, 0] }}
            transition={{ 
              duration: 45, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            {[...integrations, ...integrations, ...integrations].map((item, index) => (
              <div 
                key={index} 
                className="flex items-center gap-4 px-8 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.08] hover:border-cyan/30 transition-all duration-300 group cursor-pointer"
              >
                <div className="text-text-secondary group-hover:text-cyan transition-colors duration-300">
                  {item.icon}
                </div>
                <span className="text-lg font-medium text-text-secondary group-hover:text-text-primary transition-colors duration-300">
                  {item.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
