import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Calendar, Download, Filter, 
  Banknote, Smartphone, Fingerprint, CreditCard, 
  ArrowRight, FileBarChart
} from 'lucide-react';

// --- MOCK DATA (Matches Screenshot Content) ---
const SUMMARY_DATA = [
    { 
        id: 1, 
        category: "Money Transfer", 
        icon: Banknote,
        color: "bg-blue-100 text-blue-600",
        count: 0, 
        total: "0.00", 
        success: "0.00", 
        pending: "0.00", 
        failed: "0.00", 
        refPending: "0.00", 
        refunded: "0.00" 
    },
    { 
        id: 2, 
        category: "Utility/Recharge", 
        icon: Smartphone,
        color: "bg-purple-100 text-purple-600",
        count: 25, 
        total: "598.00", 
        success: "598.00", 
        pending: "0.00", 
        failed: "0.00", 
        refPending: "0.00", 
        refunded: "0.00" 
    },
    { 
        id: 3, 
        category: "AEPS/MATM", 
        icon: Fingerprint,
        color: "bg-emerald-100 text-emerald-600",
        count: 12, 
        total: "2,100.00", 
        success: "2,100.00", 
        pending: "0.00", 
        failed: "0.00", 
        refPending: "0.00", 
        refunded: "0.00" 
    },
    { 
        id: 4, 
        category: "Credit Card", 
        icon: CreditCard,
        color: "bg-amber-100 text-amber-600",
        count: 0, 
        total: "0.00", 
        success: "0.00", 
        pending: "0.00", 
        failed: "0.00", 
        refPending: "0.00", 
        refunded: "0.00" 
    },
];

const RetBusinessSummary = () => {
  const [dateFrom, setDateFrom] = useState('2026-01-16');
  const [dateTo, setDateTo] = useState('2026-01-16');

  // Helper to color code numbers based on column type
  const getValueClass = (type, value) => {
      const isZero = value === "0.00" || value === 0;
      if (isZero) return "text-slate-300";
      
      switch (type) {
          case 'success': return "text-emerald-600 font-bold";
          case 'pending': return "text-amber-500 font-bold";
          case 'failed': return "text-rose-600 font-bold";
          case 'total': return "text-slate-900 font-bold";
          default: return "text-slate-500";
      }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 font-sans text-slate-900 pb-12">
      
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
                  <div className="p-2 bg-indigo-600 rounded-lg text-white shadow-lg shadow-indigo-200">
                    <FileBarChart size={24} />
                  </div>
                  Business Summary
              </h1>
              <p className="text-slate-500 mt-1 ml-14">Comprehensive overview of transaction volumes and status.</p>
          </div>
          <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 font-bold rounded-xl hover:bg-emerald-100 transition-colors border border-emerald-100">
                  <Download size={18} /> Export Report
              </button>
          </div>
      </div>

      {/* 2. Filter Toolbar */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex flex-wrap items-center gap-4">
              
              {/* Category Select */}
              <div className="relative flex-1 min-w-[200px]">
                  <label className="absolute -top-2.5 left-3 bg-white px-1 text-[10px] font-bold text-slate-400 uppercase tracking-wide">Category</label>
                  <div className="relative">
                      <select className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 bg-white appearance-none">
                          <option>All Services</option>
                          <option>Money Transfer</option>
                          <option>AEPS</option>
                      </select>
                      <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
              </div>

              {/* Date Range */}
              <div className="flex items-center gap-2 flex-[2] min-w-[300px]">
                  <div className="relative flex-1">
                      <label className="absolute -top-2.5 left-3 bg-white px-1 text-[10px] font-bold text-slate-400 uppercase tracking-wide">From Date</label>
                      <input 
                        type="date" 
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                      />
                      <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                  <span className="text-slate-300"><ArrowRight size={16}/></span>
                  <div className="relative flex-1">
                      <label className="absolute -top-2.5 left-3 bg-white px-1 text-[10px] font-bold text-slate-400 uppercase tracking-wide">To Date</label>
                      <input 
                        type="date" 
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                      />
                      <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
              </div>

              {/* Action Button */}
              <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95">
                  Search Records
              </button>
          </div>
      </div>

      {/* 3. The Report Table */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                  <thead>
                      <tr className="bg-slate-50 text-slate-500 text-xs uppercase font-bold tracking-wider border-b border-slate-200">
                          <th className="px-6 py-5">Category</th>
                          <th className="px-6 py-5 text-center">Txn Count</th>
                          <th className="px-6 py-5 text-right">Total Volume</th>
                          <th className="px-6 py-5 text-right text-emerald-600">Success</th>
                          <th className="px-6 py-5 text-right text-amber-500">Pending</th>
                          <th className="px-6 py-5 text-right text-rose-500">Failed</th>
                          <th className="px-6 py-5 text-right text-slate-400">Refund Pending</th>
                          <th className="px-6 py-5 text-right text-slate-400">Refunded</th>
                      </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-slate-100">
                      {SUMMARY_DATA.map((row) => (
                          <motion.tr 
                            key={row.id} 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="hover:bg-slate-50/80 transition-colors group"
                          >
                              {/* Category Column */}
                              <td className="px-6 py-4">
                                  <div className="flex items-center gap-3">
                                      <div className={`p-2 rounded-lg ${row.color}`}>
                                          <row.icon size={20} />
                                      </div>
                                      <span className="font-bold text-slate-800">{row.category}</span>
                                  </div>
                              </td>

                              {/* Count */}
                              <td className="px-6 py-4 text-center">
                                  <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold border border-slate-200">
                                      {row.count}
                                  </span>
                              </td>

                              {/* Financial Columns */}
                              <td className={`px-6 py-4 text-right ${getValueClass('total', row.total)}`}>
                                  ₹ {row.total}
                              </td>
                              <td className={`px-6 py-4 text-right ${getValueClass('success', row.success)}`}>
                                  {row.success}
                              </td>
                              <td className={`px-6 py-4 text-right ${getValueClass('pending', row.pending)}`}>
                                  {row.pending}
                              </td>
                              <td className={`px-6 py-4 text-right ${getValueClass('failed', row.failed)}`}>
                                  {row.failed}
                              </td>
                              <td className={`px-6 py-4 text-right ${getValueClass('other', row.refPending)}`}>
                                  {row.refPending}
                              </td>
                              <td className={`px-6 py-4 text-right ${getValueClass('other', row.refunded)}`}>
                                  {row.refunded}
                              </td>
                          </motion.tr>
                      ))}
                      
                      {/* Total Footer Row */}
                      <tr className="bg-slate-50 border-t border-slate-200">
                          <td className="px-6 py-4 font-extrabold text-slate-900 uppercase tracking-wider text-xs">Grand Total</td>
                          <td className="px-6 py-4 text-center font-bold text-slate-900">37</td>
                          <td className="px-6 py-4 text-right font-bold text-slate-900">₹ 2,698.00</td>
                          <td className="px-6 py-4 text-right font-bold text-emerald-600">2,698.00</td>
                          <td className="px-6 py-4 text-right font-bold text-slate-300">0.00</td>
                          <td className="px-6 py-4 text-right font-bold text-slate-300">0.00</td>
                          <td className="px-6 py-4 text-right font-bold text-slate-300">0.00</td>
                          <td className="px-6 py-4 text-right font-bold text-slate-300">0.00</td>
                      </tr>
                  </tbody>
              </table>
          </div>
      </div>

    </div>
  );
};

export default RetBusinessSummary;