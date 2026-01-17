import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Download, Calendar, Filter, 
  ChevronDown, ArrowUpRight, Eye, FileText, 
  Landmark, AlertCircle, CheckCircle2, XCircle, 
  CreditCard, Copy, Building2
} from 'lucide-react';

// --- MOCK DATA ---
const MOCK_REQUESTS = [
  // Uncomment to test with data
  // { 
  //   id: 1, txnId: "REQ88210", date: "17/01/2026", updated: "17/01/2026", 
  //   mode: "IMPS", bank: "HDFC - XXXXX8821", depDate: "17/01/2026", 
  //   amount: "5000.00", remark: "Wallet Topup", adminRemark: "-", 
  //   status: "Pending", approvedDate: "-", slip: "view", bond: "view" 
  // }
];

const BANK_DETAILS = [
  { bank: "HDFC Bank", account: "50200012345678", ifsc: "HDFC0001234", branch: "Connaught Place, Delhi", status: "Active", theme: "from-blue-600 to-indigo-700" },
  { bank: "State Bank of India", account: "30987654321", ifsc: "SBIN0004321", branch: "Nehru Place, Delhi", status: "Active", theme: "from-emerald-600 to-teal-700" },
  { bank: "ICICI Bank", account: "002101504321", ifsc: "ICIC0000021", branch: "Sector 18, Noida", status: "Inactive", theme: "from-slate-600 to-slate-700" },
];

const FundRequestPage = () => {
  const [activeTab, setActiveTab] = useState('requests'); // 'requests' or 'banks'
  const [startDate, setStartDate] = useState('2026-01-17');
  const [endDate, setEndDate] = useState('2026-01-17');
  const [statusFilter, setStatusFilter] = useState('Initiated');

  // --- Sub-Components ---
  
  // Sleek Dot Badge
  const StatusBadge = ({ status }) => {
    const config = {
      Pending: { color: 'text-amber-600', bg: 'bg-amber-500' },
      Approved: { color: 'text-emerald-600', bg: 'bg-emerald-500' },
      Rejected: { color: 'text-rose-600', bg: 'bg-rose-500' },
      Initiated: { color: 'text-blue-600', bg: 'bg-blue-500' },
    };
    const style = config[status] || config.Pending;

    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-100 shadow-sm ${style.color}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${style.bg} animate-pulse`}></span>
        <span className="text-xs font-bold uppercase tracking-wide">{status}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 pb-24 font-sans text-slate-900">
      <div className="max-w-[1600px] mx-auto space-y-8">
        
        {/* 1. Page Header & Floating Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Fund Management</h1>
            <p className="text-slate-500 font-medium mt-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Manage deposit requests & view company accounts
            </p>
          </div>

          {/* Floating Tab Switcher */}
          <div className="bg-white p-1.5 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 inline-flex relative">
            {['requests', 'banks'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all z-10 ${
                  activeTab === tab ? 'text-white' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {activeTab === tab && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-slate-900 rounded-xl shadow-md -z-10"
                  />
                )}
                {tab === 'requests' ? <FileText size={16} /> : <Landmark size={16} />}
                {tab === 'requests' ? 'Cash Requests' : 'Bank Accounts'}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'requests' ? (
            <motion.div 
              key="requests"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Modern Filters Bar */}
              <div className="bg-white p-2 rounded-[1.5rem] shadow-sm border border-slate-200 flex flex-col xl:flex-row gap-2">
                  
                  {/* Bank & Status Group */}
                  <div className="flex flex-col sm:flex-row gap-2 flex-1">
                    <div className="relative group flex-1">
                        <select className="w-full h-full bg-slate-50 hover:bg-slate-100 border-none rounded-xl px-4 py-3.5 text-sm font-bold text-slate-600 focus:ring-0 cursor-pointer transition-colors appearance-none">
                            <option>All Banks</option>
                            <option>HDFC Bank</option>
                            <option>SBI Bank</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
                    </div>

                    <div className="relative group flex-1">
                        <select 
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          className="w-full h-full bg-slate-50 hover:bg-slate-100 border-none rounded-xl px-4 py-3.5 text-sm font-bold text-slate-600 focus:ring-0 cursor-pointer transition-colors appearance-none"
                        >
                            <option>Initiated</option>
                            <option>Approved</option>
                            <option>Rejected</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
                    </div>
                  </div>

                  {/* Date Range */}
                  <div className="flex items-center bg-slate-50 hover:bg-slate-100 transition-colors rounded-xl px-4 py-2 border border-transparent hover:border-slate-200">
                      <Calendar size={18} className="text-slate-400 mr-3 shrink-0"/>
                      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="bg-transparent text-sm text-slate-700 outline-none font-bold uppercase w-32 cursor-pointer" />
                      <span className="text-slate-300 mx-3">|</span>
                      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="bg-transparent text-sm text-slate-700 outline-none font-bold uppercase w-32 cursor-pointer" />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                      <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95 flex items-center gap-2">
                          <Search size={18} /> Search
                      </button>
                      <button className="bg-white border border-slate-200 text-slate-700 px-4 py-3 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors">
                          <Download size={18} />
                      </button>
                  </div>
              </div>

              {/* Clean Data Table */}
              <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden min-h-[500px] flex flex-col">
                  {/* Table Header */}
                  <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                          <thead>
                              <tr className="border-b border-slate-100">
                                  {['Sno', 'Txn ID', 'Date', 'Bank', 'Amount', 'Remark', 'Status', 'Admin Note', 'Receipt', 'Action'].map((head, i) => (
                                    <th key={i} className={`px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider ${head === 'Amount' ? 'text-right' : ''} ${head === 'Status' || head === 'Action' ? 'text-center' : ''}`}>
                                      {head}
                                    </th>
                                  ))}
                              </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50 text-sm text-slate-600">
                              {MOCK_REQUESTS.length > 0 ? (
                                  MOCK_REQUESTS.map((row, index) => (
                                      <tr key={index} className="group hover:bg-slate-50/50 transition-colors cursor-default">
                                          <td className="px-6 py-4 font-medium text-slate-400">{index + 1}</td>
                                          <td className="px-6 py-4">
                                            <span className="font-mono font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded text-xs">{row.txnId}</span>
                                          </td>
                                          <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                              <span className="font-bold text-slate-700">{row.date}</span>
                                              <span className="text-[10px] text-slate-400">Updated: {row.updated}</span>
                                            </div>
                                          </td>
                                          <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                              <Landmark size={14} className="text-slate-400"/>
                                              <span className="font-mono text-xs font-medium">{row.bank}</span>
                                            </div>
                                          </td>
                                          <td className="px-6 py-4 text-right">
                                            <span className="font-bold text-slate-900 text-base">₹ {row.amount}</span>
                                          </td>
                                          <td className="px-6 py-4 max-w-[150px] truncate font-medium">{row.remark}</td>
                                          <td className="px-6 py-4 text-center"><StatusBadge status={row.status} /></td>
                                          <td className="px-6 py-4 text-slate-400 italic text-xs max-w-[150px] truncate">{row.adminRemark || '-'}</td>
                                          <td className="px-6 py-4 text-center">
                                            <button className="text-slate-400 hover:text-indigo-600 transition-colors"><FileText size={18}/></button>
                                          </td>
                                          <td className="px-6 py-4 text-center">
                                              <button className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                                                <ArrowUpRight size={16}/>
                                              </button>
                                          </td>
                                      </tr>
                                  ))
                              ) : (
                                  <tr>
                                      <td colSpan="10" className="px-6 py-32 text-center">
                                          <div className="flex flex-col items-center justify-center gap-4 opacity-40">
                                              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center">
                                                  <Search size={40} className="text-slate-300" />
                                              </div>
                                              <div>
                                                <h3 className="text-lg font-bold text-slate-700">No Requests Found</h3>
                                                <p className="text-sm text-slate-500 mt-1">Try adjusting your filters or date range.</p>
                                              </div>
                                          </div>
                                      </td>
                                  </tr>
                              )}
                          </tbody>
                      </table>
                  </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="banks"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {BANK_DETAILS.map((bank, i) => (
                <div key={i} className={`relative overflow-hidden rounded-[2rem] p-8 text-white shadow-2xl transition-transform hover:-translate-y-1 hover:shadow-3xl cursor-default bg-gradient-to-br ${bank.theme}`}>
                  
                  {/* Texture Overlay */}
                  <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                  <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                  <div className="relative z-10 flex flex-col justify-between h-48">
                    {/* Top Row */}
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-white/20 backdrop-blur-md rounded-xl border border-white/10">
                          <Building2 size={24} className="text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg leading-tight">{bank.bank}</h3>
                          <p className="text-xs font-medium text-white/70">Corporate Account</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border backdrop-blur-sm ${
                        bank.status === 'Active' ? 'bg-emerald-500/20 border-emerald-400/30 text-emerald-100' : 'bg-rose-500/20 border-rose-400/30 text-rose-100'
                      }`}>
                        {bank.status}
                      </span>
                    </div>

                    {/* Middle: Account Number */}
                    <div className="mt-4">
                      <p className="text-xs font-bold text-white/60 uppercase tracking-widest mb-1">Account Number</p>
                      <div className="flex items-center gap-3">
                        <p className="text-2xl font-mono font-bold tracking-widest drop-shadow-md">{bank.account.replace(/(\d{4})/g, '$1 ').trim()}</p>
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-white/10 rounded text-white/80">
                          <Copy size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="flex justify-between items-end pt-4 border-t border-white/10">
                      <div>
                        <p className="text-[10px] font-bold text-white/60 uppercase">IFSC Code</p>
                        <p className="text-sm font-mono font-bold">{bank.ifsc}</p>
                      </div>
                      <div className="text-right max-w-[50%]">
                        <p className="text-[10px] font-bold text-white/60 uppercase">Branch</p>
                        <p className="text-sm font-bold truncate">{bank.branch}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default FundRequestPage;