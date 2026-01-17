import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertOctagon, Search, Filter, ShieldAlert, Lock, 
  ExternalLink, Ban, CheckCircle2, X 
} from 'lucide-react';

// --- Mock Data ---
const INITIAL_ALERTS = [
  { id: "TXN_99281", type: "High Velocity", user: "Ravi Telecom", amount: "₹ 45,000", time: "2m ago", risk: "High", desc: "3 large withdrawals in 10 mins." },
  { id: "TXN_11029", type: "Multiple Failed Attempts", user: "New Era Store", amount: "₹ 2,000", time: "15m ago", risk: "Medium", desc: "5 incorrect PIN entries." },
  { id: "TXN_88210", type: "Unusual Location IP", user: "Amit Pan Shop", amount: "₹ 10,000", time: "1h ago", risk: "Low", desc: "Login from new state (Mumbai)." },
];

const RiskMonitoring = () => {
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [modalType, setModalType] = useState(null); // 'investigate' | 'block'
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [blockReason, setBlockReason] = useState("");

  // --- Actions ---

  const handleAction = (type, alertItem) => {
    setSelectedAlert(alertItem);
    setModalType(type);
    setBlockReason("");
  };

  const confirmBlock = (e) => {
    e.preventDefault();
    if (!blockReason) return;
    
    // Remove from list (Simulating 'Resolved/Blocked')
    setAlerts(alerts.filter(a => a.id !== selectedAlert.id));
    setModalType(null);
    alert(`User ${selectedAlert.user} has been blocked. Reason: ${blockReason}`);
  };

  const resolveAlert = () => {
    setAlerts(alerts.filter(a => a.id !== selectedAlert.id));
    setModalType(null);
  };

  return (
    <div className="space-y-6 font-sans text-slate-900">
      
      {/* --- Top Stats --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-rose-500 text-white p-6 rounded-2xl shadow-lg shadow-rose-500/20 relative overflow-hidden group">
              <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><ShieldAlert size={80}/></div>
              <h4 className="font-bold text-rose-100 text-xs uppercase tracking-wider mb-1">Critical Alerts</h4>
              <div className="text-4xl font-extrabold">{alerts.filter(a => a.risk === 'High').length}</div>
          </div>
          
          <div className="bg-orange-500 text-white p-6 rounded-2xl shadow-lg shadow-orange-500/20 relative overflow-hidden group">
              <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><AlertOctagon size={80}/></div>
              <h4 className="font-bold text-orange-100 text-xs uppercase tracking-wider mb-1">Flagged Users</h4>
              <div className="text-4xl font-extrabold">08</div>
          </div>

          <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg shadow-blue-600/20 relative overflow-hidden group">
              <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><Lock size={80}/></div>
              <h4 className="font-bold text-blue-200 text-xs uppercase tracking-wider mb-1">Held Amount</h4>
              <div className="text-4xl font-extrabold">₹ 2.4L</div>
          </div>
      </div>

      {/* --- Main Monitor --- */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm min-h-[400px]">
          
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
              <div>
                  <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                      <div className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                      </div>
                      Live Fraud Monitor
                  </h3>
                  <p className="text-slate-500 text-sm mt-1">Real-time suspicious activity feed.</p>
              </div>
              <div className="flex gap-2">
                  <div className="relative">
                      <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                      <input 
                          type="text" 
                          placeholder="Search Txn ID..." 
                          className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-64"
                      />
                  </div>
                  <button className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-500 transition-colors">
                      <Filter size={20}/>
                  </button>
              </div>
          </div>

          <div className="space-y-3">
              <AnimatePresence>
                  {alerts.map((alert) => (
                      <motion.div 
                          key={alert.id}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className={`flex flex-col md:flex-row items-center justify-between p-4 rounded-xl border transition-all hover:shadow-md ${
                              alert.risk === 'High' ? 'bg-rose-50 border-rose-100' : 
                              alert.risk === 'Medium' ? 'bg-orange-50 border-orange-100' : 'bg-slate-50 border-slate-100'
                          }`}
                      >
                          <div className="flex items-center gap-4 w-full md:w-auto">
                              <div className={`p-3 rounded-xl shrink-0 ${
                                  alert.risk === 'High' ? 'bg-white text-rose-600 shadow-sm' : 
                                  alert.risk === 'Medium' ? 'bg-white text-orange-600 shadow-sm' : 'bg-white text-slate-500 border border-slate-200'
                              }`}>
                                  <AlertOctagon size={24} />
                              </div>
                              <div>
                                  <div className="flex items-center gap-2 mb-1">
                                      <span className="font-bold text-slate-900 text-sm">{alert.type}</span>
                                      <span className="text-[10px] font-mono font-bold bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-500">
                                          {alert.id}
                                      </span>
                                  </div>
                                  <p className="text-xs text-slate-500 font-medium">
                                      <span className="font-bold text-slate-700">{alert.user}</span> • <span className="font-mono">{alert.amount}</span> • {alert.time}
                                  </p>
                              </div>
                          </div>
                          
                          <div className="flex items-center gap-3 mt-4 md:mt-0 w-full md:w-auto justify-end">
                              <button 
                                  onClick={() => handleAction('investigate', alert)}
                                  className="px-4 py-2 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-50 hover:text-blue-600 transition-colors"
                              >
                                  Investigate
                              </button>
                              <button 
                                  onClick={() => handleAction('block', alert)}
                                  className="px-4 py-2 bg-rose-600 text-white text-xs font-bold rounded-lg hover:bg-rose-700 shadow-lg shadow-rose-500/20 transition-all active:scale-95"
                              >
                                  Block User
                              </button>
                          </div>
                      </motion.div>
                  ))}
              </AnimatePresence>

              {alerts.length === 0 && (
                  <div className="text-center py-12 text-slate-400">
                      <CheckCircle2 size={48} className="mx-auto mb-3 text-emerald-400 opacity-50" />
                      <p className="font-medium">All Clear! No active threats detected.</p>
                  </div>
              )}
          </div>
      </div>

      {/* --- Action Modal --- */}
      <AnimatePresence>
        {modalType && selectedAlert && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
                >
                    <div className={`px-6 py-4 border-b flex justify-between items-center ${modalType === 'block' ? 'bg-rose-50 border-rose-100' : 'bg-slate-50 border-slate-100'}`}>
                        <h3 className={`font-bold text-lg ${modalType === 'block' ? 'text-rose-800' : 'text-slate-800'}`}>
                            {modalType === 'block' ? 'Block User & Wallet' : 'Investigate Transaction'}
                        </h3>
                        <button onClick={() => setModalType(null)} className="text-slate-400 hover:text-slate-600">
                            <X size={20} />
                        </button>
                    </div>
                    
                    <div className="p-6">
                        {/* Transaction Summary */}
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">User:</span>
                                <span className="font-bold text-slate-800">{selectedAlert.user}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Amount:</span>
                                <span className="font-bold text-slate-800">{selectedAlert.amount}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Flag Reason:</span>
                                <span className="font-bold text-rose-600">{selectedAlert.desc}</span>
                            </div>
                        </div>

                        {modalType === 'block' ? (
                            <form onSubmit={confirmBlock}>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Reason for blocking</label>
                                <textarea 
                                    required
                                    autoFocus
                                    className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50 resize-none h-24"
                                    placeholder="e.g. Verified fraud pattern..."
                                    value={blockReason}
                                    onChange={(e) => setBlockReason(e.target.value)}
                                />
                                <div className="flex gap-3 mt-6">
                                    <button type="button" onClick={() => setModalType(null)} className="flex-1 py-2.5 border border-slate-300 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50">Cancel</button>
                                    <button type="submit" className="flex-1 py-2.5 bg-rose-600 text-white rounded-xl text-sm font-bold hover:bg-rose-700 shadow-lg flex items-center justify-center gap-2">
                                        <Ban size={16} /> Confirm Block
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div>
                                <div className="space-y-3">
                                    <h4 className="text-xs font-bold text-slate-500 uppercase">Recommended Actions</h4>
                                    <button className="w-full text-left p-3 rounded-lg border border-slate-200 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-colors text-sm font-medium flex items-center gap-2">
                                        <ExternalLink size={16}/> View Full User Ledger
                                    </button>
                                    <button className="w-full text-left p-3 rounded-lg border border-slate-200 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-colors text-sm font-medium flex items-center gap-2">
                                        <ExternalLink size={16}/> Check Device Fingerprint
                                    </button>
                                </div>
                                <div className="flex gap-3 mt-6">
                                    <button type="button" onClick={() => setModalType(null)} className="flex-1 py-2.5 border border-slate-300 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50">Close</button>
                                    <button type="button" onClick={resolveAlert} className="flex-1 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 shadow-lg flex items-center justify-center gap-2">
                                        <CheckCircle2 size={16} /> Mark as Safe
                                    </button>
                                </div>
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

export default RiskMonitoring;