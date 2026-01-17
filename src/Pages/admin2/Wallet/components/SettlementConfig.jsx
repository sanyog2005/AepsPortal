import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Clock, Info, Save, CheckCircle2, IndianRupee 
} from 'lucide-react';

const SettlementConfig = () => {
  // --- State ---
  const [retailerCycle, setRetailerCycle] = useState('T0'); // 'T0' or 'T1'
  const [distributorCycle, setDistributorCycle] = useState('T1');
  const [autoHoldHolidays, setAutoHoldHolidays] = useState(true);
  const [slab1, setSlab1] = useState(5.00);
  const [slab2, setSlab2] = useState(10.00);
  
  const [isSaved, setIsSaved] = useState(false);

  // --- Actions ---

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 font-sans text-slate-900">
      
      {/* --- Page Header Action (Floating) --- */}
      <div className="flex justify-end">
          <AnimatePresence>
            {isSaved ? (
                <motion.div 
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-bold border border-emerald-100 shadow-sm"
                >
                    <CheckCircle2 size={18} /> Configuration Saved
                </motion.div>
            ) : (
                <button 
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 active:scale-95"
                >
                    <Save size={18} /> Save Config
                </button>
            )}
          </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* --- Left Column: Settlement Cycles --- */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 h-full">
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                <Clock size={20} className="text-blue-600"/> Settlement Cycles
            </h3>
            
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex gap-3">
                <Info size={20} className="text-blue-600 shrink-0 mt-0.5" />
                <p className="text-xs text-blue-700 leading-relaxed">
                    <strong>T+0 (Instant):</strong> Funds settled same day via IMPS (24x7). <br/>
                    <strong>T+1 (Next Day):</strong> Funds settled next working day via NEFT.
                </p>
            </div>

            <div className="space-y-4">
                {/* Retailer Toggle */}
                <div className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${retailerCycle === 'T0' ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50 border-slate-200'}`}>
                    <div>
                        <h4 className="font-bold text-slate-800">Retailer AEPS Settlement</h4>
                        <p className="text-xs text-slate-500">Default payout cycle for agents</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className={`text-xs font-bold px-2 py-1 rounded transition-colors ${retailerCycle === 'T0' ? 'bg-emerald-100 text-emerald-700' : 'text-slate-400'}`}>
                            {retailerCycle === 'T0' ? 'T+0 Active' : 'T+1 Active'}
                        </span>
                        
                        <button 
                            onClick={() => setRetailerCycle(retailerCycle === 'T0' ? 'T1' : 'T0')}
                            className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${retailerCycle === 'T0' ? 'bg-emerald-500' : 'bg-slate-300'}`}
                        >
                            <motion.div 
                                className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md"
                                animate={{ x: retailerCycle === 'T0' ? 24 : 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        </button>
                    </div>
                </div>

                {/* Distributor Toggle */}
                <div className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${distributorCycle === 'T0' ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50 border-slate-200'}`}>
                    <div>
                        <h4 className="font-bold text-slate-800">Distributor Commission</h4>
                        <p className="text-xs text-slate-500">Payout cycle for commissions</p>
                    </div>
                    <div className="flex items-center gap-3">
                         <span className={`text-xs font-bold px-2 py-1 rounded transition-colors ${distributorCycle === 'T0' ? 'bg-emerald-100 text-emerald-700' : 'text-slate-400'}`}>
                            {distributorCycle === 'T0' ? 'T+0 Active' : 'T+1 Active'}
                        </span>

                        <button 
                            onClick={() => setDistributorCycle(distributorCycle === 'T0' ? 'T1' : 'T0')}
                            className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${distributorCycle === 'T0' ? 'bg-emerald-500' : 'bg-slate-300'}`}
                        >
                            <motion.div 
                                className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md"
                                animate={{ x: distributorCycle === 'T0' ? 24 : 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* --- Right Column: Holidays & Charges --- */}
        <div className="space-y-6">
            
            {/* Holiday Config */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
                    <Calendar size={20} className="text-purple-600"/> Banking Holidays
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                    {['2nd Saturday', '4th Saturday', 'Sundays', 'National Holidays'].map(h => (
                        <span key={h} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-xs font-bold border border-purple-100">
                            {h}
                        </span>
                    ))}
                </div>
                
                <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${autoHoldHolidays ? 'bg-blue-600 border-blue-600' : 'bg-white border-slate-400'}`}>
                        {autoHoldHolidays && <CheckCircle2 size={14} className="text-white" />}
                    </div>
                    <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={autoHoldHolidays} 
                        onChange={() => setAutoHoldHolidays(!autoHoldHolidays)} 
                    />
                    <div className="flex-1">
                        <span className="text-sm font-bold text-slate-700 block">Auto-Hold Settlements</span>
                        <span className="text-xs text-slate-500">Pause T+1 payouts automatically on bank holidays.</span>
                    </div>
                </label>
            </div>

            {/* Charges Config */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
                    <IndianRupee size={20} className="text-orange-600"/> IMPS Charges
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-bold text-slate-500 mb-2 block uppercase">Slab 1 (₹1 - ₹25k)</label>
                        <div className="flex items-center border border-slate-300 rounded-xl px-3 py-2.5 bg-white focus-within:ring-2 focus-within:ring-blue-500/50 transition-all">
                            <span className="text-slate-400 mr-2 font-bold">₹</span>
                            <input 
                                type="number" 
                                value={slab1} 
                                onChange={(e) => setSlab1(e.target.value)}
                                className="bg-transparent w-full font-bold text-slate-800 outline-none text-sm" 
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-500 mb-2 block uppercase">Slab 2 (₹25k - ₹2L)</label>
                        <div className="flex items-center border border-slate-300 rounded-xl px-3 py-2.5 bg-white focus-within:ring-2 focus-within:ring-blue-500/50 transition-all">
                            <span className="text-slate-400 mr-2 font-bold">₹</span>
                            <input 
                                type="number" 
                                value={slab2} 
                                onChange={(e) => setSlab2(e.target.value)}
                                className="bg-transparent w-full font-bold text-slate-800 outline-none text-sm" 
                            />
                        </div>
                    </div>
                </div>
                <p className="text-xs text-slate-400 mt-3 text-center">
                    Charges are deducted automatically per settlement request.
                </p>
            </div>
        </div>

      </div>
    </div>
  );
};

export default SettlementConfig;