import React from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, PieChart, ArrowUp, ArrowDown, 
  TrendingUp, Wallet, BarChart2 
} from 'lucide-react';

const ProfitAnalysis = () => {
  // --- Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6 font-sans text-slate-900"
    >
      
      {/* --- Top KPI Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Net Profit (Hero Card) */}
          <motion.div variants={itemVariants} className="bg-gradient-to-br from-indigo-600 to-blue-700 p-6 rounded-2xl text-white shadow-xl shadow-blue-900/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl group-hover:bg-white/20 transition-colors"></div>
              
              <div className="relative z-10">
                  <div className="flex justify-between items-start mb-2">
                      <div className="text-blue-100 text-xs font-bold uppercase tracking-wider">Total Net Profit</div>
                      <div className="p-1.5 bg-white/10 rounded-lg"><DollarSign size={16} /></div>
                  </div>
                  <div className="text-3xl font-bold tracking-tight">₹ 82,450</div>
                  <div className="mt-4 flex items-center gap-2">
                      <div className="flex items-center text-xs font-bold bg-emerald-400/20 text-emerald-300 px-2 py-1 rounded border border-emerald-400/20">
                          <ArrowUp size={12} className="mr-1" /> +12.5%
                      </div>
                      <span className="text-xs text-blue-200">vs last month</span>
                  </div>
              </div>
          </motion.div>
          
          {/* Gross Margin */}
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
              <div className="flex justify-between items-start mb-2">
                  <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">Gross Margin</div>
                  <div className="p-1.5 bg-slate-100 rounded-lg text-slate-600"><PieChart size={16} /></div>
              </div>
              <div className="text-3xl font-bold text-slate-900">0.35%</div>
              <div className="mt-4 flex items-center gap-2">
                  <div className="flex items-center text-xs font-bold bg-emerald-50 text-emerald-600 px-2 py-1 rounded border border-emerald-100">
                      <ArrowUp size={12} className="mr-1" /> +0.02%
                  </div>
                  <span className="text-xs text-slate-400">avg. per txn</span>
              </div>
              {/* Sparkline Decor */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-100">
                  <div className="h-full bg-emerald-500 w-[65%]"></div>
              </div>
          </motion.div>

          {/* Distributor Payout */}
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
              <div className="flex justify-between items-start mb-2">
                  <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">Distributor Payout</div>
                  <div className="p-1.5 bg-slate-100 rounded-lg text-slate-600"><Wallet size={16} /></div>
              </div>
              <div className="text-3xl font-bold text-slate-900">₹ 1.2L</div>
              <div className="mt-4 flex items-center gap-2">
                  <span className="text-xs text-slate-400">Commission distributed</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-100">
                  <div className="h-full bg-blue-500 w-[80%]"></div>
              </div>
          </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* --- Revenue Source Breakdown --- */}
          <motion.div variants={itemVariants} className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                  <div>
                      <h3 className="font-bold text-slate-800 text-lg">Revenue by Service</h3>
                      <p className="text-xs text-slate-500 mt-1">Contribution to total net profit.</p>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                      <BarChart2 size={20} />
                  </div>
              </div>
              
              <div className="space-y-6">
                  {[
                      { label: "AEPS (High Volume)", val: "45%", amt: "₹ 37,100", color: "bg-blue-600", track: "bg-blue-50" },
                      { label: "DMT (High Margin)", val: "30%", amt: "₹ 24,735", color: "bg-purple-600", track: "bg-purple-50" },
                      { label: "Recharge & Utilities", val: "15%", amt: "₹ 12,360", color: "bg-emerald-500", track: "bg-emerald-50" },
                      { label: "Others (Ins/Travel)", val: "10%", amt: "₹ 8,255", color: "bg-slate-400", track: "bg-slate-100" }
                  ].map((item, i) => (
                      <div key={i} className="group">
                          <div className="flex justify-between text-sm font-bold mb-2">
                              <span className="text-slate-700 group-hover:text-blue-600 transition-colors">{item.label}</span>
                              <div className="flex gap-4">
                                  <span className="text-slate-500 font-mono text-xs mt-0.5">{item.amt}</span>
                                  <span className="text-slate-900">{item.val}</span>
                              </div>
                          </div>
                          <div className={`w-full h-2.5 ${item.track} rounded-full overflow-hidden`}>
                              <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: item.val }}
                                  transition={{ duration: 1, delay: i * 0.1 }}
                                  className={`h-full ${item.color} rounded-full`}
                              />
                          </div>
                      </div>
                  ))}
              </div>
          </motion.div>

          {/* --- Slab Performance --- */}
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
              <div className="mb-6">
                  <h3 className="font-bold text-slate-800 text-lg">Slab Performance</h3>
                  <p className="text-xs text-slate-500 mt-1">Which transaction ranges yield the most.</p>
              </div>

              <div className="flex-1 space-y-3">
                  {[
                      { range: "₹3000 - ₹5000", vol: "High Vol", profit: "₹ 42k", trend: "up" },
                      { range: "₹1000 - ₹2999", vol: "Med Vol", profit: "₹ 18k", trend: "up" },
                      { range: "₹100 - ₹500", vol: "Low Vol", profit: "₹ 5k", trend: "down" },
                  ].map((slab, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                          <div>
                              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-0.5">Range</div>
                              <div className="font-bold text-slate-800 text-sm font-mono">{slab.range}</div>
                          </div>
                          
                          <div className="text-right">
                              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-0.5">Profit</div>
                              <div className={`font-bold text-sm ${slab.trend === 'up' ? 'text-emerald-600' : 'text-slate-600'}`}>
                                  {slab.profit}
                              </div>
                          </div>
                      </div>
                  ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl text-center">
                  <p className="text-xs text-blue-700 font-medium">
                      Tip: Increase margins for <span className="font-bold">₹3000+</span> slab to boost revenue by est. 5%.
                  </p>
              </div>
          </motion.div>
      </div>

    </motion.div>
  );
};

export default ProfitAnalysis;