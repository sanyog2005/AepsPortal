import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Download, Calendar, RefreshCcw, 
  ArrowUpDown, AlertCircle, CheckCircle2, Clock 
} from 'lucide-react';

// --- MOCK DATA ---
const MOCK_DATA = [
  // Uncomment to test with data
  // { id: 1, txnId: "TXN882901", date: "17/01/2026", updated: "18/01/2026", user: "Rahul / 9876543210", bene: "Suresh Kumar", amount: "5000.00", charge: "10.00", service: "DMT", status: "Pending", utr: "-", response: "Bank processing" },
];

const RefundPendingPage = () => {
  const [startDate, setStartDate] = useState('2026-01-17');
  const [endDate, setEndDate] = useState('2026-01-17');
  const [searchQuery, setSearchQuery] = useState('');

  // --- Sub-Components ---
  const StatusBadge = ({ status }) => {
    const config = {
      Pending: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', icon: Clock },
      Success: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', icon: CheckCircle2 },
      Failed: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', icon: AlertCircle },
    };
    
    const style = config[status] || config.Pending;
    const Icon = style.icon;

    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${style.bg} ${style.text} ${style.border}`}>
        <Icon size={12} /> {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 pb-24 font-sans text-slate-900">
      <div className="max-w-[1400px] mx-auto space-y-8">
        
        {/* 1. Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600 border border-blue-100">
                <RefreshCcw size={24} />
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Refund Pending</h1>
            </div>
            <p className="text-slate-500 font-medium ml-1">Track and manage pending refund transactions.</p>
          </div>
        </div>

        {/* 2. Filters Toolbar */}
        <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-200 flex flex-col lg:flex-row gap-4 justify-between items-center">
            
            {/* Left: Date Range */}
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 w-full lg:w-auto hover:border-slate-300 transition-colors">
                <Calendar size={18} className="text-slate-400 mr-3"/>
                <input 
                  type="date" 
                  value={startDate} 
                  onChange={(e) => setStartDate(e.target.value)} 
                  className="bg-transparent text-sm text-slate-700 outline-none font-bold uppercase cursor-pointer" 
                />
                <span className="text-slate-300 mx-3">|</span>
                <input 
                  type="date" 
                  value={endDate} 
                  onChange={(e) => setEndDate(e.target.value)} 
                  className="bg-transparent text-sm text-slate-700 outline-none font-bold uppercase cursor-pointer" 
                />
            </div>

            {/* Right: Actions */}
            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
                <div className="relative flex-1 lg:w-72 group">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"/>
                    <input 
                        type="text" 
                        placeholder="Search Txn ID, Mobile..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                    />
                </div>
                
                <button className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm shadow-lg hover:bg-slate-800 transition-all active:scale-95 flex items-center gap-2">
                    <Search size={18} />
                </button>
                
                <button className="px-6 py-3 bg-amber-400 text-slate-900 rounded-xl font-bold text-sm shadow-lg shadow-amber-200 hover:bg-amber-500 transition-all active:scale-95 flex items-center gap-2">
                    <Download size={18} /> Export
                </button>
            </div>
        </div>

        {/* 3. Data Table */}
        <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden min-h-[500px] flex flex-col">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gradient-to-r from-slate-800 to-slate-900 text-white">
                        <tr>
                            <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider rounded-tl-[2rem]">S.R.</th>
                            <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider cursor-pointer hover:text-blue-300 group transition-colors">
                                <div className="flex items-center gap-1">Txn ID <ArrowUpDown size={12} className="opacity-50 group-hover:opacity-100"/></div>
                            </th>
                            <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider">Txn Date</th>
                            <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider">Updated On</th>
                            <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider">Name / Mobile</th>
                            <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider">Beneficiary</th>
                            <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-right">Amount</th>
                            <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-right">Charge</th>
                            <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider">Service</th>
                            <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-center">Status</th>
                            <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider">UTR</th>
                            <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider rounded-tr-[2rem]">Response</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                        {MOCK_DATA.length > 0 ? (
                            MOCK_DATA.map((row, index) => (
                                <tr key={index} className="hover:bg-slate-50/80 transition-colors group cursor-default">
                                    <td className="px-6 py-4 font-medium text-slate-400">{index + 1}</td>
                                    <td className="px-6 py-4 font-mono font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{row.txnId}</td>
                                    <td className="px-6 py-4 text-xs font-medium">{row.date}</td>
                                    <td className="px-6 py-4 text-xs font-medium">{row.updated}</td>
                                    <td className="px-6 py-4 font-bold text-slate-700">{row.user}</td>
                                    <td className="px-6 py-4 font-medium">{row.bene}</td>
                                    <td className="px-6 py-4 text-right font-bold text-slate-900">₹ {row.amount}</td>
                                    <td className="px-6 py-4 text-right text-rose-600 font-medium">₹ {row.charge}</td>
                                    <td className="px-6 py-4"><span className="bg-slate-100 px-2.5 py-1 rounded-lg text-xs font-bold text-slate-600 border border-slate-200">{row.service}</span></td>
                                    <td className="px-6 py-4 text-center"><StatusBadge status={row.status} /></td>
                                    <td className="px-6 py-4 font-mono text-xs text-slate-500">{row.utr}</td>
                                    <td className="px-6 py-4 max-w-[150px] truncate text-slate-500 italic" title={row.response}>{row.response}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="12" className="px-6 py-24 text-center">
                                    <div className="flex flex-col items-center justify-center gap-4 opacity-40">
                                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center">
                                            <AlertCircle size={32} className="text-slate-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-slate-700">No Records Found</h4>
                                            <p className="text-sm text-slate-500 mt-1">Try adjusting the date range or filters.</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>

      </div>
    </div>
  );
};

export default RefundPendingPage;