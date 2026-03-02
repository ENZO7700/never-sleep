import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function ROICalculator() {
  const [teamSize, setTeamSize] = useState(10);

  const data = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map((month, index) => {
      // Base debt increases without RubberDuck
      const baseDebt = 100 + (index * 15 * (teamSize / 10));
      
      // With RubberDuck, debt decreases after an initial period
      const rubberDuckDebt = index < 2 
        ? baseDebt 
        : 100 + (2 * 15 * (teamSize / 10)) - ((index - 1) * 20 * (teamSize / 10));

      return {
        name: month,
        WithoutRubberDuck: Math.max(0, Math.round(baseDebt)),
        WithRubberDuck: Math.max(0, Math.round(rubberDuckDebt)),
      };
    });
  }, [teamSize]);

  const hoursSaved = Math.round(teamSize * 15.5); // Example metric
  const moneySaved = Math.round(teamSize * 15.5 * 80); // Assuming $80/hr

  return (
    <section className="py-32 border-t border-white/[0.06] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-text-primary mb-6">
            Calculate your ROI
          </h2>
          <p className="text-xl text-text-secondary max-w-[60ch] mx-auto">
            See how much time and money your engineering team can save by automating bug fixes.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Controls */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-4 space-y-8"
          >
            <div className="glass-card p-8">
              <label className="block text-sm font-medium text-text-secondary mb-4 uppercase tracking-wider">
                Engineering Team Size
              </label>
              <div className="flex items-center gap-4 mb-6">
                <input 
                  type="range" 
                  min="5" 
                  max="100" 
                  step="5"
                  value={teamSize} 
                  onChange={(e) => setTeamSize(parseInt(e.target.value))}
                  className="w-full h-2 bg-white/[0.1] rounded-lg appearance-none cursor-pointer accent-yellow"
                />
                <span className="text-2xl font-bold text-text-primary w-12 text-right">{teamSize}</span>
              </div>

              <div className="space-y-6 pt-6 border-t border-white/[0.06]">
                <div>
                  <div className="text-sm text-text-secondary mb-1">Estimated Hours Saved / Month</div>
                  <div className="text-4xl font-bold text-cyan">{hoursSaved.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-text-secondary mb-1">Estimated Value / Month</div>
                  <div className="text-4xl font-bold text-yellow">${moneySaved.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Chart */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-8 glass-card p-6 h-[400px] flex flex-col"
          >
            <div className="mb-4 flex items-center justify-between shrink-0">
              <h3 className="text-lg font-semibold text-text-primary">Technical Debt Over Time (Issues)</h3>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-white/[0.2]" />
                  <span className="text-text-secondary">Without RubberDuck</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow" />
                  <span className="text-text-primary">With RubberDuck</span>
                </div>
              </div>
            </div>
            <div className="flex-1 min-h-0 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRubberDuck" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FFD700" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#FFD700" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorWithout" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ffffff" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0a0a0a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="WithoutRubberDuck" stroke="rgba(255,255,255,0.2)" strokeWidth={2} fillOpacity={1} fill="url(#colorWithout)" />
                  <Area type="monotone" dataKey="WithRubberDuck" stroke="#FFD700" strokeWidth={2} fillOpacity={1} fill="url(#colorRubberDuck)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
