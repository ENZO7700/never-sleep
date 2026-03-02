import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, GitPullRequest, GitCommit, MessageSquare } from 'lucide-react';

export function WorkflowVideo() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) return 0;
        return p + 0.5;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Map progress (0-100) to different states of the "video"
  const step = progress < 20 ? 0 : progress < 50 ? 1 : progress < 80 ? 2 : 3;

  return (
    <section className="py-32 border-t border-white/[0.06] relative overflow-hidden bg-space">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-text-primary mb-6">
            See it in action
          </h2>
          <p className="text-xl text-text-secondary max-w-[60ch] mx-auto">
            Watch how RubberDuck autonomously fixes a memory leak directly in GitHub.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-card rounded-2xl overflow-hidden border border-white/[0.1] shadow-2xl shadow-cyan/10"
        >
          {/* Video Header / Browser Chrome */}
          <div className="bg-[#0d1117] border-b border-white/[0.1] px-4 py-3 flex items-center gap-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="flex-1 text-center">
              <div className="inline-flex items-center gap-2 bg-white/[0.05] px-4 py-1 rounded-md text-xs text-text-secondary font-mono">
                <GitPullRequest className="w-3 h-3" />
                github.com/acme-corp/frontend/pull/142
              </div>
            </div>
          </div>

          {/* Video Content */}
          <div className="relative bg-[#0d1117] h-[400px] p-8 font-sans text-sm overflow-hidden">
            {/* GitHub PR UI Mockup */}
            <div className="max-w-3xl mx-auto h-full overflow-y-auto pr-4 custom-scrollbar">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan to-blue-600 flex items-center justify-center text-white font-bold">
                  RD
                </div>
                <div>
                  <div className="font-semibold text-white text-lg">Fix memory leak in auth.ts <span className="text-text-muted font-normal">#142</span></div>
                  <div className="text-text-secondary text-xs mt-1">
                    <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-medium mr-2">Open</span>
                    rubberduck-bot wants to merge 1 commit into main
                  </div>
                </div>
              </div>

              <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-5 before:w-0.5 before:bg-white/[0.1]">
                {/* Step 1: Issue detected */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: step >= 0 ? 1 : 0, y: step >= 0 ? 0 : 10 }}
                  className="relative pl-12"
                >
                  <div className="absolute left-3 top-1 w-4 h-4 rounded-full bg-[#0d1117] border-2 border-white/[0.2] flex items-center justify-center">
                    <MessageSquare className="w-2 h-2 text-text-secondary" />
                  </div>
                  <div className="border border-white/[0.1] rounded-lg bg-[#161b22] p-4 shadow-lg">
                    <div className="font-semibold text-white mb-2 flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-white/[0.1] flex items-center justify-center">
                        <span className="text-[10px]">CI</span>
                      </div>
                      github-actions <span className="text-text-secondary font-normal text-xs">commented 2 mins ago</span>
                    </div>
                    <p className="text-text-secondary">CI pipeline failed. Memory leak detected in <code className="bg-white/[0.1] px-1.5 py-0.5 rounded text-red-400 font-mono text-xs">src/auth.ts</code>.</p>
                  </div>
                </motion.div>

                {/* Step 2: RubberDuck analyzing */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 10 }}
                  className="relative pl-12"
                >
                  <div className="absolute left-3 top-1 w-4 h-4 rounded-full bg-[#0d1117] border-2 border-cyan flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
                  </div>
                  <div className="border border-cyan/30 rounded-lg bg-cyan/5 p-4 shadow-lg shadow-cyan/5">
                    <div className="font-semibold text-cyan mb-2 flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan flex items-center justify-center text-[#0d1117] text-xs font-bold">RD</div>
                      RubberDuck <span className="text-cyan/60 font-normal text-xs">is analyzing the issue...</span>
                    </div>
                    {step >= 1 && step < 2 && (
                      <div className="flex gap-1 mt-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    )}
                    {step >= 2 && (
                      <p className="text-cyan/80">Found unclosed WebSocket connection in <code className="bg-cyan/20 px-1.5 py-0.5 rounded font-mono text-xs">auth.ts</code>. Generating fix...</p>
                    )}
                  </div>
                </motion.div>

                {/* Step 3: Commit pushed */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: step >= 3 ? 1 : 0, y: step >= 3 ? 0 : 10 }}
                  className="relative pl-12"
                >
                  <div className="absolute left-3 top-1 w-4 h-4 rounded-full bg-[#0d1117] border-2 border-yellow flex items-center justify-center">
                    <GitCommit className="w-2 h-2 text-yellow" />
                  </div>
                  <div className="flex items-center gap-3 text-text-secondary bg-[#161b22] border border-white/[0.1] p-3 rounded-lg shadow-lg">
                    <div className="w-5 h-5 rounded-full bg-yellow flex items-center justify-center text-[#0d1117] text-xs font-bold">RD</div>
                    <span className="font-semibold text-white">RubberDuck</span> pushed a commit
                    <code className="text-yellow bg-yellow/10 px-2 py-0.5 rounded font-mono text-xs">a1b2c3d</code>
                    <span className="truncate">Fix memory leak by closing WS connection on unmount</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Video Controls */}
          <div className="bg-[#161b22] border-t border-white/[0.1] px-6 py-4 flex items-center gap-4">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-full bg-white/[0.1] hover:bg-white/[0.2] flex items-center justify-center text-white transition-colors"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
            </button>
            <div className="flex-1 h-2 bg-white/[0.1] rounded-full overflow-hidden cursor-pointer relative group" onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              setProgress((x / rect.width) * 100);
            }}>
              <div className="absolute inset-0 bg-white/[0.05] group-hover:bg-white/[0.1] transition-colors" />
              <div className="h-full bg-cyan relative" style={{ width: `${progress}%` }}>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_#00F5FF] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <div className="text-xs font-mono text-text-secondary w-24 text-right">
              00:{(progress * 0.3).toFixed(0).padStart(2, '0')} / 00:30
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
