import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Download, Calendar, RefreshCcw, 
  QrCode, CreditCard, ChevronDown, CheckCircle2, 
  XCircle, Clock, ArrowUpRight, Banknote, List, 
  TrendingUp, Activity, PieChart
} from 'lucide-react';

// --- MOCK DATA ---
const MOCK_QR_DATA = [
    { id: 1, txn: "QR99201", date: "16/01/2026", type: "Dynamic", detail: "9876543210", ref: "REF55421", amount: "500.00", info: "UTR: SBI123456", status: "Success" },
    { id: 2, txn: "QR99202", date: "16/01/2026", type: "Static", detail: "8877665544", ref: "REF55422", amount: "1200.00", info: "-", status: "Pending" },
];

const MOCK_PG_DATA = [
    { id: 1, txn: "PG88210", date: "16/01/2026", type: "UPI", detail: "Rahul Kumar", ref: "pay_Mx92...", amount: "2000.00", info: "Comm: ₹5.00", status: "Success" },
    { id: 2, txn: "PG88211", date: "15/01/2026", type: "Card", detail: "Vijay Store", ref: "pay_Mz11...", amount: "540.00", info: "Chg: ₹12.50", status: "Failed" },
];

const MOCK_TXN_DATA = [
    { id: 1, txn: "TXN1001", date: "16/01/2026", type: "DMT", detail: "Suresh (SBI)", ref: "IMPS8821", amount: "5000.00", info: "Chg: ₹10", status: "Success" },
    { id: 2, txn: "TXN1002", date: "16/01/2026", type: "AEPS", detail: "Withdrawal", ref: "RRN9921", amount: "2000.00", info: "Comm: ₹8", status: "Success" },
];

const MOCK_CC_DATA = [
    { id: 1, txn: "CC5501", date: "15/01/2026", type: "Visa", detail: "XXXX-4421", ref: "BBPS_001", amount: "12500.00", info: "Bill Payment", status: "Success" },
    { id: 2, txn: "CC5502", date: "14/01/2026", type: "Master", detail: "XXXX-8821", ref: "BBPS_002", amount: "4500.00", info: "Pending Bank", status: "Pending" },
];

const RetPaymentReports = () => {
  const [activeMode, setActiveMode] = useState('QR'); // 'QR', 'PG', 'TXN', 'CC'
  const [searchTerm, setSearchTerm] = useState('');

  // Helper to get current data based on active tab
  const getCurrentData = () => {
      switch(activeMode) {
          case 'QR': return MOCK_QR_DATA;
          case 'PG': return MOCK_PG_DATA;
          case 'TXN': return MOCK_TXN_DATA;
          case 'CC': return MOCK_CC_DATA;
          default: return [];
      }
  };

  const getSummaryStats = () => {
      // Mock summary logic for demonstration
      if (activeMode === 'PG') return [
          { label: "Total Volume", value: "₹ 4.2L", icon: TrendingUp, color: "emerald" },
          { label: "Success Rate", value: "98.5%", icon: Activity, color: "blue" },
          { label: "Commission", value: "₹ 840", icon: PieChart, color: "purple" },
      ];
      if (activeMode === 'TXN') return [
          { label: "Total Txns", value: "1,240", icon: List, color: "indigo" },
          { label: "Failed", value: "12", icon: XCircle, color: "rose" },
      ];
      return [];
  };

  const StatusBadge = ({ status }) => {
      const config = {
          Success: { color: 'text-emerald-600', dot: 'bg-emerald-500' },
          Pending: { color: 'text-amber-600', dot: 'bg-amber-500' },
          Failed: { color: 'text-rose-600', dot: 'bg-rose-500' },
      };
      const style = config[status] || config.Pending;

      return (
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-100 shadow-sm ${style.color}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${style.dot} animate-pulse`}></span>
              <span className="text-xs font-bold uppercase tracking-wide">{status}</span>
          </div>
      );
  };

  const SummaryCard = ({ label, value, icon: Icon, color }) => (
      <div className={`p-4 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all`}>
          <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
              <p className="text-xl font-bold text-slate-800">{value}</p>
          </div>
          <div className={`p-3 rounded-xl bg-${color}-50 text-${color}-600`}>
              <Icon size={20} />
          </div>
      </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 pb-24 font-sans text-slate-900">
      <div className="max-w-[1600px] mx-auto space-y-8">
      
      {/* 1. Header & Multi-Toggle Switch */}
      <div className="flex flex-col xl:flex-row justify-between items-end gap-6 border-b border-slate-200 pb-8">
          <div>
              <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2.5 rounded-xl text-white shadow-lg shadow-slate-200 ${
                      activeMode === 'QR' ? 'bg-indigo-600' : 
                      activeMode === 'PG' ? 'bg-blue-600' :
                      activeMode === 'TXN' ? 'bg-emerald-600' : 'bg-rose-600'
                  }`}>
                      {activeMode === 'QR' && <QrCode size={24}/>}
                      {activeMode === 'PG' && <CreditCard size={24}/>}
                      {activeMode === 'TXN' && <List size={24}/>}
                      {activeMode === 'CC' && <Banknote size={24}/>}
                  </div>
                  <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    {activeMode === 'QR' && 'QR Code Master'}
                    {activeMode === 'PG' && 'PG Transactions'}
                    {activeMode === 'TXN' && 'Ledger Reports'}
                    {activeMode === 'CC' && 'Credit Card Bills'}
                  </h1>
              </div>
              <p className="text-slate-500 font-medium ml-1">
                  {activeMode === 'QR' && 'Monitor static & dynamic QR collections'}
                  {activeMode === 'PG' && 'Track Payment Gateway settlements'}
                  {activeMode === 'TXN' && 'All wallet transfers and service logs'}
                  {activeMode === 'CC' && 'Credit card bill payment history'}
              </p>
          </div>

          {/* Toggle Button Group */}
          <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 flex overflow-x-auto no-scrollbar w-full xl:w-auto">
              {[
                  { id: 'QR', label: 'QR Code', icon: QrCode },
                  { id: 'PG', label: 'PG Reports', icon: CreditCard },
                  { id: 'TXN', label: 'Transactions', icon: List },
                  { id: 'CC', label: 'Credit Card', icon: Banknote },
              ].map((tab) => (
                  <button 
                      key={tab.id}
                      onClick={() => setActiveMode(tab.id)}
                      className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
                          activeMode === tab.id 
                          ? 'bg-slate-900 text-white shadow-md transform scale-[1.02]' 
                          : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                      }`}
                  >
                      <tab.icon size={16}/> {tab.label}
                  </button>
              ))}
          </div>
      </div>

      {/* 2. Contextual Summary Cards */}
      <AnimatePresence mode="wait">
          {getSummaryStats().length > 0 && (
              <motion.div 
                  key={activeMode}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                  {getSummaryStats().map((stat, i) => (
                      <SummaryCard key={i} {...stat} />
                  ))}
              </motion.div>
          )}
      </AnimatePresence>

      {/* 3. Filters Toolbar */}
      <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-200 flex flex-col lg:flex-row gap-4 justify-between items-center">
          
          {/* Left Filters */}
          <div className="flex flex-wrap gap-2 w-full lg:w-auto items-center">
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 hover:border-slate-300 transition-colors">
                  <Calendar size={18} className="text-slate-400 mr-3"/>
                  <input type="date" className="bg-transparent text-sm text-slate-700 font-bold outline-none uppercase cursor-pointer" />
                  <span className="text-slate-300 mx-3">|</span>
                  <input type="date" className="bg-transparent text-sm text-slate-700 font-bold outline-none uppercase cursor-pointer" />
              </div>

              <div className="relative group">
                  <select className="appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-10 py-3 text-sm font-bold text-slate-600 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all cursor-pointer hover:bg-slate-100">
                      <option>All Status</option>
                      <option>Success</option>
                      <option>Pending</option>
                      <option>Failed</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-blue-500 transition-colors"/>
              </div>
              
              <button className="bg-white border border-slate-200 text-slate-700 px-5 py-3 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all flex items-center gap-2">
                  <RefreshCcw size={16}/> Reset
              </button>
          </div>

          {/* Right Search */}
          <div className="flex gap-3 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-72 group">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"/>
                  <input 
                      type="text" 
                      placeholder="Global Search..." 
                      className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                  />
              </div>
              <button className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-5 py-3 rounded-xl text-sm font-bold hover:bg-emerald-100 transition-all flex items-center gap-2">
                  <Download size={18}/> Export
              </button>
          </div>
      </div>

      {/* 4. Data Table */}
      <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden min-h-[500px] flex flex-col">
          <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                  <thead className="bg-gradient-to-r from-slate-800 to-slate-900 text-white">
                      <tr>
                          <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider rounded-tl-[2rem]">#</th>
                          <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider">Transaction ID</th>
                          <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider">
                              {activeMode === 'QR' ? 'QR Type' : 
                               activeMode === 'PG' ? 'Method' :
                               activeMode === 'TXN' ? 'Service' : 'Card Type'}
                          </th>
                          <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider">
                              {activeMode === 'QR' ? 'Mobile No' : 
                               activeMode === 'PG' ? 'Customer' :
                               activeMode === 'TXN' ? 'Details' : 'Card Number'}
                          </th>
                          <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider">Reference No</th>
                          <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-right">Amount</th>
                          <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider">Additional Info</th>
                          <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider">Date</th>
                          <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-center">Status</th>
                          <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-right rounded-tr-[2rem]">Action</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                      {getCurrentData().map((row, i) => (
                          <motion.tr 
                              key={row.id} 
                              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                              className="hover:bg-slate-50/80 transition-colors group cursor-default"
                          >
                              <td className="px-6 py-4 font-medium text-slate-400">{i+1}</td>
                              <td className="px-6 py-4 font-mono font-bold text-slate-800">{row.txn}</td>
                              
                              <td className="px-6 py-4"><span className="bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-bold text-slate-600">{row.type}</span></td>
                              
                              <td className="px-6 py-4 font-medium text-slate-900">{row.detail}</td>
                              
                              <td className="px-6 py-4 font-mono text-xs text-slate-500">{row.ref}</td>
                              
                              <td className="px-6 py-4 text-right font-bold text-slate-900 text-base">₹ {row.amount}</td>
                              
                              <td className="px-6 py-4 text-xs font-medium text-slate-500">{row.info}</td>
                              
                              <td className="px-6 py-4 text-xs text-slate-500 font-mono">{row.date}</td>
                              
                              <td className="px-6 py-4 text-center">
                                  <div className="flex justify-center"><StatusBadge status={row.status} /></div>
                              </td>
                              
                              <td className="px-6 py-4 text-right">
                                  <button className="p-2 bg-slate-50 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-full transition-colors border border-transparent hover:border-blue-100">
                                      <ArrowUpRight size={18}/>
                                  </button>
                              </td>
                          </motion.tr>
                      ))}
                  </tbody>
              </table>
              
              {/* Empty State */}
              {getCurrentData().length === 0 && (
                  <div className="p-20 text-center text-slate-400 flex flex-col items-center justify-center">
                      <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                          <Search size={40} className="opacity-20"/>
                      </div>
                      <h3 className="text-lg font-bold text-slate-600">No Records Found</h3>
                      <p className="text-sm font-medium">Try adjusting your search or filters.</p>
                  </div>
              )}
          </div>
      </div>

      </div>
    </div>
  );
};

export default RetPaymentReports;