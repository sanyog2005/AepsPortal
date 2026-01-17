import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, Zap, Calendar, ArrowUpRight, ArrowDownLeft,
  UserPlus, CreditCard, Wallet, FileText, QrCode,
  Plane, AlertTriangle, RefreshCw, SmartphoneNfc, Landmark
} from 'lucide-react';

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

// --- Components ---

const BankTicker = () => (
  <motion.div 
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-rose-50 border border-rose-100 rounded-xl p-3 flex items-center gap-3 mb-6 overflow-hidden"
  >
    <div className="flex items-center gap-2 text-rose-600 font-bold whitespace-nowrap">
      <AlertTriangle size={18} />
      <span className="text-xs uppercase tracking-wider">Bank Down Alerts</span>
    </div>
    <div className="h-4 w-[1px] bg-rose-200"></div>
    <div className="flex-1 overflow-hidden relative h-6">
      <motion.div 
        animate={{ x: ["100%", "-100%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute whitespace-nowrap text-sm font-medium text-slate-700 flex gap-8"
      >
        <span>⚠️ ALLAHABAD BANK - Low Success Rate</span>
        <span>⚠️ ORIENTAL BANK OF COMMERCE - Server Maintenance</span>
        <span>⚠️ PAYTM PAYMENTS BANK - Down</span>
      </motion.div>
    </div>
  </motion.div>
);

// --- REPLACED SECTION: TOTAL BUSINESS SUMMARY (Exact Match) ---
const BusinessSummaryGrid = () => {
    return (
        <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm mt-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <span className="text-green-600">Total Business</span> Summary
                </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Row 1 */}
                <div className="bg-green-600 rounded-xl p-6 text-white text-center shadow-md flex flex-col justify-center items-center h-32 hover:scale-[1.02] transition-transform">
                    <h4 className="text-sm font-medium mb-2">Money Transfer</h4>
                    <span className="text-2xl font-bold">₹</span>
                </div>
                
                <div className="bg-red-600 rounded-xl p-6 text-white text-center shadow-md flex flex-col justify-center items-center h-32 hover:scale-[1.02] transition-transform">
                    <h4 className="text-sm font-medium mb-2">Utilities/Bill</h4>
                    <span className="text-2xl font-bold">₹</span>
                </div>

                <div className="bg-amber-400 rounded-xl p-6 text-white text-center shadow-md flex flex-col justify-center items-center h-32 hover:scale-[1.02] transition-transform">
                    <h4 className="text-sm font-medium mb-2">Credit Card Bill</h4>
                    <span className="text-2xl font-bold">₹ 0</span>
                </div>

                {/* Row 2 */}
                <div className="bg-gradient-to-b from-sky-400 to-sky-600 rounded-xl p-6 text-white text-center shadow-md flex flex-col justify-center items-center h-32 hover:scale-[1.02] transition-transform">
                    <h4 className="text-sm font-medium mb-2">Flight</h4>
                    <span className="text-2xl font-bold">₹ 0</span>
                </div>

                <div className="md:col-span-2 bg-gradient-to-r from-purple-500 to-fuchsia-600 rounded-xl p-6 text-white text-center shadow-md flex flex-col justify-center items-center h-32 hover:scale-[1.02] transition-transform">
                    <h4 className="text-sm font-medium mb-2">AEPS/MATM/MPOS/ADDHAR Pay</h4>
                    <span className="text-2xl font-bold">₹</span>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon, color, bg, subtext }) => (
  <motion.div 
    variants={itemVariants}
    whileHover={{ y: -5 }}
    className="relative overflow-hidden bg-white p-5 rounded-[20px] border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group cursor-default"
  >
    <div className="flex justify-between items-start">
      <div>
        <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">{title}</div>
        <div className="text-2xl font-extrabold text-slate-900 tracking-tight">{value}</div>
        {subtext && <div className="text-xs text-slate-400 mt-1 font-medium">{subtext}</div>}
      </div>
      <div className={`p-2.5 rounded-xl ${bg} ${color} group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
    </div>
  </motion.div>
);

const ActionButton = ({ label, icon: Icon, color, onClick, badge }) => (
  <motion.button
    variants={itemVariants}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="flex flex-col items-center justify-center p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all gap-2 h-28 group relative overflow-hidden"
  >
    {badge && (
      <span className="absolute top-2 right-2 bg-slate-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
        {badge}
      </span>
    )}
    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${color} group-hover:bg-opacity-80`}>
      <Icon size={20} className="text-white" />
    </div>
    <span className="text-xs font-bold text-slate-700 text-center leading-tight">{label}</span>
  </motion.button>
);

const ADashboardHome = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6 max-w-7xl mx-auto pb-10"
    >
      
      {/* --- Header --- */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 pb-2">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">My Business</h1>
          <p className="text-slate-500 mt-1 font-medium flex items-center gap-2">
             <Calendar size={14} /> Balance Summary & Operations
          </p>
        </div>
        
        <div className="flex gap-3">
             <motion.div whileHover={{ scale: 1.02 }} className="px-5 py-2 bg-slate-900 text-white rounded-xl shadow-lg shadow-slate-900/20 flex flex-col items-end cursor-pointer">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Main Balance</span>
                <span className="text-lg font-bold">₹ 1,24,592.00</span>
             </motion.div>
        </div>
      </div>

      {/* --- Live Ticker --- */}
      <BankTicker />

      {/* --- Section 1: Business Summary (Stats) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
            title="Money Transfer" 
            value="₹ 4.2L" 
            icon={<RefreshCw size={22}/>} 
            color="text-blue-600" 
            bg="bg-blue-50" 
            subtext="Volume Today"
        />
        <StatCard 
            title="AEPS / MATM / Aadhaar" 
            value="₹ 82k" 
            icon={<SmartphoneNfc size={22}/>} 
            color="text-emerald-600" 
            bg="bg-emerald-50" 
            subtext="Live Updates"
        />
        <StatCard 
            title="Utilities / Bill" 
            value="₹ 12.5k" 
            icon={<Zap size={22}/>} 
            color="text-amber-600" 
            bg="bg-amber-50" 
        />
        <StatCard 
            title="Flight Booking" 
            value="₹ 0" 
            icon={<Plane size={22}/>} 
            color="text-violet-600" 
            bg="bg-violet-50" 
            subtext="No bookings today"
        />
      </div>

      {/* --- Section 2: Operations Hub (Split Layout) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Fund & Network Management */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* Quick Operations Grid */}
            <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Zap size={16} className="text-blue-600"/> Quick Operations
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <ActionButton label="Create Distributor" icon={UserPlus} color="bg-blue-600" onClick={() => navigate('/create-distributor')} />
                    <ActionButton label="Credit Money" icon={ArrowDownLeft} color="bg-emerald-500" onClick={() => navigate('/credit')} />
                    <ActionButton label="Withdraw Money" icon={ArrowUpRight} color="bg-rose-500" onClick={() => navigate('/withdraw')} />
                    <ActionButton label="Quick N Fund" icon={Zap} color="bg-amber-500" onClick={() => navigate('/quick-fund')} />
                    <ActionButton label="Add Fund" icon={Wallet} color="bg-indigo-600" onClick={() => navigate('/add-fund')} />
                    <ActionButton label="Acct. Statement" icon={FileText} color="bg-slate-600" onClick={() => navigate('/statement')} />
                    <ActionButton label="Pending Requests" icon={Activity} color="bg-orange-500" badge="3" onClick={() => navigate('/pending')} />
                    <ActionButton label="Cr/Dr Summary" icon={Landmark} color="bg-teal-600" onClick={() => navigate('/summary')} />
                </div>
            </div>

            {/* --- REPLACED: Payment Collection with NEW SUMMARY GRID --- */}
            <BusinessSummaryGrid />

        </div>

        {/* Right: Summary & Recent (Vertical Stack) */}
        <div className="space-y-4">
            
            {/* Zero Balance Cards (Compact) */}
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col items-center justify-center text-center">
                    <div className="p-2 bg-rose-50 rounded-full mb-2"><CreditCard size={16} className="text-rose-500"/></div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">CC Bill</span>
                    <span className="text-lg font-bold text-slate-800">₹ 0</span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col items-center justify-center text-center">
                    <div className="p-2 bg-indigo-50 rounded-full mb-2"><Activity size={16} className="text-indigo-500"/></div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Total Biz</span>
                    <span className="text-lg font-bold text-slate-800">Summary</span>
                </div>
            </div>

            {/* Recent Transactions List */}
            <motion.div 
                variants={itemVariants}
                className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-sm flex flex-col h-full"
            >
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-slate-800 text-sm">Recent Transactions</h3>
                    <button className="text-xs text-blue-600 font-bold hover:underline">View All</button>
                </div>
                
                <div className="space-y-3 flex-1 overflow-auto max-h-[400px]">
                    {[
                        { title: "Money Transfer", id: "TXN88291", amt: "₹ 5,000", status: "Success", time: "10:42 AM" },
                        { title: "Bill Payment", id: "TXN88292", amt: "₹ 840", status: "Pending", time: "10:15 AM" },
                        { title: "AEPS W/D", id: "TXN88293", amt: "₹ 2,000", status: "Success", time: "09:30 AM" },
                        { title: "Quick Fund", id: "TXN88294", amt: "₹ 10,000", status: "Failed", time: "Yesterday" },
                        { title: "Credit Card", id: "TXN88295", amt: "₹ 12,400", status: "Success", time: "Yesterday" },
                    ].map((tx, i) => (
                        <div key={i} className="flex justify-between items-center p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer group">
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${tx.status === 'Success' ? 'bg-emerald-100 text-emerald-600' : tx.status === 'Pending' ? 'bg-amber-100 text-amber-600' : 'bg-rose-100 text-rose-600'}`}>
                                    {tx.status === 'Success' ? <ArrowUpRight size={14}/> : <Activity size={14}/>}
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-slate-800">{tx.title}</div>
                                    <div className="text-[10px] text-slate-400 font-mono">{tx.id}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs font-bold text-slate-800">{tx.amt}</div>
                                <div className="text-[10px] text-slate-400">{tx.time}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
      </div>

    </motion.div>
  );
};

export default ADashboardHome;