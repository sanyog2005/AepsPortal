import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Lock, Smartphone, Shield, Mail, Phone, 
  MapPin, CheckCircle, Save, X, ChevronRight, Key
} from 'lucide-react';

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState(null); // 'password' | 'mpin' | null

  // --- Sub-Components ---

  const ProfileField = ({ icon: Icon, label, value }) => (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50">
      <div className="p-2.5 bg-white rounded-lg shadow-sm text-slate-400">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
        <p className="text-sm font-bold text-slate-700">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 pb-12">
      
      {/* 1. Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Account Settings</h1>
        <p className="text-slate-500 font-medium mt-2">Manage your personal profile and security preferences.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* --- LEFT COLUMN: VIEW PROFILE --- */}
        <div className="xl:col-span-1 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200 relative overflow-hidden"
          >
            {/* Decoration */}
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-slate-900 to-slate-800"></div>
            
            <div className="relative z-10 flex flex-col items-center mt-4">
              <div className="w-24 h-24 rounded-full p-1 bg-white shadow-xl">
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white">
                  AM
                </div>
              </div>
              <h2 className="mt-4 text-xl font-bold text-slate-800">Alex Morgan</h2>
              <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider mt-1 border border-indigo-100">
                Super Admin
              </span>
            </div>

            <div className="mt-8 space-y-3">
              <ProfileField icon={Mail} label="Email Address" value="alex.morgan@quicknpay.com" />
              <ProfileField icon={Phone} label="Phone Number" value="+91 98765 43210" />
              <ProfileField icon={MapPin} label="Location" value="New Delhi, India" />
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle size={14} /> KYC Verified
              </span>
              <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                Edit Details
              </button>
            </div>
          </motion.div>
        </div>

        {/* --- RIGHT COLUMN: SECURITY SETTINGS --- */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* Card: Change Password */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className={`bg-white rounded-[2rem] border transition-all duration-300 overflow-hidden ${
              activeSection === 'password' ? 'shadow-xl border-indigo-100 ring-4 ring-indigo-500/5' : 'shadow-sm border-slate-200'
            }`}
          >
            <div className="p-8">
              <div className="flex items-start justify-between">
                <div className="flex gap-5">
                  <div className="p-4 bg-orange-50 text-orange-600 rounded-2xl border border-orange-100">
                    <Lock size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">Login Password</h3>
                    <p className="text-slate-500 text-sm mt-1 max-w-md">
                      Secure your account by updating your password regularly. Use a mix of characters for better security.
                    </p>
                  </div>
                </div>
                {activeSection !== 'password' && (
                  <button 
                    onClick={() => setActiveSection('password')}
                    className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors"
                  >
                    Change
                  </button>
                )}
              </div>

              <AnimatePresence>
                {activeSection === 'password' && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-8 mt-8 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Current Password</label>
                          <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-bold text-slate-800" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">New Password</label>
                          <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-bold text-slate-800" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Confirm New Password</label>
                          <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-bold text-slate-800" />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                      <button 
                        onClick={() => setActiveSection(null)}
                        className="px-6 py-3 rounded-xl text-slate-500 font-bold text-sm hover:bg-slate-100 transition-colors"
                      >
                        Cancel
                      </button>
                      <button className="px-8 py-3 rounded-xl bg-slate-900 text-white font-bold text-sm shadow-lg hover:bg-slate-800 transition-all flex items-center gap-2">
                        <Save size={16} /> Update Password
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Card: Change MPIN */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className={`bg-white rounded-[2rem] border transition-all duration-300 overflow-hidden ${
              activeSection === 'mpin' ? 'shadow-xl border-indigo-100 ring-4 ring-indigo-500/5' : 'shadow-sm border-slate-200'
            }`}
          >
            <div className="p-8">
              <div className="flex items-start justify-between">
                <div className="flex gap-5">
                  <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl border border-purple-100">
                    <Key size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">Transaction MPIN</h3>
                    <p className="text-slate-500 text-sm mt-1 max-w-md">
                      Your 4-digit PIN used for verifying sensitive transactions. Keep this strictly confidential.
                    </p>
                  </div>
                </div>
                {activeSection !== 'mpin' && (
                  <button 
                    onClick={() => setActiveSection('mpin')}
                    className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors"
                  >
                    Change
                  </button>
                )}
              </div>

              <AnimatePresence>
                {activeSection === 'mpin' && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-8 mt-8 border-t border-slate-100 flex flex-col md:flex-row gap-6">
                      <div className="flex-1">
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Current MPIN</label>
                        <div className="flex gap-3">
                          {[1, 2, 3, 4].map(i => (
                            <input key={i} type="password" maxLength="1" className="w-12 h-14 rounded-xl bg-slate-50 border border-slate-200 text-center text-2xl font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all" />
                          ))}
                        </div>
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">New MPIN</label>
                        <div className="flex gap-3">
                          {[1, 2, 3, 4].map(i => (
                            <input key={i} type="password" maxLength="1" className="w-12 h-14 rounded-xl bg-slate-50 border border-slate-200 text-center text-2xl font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-8">
                      <button 
                        onClick={() => setActiveSection(null)}
                        className="px-6 py-3 rounded-xl text-slate-500 font-bold text-sm hover:bg-slate-100 transition-colors"
                      >
                        Cancel
                      </button>
                      <button className="px-8 py-3 rounded-xl bg-purple-600 text-white font-bold text-sm shadow-lg hover:bg-purple-700 transition-all flex items-center gap-2">
                        <Shield size={16} /> Update MPIN
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default SettingsPage;