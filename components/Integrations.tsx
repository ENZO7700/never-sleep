import React from 'react';
import { motion } from 'framer-motion';
import { Github, Gitlab, Slack, Trello, Activity, Database, Cloud } from 'lucide-react';

const integrations = [
  { name: 'GitHub', icon: <Github className="w-8 h-8" /> },
  { name: 'GitLab', icon: <Gitlab className="w-8 h-8" /> },
  { name: 'Slack', icon: <Slack className="w-8 h-8" /> },
  { name: 'Jira', icon: <Trello className="w-8 h-8" /> },
  { name: 'Datadog', icon: <Activity className="w-8 h-8" /> },
  { name: 'Linear', icon: <Database className="w-8 h-8" /> },
  { name: 'AWS', icon: <Cloud className="w-8 h-8" /> },
];

export function Integrations() {
  return (
    <section className="py-24 border-t border-white/[0.06] relative overflow-hidden bg-space/50">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold tracking-tight text-text-primary mb-2">
            Seamlessly integrates with your stack
          </h2>
          <p className="text-text-secondary">
            RubberDuck connects directly to the tools your team already uses.
          </p>
        </motion.div>
      </div>

      <div className="relative flex overflow-hidden group">
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-space to-transparent z-10" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-space to-transparent z-10" />
        
        <div className="flex animate-marquee group-hover:pause">
          {[...integrations, ...integrations, ...integrations, ...integrations].map((item, index) => (
            <div 
              key={index} 
              className="flex items-center gap-3 text-text-secondary hover:text-text-primary transition-colors cursor-pointer mx-8 whitespace-nowrap"
            >
              {item.icon}
              <span className="text-xl font-medium tracking-tight">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
