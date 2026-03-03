import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, GitPullRequest } from 'lucide-react';

export function TerminalDemo() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 2000); // Scanning -> Patching
    const timer2 = setTimeout(() => setStep(2), 4500); // Patching -> Testing
    const timer3 = setTimeout(() => setStep(3), 7000); // Testing -> PR
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="glass-card w-full h-full flex flex-col overflow-hidden font-mono text-sm">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-black/20">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-white/20" />
          <div className="w-3 h-3 rounded-full bg-white/20" />
          <div className="w-3 h-3 rounded-full bg-white/20" />
        </div>
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 overflow-hidden rounded bg-yellow/10 flex items-center justify-center border border-yellow/20">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  const icon = document.createElement('div');
                  icon.innerHTML = '🦆';
                  icon.className = 'text-[10px]';
                  parent.appendChild(icon);
                }
              }}
            />
          </div>
          <div className="text-text-muted text-xs">agent_runner_v2.sh</div>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="flex-1 p-6 flex flex-col gap-4 relative">
        {/* Step 0: Scanning */}
        <div className="flex items-center gap-3 text-text-secondary">
          {step === 0 ? <Loader2 className="w-4 h-4 animate-spin text-yellow" /> : <CheckCircle2 className="w-4 h-4 text-cyan" />}
          <span>Scanning repository for root cause...</span>
        </div>

        {/* Step 1: Patching */}
        {step >= 1 && (
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-2">
            <div className="flex items-center gap-3 text-text-secondary">
              {step === 1 ? <Loader2 className="w-4 h-4 animate-spin text-yellow" /> : <CheckCircle2 className="w-4 h-4 text-cyan" />}
              <span>Generating patch...</span>
            </div>
            <div className="bg-black/40 rounded-lg p-4 border border-white/[0.06] text-xs leading-relaxed relative min-h-[100px]">
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div 
                    key="original"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-1"
                  >
                    <div className="text-red-400/60 font-mono">  const user = db.find(id);</div>
                    <div className="text-red-400/60 font-mono">  return user.profile;</div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="patched"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-1"
                  >
                    <div className="text-red-400/30 line-through decoration-red-500/50">  const user = db.find(id);</div>
                    <div className="text-red-400/30 line-through decoration-red-500/50">  return user.profile;</div>
                    <div className="text-yellow/90 bg-yellow/10 px-1 rounded mt-1">+ const user = await db.find(id);</div>
                    <div className="text-yellow/90 bg-yellow/10 px-1 rounded">+ if (!user) throw new NotFoundError();</div>
                    <div className="text-yellow/90 bg-yellow/10 px-1 rounded">+ return user.profile;</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* Step 2: Testing */}
        {step >= 2 && (
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-2">
            <div className="flex items-center gap-3 text-text-secondary">
              {step === 2 ? <Loader2 className="w-4 h-4 animate-spin text-yellow" /> : <CheckCircle2 className="w-4 h-4 text-cyan" />}
              <span>Running test suite...</span>
            </div>
            {step === 2 && (
              <div className="text-text-muted pl-7">
                <span className="animate-pulse">●</span> 142 tests passed
              </div>
            )}
          </motion.div>
        )}

        {/* Step 3: PR Opened */}
        {step >= 3 && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-4">
            <div className="bg-cyan/10 border border-cyan/20 rounded-lg p-4 flex items-start gap-4">
              <GitPullRequest className="w-5 h-5 text-cyan mt-0.5" />
              <div>
                <div className="text-text-primary font-medium mb-1">PR opened: fix/edge-case-null-guard</div>
                <div className="text-text-secondary text-xs">Autonomous agent successfully patched the issue and verified with tests.</div>
                <button className="mt-3 text-cyan text-xs font-medium hover:underline flex items-center gap-1">
                  View Pull Request →
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="h-1 w-full bg-white/[0.03]">
        <motion.div 
          className="h-full bg-yellow"
          initial={{ width: "0%" }}
          animate={{ width: step === 0 ? "25%" : step === 1 ? "50%" : step === 2 ? "75%" : "100%" }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}
