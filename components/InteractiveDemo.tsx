import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Loader2, CheckCircle2, ArrowRight } from 'lucide-react';

const DEFAULT_BUGGY_CODE = `function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i <= items.length; i++) {
    total += items[i].price;
  }
  return total;
}`;

const FIXED_CODE = `function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}`;

export function InteractiveDemo() {
  const [inputCode, setInputCode] = useState(DEFAULT_BUGGY_CODE);
  const [status, setStatus] = useState<'idle' | 'scanning' | 'patching' | 'testing' | 'done'>('idle');
  const [outputCode, setOutputCode] = useState('');

  const handleFixCode = () => {
    if (!inputCode.trim()) return;
    
    setStatus('scanning');
    
    setTimeout(() => {
      setStatus('patching');
      setTimeout(() => {
        setStatus('testing');
        setTimeout(() => {
          setOutputCode(FIXED_CODE);
          setStatus('done');
        }, 1500);
      }, 1500);
    }, 1500);
  };

  const handleReset = () => {
    setStatus('idle');
    setOutputCode('');
  };

  return (
    <section className="py-32 border-t border-white/[0.06] relative overflow-hidden bg-space/30">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-text-primary mb-6">
            Try the agent yourself
          </h2>
          <p className="text-xl text-text-secondary max-w-[60ch] mx-auto">
            Paste a buggy snippet below and watch RubberDuck.Space autonomously diagnose and fix it.
          </p>
        </motion.div>

        <div className="glass-card overflow-hidden border border-white/[0.1] shadow-2xl">
          <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.06]">
            
            {/* Left Side: Input */}
            <div className="flex flex-col h-[400px]">
              <div className="px-4 py-3 border-b border-white/[0.06] bg-black/20 flex justify-between items-center">
                <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">Buggy Code</span>
                {status === 'idle' && (
                  <button 
                    onClick={handleFixCode}
                    data-testid="demo-fix-button"
                    className="flex items-center gap-2 text-xs font-semibold bg-yellow text-space px-3 py-1.5 rounded hover:scale-105 transition-transform"
                  >
                    <Play className="w-3 h-3" /> Fix Code
                  </button>
                )}
              </div>
              <textarea
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                disabled={status !== 'idle'}
                className="flex-1 w-full bg-transparent text-sm font-mono text-text-primary p-6 resize-none focus:outline-none disabled:opacity-50"
                spellCheck={false}
              />
            </div>

            {/* Right Side: Output / Progress */}
            <div className="flex flex-col h-[400px] bg-black/10 relative">
              <div className="px-4 py-3 border-b border-white/[0.06] bg-black/20 flex justify-between items-center">
                <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">Agent Output</span>
                {status === 'done' && (
                  <button 
                    onClick={handleReset}
                    className="text-xs text-text-muted hover:text-text-primary transition-colors"
                  >
                    Reset
                  </button>
                )}
              </div>

              <div className="flex-1 p-6 flex flex-col relative overflow-hidden">
                {status === 'idle' ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-text-muted">
                    <ArrowRight className="w-8 h-8 mb-4 opacity-20" />
                    <p className="text-sm">Click "Fix Code" to start the agent</p>
                  </div>
                ) : (
                  <div className="space-y-6 font-mono text-sm">
                    {/* Progress Steps */}
                    <AnimatePresence>
                      {status !== 'idle' && (
                        <motion.div 
                          key="step-scanning"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center gap-3 text-text-secondary"
                        >
                          {status === 'scanning' ? <Loader2 className="w-4 h-4 animate-spin text-yellow" /> : <CheckCircle2 className="w-4 h-4 text-cyan" />}
                          <span>Analyzing syntax and identifying root cause...</span>
                        </motion.div>
                      )}
                      
                      {(status === 'patching' || status === 'testing' || status === 'done') && (
                        <motion.div 
                          key="step-patching"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center gap-3 text-text-secondary"
                        >
                          {status === 'patching' ? <Loader2 className="w-4 h-4 animate-spin text-yellow" /> : <CheckCircle2 className="w-4 h-4 text-cyan" />}
                          <span>Generating safe patch...</span>
                        </motion.div>
                      )}

                      {(status === 'testing' || status === 'done') && (
                        <motion.div 
                          key="step-testing"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center gap-3 text-text-secondary"
                        >
                          {status === 'testing' ? <Loader2 className="w-4 h-4 animate-spin text-yellow" /> : <CheckCircle2 className="w-4 h-4 text-cyan" />}
                          <span>Running virtual test suite...</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Final Output */}
                    <AnimatePresence>
                      {status === 'done' && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="mt-6 border-t border-white/[0.06] pt-6"
                        >
                          <div className="text-cyan text-xs mb-3">✓ Fix applied successfully</div>
                          <pre className="text-text-primary whitespace-pre-wrap">
                            <code dangerouslySetInnerHTML={{
                              __html: outputCode
                                .replace('i <= items.length', '<span class="bg-red-500/20 text-red-300 line-through">i &lt;= items.length</span>')
                                .replace('i < items.length', '<span class="bg-green-500/20 text-green-300">i &lt; items.length</span>')
                            }} />
                          </pre>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
