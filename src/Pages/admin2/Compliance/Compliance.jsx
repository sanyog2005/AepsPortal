import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, FileCheck, Eye, ShieldAlert, Download, AlertTriangle } from 'lucide-react';

// Sub-components
import GuidelineControl from './components/GuidelineControl';
import KycPolicySetup from './components/KycPolicySetup';
import RiskMonitoring from './components/RiskMonitoring';
import TransactionBlocking from './components/TransactionBlocking';

const ACompliance = () => {
  const [activeTab, setActiveTab] = useState('guidelines');

  const tabs = [
    { id: 'guidelines', label: 'RBI & NPCI Guidelines', icon: <Scale size={18} /> },
    { id: 'kyc', label: 'KYC Policy Setup', icon: <FileCheck size={18} /> },
    { id: 'risk', label: 'Risk & Fraud Monitor', icon: <Eye size={18} /> },
    { id: 'blocking', label: 'Txn Blocking', icon: <ShieldAlert size={18} /> },
  ];

  return (
    <div className="space-y-6 font-sans text-slate-900">
      
      {/* --- Page Header --- */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Compliance & Risk Command</h1>
          <p className="text-slate-500 text-sm mt-1 flex items-center gap-2">
             <ShieldAlert size={14} className="text-slate-400"/>
             Enforce regulatory standards and monitor system security.
          </p>
        </div>
        
        <div className="flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm active:scale-95">
                <Download size={16} /> Audit Logs
             </button>
             <div className="flex items-center gap-2 px-4 py-2 bg-rose-50 border border-rose-100 text-rose-700 rounded-xl text-sm font-bold shadow-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
                </span>
                3 High Risk Alerts
             </div>
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
            {activeTab === 'guidelines' && <GuidelineControl />}
            {activeTab === 'kyc' && <KycPolicySetup />}
            {activeTab === 'risk' && <RiskMonitoring />}
            {activeTab === 'blocking' && <TransactionBlocking />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ACompliance;