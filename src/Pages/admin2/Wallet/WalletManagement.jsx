import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wallet, RefreshCw, FileText, AlertOctagon, 
  ArrowUpRight, DollarSign, X, CheckCircle2, Copy 
} from 'lucide-react';

// Sub-components (Assumed imports)
import MasterOverview from './components/MasterOverview';
import SettlementConfig from './components/SettlementConfig';
import SettlementReports from './components/SettlementReports';
import ChargebackPanel from './components/ChargebackPanel';

const WalletManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [amount, setAmount] = useState('');

  const tabs = [
    { id: 'overview', label: 'Master Wallet', icon: <Wallet size={18} /> },
    // { id: 'cycles', label: 'Settlement Cycles', icon: <RefreshCw size={18} /> },
    // { id: 'reports', label: 'Bank Reports', icon: <FileText size={18} /> },
    // { id: 'chargebacks', label: 'Chargeback (Disputes)', icon: <AlertOctagon size={18} /> },
  ];

  // --- Actions ---
  const handleAddFunds = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    setAmount('');
    
    // Show Success Toast
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert(`Copied: ${text}`);
  };

  return (
    <div className="space-y-6 font-sans text-slate-900 relative">
      
      {/* --- Page Header --- */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Wallet & Settlement</h1>
          <p className="text-slate-500 text-sm mt-1 flex items-center gap-2">
             <DollarSign size={14} className="text-slate-400"/>
             Manage liquidity, payout cycles, and financial disputes.
          </p>
        </div>
        
        <div className="flex gap-3">
             {/* Live Account Badge */}
             <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 text-blue-700 rounded-xl text-sm font-bold shadow-sm group cursor-pointer" 
                  onClick={() => copyToClipboard('YESB00022991')}
                  title="Click to copy"
             >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
                </span>
                <span className="text-xs text-blue-500 uppercase tracking-wider mr-1">VAC:</span> 
                <span className="font-mono">YESB00022991</span>
                <Copy size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
             </div>

             {/* Action Button */}
             <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20 active:scale-95"
             >
                <ArrowUpRight size={16} /> Add Funds
             </button>
        </div>
      </div>

      {/* --- Navigation Tabs --- */}
      <div className="bg-white p-1.5 rounded-xl border border-slate-200 inline-flex flex-wrap gap-1 shadow-sm w-full md:w-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-slate-900 text-white shadow-md transform scale-[1.02]'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* --- Dynamic Content Area --- */}
      <div className="min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'overview' && <MasterOverview />}
            {activeTab === 'cycles' && <SettlementConfig />}
            {activeTab === 'reports' && <SettlementReports />}
            {activeTab === 'chargebacks' && <ChargebackPanel />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* --- Add Funds Modal --- */}
      <AnimatePresence>
        {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
                >
                    <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <h3 className="font-bold text-lg text-slate-800">Top-up Master Wallet</h3>
                        <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                            <X size={20} />
                        </button>
                    </div>
                    
                    <form onSubmit={handleAddFunds} className="p-6 space-y-6">
                        {/* Bank Details Card */}
                        <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl space-y-2">
                            <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Beneficiary Details</p>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Bank Name</span>
                                <span className="font-bold text-slate-800">Yes Bank</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Account No.</span>
                                <span className="font-mono font-bold text-slate-800">YESB00022991</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">IFSC Code</span>
                                <span className="font-mono font-bold text-slate-800">YESB0000001</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Deposit Amount (₹)</label>
                            <input 
                                type="number" 
                                required
                                min="100"
                                autoFocus
                                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                placeholder="e.g. 500000"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button 
                                type="button" 
                                onClick={() => setIsModalOpen(false)} 
                                className="flex-1 py-3 border border-slate-300 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="flex-1 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 shadow-lg flex items-center justify-center gap-2"
                            >
                                <CheckCircle2 size={18} /> Confirm Load
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

      {/* --- Success Toast --- */}
      <AnimatePresence>
        {showToast && (
            <motion.div 
                initial={{ opacity: 0, y: 50, x: '-50%' }}
                animate={{ opacity: 1, y: 0, x: '-50%' }}
                exit={{ opacity: 0, y: 20, x: '-50%' }}
                className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3"
            >
                <CheckCircle2 className="text-emerald-400" size={20} />
                <span className="font-bold text-sm">Deposit request initiated successfully!</span>
            </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default WalletManagement;