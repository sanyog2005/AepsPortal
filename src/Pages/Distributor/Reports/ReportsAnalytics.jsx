import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, TrendingUp, Activity, Users, 
  Download, Calendar, ChevronDown, BarChart3 
} from 'lucide-react';

// Sub-components (Assumed to exist in your project structure)
import TransactionLogs from './components/TransactionLogs';
import ProfitAnalysis from './components/ProfitAnalysis';
import ApiPerformance from './components/ApiPerformance';
import AgentPerformance from './components/AgentPerformance';

const DistReportsAnalytics = () => {
  const [activeTab, setActiveTab] = useState('transactions');
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [isExporting, setIsExporting] = useState(false);

  const tabs = [
    { id: 'transactions', label: 'All Transactions', icon: <FileText size={18} /> },
    { id: 'profit', label: 'Profit & Margins', icon: <TrendingUp size={18} /> },
    // { id: 'api', label: 'API Health', icon: <Activity size={18} /> },
    // { id: 'agents', label: 'Agent Performance', icon: <Users size={18} /> },
  ];

  // --- Actions ---

  const handleExport = () => {
    setIsExporting(true);
    // Simulate API delay
    setTimeout(() => {
        setIsExporting(false);
        alert(`${activeTab.toUpperCase()} Report downloaded successfully.`);
    }, 1500);
  };

  const toggleDateRange = () => {
    // Simple cycle for demo purposes
    if (dateRange === 'Last 30 Days') setDateRange('Last 7 Days');
    else if (dateRange === 'Last 7 Days') setDateRange('Last 90 Days');
    else setDateRange('Last 30 Days');
  };

  return (
    <div className="space-y-6 font-sans text-slate-900">
      
      {/* --- Page Header --- */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reports & Analytics</h1>
          <p className="text-slate-500 text-sm mt-1 flex items-center gap-2">
             <BarChart3 size={14} className="text-slate-400"/>
             Deep dive into financial data and operational metrics.
          </p>
        </div>
        
        <div className="flex gap-3">
             {/* Date Picker Button */}
             <button 
                onClick={toggleDateRange}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm active:scale-95"
             >
                <Calendar size={16} /> 
                {dateRange}
                <ChevronDown size={14} className="text-slate-400 ml-1" />
             </button>

             {/* Export Button */}
             <button 
                onClick={handleExport}
                disabled={isExporting}
                className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
             >
                {isExporting ? (
                    <>Downloading...</>
                ) : (
                    <><Download size={16} /> Export Report</>
                )}
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
            {activeTab === 'transactions' && <TransactionLogs />}
            {activeTab === 'profit' && <ProfitAnalysis />}
            {activeTab === 'api' && <ApiPerformance />}
            {activeTab === 'agents' && <AgentPerformance />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DistReportsAnalytics;