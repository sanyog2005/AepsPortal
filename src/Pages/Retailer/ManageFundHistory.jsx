import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Search, Download, Filter, 
  ArrowDownLeft, ArrowUpRight, Banknote, 
  RefreshCcw, FileText, ChevronDown 
} from 'lucide-react';

const ManageFundHistory = () => {
  const [activeTab, setActiveTab] = useState('credit'); // 'credit', 'debit', 'quick'
  const [startDate, setStartDate] = useState('2026-01-17');
  const [endDate, setEndDate] = useState('2026-01-17');

  // --- Configuration for Tabs ---
  const tabConfig = {
    credit: {
      label: "Credit History",
      icon: ArrowDownLeft,
      color: "text-emerald-600",
      activeClass: "bg-emerald-50 text-emerald-700 shadow-sm border-emerald-100",
      summaryLabels: ["Transactions", "Credit Amount", "Debit Amount", "Charge"],
      tableHeaderClass: "bg-gradient-to-r from-emerald-600 to-teal-600",
      tableCols: ["S#", "Txn Date", "Txn No.", "Paid By", "Received By", "Remarks", "Amount(CR)", "Amount(DR)", "Charge", "Balance"]
    },
    debit: {
      label: "Debit History",
      icon: ArrowUpRight,
      color: "text-rose-600",
      activeClass: "bg-rose-50 text-rose-700 shadow-sm border-rose-100",
      summaryLabels: ["Transactions", "Credit Amount", "Debit Amount", "Charge"],
      tableHeaderClass: "bg-gradient-to-r from-rose-600 to-pink-600",
      tableCols: ["S#", "Txn Date", "Txn No.", "Received By", "Paid By", "Remarks", "Amount(CR)", "Amount(DR)", "Charge", "Balance"]
    },
    quick: {
      label: "Quick N Fund",
      icon: Banknote,
      color: "text-blue-600",
      activeClass: "bg-blue-50 text-blue-700 shadow-sm border-blue-100",
      summaryLabels: ["Transactions", "Quick Collect", "Quick Paid", "Charge"],
      tableHeaderClass: "bg-gradient-to-r from-blue-600 to-indigo-600",
      tableCols: ["S#", "Txn Date", "Txn No.", "Quick Paid", "Quick Collect", "Remarks", "Amount(CR)", "Amount(DR)", "Charge", "Balance"]
    }
  };

  const currentTab = tabConfig[activeTab];

  // --- Sub-Components ---

  const SummaryCard = ({ label, value, icon: Icon, colorClass }) => (
    <div className={`p-5 rounded-2xl border bg-white shadow-sm flex flex-col justify-between h-full hover:shadow-md transition-shadow`}>
      <div className="flex justify-between items-start mb-2">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</p>
        <div className={`p-2 rounded-lg bg-slate-50 ${colorClass}`}>
          <Icon size={16} />
        </div>
      </div>
      <p className="text-2xl font-extrabold text-slate-800 tracking-tight">{value}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 pb-24 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* 1. Header & Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-200 pb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Fund History</h1>
            <p className="text-slate-500 font-medium mt-1">Track wallet movements and fund settlements.</p>
          </div>

          {/* Modern Pill Tabs */}
          <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 flex overflow-x-auto no-scrollbar">
            {Object.keys(tabConfig).map((key) => {
              const tab = tabConfig[key];
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
                    isActive 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                  }`}
                >
                  <tab.icon size={16} className={isActive ? 'text-white' : tab.color} /> {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* 2. Filters Toolbar */}
            <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-200 flex flex-col lg:flex-row gap-4 justify-between items-center">
                {/* Date Range */}
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 w-full lg:w-auto hover:border-slate-300 transition-colors">
                    <Calendar size={18} className="text-slate-400 mr-3"/>
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="bg-transparent text-sm text-slate-700 outline-none font-bold uppercase cursor-pointer" />
                    <span className="text-slate-300 mx-3">|</span>
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="bg-transparent text-sm text-slate-700 outline-none font-bold uppercase cursor-pointer" />
                </div>

                {/* Search & Export */}
                <div className="flex gap-3 w-full lg:w-auto">
                    <div className="relative flex-1 lg:w-80 group">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"/>
                        <input 
                            type="text" 
                            placeholder="Global Search..." 
                            className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                        />
                    </div>
                    <button className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95 flex items-center gap-2">
                        <Search size={18} />
                    </button>
                    <button className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors flex items-center gap-2">
                        <Download size={18} />
                    </button>
                </div>
            </div>

            {/* 3. Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <SummaryCard label={currentTab.summaryLabels[0]} value="0" icon={FileText} colorClass="text-slate-600" />
                <SummaryCard label={currentTab.summaryLabels[1]} value="0.00" icon={ArrowDownLeft} colorClass="text-emerald-600" />
                <SummaryCard label={currentTab.summaryLabels[2]} value="0.00" icon={ArrowUpRight} colorClass="text-rose-600" />
                <SummaryCard label={currentTab.summaryLabels[3]} value="0.00" icon={RefreshCcw} colorClass="text-blue-600" />
            </div>

            {/* 4. Data Table */}
            <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden min-h-[400px]">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className={`${currentTab.tableHeaderClass} text-white`}>
                            <tr>
                                {currentTab.tableCols.map((col, index) => (
                                    <th key={index} className={`px-6 py-5 text-xs font-bold uppercase tracking-wider ${index > 5 ? 'text-right' : ''} first:rounded-tl-[2rem] last:rounded-tr-[2rem]`}>{col}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                            {/* Empty State */}
                            <tr>
                                <td colSpan={currentTab.tableCols.length} className="px-6 py-20 text-center">
                                    <div className="flex flex-col items-center justify-center gap-4 opacity-40">
                                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
                                            <Search size={32} className="text-slate-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-slate-700">No Records Found</h4>
                                            <p className="text-sm text-slate-500">Try adjusting the date range or filters.</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
};

export default ManageFundHistory;