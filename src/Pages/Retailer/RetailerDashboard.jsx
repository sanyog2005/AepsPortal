import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wallet, RefreshCw, Smartphone, Satellite, Lightbulb, 
  CreditCard, QrCode, Shield, Radio, Fuel, 
  Tv, Globe, Fingerprint, Banknote, 
  Ticket, AlertTriangle, ChevronRight, Zap, 
  CreditCard as CardIcon, Plane, Landmark, Receipt, ArrowRight
} from 'lucide-react';

// --- ANIMATION VARIANTS ---
const containerVar = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } }
};

const itemVar = {
  hidden: { y: 15, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 12 } }
};

// --- SUB-COMPONENTS ---

const DashboardHeader = () => (
  <div className="flex justify-between items-center mb-6 sticky top-0 z-30 bg-[#F8FAFC]/80 backdrop-blur-md py-4 -mx-4 px-4 md:static md:bg-transparent md:p-0">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg shadow-slate-900/20">
        RT
      </div>
      <div>
        <h1 className="text-lg md:text-2xl font-bold text-slate-900 leading-tight">Rahul Telecom</h1>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <p className="text-xs text-slate-500 font-medium">Online • ID: 88291</p>
        </div>
      </div>
    </div>

          {/* Marquee Alert */}
          <div className="flex-1 w-full md:w-auto bg-red-50 border border-red-100 rounded-xl py-2.5 px-4 flex items-center gap-3 overflow-hidden shadow-inner">
            <span className="flex items-center gap-1 text-[10px] font-bold bg-red-500 text-white px-2 py-0.5 rounded uppercase shrink-0 animate-pulse">
              <AlertTriangle size={10} /> Alert
            </span>
            <div className="flex-1 overflow-hidden relative h-5">
               <p className="absolute w-full text-red-700 font-bold text-sm whitespace-nowrap animate-marquee flex items-center">
                 Server Maintenance scheduled for Sunday 2 AM - 4 AM. Please complete settlements before 1 AM.
               </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 py-10 space-y-12">
        
        {/* --- 1. Service Sections (Rectangular Layout) --- */}
        <motion.div 
          className="space-y-10"
          variants={containerVar}
          initial="hidden"
          animate="visible"
        >
          {serviceCategories.map((category, idx) => (
            <div key={idx} className="relative">
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-5 pl-2">
                <div className="w-1 h-6 bg-slate-300 rounded-full"></div>
                <h3 className="text-lg font-extrabold text-slate-700 tracking-tight flex items-center gap-2 uppercase">
                  {category.title}
                </h3>
              </div>
              
              {/* Pro Action Cards Grid */}
              <motion.div 
                variants={containerVar}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
              >
                {category.items.map((item, i) => (
                  <motion.div 
                    key={i} 
                    variants={itemVar}
                    onClick={() => handleNavigation(item.path)}
                    className="bg-white rounded-2xl p-3 pl-5 border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 cursor-pointer group flex items-center justify-between gap-3 active:scale-[0.98] relative overflow-hidden"
                  >
                    {/* Background Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Left: Text Label */}
                    <div className="flex-1 min-w-0 relative z-10">
                        <h4 className="text-sm font-bold text-slate-700 group-hover:text-slate-900 truncate">
                            {item.label}
                        </h4>
                        <p className="text-[10px] text-slate-400 font-medium group-hover:text-slate-500 transition-colors flex items-center gap-1">
                            Proceed <ChevronRight size={10} />
                        </p>
                    </div>

                    {/* Right: Premium Icon Container */}
                    <div 
                      className={`
                        w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0 relative z-10 shadow-md group-hover:scale-110 group-hover:rotate-3
                        ${getGradientStyle(item.color)}
                      `}
                    >
                      <item.icon size={20} strokeWidth={2} className="text-white" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </motion.div>

        {/* --- 2. Analytics & Updates --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t border-slate-200">
          
          {/* Summary Section */}
          <div className="lg:col-span-8 bg-white rounded-[2rem] shadow-sm border border-slate-200 p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-800">
                  {tabContent[activeTab].header}
                </h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Real-time Data</p>
              </div>
              
              {/* Segmented Tabs */}
              <div className="bg-slate-100 p-1.5 rounded-2xl flex overflow-x-auto no-scrollbar max-w-full">
                {Object.keys(tabContent).map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      activeTab === tab 
                      ? 'bg-white text-slate-900 shadow-sm ring-1 ring-black/5' 
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              <AnimatePresence mode="wait">
                {tabContent[activeTab].cards.map((card, idx) => (
                  <motion.div 
                    key={card.label + idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => handleNavigation(card.path)}
                    className={`
                      relative overflow-hidden rounded-3xl p-6 flex flex-col justify-center items-center text-center cursor-pointer group transition-all hover:shadow-lg
                      ${card.wide ? 'col-span-2 md:col-span-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white' : 'bg-slate-50 hover:bg-white border border-slate-100 hover:border-slate-200 text-slate-800'}
                    `}
                  >
                    {!card.wide && <div className={`absolute top-0 left-0 w-full h-1.5 ${getBarColor(card.color)} opacity-80`}></div>}
                    <p className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${card.wide ? 'text-slate-400' : 'text-slate-400'}`}>{card.label}</p>
                    <p className="text-3xl font-extrabold tracking-tight">{card.value}</p>
                    
                    {/* Hover Arrow */}
                    {card.path && (
                      <div className={`absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity ${card.wide ? 'text-white' : 'text-slate-400'}`}>
                        <ArrowRight size={16} />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Live Updates & Alerts */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-8 py-5 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></div>
                <h3 className="font-bold text-slate-800">Bank Status</h3>
              </div>
              <div className="p-6 space-y-4">
                {['ALLAHABAD BANK', 'ORIENTAL BANK', 'PAYTM BANK'].map((bank, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-amber-50 rounded-2xl border border-amber-100/50">
                    <span className="text-xs font-bold text-amber-900">{bank}</span>
                    <span className="px-3 py-1 bg-white rounded-lg text-[10px] font-bold text-rose-600 border border-rose-100 shadow-sm">DOWN</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2rem] shadow-xl shadow-indigo-200 p-8 text-white text-center flex flex-col items-center justify-center min-h-[220px] relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
               
               <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-4 backdrop-blur-sm border border-white/10 relative z-10">
                  <RefreshCw size={28} className="text-white" />
               </div>
               <p className="text-sm font-bold text-indigo-100 relative z-10">No recent transactions</p>
               <button onClick={() => navigate('/retailer/reports')} className="mt-5 px-8 py-3 bg-white text-indigo-900 rounded-xl text-xs font-bold hover:bg-indigo-50 transition-colors shadow-lg relative z-10">
                  View Ledger
               </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// --- Helper: Gradient Styles for Icons (The "Better Favicon" Look) ---
const getGradientStyle = (color) => {
  const gradients = {
    purple: "bg-gradient-to-br from-purple-500 to-indigo-600 shadow-purple-500/30",
    emerald: "bg-gradient-to-br from-emerald-400 to-teal-500 shadow-emerald-500/30",
    green: "bg-gradient-to-br from-green-500 to-emerald-600 shadow-green-500/30",
    blue: "bg-gradient-to-br from-blue-500 to-indigo-500 shadow-blue-500/30",
    orange: "bg-gradient-to-br from-orange-400 to-red-500 shadow-orange-500/30",
    pink: "bg-gradient-to-br from-pink-500 to-rose-500 shadow-pink-500/30",
    red: "bg-gradient-to-br from-red-500 to-rose-600 shadow-red-500/30",
    cyan: "bg-gradient-to-br from-cyan-400 to-blue-500 shadow-cyan-500/30",
    yellow: "bg-gradient-to-br from-amber-400 to-orange-500 shadow-amber-500/30",
    teal: "bg-gradient-to-br from-teal-400 to-emerald-500 shadow-teal-500/30",
    indigo: "bg-gradient-to-br from-indigo-500 to-purple-600 shadow-indigo-500/30",
    rose: "bg-gradient-to-br from-rose-500 to-pink-600 shadow-rose-500/30",
    sky: "bg-gradient-to-br from-sky-400 to-blue-500 shadow-sky-500/30",
  };
  return gradients[color] || gradients.blue;
};

const getBarColor = (color) => {
  const bars = {
    emerald: "bg-emerald-500",
    rose: "bg-rose-500",
    amber: "bg-amber-500",
    sky: "bg-sky-500",
    blue: "bg-blue-500",
    violet: "bg-violet-500",
    cyan: "bg-cyan-500",
    slate: "bg-slate-500",
  };
  return bars[color] || "bg-slate-500";
};

export default RetailerDashboard;