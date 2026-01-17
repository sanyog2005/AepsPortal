import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Filter, Save, X, Server, Globe, 
  Landmark, CreditCard, CheckCircle2, XCircle, 
  Trash2, Edit2, Eye, Key, Activity, Copy, ArrowRight
} from 'lucide-react';

// --- MOCK DATA ---
const INITIAL_PENDING = [
    { id: "REQ001", date: "16/01/2026", user: "Rahul Telecom", mode: "IMPS", bank: "HDFC Bank", amount: "50,000", remark: "Wallet Topup", status: "Pending" },
    { id: "REQ002", date: "16/01/2026", user: "Vijay Store", mode: "Cash", bank: "ICICI Bank", amount: "20,000", remark: "Cash Deposit", status: "Pending" },
];

const INITIAL_HISTORY = [
    { id: "TXN88291", date: "15/01/2026", update: "15/01/2026", mode: "IMPS", bank: "HDFC Bank - 8821", amount: "50,000", remark: "Wallet Load", adminRemark: "Ok", status: "Approved" },
    { id: "TXN88290", date: "12/01/2026", update: "13/01/2026", mode: "Cash", bank: "SBI - 4421", amount: "10,000", remark: "Slip unclear", adminRemark: "Invalid Slip", status: "Rejected" },
];

const INITIAL_BANKS = [
    { id: 1, type: "Bank", name: "HDFC Bank", accountNo: "50200012345678", ifsc: "HDFC0001234", branch: "Connaught Place", status: "Active", holder: "QuickNPay Pvt Ltd" },
    { id: 2, type: "Bank", name: "ICICI Bank", accountNo: "002105004421", ifsc: "ICIC0000021", branch: "Sector 18", status: "Active", holder: "QuickNPay Solutions" },
    { id: 3, type: "API", name: "Yes Bank API", endpoint: "https://api.yesbank.in/v2", key: "sk_live_...", latency: "45ms", status: "Active" },
    { id: 4, type: "API", name: "Razorpay PG", endpoint: "https://api.razorpay.com", key: "rzp_live_...", latency: "120ms", status: "Active" },
];

// --- COMPONENTS ---

const StatusBadge = ({ status }) => {
    const styles = {
        Pending: "bg-amber-50 text-amber-600 border-amber-200",
        Approved: "bg-emerald-50 text-emerald-600 border-emerald-200",
        Rejected: "bg-rose-50 text-rose-600 border-rose-200",
        Active: "bg-blue-50 text-blue-600 border-blue-200"
    };
    const icons = {
        Pending: <Activity size={12}/>,
        Approved: <CheckCircle2 size={12}/>,
        Rejected: <XCircle size={12}/>,
        Active: <CheckCircle2 size={12}/>
    };

    return (
        <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${styles[status] || styles.Pending}`}>
            {icons[status]} {status}
        </span>
    );
};

const BankCard = ({ bank, onDelete }) => (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 shadow-xl group hover:shadow-2xl transition-all">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl -ml-5 -mb-5 pointer-events-none"></div>

        <div className="relative z-10 flex justify-between items-start">
            <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Admin Account</p>
                <h3 className="font-bold text-lg">{bank.name}</h3>
            </div>
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-md">
                <Landmark size={20} className="text-blue-300"/>
            </div>
        </div>

        <div className="relative z-10 mt-6 space-y-1">
            <p className="text-2xl font-mono tracking-widest text-white/90">{bank.accountNo.replace(/(\d{4})/g, '$1 ').trim()}</p>
            <div className="flex justify-between items-end mt-4">
                <div>
                    <p className="text-[10px] text-slate-400 uppercase">Account Holder</p>
                    <p className="text-sm font-medium">{bank.holder}</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] text-slate-400 uppercase">IFSC Code</p>
                    <p className="text-sm font-mono">{bank.ifsc}</p>
                </div>
            </div>
        </div>

        {/* Hover Actions */}
        <div className="absolute top-4 right-14 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
             <button onClick={() => onDelete(bank.id)} className="p-1.5 bg-red-500/20 text-red-400 rounded hover:bg-red-500 hover:text-white transition-colors">
                <Trash2 size={14}/>
             </button>
        </div>
    </div>
);

const APICard = ({ api, onDelete }) => (
    <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all relative group">
        <button onClick={() => onDelete(api.id)} className="absolute top-4 right-4 text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all">
            <Trash2 size={16} />
        </button>

        <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <Server size={20}/>
            </div>
            <div className="flex-1 overflow-hidden">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">API</span>
                    <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1"><Activity size={10}/> {api.latency}</span>
                </div>
                <h4 className="font-bold text-slate-900">{api.name}</h4>
                <div className="mt-3 p-2 bg-slate-50 rounded border border-slate-100 font-mono text-xs text-slate-500 truncate">
                    {api.endpoint}
                </div>
            </div>
        </div>
    </div>
);

const AProviderOnboarding = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSlipOpen, setIsSlipOpen] = useState(false);
  const [selectedSlip, setSelectedSlip] = useState(null);

  // Data
  const [pendingRequests, setPendingRequests] = useState(INITIAL_PENDING);
  const [historyRequests, setHistoryRequests] = useState(INITIAL_HISTORY);
  const [banks, setBanks] = useState(INITIAL_BANKS);
  
  // Forms & Search
  const [searchTerm, setSearchTerm] = useState("");
  const [entryType, setEntryType] = useState("Bank");
  const [formData, setFormData] = useState({ name: '', accountNo: '', ifsc: '', branch: '', holder: '', endpoint: '', key: '' });

  // --- ACTIONS ---
  const handleApprove = (req) => {
      if(window.confirm(`Confirm approval for ₹${req.amount}?`)) {
          setHistoryRequests([{ ...req, status: "Approved", update: "Just now", adminRemark: "Auto Approved" }, ...historyRequests]);
          setPendingRequests(pendingRequests.filter(r => r.id !== req.id));
      }
  };

  const handleReject = (req) => {
      const reason = prompt("Enter rejection reason:");
      if(reason) {
          setHistoryRequests([{ ...req, status: "Rejected", update: "Just now", adminRemark: reason }, ...historyRequests]);
          setPendingRequests(pendingRequests.filter(r => r.id !== req.id));
      }
  };

  const handleSaveEntry = (e) => {
      e.preventDefault();
      const newEntry = { id: Date.now(), type: entryType, status: 'Active', latency: 'Pending', ...formData };
      setBanks([...banks, newEntry]);
      setIsModalOpen(false);
      setFormData({ name: '', accountNo: '', ifsc: '', branch: '', holder: '', endpoint: '', key: '' });
  };

  // --- RENDER ---
  return (
    <div className="max-w-7xl mx-auto space-y-8 font-sans text-slate-900 pb-12">
      
      {/* 1. Header Banner */}
      <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-6">
              <div>
                  <h1 className="text-3xl font-bold tracking-tight mb-2">Cash Operations</h1>
                  <p className="text-slate-400 max-w-md">Manage wallet load requests, admin bank accounts, and upstream API partners from a single command center.</p>
              </div>
              <div className="flex gap-2">
                  <div className="bg-white/10 backdrop-blur-md border border-white/10 px-5 py-3 rounded-2xl text-center min-w-[100px]">
                      <div className="text-2xl font-bold">{pendingRequests.length}</div>
                      <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Pending</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md border border-white/10 px-5 py-3 rounded-2xl text-center min-w-[100px]">
                      <div className="text-2xl font-bold">{banks.length}</div>
                      <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Accounts</div>
                  </div>
              </div>
          </div>
      </div>

      {/* 2. Animated Tab Switcher */}
      <div className="flex justify-center">
          <div className="bg-white p-1.5 rounded-full border border-slate-200 shadow-sm inline-flex relative">
              {['pending', 'all', 'banks'].map((tab) => (
                  <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`relative z-10 px-6 py-2.5 text-sm font-bold rounded-full transition-colors ${activeTab === tab ? 'text-white' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                      {activeTab === tab && (
                          <motion.div 
                              layoutId="activeTab"
                              className="absolute inset-0 bg-slate-900 rounded-full shadow-md"
                              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                      )}
                      <span className="relative z-10 capitalize">
                          {tab === 'banks' ? 'Bank & API Master' : tab === 'all' ? 'History' : 'Pending Requests'}
                      </span>
                  </button>
              ))}
          </div>
      </div>

      {/* 3. Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
        >
            {/* === TAB 1: PENDING === */}
            {activeTab === 'pending' && (
                <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-amber-500"></div> Action Required
                        </h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold">
                                <tr>
                                    <th className="px-6 py-4">Request ID</th>
                                    <th className="px-6 py-4">User Details</th>
                                    <th className="px-6 py-4">Deposit Mode</th>
                                    <th className="px-6 py-4 text-right">Amount</th>
                                    <th className="px-6 py-4 text-center">Slip</th>
                                    <th className="px-6 py-4 text-center">Decision</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {pendingRequests.length > 0 ? pendingRequests.map((row) => (
                                    <tr key={row.id} className="hover:bg-slate-50/80 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="font-mono font-bold text-slate-700">{row.id}</div>
                                            <div className="text-xs text-slate-400">{row.date}</div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-slate-800">{row.user}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-bold px-2 py-1 bg-white border border-slate-200 rounded">{row.mode}</span>
                                                <span className="text-xs text-slate-500">{row.bank}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right font-bold text-lg text-slate-900">₹ {row.amount}</td>
                                        <td className="px-6 py-4 text-center">
                                            <button onClick={() => { setSelectedSlip(row); setIsSlipOpen(true); }} className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors">
                                                <Eye size={18}/>
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center gap-3">
                                                <button onClick={() => handleApprove(row)} className="flex items-center gap-1 bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-700 shadow-md shadow-emerald-200 transition-all active:scale-95">
                                                    <CheckCircle2 size={14}/> Approve
                                                </button>
                                                <button onClick={() => handleReject(row)} className="flex items-center gap-1 bg-white border border-rose-200 text-rose-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-rose-50 transition-all active:scale-95">
                                                    <XCircle size={14}/> Reject
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="6" className="px-6 py-12 text-center text-slate-400 font-medium">All caught up! No pending requests.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* === TAB 2: ALL HISTORY === */}
            {activeTab === 'all' && (
                <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-slate-100 flex gap-4 bg-slate-50/50">
                        <div className="relative flex-1">
                            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input 
                                type="text" 
                                placeholder="Search Transaction ID, Amount, or Bank..." 
                                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold">
                            <tr>
                                <th className="px-6 py-4">Txn ID</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Details</th>
                                <th className="px-6 py-4 text-right">Amount</th>
                                <th className="px-6 py-4 text-center">Status</th>
                                <th className="px-6 py-4 text-center">Admin Note</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                            {historyRequests.filter(r => r.id.toLowerCase().includes(searchTerm.toLowerCase())).map((row) => (
                                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-mono font-bold">{row.id}</td>
                                    <td className="px-6 py-4">{row.date}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-slate-800">{row.mode}</span>
                                            <span className="text-xs text-slate-400">{row.bank}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right font-bold text-slate-900">₹ {row.amount}</td>
                                    <td className="px-6 py-4 text-center"><StatusBadge status={row.status}/></td>
                                    <td className="px-6 py-4 text-center text-xs italic opacity-70">{row.adminRemark}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* === TAB 3: BANK & API MASTER === */}
            {activeTab === 'banks' && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <div className="relative">
                            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input 
                                type="text" 
                                placeholder="Search accounts..." 
                                className="pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 w-64 transition-all"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-slate-800 shadow-lg shadow-slate-900/20 transition-all active:scale-95"
                        >
                            <Plus size={18} /> Add New Entry
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-8">
                        {/* Section: Admin Banks */}
                        <div>
                            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Landmark size={16}/> Collecting Banks
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {banks.filter(b => b.type === 'Bank' && b.name.toLowerCase().includes(searchTerm.toLowerCase())).map(bank => (
                                    <BankCard key={bank.id} bank={bank} onDelete={(id) => setBanks(banks.filter(b => b.id !== id))} />
                                ))}
                            </div>
                        </div>

                        {/* Section: API Partners */}
                        <div>
                            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Server size={16}/> Connected APIs
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {banks.filter(b => b.type === 'API' && b.name.toLowerCase().includes(searchTerm.toLowerCase())).map(api => (
                                    <APICard key={api.id} api={api} onDelete={(id) => setBanks(banks.filter(b => b.id !== id))} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
      </AnimatePresence>

      {/* --- ADD NEW MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)}>
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
                >
                    <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="font-bold text-xl text-slate-800">Add New Entry</h3>
                        <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={20} className="text-slate-400"/></button>
                    </div>
                    
                    <form onSubmit={handleSaveEntry} className="p-6 space-y-5">
                        <div className="grid grid-cols-2 gap-3 p-1 bg-slate-100 rounded-xl">
                            <button type="button" onClick={() => setEntryType("Bank")} className={`py-2.5 rounded-lg text-sm font-bold transition-all ${entryType === 'Bank' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Admin Bank</button>
                            <button type="button" onClick={() => setEntryType("API")} className={`py-2.5 rounded-lg text-sm font-bold transition-all ${entryType === 'API' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>API Partner</button>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Name</label>
                            <input required className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" placeholder={entryType === 'Bank' ? "e.g. HDFC Bank" : "e.g. Yes Bank API"} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                        </div>

                        {entryType === 'Bank' ? (
                            <>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Account No</label>
                                        <input type="number" required className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm font-mono focus:ring-2 focus:ring-blue-500/20 outline-none" placeholder="0000..." value={formData.accountNo} onChange={e => setFormData({...formData, accountNo: e.target.value})} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">IFSC</label>
                                        <input required className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm uppercase focus:ring-2 focus:ring-blue-500/20 outline-none" placeholder="HDFC..." value={formData.ifsc} onChange={e => setFormData({...formData, ifsc: e.target.value})} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Holder Name</label>
                                    <input required className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none" placeholder="Company Name" value={formData.holder} onChange={e => setFormData({...formData, holder: e.target.value})} />
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Endpoint URL</label>
                                    <input type="url" required className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-blue-600 focus:ring-2 focus:ring-blue-500/20 outline-none" placeholder="https://api..." value={formData.endpoint} onChange={e => setFormData({...formData, endpoint: e.target.value})} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Secret Key</label>
                                    <input type="password" required className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm font-mono focus:ring-2 focus:ring-blue-500/20 outline-none" placeholder="sk_live_..." value={formData.key} onChange={e => setFormData({...formData, key: e.target.value})} />
                                </div>
                            </>
                        )}

                        <button type="submit" className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-bold shadow-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                            <Save size={18}/> Save Entry
                        </button>
                    </form>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

      {/* --- SLIP MODAL --- */}
      <AnimatePresence>
        {isSlipOpen && selectedSlip && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm" onClick={() => setIsSlipOpen(false)}>
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full text-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                        <FileText size={32}/>
                    </div>
                    <h3 className="font-bold text-lg text-slate-800">Deposit Slip</h3>
                    <p className="text-sm text-slate-500 mb-6">Uploaded by {selectedSlip.user}</p>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 mb-6 border-dashed">
                        <p className="text-xs text-slate-400 italic">[ Mock Image Placeholder ]</p>
                        <p className="text-sm font-bold text-slate-700 mt-2">Amount: ₹ {selectedSlip.amount}</p>
                    </div>
                    <button onClick={() => setIsSlipOpen(false)} className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm">Close Viewer</button>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AProviderOnboarding;