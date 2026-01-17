import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Download, Calendar, RefreshCcw, 
  QrCode, CreditCard, ChevronDown, CheckCircle2, 
  XCircle, Clock, AlertCircle, ArrowUpRight 
} from 'lucide-react';

// --- MOCK DATA: QR CODE ---
const MOCK_QR_DATA = [
    { id: 1, txn: "QR99201", date: "16/01/2026", type: "Dynamic", number: "9876543210", ref: "REF55421", amount: "500.00", utr: "SBI123456", updated: "16/01/2026", status: "Success", remarks: "Auto-verify" },
    { id: 2, txn: "QR99202", date: "16/01/2026", type: "Static", number: "8877665544", ref: "REF55422", amount: "1200.00", utr: "-", updated: "16/01/2026", status: "Pending", remarks: "Waiting for bank" },
];

// --- MOCK DATA: PG REPORTS ---
const MOCK_PG_DATA = [
    { id: 1, txn: "PG88210", mobile: "9876543210", customer: "Rahul Kumar", product: "Wallet Load", type: "UPI", amount: "2000.00", charge: "10.00", comm: "5.00", pgRef: "pay_Mx92...", status: "Success", date: "16/01/2026" },
    { id: 2, txn: "PG88211", mobile: "7654321098", customer: "Vijay Store", product: "Bill Pay", type: "Card", amount: "540.00", charge: "12.50", comm: "2.00", pgRef: "pay_Mz11...", status: "Failed", date: "15/01/2026" },
];

const DistPaymentReports = () => {
  const [activeMode, setActiveMode] = useState('QR'); // 'QR' or 'PG'
  const [searchTerm, setSearchTerm] = useState('');

  // --- Components ---

  const StatusBadge = ({ status }) => {
      const config = {
          Success: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', icon: CheckCircle2 },
          Pending: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', icon: Clock },
          Failed: { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-200', icon: XCircle },
      };
      const style = config[status] || config.Pending;
      const Icon = style.icon;

      return (
          <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${style.bg} ${style.text} ${style.border}`}>
              <Icon size={12} /> {status}
          </span>
      );
  };

  const SummaryCard = ({ label, value, color }) => (
      <div className={`p-4 rounded-2xl border ${color} bg-white shadow-sm flex flex-col items-center justify-center min-w-[140px]`}>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
          <p className="text-xl font-bold text-slate-800">{value}</p>
      </div>
  );

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 font-sans text-slate-900 pb-12">
      
      {/* 1. Header & Toggle Switch */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-[24px] shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${activeMode === 'QR' ? 'bg-indigo-600' : 'bg-blue-600'}`}>
                  {activeMode === 'QR' ? <QrCode size={24}/> : <CreditCard size={24}/>}
              </div>
              <div>
                  <h1 className="text-xl font-extrabold text-slate-900">{activeMode === 'QR' ? 'QR Code Master' : 'PG Transactions'}</h1>
                  <p className="text-xs text-slate-500 font-medium">
                      {activeMode === 'QR' ? 'Monitor static & dynamic QR collections' : 'Track Payment Gateway settlements'}
                  </p>
              </div>
          </div>

          {/* Toggle Button */}
          <div className="bg-slate-100 p-1.5 rounded-xl flex gap-1 mt-4 md:mt-0">
              <button 
                  onClick={() => setActiveMode('QR')}
                  className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeMode === 'QR' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                  <QrCode size={16}/> QR Code
              </button>
              <button 
                  onClick={() => setActiveMode('PG')}
                  className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeMode === 'PG' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                  <CreditCard size={16}/> PG Reports
              </button>
          </div>
      </div>

      {/* 2. PG Summary Cards (Only visible in PG Mode) */}
      <AnimatePresence>
          {activeMode === 'PG' && (
              <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid grid-cols-2 md:grid-cols-5 gap-4"
              >
                  <SummaryCard label="Total Txns" value="1,240" color="border-blue-100" />
                  <SummaryCard label="Volume" value="₹ 4.2L" color="border-emerald-100" />
                  <SummaryCard label="Charges" value="₹ 840" color="border-rose-100" />
                  <SummaryCard label="Commission" value="₹ 120" color="border-amber-100" />
                  <SummaryCard label="Refunds" value="0" color="border-slate-100" />
              </motion.div>
          )}
      </AnimatePresence>

      {/* 3. Filters Toolbar */}
      <div className="bg-white p-5 rounded-[24px] shadow-sm border border-slate-200 space-y-4">
          <div className="flex flex-wrap gap-3 items-center justify-between">
              
              {/* Left Filters */}
              <div className="flex flex-wrap gap-2 w-full lg:w-auto">
                  {/* Common Date Range */}
                  <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
                      <Calendar size={16} className="text-slate-400 mr-2"/>
                      <input type="date" className="bg-transparent text-sm text-slate-600 outline-none w-28" />
                      <span className="text-slate-300 mx-2">|</span>
                      <input type="date" className="bg-transparent text-sm text-slate-600 outline-none w-28" />
                  </div>

                  {/* Context Aware Dropdowns */}
                  <div className="relative">
                      <select className="appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-10 py-2.5 text-sm font-medium text-slate-600 focus:ring-2 focus:ring-indigo-500/20 outline-none">
                          <option>{activeMode === 'QR' ? 'Txn Status' : 'Txn Type'}</option>
                          <option>Success</option>
                          <option>Pending</option>
                          <option>Failed</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
                  </div>

                  {activeMode === 'QR' && (
                      <div className="relative">
                          <input type="text" placeholder="UTR Number" className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 w-32" />
                      </div>
                  )}
                  
                  <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg hover:bg-slate-800 transition-all flex items-center gap-2">
                      <Search size={16}/> Search
                  </button>
                  <button className="bg-white border border-slate-200 text-slate-600 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all flex items-center gap-2">
                      <RefreshCcw size={16}/> Reset
                  </button>
              </div>

              {/* Right Global Search & Export */}
              <div className="flex gap-2 w-full lg:w-auto">
                  <div className="relative flex-1 lg:w-64">
                      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                      <input 
                          type="text" 
                          placeholder="Global Search..." 
                          className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                      />
                  </div>
                  <button className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-100 transition-all flex items-center gap-2">
                      <Download size={18}/> Export
                  </button>
              </div>
          </div>
      </div>

      {/* 4. Data Table */}
      <div className="bg-white border border-slate-200 rounded-[24px] shadow-sm overflow-hidden min-h-[400px]">
          <div className="overflow-x-auto">
              <table className="w-full text-left">
                  <thead className={`${activeMode === 'QR' ? 'bg-indigo-600' : 'bg-blue-600'} text-white text-xs uppercase font-bold tracking-wider`}>
                      <tr>
                          <th className="px-6 py-4">#</th>
                          <th className="px-6 py-4">Transaction ID</th>
                          {activeMode === 'QR' ? (
                              <>
                                  <th className="px-6 py-4">Type</th>
                                  <th className="px-6 py-4">Ref / Number</th>
                                  <th className="px-6 py-4">UTR Info</th>
                              </>
                          ) : (
                              <>
                                  <th className="px-6 py-4">Customer</th>
                                  <th className="px-6 py-4">Product / Mode</th>
                                  <th className="px-6 py-4">PG Ref No</th>
                              </>
                          )}
                          <th className="px-6 py-4 text-right">Amount</th>
                          {activeMode === 'PG' && <th className="px-6 py-4 text-right">Comm.</th>}
                          <th className="px-6 py-4">Date</th>
                          <th className="px-6 py-4 text-center">Status</th>
                          <th className="px-6 py-4 text-right">Action</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                      {(activeMode === 'QR' ? MOCK_QR_DATA : MOCK_PG_DATA).map((row, i) => (
                          <motion.tr 
                              key={row.id} 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="hover:bg-slate-50 transition-colors group"
                          >
                              <td className="px-6 py-4 font-medium text-slate-400">{i+1}</td>
                              <td className="px-6 py-4 font-mono font-bold text-slate-800">{row.txn}</td>
                              
                              {activeMode === 'QR' ? (
                                  <>
                                      <td className="px-6 py-4"><span className="bg-slate-100 px-2 py-1 rounded border border-slate-200 text-xs font-bold">{row.type}</span></td>
                                      <td className="px-6 py-4">
                                          <div className="text-slate-900 font-medium">{row.number}</div>
                                          <div className="text-xs text-slate-400">{row.ref}</div>
                                      </td>
                                      <td className="px-6 py-4 font-mono text-xs">{row.utr}</td>
                                  </>
                              ) : (
                                  <>
                                      <td className="px-6 py-4">
                                          <div className="text-slate-900 font-medium">{row.customer}</div>
                                          <div className="text-xs text-slate-400">{row.mobile}</div>
                                      </td>
                                      <td className="px-6 py-4">
                                          <div className="flex gap-2">
                                              <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-xs font-bold">{row.type}</span>
                                              <span className="text-slate-500">{row.product}</span>
                                          </div>
                                      </td>
                                      <td className="px-6 py-4 font-mono text-xs text-slate-500 truncate max-w-[100px]">{row.pgRef}</td>
                                  </>
                              )}

                              <td className="px-6 py-4 text-right font-bold text-slate-900">₹ {row.amount}</td>
                              {activeMode === 'PG' && <td className="px-6 py-4 text-right text-emerald-600 font-bold text-xs">+ {row.comm}</td>}
                              
                              <td className="px-6 py-4 text-xs text-slate-500">
                                  {row.date} <br/> {row.updated && <span className="opacity-70">Upd: {row.updated}</span>}
                              </td>
                              
                              <td className="px-6 py-4 text-center">
                                  <div className="flex justify-center"><StatusBadge status={row.status} /></div>
                              </td>
                              
                              <td className="px-6 py-4 text-right">
                                  <button className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-blue-600 transition-colors">
                                      <ArrowUpRight size={18}/>
                                  </button>
                              </td>
                          </motion.tr>
                      ))}
                  </tbody>
              </table>
              
              {/* Empty State */}
              {((activeMode === 'QR' ? MOCK_QR_DATA : MOCK_PG_DATA).length === 0) && (
                  <div className="p-12 text-center text-slate-400 flex flex-col items-center">
                      <Search size={48} className="opacity-20 mb-4"/>
                      <p className="text-sm font-medium">No records found matching your criteria.</p>
                  </div>
              )}
          </div>
      </div>

    </div>
  );
};

export default DistPaymentReports;