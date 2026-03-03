import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "What languages and frameworks are supported?",
    answer: "RubberDuck.Space natively supports TypeScript, JavaScript, Python, Go, Rust, and Java. It understands major frameworks like React, Next.js, Django, and Spring Boot out of the box."
  },
  {
    question: "How does it ensure safety and prevent breaking changes?",
    answer: "The agent operates within strict, user-defined guardrails. It runs your existing test suite locally before proposing any patch. If tests fail, it iterates. You always review the final PR before merging."
  },
  {
    question: "Can we run this air-gapped or self-hosted?",
    answer: "Yes. Our Enterprise tier offers full VPC deployment and air-gapped solutions for organizations with strict compliance and data sovereignty requirements."
  },
  {
    question: "How does it handle secrets and sensitive data?",
    answer: "The agent uses scoped, short-lived tokens and never stores your code. It is designed to identify and redact potential secrets in logs before processing. We do not use your private code to train public models."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-32 bg-space/50 border-t border-white/[0.06] relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-text-primary mb-4">
            Frequently asked questions
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                data-testid={`faq-item-${index}`}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                aria-expanded={openIndex === index}
              >
                <span className="font-medium text-text-primary pr-8">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-text-secondary transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-5 text-text-secondary leading-relaxed border-t border-white/[0.06] pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
