import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Search, Plus, ExternalLink, Database, Activity, MessageSquare, Send, CheckCircle2, AlertCircle, Clock, Terminal } from 'lucide-react';

interface Repo {
  id: number;
  name: string;
  description: string;
  language: string;
  stars: number;
  isPublic: boolean;
  color: string;
}

const MOCK_REPOS: Repo[] = [
  {
    id: 1,
    name: 'resend-ui-clone',
    description: 'Advanced design system inspired by the Resend platform.',
    language: 'TypeScript',
    stars: 245,
    isPublic: true,
    color: '#3178c6'
  },
  {
    id: 2,
    name: 'nextjs-dashboard',
    description: 'Admin panel template built on Next.js 14.',
    language: 'JavaScript',
    stars: 112,
    isPublic: true,
    color: '#f1e05a'
  },
  {
    id: 3,
    name: 'rubberduck-core',
    description: 'Autonomous code repair engine core logic.',
    language: 'Rust',
    stars: 892,
    isPublic: false,
    color: '#dea584'
  }
];

export function GitHubDashboard() {
  const [token, setToken] = useState<string>(localStorage.getItem('gh_token') || '');
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('gh_token'));
  const [activeTab, setActiveTab] = useState('overview');
  const [inputToken, setInputToken] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputToken.length > 10) {
      localStorage.setItem('gh_token', inputToken);
      setToken(inputToken);
      setIsAuth(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('gh_token');
    setToken('');
    setIsAuth(false);
  };

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 pt-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full glass-card p-8 border-white/10"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
              <Github className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-white mb-2">Connect GitHub</h1>
          <p className="text-text-secondary text-center mb-8">
            Enter your Personal Access Token to access your repositories and autonomous repair features.
          </p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
                Personal Access Token
              </label>
              <input 
                type="password"
                value={inputToken}
                onChange={(e) => setInputToken(e.target.value)}
                placeholder="ghp_xxxxxxxxxxxx"
                data-testid="gh-token-input"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow/50 transition-colors"
              />
            </div>
            <button 
              type="submit"
              data-testid="gh-auth-button"
              className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200 transition-all active:scale-[0.98]"
            >
              Authenticate
            </button>
          </form>
          
          <p className="mt-6 text-xs text-text-muted text-center leading-relaxed">
            Your token is stored locally in your browser and is never sent to our servers in this demo version.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                <img 
                  src="https://picsum.photos/seed/dev/200" 
                  alt="Avatar" 
                  className="w-full h-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold">Ján Vývojár</h2>
                <p className="text-text-secondary text-sm">@janvyvojar</p>
              </div>
            </div>
            
            <p className="text-sm text-text-secondary mb-6 leading-relaxed">
              Full-stack engineer | Open-source creator | Passionate about clean code and design.
            </p>
            
            <button 
              onClick={handleLogout}
              className="w-full border border-white/10 rounded-full py-2 text-sm font-medium hover:bg-white/5 transition-colors mb-8"
            >
              Sign Out
            </button>

            <div className="space-y-4">
              <h4 className="text-xs font-bold text-text-muted uppercase tracking-widest">Integrations</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-text-secondary hover:text-white cursor-pointer transition-colors">
                  <Terminal className="w-4 h-4" />
                  <span>Vercel</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-secondary hover:text-white cursor-pointer transition-colors">
                  <Database className="w-4 h-4 text-[#3ECF8E]" />
                  <span>Supabase</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Tabs */}
            <div className="flex gap-8 border-b border-white/10 mb-8 overflow-x-auto no-scrollbar">
              {[
                { id: 'overview', label: 'Overview', icon: <Terminal className="w-4 h-4" /> },
                { id: 'repositories', label: 'Repositories', icon: <Github className="w-4 h-4" /> },
                { id: 'notes', label: '/notes', icon: <Activity className="w-4 h-4" />, color: 'text-yellow' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 text-sm font-medium transition-all border-b-2 whitespace-nowrap ${
                    activeTab === tab.id 
                      ? `border-yellow ${tab.color || 'text-white'}` 
                      : 'border-transparent text-text-secondary hover:text-white'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-10"
                >
                  {/* Pinned Repos */}
                  <section>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider">Pinned Repositories</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {MOCK_REPOS.slice(0, 2).map((repo) => (
                        <div key={repo.id} className="glass-card p-5 border-white/5 hover:border-white/20 transition-all cursor-pointer group">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-lg font-bold group-hover:text-yellow transition-colors">{repo.name}</h4>
                            <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-white/5 border border-white/10 text-text-secondary">
                              {repo.isPublic ? 'Public' : 'Private'}
                            </span>
                          </div>
                          <p className="text-sm text-text-secondary mb-4 line-clamp-2">{repo.description}</p>
                          <div className="flex items-center gap-4 text-xs text-text-muted">
                            <div className="flex items-center gap-1.5">
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: repo.color }} />
                              {repo.language}
                            </div>
                            <div className="flex items-center gap-1">
                              <span>★</span> {repo.stars}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Infrastructure */}
                  <section>
                    <div className="border-t border-white/10 pt-10">
                      <h3 className="text-xl font-bold mb-1">Infrastructure & Deployments</h3>
                      <p className="text-text-secondary text-sm mb-6">Real-time service monitoring</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Vercel Card */}
                        <div className="glass-card border-t-2 border-t-white overflow-hidden">
                          <div className="p-6 border-b border-white/5 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 bg-black rounded-full border border-white/10 flex items-center justify-center">
                                <Terminal className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h4 className="font-bold text-sm">resend-ui-clone</h4>
                                <p className="text-xs text-text-secondary">resend-clone.vercel.app</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-text-secondary bg-white/5 px-2 py-1 rounded-full">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                              Active
                            </div>
                          </div>
                          <div className="p-6">
                            <div className="flex gap-8 mb-6">
                              <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-full border-2 border-emerald-500 flex items-center justify-center font-bold text-emerald-500">98</div>
                                <div className="text-xs">
                                  <div className="font-bold">Web Vitals</div>
                                  <div className="text-text-secondary">Excellent</div>
                                </div>
                              </div>
                              <div className="pl-8 border-l border-white/10">
                                <div className="text-lg font-bold">1.2 GB</div>
                                <div className="text-xs text-text-secondary">Bandwidth (30d)</div>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Recent Deployments</p>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs p-2 rounded bg-white/5 border border-white/5">
                                  <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    <span className="font-mono">main <span className="text-text-muted">· a1b2c3d</span></span>
                                  </div>
                                  <span className="text-text-muted">12m</span>
                                </div>
                                <div className="flex items-center justify-between text-xs p-2 rounded bg-white/5 border border-white/5">
                                  <div className="flex items-center gap-2">
                                    <Clock className="w-3 h-3 text-yellow animate-pulse" />
                                    <span className="font-mono">feat/dark <span className="text-text-muted">· 8f9e0a1</span></span>
                                  </div>
                                  <span className="text-yellow">Building...</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Supabase Card */}
                        <div className="glass-card border-t-2 border-t-[#3ECF8E] overflow-hidden">
                          <div className="p-6 border-b border-white/5 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 bg-[#3ECF8E]/10 rounded-full border border-[#3ECF8E]/20 flex items-center justify-center">
                                <Database className="w-5 h-5 text-[#3ECF8E]" />
                              </div>
                              <div>
                                <h4 className="font-bold text-sm">prod-db-resend</h4>
                                <p className="text-xs text-text-secondary">eu-central-1</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full border border-emerald-400/20">
                              Healthy
                            </div>
                          </div>
                          <div className="p-6">
                            <div className="grid grid-cols-2 gap-4 mb-6">
                              <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                                <div className="flex justify-between text-[10px] font-bold mb-1">
                                  <span className="uppercase tracking-wider">Storage</span>
                                  <span className="text-text-secondary">90%</span>
                                </div>
                                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                  <div className="h-full bg-yellow" style={{ width: '90%' }} />
                                </div>
                              </div>
                              <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex flex-col justify-center">
                                <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">MAU</div>
                                <div className="text-base font-bold flex items-center gap-1">
                                  8,245 <span className="text-[10px] text-emerald-400">+12%</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Edge Functions (1h)</p>
                              <div className="space-y-2 font-mono text-[10px]">
                                <div className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/5">
                                  <div className="flex items-center gap-2">
                                    <span className="text-blue-400">POST</span>
                                    <span className="text-text-secondary">/api/email</span>
                                  </div>
                                  <span className="text-emerald-400">200 OK</span>
                                </div>
                                <div className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/5">
                                  <div className="flex items-center gap-2">
                                    <span className="text-blue-400">POST</span>
                                    <span className="text-text-secondary">/api/hook</span>
                                  </div>
                                  <span className="text-yellow">429 Limit</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Telegram Mock */}
                  <section>
                    <div className="border-t border-white/10 pt-10">
                      <h3 className="text-xl font-bold mb-1">Telegram Messenger</h3>
                      <p className="text-text-secondary text-sm mb-6">Direct communication with your bot</p>
                      
                      <div className="glass-card border-t-2 border-t-[#229ED9] overflow-hidden">
                        <div className="p-4 border-b border-white/5 flex items-center gap-3">
                          <div className="w-9 h-9 bg-[#229ED9]/10 rounded-full border border-[#229ED9]/20 flex items-center justify-center">
                            <Send className="w-5 h-5 text-[#229ED9]" />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm">@ResendHub_Bot</h4>
                            <div className="flex items-center gap-1.5 text-[10px] text-text-secondary">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              Webhook Connected
                            </div>
                          </div>
                        </div>
                        <div className="h-80 bg-[#050505] p-4 overflow-y-auto flex flex-col gap-4">
                          <div className="max-w-[85%] self-start bg-white/5 border border-white/10 rounded-2xl rounded-bl-none p-3 text-sm">
                            <div className="text-[10px] font-bold text-[#229ED9] mb-1">Unknown User</div>
                            Hi, I found a bug in your nextjs-dashboard repo. Google login is not working.
                            <div className="text-[10px] text-text-muted mt-1 text-right">14:23</div>
                          </div>
                          <div className="max-w-[85%] self-end bg-[#229ED9]/10 border border-[#229ED9]/30 rounded-2xl rounded-br-none p-3 text-sm">
                            Hi! Thanks for reporting. I fixed it last night, try pulling the main branch.
                            <div className="text-[10px] text-text-muted mt-1 text-right">14:26</div>
                          </div>
                          <div className="text-center text-[10px] text-text-muted uppercase tracking-widest my-2">Today</div>
                          <div className="max-w-[85%] self-start bg-white/5 border border-white/10 rounded-2xl rounded-bl-none p-3 text-sm">
                            <div className="text-[10px] font-bold text-emerald-400 mb-1">System Monitor</div>
                            ⚠️ Vercel Build failed due to compilation error.
                            <div className="text-[10px] text-text-muted mt-1 text-right">5m ago</div>
                          </div>
                        </div>
                        <div className="p-3 border-t border-white/5 flex gap-2">
                          <input 
                            type="text" 
                            placeholder="Type a message to Telegram..."
                            className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#229ED9]/50"
                          />
                          <button className="bg-[#229ED9] text-white p-2 rounded-full hover:bg-[#1c88ba] transition-colors">
                            <Send className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </section>
                </motion.div>
              )}

              {activeTab === 'repositories' && (
                <motion.div
                  key="repositories"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full sm:max-w-xs">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <input 
                        type="text" 
                        placeholder="Search repositories..."
                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-yellow/50"
                      />
                    </div>
                    <button className="w-full sm:w-auto bg-white text-black px-4 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
                      <Plus className="w-4 h-4" /> New
                    </button>
                  </div>

                  <div className="space-y-4">
                    {MOCK_REPOS.map((repo) => (
                      <div key={repo.id} className="glass-card p-6 border-white/5 hover:border-white/10 transition-all group">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-bold group-hover:text-yellow transition-colors cursor-pointer">{repo.name}</h3>
                            <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-text-secondary">
                              {repo.isPublic ? 'Public' : 'Private'}
                            </span>
                          </div>
                          <button className="text-text-muted hover:text-white transition-colors">
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm text-text-secondary mb-4 max-w-2xl">{repo.description}</p>
                        <div className="flex items-center gap-6 text-xs text-text-muted">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: repo.color }} />
                            {repo.language}
                          </div>
                          <div className="flex items-center gap-1">
                            <span>★</span> {repo.stars}
                          </div>
                          <div className="text-text-muted">Updated 2 days ago</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'notes' && (
                <motion.div
                  key="notes"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <div className="flex justify-between items-end border-b border-white/10 pb-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-1">Developer Log (/notes)</h2>
                      <p className="text-text-secondary text-sm">Architecture, snippets, and integrations.</p>
                    </div>
                    <button className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm font-bold hover:bg-white/10 transition-colors flex items-center gap-2">
                      <Plus className="w-4 h-4" /> New Entry
                    </button>
                  </div>

                  <div className="space-y-12">
                    <div className="relative pl-8 border-l-2 border-white/10">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-black border-2 border-text-muted group-hover:border-white transition-colors" />
                      <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest block mb-2">Logged: Today, 14:30</span>
                      <div className="glass-card p-6 border-white/10">
                        <h3 className="text-lg font-bold mb-4">1. Vercel Integration (Ready Status)</h3>
                        <p className="text-sm text-text-secondary mb-4">To get real deployment status from Vercel directly into this dashboard, we communicate with their official REST API.</p>
                        <ul className="space-y-3 text-sm text-text-secondary mb-6">
                          <li className="flex items-start gap-2">
                            <span className="text-text-muted mt-1">→</span>
                            <span><strong>API Used:</strong> Vercel REST API</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-text-muted mt-1">→</span>
                            <div className="flex-1">
                              <strong>Process:</strong> Call the following endpoint in your backend:
                              <div className="mt-2 p-2 bg-black rounded border border-white/5 font-mono text-xs overflow-x-auto">
                                <span className="text-emerald-400 font-bold mr-2">GET</span>
                                https://api.vercel.com/v6/deployments
                              </div>
                            </div>
                          </li>
                        </ul>
                        <div className="flex gap-2">
                          <span className="text-[10px] bg-white/5 px-2 py-1 rounded border border-white/10 text-text-muted">#vercel</span>
                          <span className="text-[10px] bg-white/5 px-2 py-1 rounded border border-white/10 text-text-muted">#api</span>
                        </div>
                      </div>
                    </div>

                    <div className="relative pl-8 border-l-2 border-white/10">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-black border-2 border-text-muted" />
                      <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest block mb-2">Logged: Today, 14:15</span>
                      <div className="glass-card p-6 border-white/10">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                          <Database className="w-5 h-5 text-[#3ECF8E]" />
                          2. Supabase Integration (Healthy Status)
                        </h3>
                        <p className="text-sm text-text-secondary mb-4">Similar to Vercel, we monitor Supabase backend using their Management API.</p>
                        <ul className="space-y-3 text-sm text-text-secondary mb-6">
                          <li className="flex items-start gap-2">
                            <span className="text-text-muted mt-1">→</span>
                            <span><strong>API Used:</strong> Supabase Management API</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-text-muted mt-1">→</span>
                            <div className="flex-1">
                              <strong>Process:</strong> Fetch project list and status:
                              <div className="mt-2 p-2 bg-black rounded border border-white/5 font-mono text-xs overflow-x-auto">
                                <span className="text-emerald-400 font-bold mr-2">GET</span>
                                https://api.supabase.com/v1/projects
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* Status Footer */}
      <div className="fixed bottom-0 left-0 right-0 h-11 bg-black/90 backdrop-blur-md border-t border-white/10 z-50 flex items-center px-6">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center text-[10px] text-text-secondary uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            All systems operational
          </div>
          <div className="flex gap-6">
            <div className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors group relative">
              <Terminal className="w-3 h-3" />
              Vercel: Ready
              <div className="absolute bottom-full right-0 mb-3 w-64 glass-card p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all translate-y-2 group-hover:translate-y-0">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-bold">resend-ui-clone</span>
                  <span className="bg-white/5 px-1.5 py-0.5 rounded border border-white/10">Production</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-white">Ready</span>
                  <span className="text-text-muted ml-auto">12m ago</span>
                </div>
                <p className="text-text-muted lowercase truncate">resend-clone.vercel.app</p>
              </div>
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors group relative">
              <Database className="w-3 h-3 text-[#3ECF8E]" />
              Supabase: Healthy
              <div className="absolute bottom-full right-0 mb-3 w-64 glass-card p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all translate-y-2 group-hover:translate-y-0">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-bold">prod-db-resend</span>
                  <span className="bg-emerald-400/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-400/20">Active</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-white">Healthy</span>
                  <span className="text-text-muted ml-auto">eu-central-1</span>
                </div>
                <p className="text-text-muted">PostgreSQL 15.1 · 128 MB</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
