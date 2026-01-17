import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, AlertOctagon, Check, X, Gavel, 
  UploadCloud, Clock, History, Download, ChevronRight 
} from 'lucide-react';

// --- Mock Data ---
const INITIAL_DISPUTES = [
  { id: "CB_10029", txn: "TXN_882910", amount: "₹ 5,000", reason: "Fraud / Unauthorized Txn", due: "24 Hrs", status: "Open", risk: "High", merchant: "Ravi Telecom" },
  { id: "CB_10030", txn: "TXN_772192", amount: "₹ 1,200", reason: "Service Not Received", due: "4 Days", status: "Under Review", risk: "Medium", merchant: "New Era Store" },
  { id: "CB_10031", txn: "TXN_991002", amount: "₹ 12,500", reason: "Duplicate Processing", due: "12 Hrs", status: "Open", risk: "High", merchant: "Amit Pan Shop" },
];

const ChargebackPanel = () => {
  const [disputes, setDisputes] = useState(INITIAL_DISPUTES);
  const [filter, setFilter] = useState('Open'); // Open, Review, Closed
  
  // Modal State
  const [activeModal, setActiveModal] = useState(null); // 'contest', 'accept', 'proof'
  const [selectedItem, setSelectedItem] = useState(null);
  const [evidenceText, setEvidenceText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Actions ---

  const handleAction = (type, item) => {
    setSelectedItem(item);
    setActiveModal(type);
    setEvidenceText("");
  };

  const submitContest = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
        setDisputes(disputes.map(d => d.id === selectedItem.id ? { ...d, status: 'Under Review' } : d));
        setIsSubmitting(false);
        setActiveModal(null);
    }, 1500);
  };

  const confirmAccept = () => {
    setDisputes(disputes.filter(d => d.id !== selectedItem.id)); // Remove from active list
    setActiveModal(null);
  };

  // Filter Logic
  const filteredList = disputes.filter(d => {
      if(filter === 'Open') return d.status === 'Open';
      if(filter === 'Review') return d.status === 'Under Review';
      return false;
  });

  return (
    <div className="space-y-6 font-sans text-slate-900">
      
      {/* --- Top Stats --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Disputed</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">₹ 18,700</div>
            <div className="text-xs text-rose-500 font-bold mt-1">3 Active Cases</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Win Rate</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">92.4%</div>
            <div className="text-xs text-emerald-500 font-bold mt-1">Last 30 Days</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">At Risk</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">₹ 5,000</div>
            <div className="text-xs text-orange-500 font-bold mt-1">Deadline &lt; 24h</div>
        </div>
      </div>

      {/* --- Action Banner --- */}
      {disputes.some(d => d.status === 'Open' && d.risk === 'High') && (
        <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl flex items-start gap-4 shadow-sm">
            <div className="p-2 bg-rose-100 text-rose-600 rounded-lg">
                <AlertOctagon size={24} />
            </div>
            <div>
                <h4 className="font-bold text-rose-800 text-sm">Urgent Action Required</h4>
                <p className="text-rose-700 text-xs mt-1 leading-relaxed max-w-2xl">
                    You have active chargebacks approaching their deadline. Failure to submit evidence within 48 hours will result in an auto-debit from the master wallet.
                </p>
            </div>
        </div>
      )}

      {/* --- Filters --- */}
      <div className="flex gap-2 border-b border-slate-200 pb-1">
          {['Open', 'Review', 'Closed'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${
                    filter === f 
                    ? 'bg-slate-900 text-white' 
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                  {f} Cases
              </button>
          ))}
      </div>

      {/* --- Disputes List --- */}
      <div className="space-y-4">
        <AnimatePresence mode='popLayout'>
            {filteredList.length === 0 ? (
                <div className="py-12 text-center text-slate-400 bg-white rounded-2xl border border-slate-200 border-dashed">
                    <Check size={48} className="mx-auto mb-2 opacity-20" />
                    <p>No {filter.toLowerCase()} disputes found.</p>
                </div>
            ) : (
                filteredList.map((item) => (
                    <motion.div 
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
                    >
                        {/* Status Bar */}
                        <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${item.status === 'Open' ? 'bg-rose-500' : 'bg-orange-400'}`}></div>

                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pl-2">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-500 font-bold text-lg">
                                    <FileText size={24} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-3">
                                        <h4 className="font-bold text-slate-900 text-lg">{item.id}</h4>
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase border ${
                                            item.status === 'Open' ? 'bg-rose-50 border-rose-100 text-rose-600' : 'bg-orange-50 border-orange-100 text-orange-600'
                                        }`}>
                                            {item.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-500 mt-1">
                                        Merchant: <span className="font-bold text-slate-700">{item.merchant}</span> • Txn: <span className="font-mono text-slate-600">{item.txn}</span>
                                    </p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="text-xs font-bold text-slate-400 uppercase">Reason:</span>
                                        <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">{item.reason}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                                <div className="text-right">
                                    <div className="text-xs font-bold text-slate-400 uppercase mb-1">Disputed Amount</div>
                                    <div className="text-xl font-extrabold text-slate-900">{item.amount}</div>
                                </div>
                                
                                <div className="text-right">
                                    <div className="text-xs font-bold text-slate-400 uppercase mb-1">Deadline</div>
                                    <div className={`text-lg font-bold flex items-center gap-1 justify-end ${item.due.includes('Hrs') ? 'text-rose-600' : 'text-slate-700'}`}>
                                        <Clock size={16} /> {item.due}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Toolbar */}
                        {item.status === 'Open' && (
                            <div className="mt-6 pt-4 border-t border-slate-100 flex gap-3 pl-2">
                                <button 
                                    onClick={() => handleAction('proof', item)}
                                    className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                                >
                                    <History size={16} /> View Proof
                                </button>
                                <div className="flex-1"></div>
                                <button 
                                    onClick={() => handleAction('accept', item)}
                                    className="flex items-center gap-2 px-5 py-2 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-xl text-xs font-bold hover:bg-emerald-100 transition-colors"
                                >
                                    <Check size={16} /> Accept Liability
                                </button>
                                <button 
                                    onClick={() => handleAction('contest', item)}
                                    className="flex items-center gap-2 px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 shadow-lg shadow-slate-900/20 active:scale-95 transition-all"
                                >
                                    <Gavel size={16} /> Contest Dispute
                                </button>
                            </div>
                        )}
                        {item.status === 'Under Review' && (
                            <div className="mt-6 pt-4 border-t border-slate-100 pl-2">
                                <div className="flex items-center gap-2 text-xs font-bold text-orange-600 bg-orange-50 px-3 py-2 rounded-lg w-fit">
                                    <Clock size={14} /> Evidence Submitted. Waiting for Bank Response.
                                </div>
                            </div>
                        )}
                    </motion.div>
                ))
            )}
        </AnimatePresence>
      </div>

      {/* --- MODALS --- */}
      <AnimatePresence>
        {activeModal && selectedItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
                >
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <h3 className="font-bold text-lg text-slate-800">
                            {activeModal === 'contest' && 'Submit Defense'}
                            {activeModal === 'accept' && 'Accept Liability'}
                            {activeModal === 'proof' && 'Transaction Proof'}
                        </h3>
                        <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="p-6">
                        {/* Summary for context */}
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 mb-6 flex justify-between items-center">
                            <div>
                                <div className="text-xs text-slate-500 uppercase font-bold">Case ID</div>
                                <div className="font-bold text-slate-800">{selectedItem.id}</div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs text-slate-500 uppercase font-bold">Amount</div>
                                <div className="font-bold text-rose-600">{selectedItem.amount}</div>
                            </div>
                        </div>

                        {/* CONTEST FORM */}
                        {activeModal === 'contest' && (
                            <form onSubmit={submitContest}>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Defense Statement</label>
                                        <textarea 
                                            required
                                            className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none h-32"
                                            placeholder="Explain why this charge is valid..."
                                            value={evidenceText}
                                            onChange={(e) => setEvidenceText(e.target.value)}
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Upload Evidence</label>
                                        <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 cursor-pointer transition-colors">
                                            <UploadCloud className="text-slate-400 mb-2" size={32} />
                                            <p className="text-sm font-bold text-slate-600">Click to upload files</p>
                                            <p className="text-xs text-slate-400 mt-1">Receipts, Logs, KYC Docs (PDF/JPG)</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-3 mt-6">
                                    <button type="button" onClick={() => setActiveModal(null)} className="flex-1 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50">Cancel</button>
                                    <button type="submit" disabled={isSubmitting} className="flex-1 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 flex items-center justify-center gap-2">
                                        {isSubmitting ? <span className="animate-spin">...</span> : <><Gavel size={18} /> Submit Defense</>}
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* ACCEPT FORM */}
                        {activeModal === 'accept' && (
                            <div className="text-center">
                                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
                                    <AlertOctagon size={32} />
                                </div>
                                <p className="text-sm text-slate-600 mb-6 px-4">
                                    By accepting, <strong>{selectedItem.amount}</strong> will be immediately debited from the Master Wallet and refunded to the customer's bank. This action cannot be undone.
                                </p>
                                <div className="flex gap-3">
                                    <button onClick={() => setActiveModal(null)} className="flex-1 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50">Cancel</button>
                                    <button onClick={confirmAccept} className="flex-1 py-3 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 shadow-lg shadow-red-600/20">
                                        Confirm Debit
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* PROOF MODAL */}
                        {activeModal === 'proof' && (
                            <div className="space-y-4">
                                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 font-mono text-xs space-y-2">
                                    <div className="flex justify-between"><span>Timestamp:</span> <span>2023-10-12 14:30:22</span></div>
                                    <div className="flex justify-between"><span>RRN:</span> <span>328582910293</span></div>
                                    <div className="flex justify-between"><span>IP Address:</span> <span>192.168.45.12</span></div>
                                    <div className="flex justify-between"><span>Device:</span> <span>Android 13 / Samsung S23</span></div>
                                    <div className="flex justify-between font-bold text-slate-800 pt-2 border-t border-slate-200 mt-2">
                                        <span>Status:</span> <span className="text-emerald-600">SUCCESS</span>
                                    </div>
                                </div>
                                <button className="w-full flex items-center justify-center gap-2 py-3 bg-blue-50 text-blue-700 rounded-xl text-sm font-bold hover:bg-blue-100 transition-colors">
                                    <Download size={16} /> Download Full Receipt
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default ChargebackPanel;