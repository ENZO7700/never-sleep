import React from 'react';
import { motion } from 'framer-motion';
import { Search, ShieldCheck, GitMerge } from 'lucide-react';
import { CodeTooltip } from './CodeTooltip';

const features = [
  {
    icon: <Search className="w-6 h-6 text-yellow" />,
    title: "Root-cause first, patch second.",
    description: (
      <>
        We don't just guess. The agent analyzes <CodeTooltip code={`Error: Cannot read properties of undefined (reading 'id')\n    at getUserProfile (/src/api/user.ts:42:15)\n    at processTicksAndRejections (node:internal/process/task_queues:95:5)`} language="log">stack traces</CodeTooltip>, git blame, and context to understand the *why* before writing the *how*.
      </>
    )
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-cyan" />,
    title: "Test-aware changes with guardrails.",
    description: (
      <>
        Every patch is verified against your existing <CodeTooltip code={`$ npm run test\n\n> jest --passWithNoTests\n\nPASS src/api/user.test.ts\n  ✓ should return user profile (42 ms)\n  ✓ should handle null user gracefully (15 ms)\n\nTest Suites: 1 passed, 1 total`} language="bash">test suite</CodeTooltip>. If tests fail, the agent iterates until it finds a safe, working solution.
      </>
    )
  },
  {
    icon: <GitMerge className="w-6 h-6 text-yellow" />,
    title: "PR-ready diffs + audit trail.",
    description: (
      <>
        Get clean, reviewable <CodeTooltip code={`@@ -40,5 +40,5 @@\n export async function getUserProfile(userId: string) {\n-  const user = await db.users.find(userId);\n-  return user.id;\n+  const user = await db.users.find(userId);\n+  return user?.id ?? null;\n }`} language="diff">pull requests</CodeTooltip> with a complete explanation of the root cause and the reasoning behind the proposed fix.
      </>
    )
  }
];

export function ProductSnapshot() {
  return (
    <section id="product" className="py-24 border-t border-black/[0.06] dark:border-white/[0.06] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-3 gap-12"
        >
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-start">
              <div className="mb-6 p-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06]">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-text-secondary leading-relaxed max-w-[40ch]">
                {feature.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
