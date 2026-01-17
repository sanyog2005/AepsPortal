import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Percent, Banknote, Smartphone, Lightbulb, Fingerprint, RefreshCw, Zap, ArrowRight } from 'lucide-react';

// --- DATA CONSTANTS ---

const MONEY_TRANSFER_DATA = [
  { id: 1, type: "Fetch Beni", charge: "0%", commission: "0%" },
  { id: 2, type: "DMT", charge: "₹ 10", commission: "₹ 3" },
  { id: 3, type: "DMT", charge: "1%", commission: "0.45%" },
  { id: 4, type: "Verification", charge: "₹ 3", commission: "0%" },
  { id: 5, type: "DMT", charge: "₹ 10", commission: "₹ 3" },
  { id: 6, type: "DMT", charge: "1%", commission: "0.45%" },
  { id: 7, type: "UPI", charge: "₹ 12", commission: "₹ 0" },
  { id: 8, type: "UPI", charge: "0.6%", commission: "0%" },
  { id: 9, type: "QUICKPAY DIRECT", charge: "0.55%", commission: "0.05%" },
  { id: 10, type: "QUICKPAY DIRECT", charge: "0.55%", commission: "0.05%" },
  { id: 11, type: "QUICKPAY DIRECT", charge: "0.55%", commission: "0.05%" },
  { id: 12, type: "DIGIKHATA IMPS", charge: "₹ 10", commission: "₹ 1" },
  { id: 13, type: "DIGIKHATA IMPS", charge: "1%", commission: "0.15%" },
  { id: 14, type: "DIGIKHATA IMPS", charge: "0.5%", commission: "0%" },
  { id: 15, type: "DIGIKHATA IMPS", charge: "0.6%", commission: "0.05%" },
  { id: 16, type: "QUICKPAY SPECIAL", charge: "0.55%", commission: "0.05%" },
  { id: 17, type: "PPI KYC", charge: "0.55%", commission: "0.05%" },
  { id: 18, type: "PPI KYC", charge: "0.55%", commission: "0.05%" },
  { id: 19, type: "PPI KYC", charge: "0.55%", commission: "0.05%" },
  { id: 20, type: "UPI", charge: "₹ 10", commission: "0%" },
  { id: 21, type: "VERIFICATION", charge: "₹ 3", commission: "0%" },
];

const RECHARGE_DATA = [
  { id: 1, type: "Airtel DTH", commission: "2.95%" },
  { id: 2, type: "Dish TV", commission: "2.95%" },
  { id: 3, type: "Airtel Postpaid", commission: "0.15%" },
  { id: 4, type: "BSNL Postpaid", commission: "0.15%" },
  { id: 5, type: "BSNL STV Postpaid", commission: "0.15%" },
  { id: 6, type: "Jio Postpaid", commission: "0.15%" },
  { id: 7, type: "Vodafone Postpaid", commission: "0.15%" },
  { id: 8, type: "Airtel Prepaid", commission: "0.65%" },
  { id: 9, type: "BSNL Prepaid", commission: "3.45%" },
  { id: 10, type: "BSNL-STV Prepaid", commission: "3.45%" },
  { id: 11, type: "Jio Prepaid", commission: "0.45%" },
  { id: 12, type: "Vodafone Prepaid", commission: "2.95%" },
  { id: 13, type: "Sun Direct TV", commission: "2.95%" },
  { id: 14, type: "Tata Sky", commission: "2.95%" },
  { id: 15, type: "Videocon D2H", commission: "2.95%" },
];

const BBPS_DATA = [
  { id: 1, type: "Bill Fetch", commission: "0%" },
  { id: 2, type: "Electricity 5000 To 100000", commission: "0.3%" },
  { id: 3, type: "Electricity 100001 To 5000000", commission: "0.25%" },
  { id: 4, type: "Gas Bill Payment", commission: "0.15%" },
  { id: 5, type: "Gas Booking", commission: "0%" },
  { id: 6, type: "Insurance Payment", commission: "0.2%" },
  { id: 7, type: "Landline Bill", commission: "0.2%" },
  { id: 8, type: "LIC Bill Payment", commission: "0.2%" },
  { id: 9, type: "Water Bill", commission: "0.15%" },
  { id: 10, type: "Part Payment", commission: "0%" },
];

const AEPS_DATA = [
  { id: 1, type: "Balance Enquiry", commission: "0%" },
  { id: 2, type: "Wallet Transfer", commission: "0%" },
  { id: 3, type: "Cash Withdrawal", commission: "0.25%" },
  { id: 4, type: "Cash Withdrawal 3K TO 10K", commission: "₹ 11" },
  { id: 5, type: "Mini Statement", commission: "0%" },
  { id: 6, type: "AEPS Settlement-1", commission: "0%" },
  { id: 7, type: "AEPS Settlement-2", commission: "0%" },
  { id: 8, type: "AEPS Settlement-3", commission: "0%" },
  { id: 9, type: "AEPS Settlement-4", commission: "0%" },
];

const ChargeCommissionPage = () => {
  const [activeTab, setActiveTab] = useState('DMT');
  const [searchTerm, setSearchTerm] = useState('');

  // Helper to filter data based on active tab & search
  const getFilteredData = () => {
    let data = [];
    if (activeTab === 'DMT') data = MONEY_TRANSFER_DATA;
    if (activeTab === 'Recharge') data = RECHARGE_DATA;
    if (activeTab === 'BBPS') data = BBPS_DATA;
    if (activeTab === 'AEPS') data = AEPS_DATA;

    return data.filter(item => 
      item.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Tabs Configuration
  const tabs = [
    { id: 'DMT', label: 'Money Transfer', icon: RefreshCw, color: 'text-emerald-600', activeBg: 'bg-emerald-600', ring: 'focus:ring-emerald-500' },
    { id: 'Recharge', label: 'Recharge', icon: Smartphone, color: 'text-blue-600', activeBg: 'bg-blue-600', ring: 'focus:ring-blue-500' },
    { id: 'BBPS', label: 'BBPS / Bill', icon: Zap, color: 'text-orange-600', activeBg: 'bg-orange-600', ring: 'focus:ring-orange-500' },
    { id: 'AEPS', label: 'AEPS Banking', icon: Fingerprint, color: 'text-purple-600', activeBg: 'bg-purple-600', ring: 'focus:ring-purple-500' },
  ];

  const currentTabInfo = tabs.find(t => t.id === activeTab);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 pb-24 font-sans text-slate-900">
      
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-200 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600 border border-indigo-100">
                <Percent size={24} strokeWidth={2.5} />
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Commission Structure</h1>
            </div>
            <p className="text-slate-500 font-medium ml-1">View transparent charges and your earning potential.</p>
          </div>

          {/* Styled Search Bar */}
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search Operator or Service..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm group-hover:shadow-md"
            />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white p-2 rounded-[20px] shadow-sm border border-slate-100 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSearchTerm(''); }}
              className={`flex-1 min-w-[140px] flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300 ${
                activeTab === tab.id 
                  ? `${tab.activeBg} text-white shadow-md transform scale-[1.02]` 
                  : 'bg-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`}
            >
              <tab.icon size={18} /> {tab.label}
            </button>
          ))}
        </div>

        {/* Data Table */}
        <div className="bg-white border border-slate-200 rounded-[2rem] shadow-lg shadow-slate-200/50 overflow-hidden relative">
          
          {/* Decorative Top Bar */}
          <div className={`h-1.5 w-full ${currentTabInfo.activeBg} opacity-80`}></div>

          <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
                <tr>
                  <th className="px-8 py-5 text-xs font-extrabold text-slate-400 uppercase tracking-wider w-16 text-center">#</th>
                  <th className="px-8 py-5 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Transaction Type / Operator</th>
                  
                  {activeTab === 'DMT' && (
                    <th className="px-8 py-5 text-xs font-extrabold text-slate-500 uppercase tracking-wider text-right">Charge</th>
                  )}
                  
                  <th className="px-8 py-5 text-xs font-extrabold text-slate-500 uppercase tracking-wider text-right">
                    <div className="flex items-center justify-end gap-1">
                      <span>Your Earnings</span> <ArrowRight size={12} className="text-emerald-500" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <AnimatePresence mode='wait'>
                  {getFilteredData().length > 0 ? (
                    getFilteredData().map((row, index) => (
                      <motion.tr 
                        key={row.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.2, delay: index * 0.03 }}
                        className="hover:bg-indigo-50/30 transition-colors group cursor-default"
                      >
                        <td className="px-8 py-4 text-xs font-bold text-slate-300 text-center group-hover:text-indigo-400">{index + 1}</td>
                        <td className="px-8 py-4">
                          <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">{row.type}</span>
                        </td>
                        
                        {activeTab === 'DMT' && (
                          <td className="px-8 py-4 text-right">
                             <div className="inline-flex items-center justify-end">
                                <span className="bg-rose-50 text-rose-600 border border-rose-100 px-3 py-1 rounded-lg text-xs font-bold font-mono shadow-sm">
                                  {row.charge}
                                </span>
                             </div>
                          </td>
                        )}
                        
                        <td className="px-8 py-4 text-right">
                          <div className="inline-flex items-center justify-end">
                            <span className={`inline-flex items-center px-4 py-1.5 rounded-lg text-xs font-bold font-mono shadow-sm border ${
                              row.commission.includes('0%') || row.commission === '0' || row.commission === '₹ 0'
                                ? 'bg-slate-100 text-slate-400 border-slate-200' 
                                : 'bg-emerald-50 text-emerald-600 border-emerald-100 ring-1 ring-emerald-500/10'
                            }`}>
                              {row.commission === '0' || row.commission === '0%' ? 'No Comm.' : row.commission}
                            </span>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-8 py-20 text-center">
                        <div className="flex flex-col items-center gap-4 opacity-60">
                          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                            <Filter size={32} className="text-slate-300" />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-slate-600">No Records Found</h4>
                            <p className="text-sm text-slate-400">Try searching for a different operator.</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ChargeCommissionPage;