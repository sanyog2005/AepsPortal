import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Fingerprint, Send, QrCode, Wallet, FileText, 
  ArrowUpRight, TrendingUp, AlertCircle, Search,
  Smartphone, CreditCard, RefreshCw, CheckCircle2,
  Bell, ChevronRight, Plus, Menu, X, ArrowDownLeft
} from 'lucide-react';

// --- ANIMATION VARIANTS ---
const containerVar = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemVar = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 50 } }
};

// --- SUB-COMPONENTS ---

const DashboardHeader = () => (
  <div className="flex justify-between items-center mb-6 sticky top-0 z-30 bg-[#F8FAFC]/80 backdrop-blur-md py-4 -mx-4 px-4 md:static md:bg-transparent md:p-0">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg shadow-slate-900/20">
        RT
      </div>
      <div>
        <h1 className="text-lg md:text-2xl font-bold text-slate-900 leading-tight">Rajat Telecom</h1>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <p className="text-xs text-slate-500 font-medium">Online • ID: 88291</p>
        </div>
      </div>
    </div>

    <div className="flex items-center gap-3">
      {/* Mobile Search Icon / Desktop Search Bar */}
      <div className="hidden md:flex relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
        <input 
          type="text" 
          placeholder="Search..." 
          className="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 w-64 transition-all"
        />
      </div>
      <button className="md:hidden p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600">
        <Search size={20} />
      </button>

      <button className="relative p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
        <Bell size={20} />
        <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
      </button>
    </div>
  </div>
);

const WalletCard = ({ navigate }) => (
  <div className="bg-slate-900 rounded-[2rem] p-6 md:p-8 text-white relative overflow-hidden shadow-xl shadow-slate-900/20 group h-full flex flex-col justify-between">
    {/* Abstract Art */}
    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-500/30 transition-colors duration-500"></div>
    
    <div className="relative z-10">
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-indigo-200 text-xs font-bold uppercase tracking-wider mb-1">Total Balance</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
            ₹ 24,590<span className="text-2xl text-slate-500">.00</span>
          </h2>
        </div>
        <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
          <Wallet size={24} className="text-indigo-400" />
        </div>
      </div>

      <div className="flex gap-3">
        <button 
          onClick={() => navigate('/retailer/wallet')}
          className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl text-sm font-bold shadow-lg shadow-indigo-900/50 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <Plus size={18} /> Add Money
        </button>
        <button 
          onClick={() => navigate('/retailer/reports')}
          className="px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-white transition-all backdrop-blur-md"
        >
          <FileText size={20} />
        </button>
      </div>
    </div>
  </div>
);

const SettlementCard = ({ navigate }) => (
  <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-slate-200 shadow-sm relative overflow-hidden h-full flex flex-col justify-between group">
    <div className="absolute -right-6 -top-6 text-slate-50 group-hover:text-slate-100 transition-colors">
      <Fingerprint size={140} />
    </div>
    
    <div className="relative z-10">
      <div className="flex justify-between items-center mb-6">
        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">AEPS Settlement</p>
        <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
          <ArrowDownLeft size={14} /> +₹1,240
        </div>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight mb-6">
        ₹ 12,450<span className="text-xl text-slate-400">.50</span>
      </h2>
      
      <button 
        onClick={() => navigate('/retailer/wallet')}
        className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 group-hover:border-slate-300"
      >
        Move to Bank <ArrowUpRight size={16} />
      </button>
    </div>
  </div>
);

const StatWidget = ({ icon: Icon, label, value, trend, color }) => (
  <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} text-white shadow-md`}>
      <Icon size={20} />
    </div>
    <div>
      <p className="text-slate-400 text-xs font-bold uppercase">{label}</p>
      <div className="flex items-end gap-2">
        <h4 className="text-xl font-bold text-slate-800 leading-none">{value}</h4>
        {trend && (
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded mb-0.5">
            {trend}
          </span>
        )}
      </div>
    </div>
  </div>
);

// 5. Responsive Transaction List
const TransactionList = ({ navigate }) => {
  const transactions = [
    { name: "AEPS Withdrawal", id: "TXN_882901", status: "Success", amt: "2,000.00", icon: Fingerprint, col: "text-orange-500", bg: "bg-orange-50" },
    { name: "Money Transfer", id: "TXN_882902", status: "Pending", amt: "5,000.00", icon: Send, col: "text-blue-500", bg: "bg-blue-50" },
    { name: "Jio Recharge", id: "TXN_882903", status: "Failed", amt: "299.00", icon: Smartphone, col: "text-purple-500", bg: "bg-purple-50" },
    { name: "UPI Payment", id: "TXN_882904", status: "Success", amt: "150.00", icon: QrCode, col: "text-emerald-500", bg: "bg-emerald-50" },
  ];

  return (
    <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <h3 className="font-bold text-lg text-slate-800">Recent Transactions</h3>
        <button onClick={() => navigate('/retailer/reports')} className="text-sm font-bold text-blue-600 hover:text-blue-700">See All</button>
      </div>
      
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-xs text-slate-400 uppercase font-bold">
            <tr>
              <th className="px-6 py-4">Service</th>
              <th className="px-6 py-4">Txn ID</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-sm">
            {transactions.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl ${row.bg} ${row.col} flex items-center justify-center`}>
                      <row.icon size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-700">{row.name}</p>
                      <p className="text-xs text-slate-400">Today, 12:30 PM</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-slate-500 text-xs">{row.id}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                    row.status === 'Success' ? 'bg-emerald-50 text-emerald-600' : 
                    row.status === 'Failed' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right font-bold text-slate-800">₹ {row.amt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile List View */}
      <div className="md:hidden divide-y divide-slate-100">
        {transactions.map((row, i) => (
          <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${row.bg} ${row.col} flex items-center justify-center`}>
                <row.icon size={18} />
              </div>
              <div>
                <p className="font-bold text-slate-800 text-sm">{row.name}</p>
                <div className="flex gap-2 text-xs">
                  <span className="text-slate-400">{row.id.slice(-6)}</span>
                  <span className={`${
                    row.status === 'Success' ? 'text-emerald-600' : 
                    row.status === 'Failed' ? 'text-rose-600' : 'text-amber-600'
                  } font-bold`}>• {row.status}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-slate-800">₹ {row.amt}</p>
              <p className="text-[10px] text-slate-400">12:30 PM</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 6. Floating Glass Dock
const FloatingDock = ({ navigate, onComingSoon }) => {
  const dockItems = [
    { label: 'AEPS', icon: Fingerprint, color: 'text-orange-500', bg: 'bg-orange-50', route: '/retailer/aeps' },
    { label: 'Transfer', icon: Send, color: 'text-blue-500', bg: 'bg-blue-50', route: '/retailer/dmt' },
    { label: 'UPI', icon: QrCode, color: 'text-emerald-500', bg: 'bg-emerald-50', route: '/retailer/upi' },
    { label: 'Recharge', icon: Smartphone, color: 'text-purple-500', bg: 'bg-purple-50', action: onComingSoon },
    { label: 'Bill Pay', icon: CreditCard, color: 'text-indigo-500', bg: 'bg-indigo-50', action: onComingSoon },
    { label: 'History', icon: FileText, color: 'text-slate-600', bg: 'bg-slate-100', route: '/retailer/reports' },
  ];

  return (
    <motion.div 
      initial={{ y: 100 }} animate={{ y: 0 }} 
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4"
    >
      <div className="pointer-events-auto bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] rounded-2xl p-2 flex gap-2 md:gap-4 overflow-x-auto no-scrollbar max-w-full">
        {dockItems.map((item, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.15, y: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => item.route ? navigate(item.route) : item.action()}
            className="flex flex-col items-center gap-1.5 min-w-[64px] p-2 rounded-xl transition-all group"
          >
            <div className={`w-11 h-11 rounded-2xl ${item.bg} flex items-center justify-center shadow-sm group-hover:shadow-lg transition-all border border-transparent group-hover:border-white/50`}>
              <item.icon size={22} className={item.color} />
            </div>
            <span className="text-[10px] font-bold text-slate-500 group-hover:text-slate-900 transition-colors whitespace-nowrap">
              {item.label}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

// --- MAIN RETAILER DASHBOARD ---

const RetailerDashboard = () => {
  const navigate = useNavigate();
  const handleComingSoon = () => alert("Module coming soon!");

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 md:px-8 pb-32 font-sans selection:bg-indigo-100">
      <motion.div 
        className="max-w-7xl mx-auto pt-4 md:pt-8"
        variants={containerVar}
        initial="hidden"
        animate="visible"
      >
        <DashboardHeader />

        {/* Top Grid: Wallets & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div variants={itemVar} className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <WalletCard navigate={navigate} />
            <SettlementCard navigate={navigate} />
          </motion.div>
          
          <motion.div variants={itemVar} className="flex flex-col gap-4">
            <StatWidget icon={TrendingUp} label="Earnings Today" value="₹ 845.00" trend="+12%" color="bg-emerald-500" />
            <StatWidget icon={CheckCircle2} label="Success Rate" value="99.2%" trend="Stable" color="bg-blue-500" />
            <StatWidget icon={AlertCircle} label="Pending Txns" value="03" color="bg-orange-500" />
            <div className="flex-1 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl p-5 text-white flex items-center justify-between shadow-lg relative overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform">
                <div className="relative z-10">
                    <p className="text-indigo-200 text-xs font-bold uppercase mb-1">Promotional</p>
                    <h3 className="font-bold text-lg leading-tight">Get 20% Extra<br/>Commission</h3>
                </div>
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                    <ArrowUpRight size={24} />
                </div>
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            </div>
          </motion.div>
        </div>

        {/* Transaction History */}
        <motion.div variants={itemVar}>
          <TransactionList navigate={navigate} />
        </motion.div>

      </motion.div>

      {/* Sticky Bottom Dock */}
      <FloatingDock navigate={navigate} onComingSoon={handleComingSoon} />
    </div>
  );
};

export default RetailerDashboard;