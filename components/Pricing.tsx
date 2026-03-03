import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
  {
    name: "Starter",
    price: "$49",
    period: "/mo",
    description: "For small teams and side projects.",
    features: [
      "Up to 5 seats",
      "100 autonomous PRs / month",
      "GitHub & GitLab integration",
      "Standard test suite support",
      "Community support"
    ],
    cta: "Start free trial",
    highlighted: false
  },
  {
    name: "Team",
    price: "$199",
    period: "/mo",
    description: "For growing engineering organizations.",
    features: [
      "Up to 20 seats",
      "Unlimited autonomous PRs",
      "Advanced root-cause analysis",
      "Custom guardrails & policies",
      "Priority email support",
      "Detailed audit logs"
    ],
    cta: "Start free trial",
    highlighted: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large-scale, security-conscious enterprises.",
    features: [
      "Unlimited seats",
      "Self-hosted / VPC deployment",
      "Dedicated success manager",
      "Custom model fine-tuning",
      "SAML SSO & advanced RBAC",
      "24/7 phone support",
      "SBOM & compliance reporting"
    ],
    cta: "Contact sales",
    highlighted: false
  }
];

export function Pricing() {
  return (
    <section id="pricing" className="py-32 border-t border-white/[0.06] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-text-primary mb-6">
            Pricing
          </h2>
          <p className="text-xl text-text-secondary max-w-[60ch] mx-auto">
            Transparent plans that scale with your team's velocity.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div 
              key={index}
              data-testid={`pricing-card-${plan.name.toLowerCase()}`}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass-card p-8 flex flex-col ${plan.highlighted ? 'border-yellow/30 shadow-[0_0_30px_rgba(255,215,0,0.1)] relative' : ''}`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow text-space text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-semibold text-text-primary mb-2 tracking-tight">
                {plan.name}
              </h3>
              <p className="text-text-secondary text-sm mb-6 h-10">
                {plan.description}
              </p>
              
              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-text-primary">{plan.price}</span>
                <span className="text-text-secondary">{plan.period}</span>
              </div>

              <button className={`w-full py-3 rounded-xl font-semibold transition-all mb-8 ${
                plan.highlighted 
                  ? 'bg-yellow text-space hover:scale-[1.02] active:scale-[0.98] glow-yellow' 
                  : 'bg-white/[0.05] text-text-primary hover:bg-white/[0.1] border border-white/[0.1]'
              }`}>
                {plan.cta}
              </button>

              <div className="space-y-4 flex-1">
                {plan.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-cyan shrink-0 mt-0.5" />
                    <span className="text-text-secondary text-sm leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
