import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, Filter, Search, Calendar, CheckCircle2, 
  AlertCircle, Clock, Copy, ArrowUpRight 
} from 'lucide-react';

// --- Mock Data ---
const INITIAL_DATA = [
  { id: "SET_99201", date: "2023-10-24", time: "10:30 AM", amt: 1240500, count: 450, utr: "YESB8829100", status: "Success" },
  { id: "SET_99202", date: "2023-10-24", time: "02:15 PM", amt: 820000, count: 210, utr: "ICIC9928110", status: "Success" },
  { id: "SET_99203", date: "2023-10-23", time: "06:00 PM", amt: 45000, count: 12, utr: "--", status: "Pending" },
  { id: "SET_99204", date: "2023-10-23", time: "05:45 PM", amt: 150000, count: 45, utr: "HDFC7728192", status: "Failed" },
  { id: "SET_99205", date: "2023-10-22", time: "11:00 AM", amt: 2100000, count: 800, utr: "YESB7721002", status: "Success" },
];

const SettlementReports = () => {
  const [data, setData] = useState(INITIAL_DATA);
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  // --- Derived Data ---
  const totalSettled = data.filter(d => d.status === 'Success').reduce((acc, curr) => acc + curr.amt, 0);
  const pendingAmt = data.filter(d => d.status === 'Pending').reduce((acc, curr) => acc + curr.amt, 0);
  const successRate = Math.round((data.filter(d => d.status === 'Success').length / data.length) * 100) || 0;

  // --- Actions ---

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert("Settlement_Report_Oct23.csv downloaded successfully.");
    }, 1500);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Optional: Add a toast here
  };

  const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  // --- Filtering Logic ---
  const filteredData = data.filter(item => {
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    const matchesDate = dateFilter === '' || item.date === dateFilter;
    const matchesSearch = item.id.toLowerCase().includes(searchQuery.toLowerCase()) || item.utr.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesDate && matchesSearch;
  });

  return (
    <div className="space-y-6 font-sans text-slate-900">
      
      {/* --- Analytics Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Settled Volume</div>
              <div className="text-2xl font-extrabold text-slate-900">{formatCurrency(totalSettled)}</div>
              <div className="flex items-center gap-1 mt-1 text-xs font-bold text-emerald-600">
                  <ArrowUpRight size={14} /> +12% vs last week
              </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Pending Payouts</div>
              <div className="text-2xl font-extrabold text-slate-900">{formatCurrency(pendingAmt)}</div>
              <div className="flex items-center gap-1 mt-1 text-xs font-bold text-orange-500">
                  <Clock size={14} /> {data.filter(d => d.status === 'Pending').length} Batches processing
              </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Success Rate</div>
              <div className="text-2xl font-extrabold text-slate-900">{successRate}%</div>
              <div className="flex items-center gap-1 mt-1 text-xs font-bold text-slate-500">
                  Reliability Score
              </div>
          </div>
      </div>

      {/* --- Filter Toolbar --- */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm gap-4">
          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
             {/* Search */}
             <div className="relative">
                 <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                 <input 
                    type="text" 
                    placeholder="Search Batch ID or UTR..." 
                    className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 outline-none focus:ring-2 focus:ring-blue-500/50 w-full md:w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                 />
             </div>

             {/* Status Filter */}
             <select 
                className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
             >
                 <option value="All">All Status</option>
                 <option value="Success">Success</option>
                 <option value="Pending">Pending</option>
                 <option value="Failed">Failed</option>
             </select>

             {/* Date Filter */}
             <div className="relative">
                <input 
                    type="date" 
                    className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 outline-none focus:ring-2 focus:ring-blue-500/50" 
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                />
             </div>
          </div>

          <button 
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-70"
          >
              {isExporting ? (
                  <>Downloading...</>
              ) : (
                  <><Download size={16} /> Export CSV</>
              )}
          </button>
      </div>

      {/* --- Data Table --- */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm min-h-[400px]">
          <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200">
                  <tr className="text-xs text-slate-500 uppercase tracking-wider">
                      <th className="px-6 py-4 font-bold">Batch ID</th>
                      <th className="px-6 py-4 font-bold">Date & Time</th>
                      <th className="px-6 py-4 font-bold">Total Amount</th>
                      <th className="px-6 py-4 font-bold text-center">Txn Count</th>
                      <th className="px-6 py-4 font-bold">Bank Ref (UTR)</th>
                      <th className="px-6 py-4 font-bold text-right">Status</th>
                  </tr>
              </thead>
              <tbody className="text-sm text-slate-700 divide-y divide-slate-100">
                  <AnimatePresence>
                    {filteredData.length === 0 ? (
                         <tr>
                             <td colSpan="6" className="px-6 py-12 text-center text-slate-400">
                                 No records found matching your filters.
                             </td>
                         </tr>
                    ) : (
                        filteredData.map((row) => (
                            <motion.tr 
                                key={row.id}
                                layout
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }} 
                                exit={{ opacity: 0 }}
                                className="hover:bg-slate-50/80 transition-colors group"
                            >
                                <td className="px-6 py-4 font-mono font-bold text-blue-600">
                                    {row.id}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-bold text-slate-700">{row.date}</div>
                                    <div className="text-xs text-slate-400">{row.time}</div>
                                </td>
                                <td className="px-6 py-4 font-bold text-slate-900">
                                    {formatCurrency(row.amt)}
                                </td>
                                <td className="px-6 py-4 text-center font-medium">
                                    {row.count}
                                </td>
                                <td className="px-6 py-4">
                                    {row.utr === '--' ? (
                                        <span className="text-slate-400 text-xs italic">Waiting for Bank</span>
                                    ) : (
                                        <button 
                                            onClick={() => copyToClipboard(row.utr)}
                                            className="flex items-center gap-2 font-mono text-xs text-slate-600 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                                            title="Copy UTR"
                                        >
                                            {row.utr} <Copy size={12} />
                                        </button>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${
                                        row.status === 'Success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 
                                        row.status === 'Pending' ? 'bg-amber-50 text-amber-700 border border-amber-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
                                    }`}>
                                        {row.status === 'Success' && <CheckCircle2 size={12} />}
                                        {row.status === 'Pending' && <Clock size={12} />}
                                        {row.status === 'Failed' && <AlertCircle size={12} />}
                                        {row.status}
                                    </span>
                                </td>
                            </motion.tr>
                        ))
                    )}
                  </AnimatePresence>
              </tbody>
          </table>
          
          {/* Pagination Footer (Static for Demo) */}
          {filteredData.length > 0 && (
             <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center text-xs text-slate-500">
                 <span>Showing {filteredData.length} records</span>
                 <div className="flex gap-2">
                     <button className="px-3 py-1 border border-slate-200 rounded bg-white hover:bg-slate-50 disabled:opacity-50" disabled>Previous</button>
                     <button className="px-3 py-1 border border-slate-200 rounded bg-white hover:bg-slate-50 disabled:opacity-50" disabled>Next</button>
                 </div>
             </div>
          )}
      </div>
    </div>
  );
};

export default SettlementReports;