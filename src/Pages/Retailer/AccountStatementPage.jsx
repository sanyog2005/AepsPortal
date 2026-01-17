import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Search, Download, RefreshCcw, 
  Wallet, ArrowRightLeft, FileText, Landmark, Send, 
  TrendingUp, TrendingDown, DollarSign, Percent, AlertCircle 
} from 'lucide-react';

const AccountStatementPage = () => {
  const [activeTab, setActiveTab] = useState('account'); // 'account', 'aeps', 'transfer'
  const [startDate, setStartDate] = useState('2026-01-17');
  const [endDate, setEndDate] = useState('2026-01-17');

  // --- Sub-Components ---

  const SummaryCard = ({ label, value, icon: Icon, colorTheme = "blue" }) => {
    const themes = {
      blue: "border-blue-100 bg-blue-50/50 text-blue-600",
      emerald: "border-emerald-100 bg-emerald-50/50 text-emerald-600",
      rose: "border-rose-100 bg-rose-50/50 text-rose-600",
      orange: "border-orange-100 bg-orange-50/50 text-orange-600",
      purple: "border-purple-100 bg-purple-50/50 text-purple-600",
      slate: "border-slate-100 bg-slate-50/50 text-slate-600",
    };

    return (
      <div className={`p-5 rounded-2xl border ${themes[colorTheme]} shadow-sm flex flex-col justify-between h-full hover:shadow-md transition-all duration-300 group`}>
        <div className="flex justify-between items-start mb-2">
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">{label}</p>
          <div className={`p-2 rounded-lg bg-white shadow-sm opacity-80 group-hover:scale-110 transition-transform`}>
            <Icon size={16} />
          </div>
        </div>
        <p className="text-2xl font-extrabold tracking-tight">{value}</p>
      </div>
    );
  };

  const BalanceCard = ({ title, amount, icon: Icon, gradient }) => (
    <div className={`relative overflow-hidden rounded-[2rem] p-8 text-white shadow-xl ${gradient} flex flex-col justify-between h-48 group`}>
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700"></div>
      
      <div className="relative z-10 flex justify-between items-start">
        <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/10">
          <Icon size={24} className="text-white" />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest bg-black/10 px-3 py-1 rounded-full border border-white/5">Available</span>
      </div>

      <div className="relative z-10">
        <p className="text-sm font-medium opacity-90 mb-1">{title}</p>
        <h3 className="text-4xl font-bold tracking-tight">₹ {amount}</h3>
      </div>
    </div>
  );

  // --- Views ---

  // 1. Ledger View (Shared)
  const LedgerView = ({ type }) => (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
      className="space-y-8"
    >
      {/* Filters Toolbar */}
      <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-200 flex flex-col xl:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 shadow-inner">
            <Calendar size={18} className="text-slate-400 mr-3"/>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="bg-transparent text-sm text-slate-700 outline-none font-bold uppercase" />
            <span className="text-slate-300 mx-3">|</span>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="bg-transparent text-sm text-slate-700 outline-none font-bold uppercase" />
          </div>
          <button className="p-3 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95">
            <Search size={18} />
          </button>
        </div>

        <div className="flex gap-3 w-full xl:w-auto">
          <div className="relative flex-1 xl:w-72">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
            <input 
              type="text" 
              placeholder={`Search ${type === 'aeps' ? 'AEPS' : 'Account'} records...`}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
          </div>
          <button className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors flex items-center gap-2">
            <Download size={18} /> Export
          </button>
        </div>
      </div>

      {/* Summary Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <SummaryCard label="Transactions" value="0" icon={FileText} colorTheme="slate" />
        <SummaryCard label="Credit Amount" value="0.00" icon={TrendingUp} colorTheme="emerald" />
        <SummaryCard label="Debit Amount" value="0.00" icon={TrendingDown} colorTheme="rose" />
        <SummaryCard label="Charges" value="0.00" icon={AlertCircle} colorTheme="orange" />
        <SummaryCard label="TDS" value="0.00" icon={Percent} colorTheme="purple" />
        <SummaryCard label="Commission" value="0.00" icon={DollarSign} colorTheme="blue" />
      </div>

      {/* Modern Data Table */}
      <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden min-h-[400px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className={`${type === 'aeps' ? 'bg-gradient-to-r from-purple-600 to-indigo-600' : 'bg-gradient-to-r from-blue-600 to-cyan-600'} text-white`}>
              <tr>
                <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider rounded-tl-[2rem]">S#</th>
                <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider">Date</th>
                <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider w-1/3">Description</th>
                <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-right bg-black/10">Credit</th>
                <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-right bg-black/20">Debit</th>
                <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-right">Charge</th>
                <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-right">Comm.</th>
                <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-right">TDS</th>
                <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-right rounded-tr-[2rem]">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
              {/* Empty State */}
              <tr>
                <td colSpan="9" className="px-6 py-20 text-center">
                  <div className="flex flex-col items-center justify-center gap-4 opacity-40">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center">
                      <RefreshCcw size={32} className="text-slate-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-600">No Records Found</h4>
                      <p className="text-sm">Try adjusting the date range or filters.</p>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );

  // 2. Transfer View
  const TransferView = () => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
      className="max-w-5xl mx-auto space-y-10 mt-6"
    >
      {/* 1. Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <BalanceCard 
          title="AEPS Settlement Balance" 
          amount="0.00" 
          icon={Landmark} 
          gradient="bg-gradient-to-br from-purple-600 to-indigo-700 shadow-purple-200"
        />
        <BalanceCard 
          title="Main Wallet Balance" 
          amount="103.93" 
          icon={Wallet} 
          gradient="bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-200"
        />
      </div>

      {/* 2. Transfer Form */}
      <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
        {/* Top Decoration */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
        
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center justify-center gap-3">
            <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
              <ArrowRightLeft size={24} />
            </div>
            Move Funds to Wallet
          </h2>

          <div className="space-y-8">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block ml-1">Transfer Amount</label>
              <div className="relative group">
                <input 
                  type="number" 
                  placeholder="0.00" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 font-bold text-2xl text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-lg focus:shadow-blue-500/10 transition-all placeholder:text-slate-300"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm bg-white px-2 py-1 rounded-lg border border-slate-100 shadow-sm group-focus-within:text-blue-600 group-focus-within:border-blue-100">INR</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block ml-1">Remark (Optional)</label>
              <input 
                type="text" 
                placeholder="e.g. Settlement for Jan" 
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 font-medium text-slate-700 focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow transition-all"
              />
            </div>

            <button className="w-full bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-slate-300 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 active:scale-[0.98]">
              <Send size={20} /> Confirm Transfer
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 pb-24 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Page Header & Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-200 pb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Financial Statements</h1>
            <p className="text-slate-500 font-medium mt-2">Track ledger history and manage fund settlements.</p>
          </div>

          {/* Toggle Switch */}
          <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 flex">
            {[
              { id: 'account', label: 'Account Statement', icon: FileText },
              { id: 'aeps', label: 'AEPS Statement', icon: Landmark },
              { id: 'transfer', label: 'Fund Transfer', icon: ArrowRightLeft },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 transition-all duration-300 ${
                  activeTab === tab.id 
                  ? 'bg-slate-900 text-white shadow-md transform scale-105' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                <tab.icon size={16} /> {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === 'account' && <LedgerView key="account" type="account" />}
          {activeTab === 'aeps' && <LedgerView key="aeps" type="aeps" />}
          {activeTab === 'transfer' && <TransferView key="transfer" />}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default AccountStatementPage;