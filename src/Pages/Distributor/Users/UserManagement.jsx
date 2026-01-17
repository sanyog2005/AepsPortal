import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Users, ClipboardCheck } from 'lucide-react';

// ✅ IMPORT FIX: Ensure these paths match your folder structure exactly
import UserOnboarding from './components/UserOnboarding'; 
import UserDirectory from './components/UserDirectory';   
import PendingApprovals from './components/PendingApprovals'; 

const DistUserManagement = () => {
  const [activeTab, setActiveTab] = useState('directory');

  const tabs = [
    { id: 'directory', label: 'User Directory', icon: <Users size={18} /> },
    { id: 'onboarding', label: 'Onboard New User', icon: <UserPlus size={18} /> },
    { id: 'approvals', label: 'KYC Approvals', icon: <ClipboardCheck size={18} /> },
  ];

  return (
    <div className="space-y-6 font-sans text-slate-900">
      
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">User Administration</h1>
          <p className="text-slate-500 text-sm mt-1">Manage retailers, distributors, and access controls.</p>
        </div>
        
        {/* Navigation Pills */}
        <div className="bg-white p-1.5 rounded-xl border border-slate-200 inline-flex flex-wrap gap-1 shadow-sm">
            {tabs.map((tab) => (
            <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${
                activeTab === tab.id
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                }`}
            >
                {tab.icon} {tab.label}
            </button>
            ))}
        </div>
      </div>

      {/* Dynamic Content */}
      <div className="min-h-[600px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'directory' && <UserDirectory />}
            {activeTab === 'onboarding' && <UserOnboarding />}
            {activeTab === 'approvals' && <PendingApprovals />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DistUserManagement;