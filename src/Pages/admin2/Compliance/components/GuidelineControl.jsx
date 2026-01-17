import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ToggleRight, AlertTriangle, FileText, ExternalLink, 
  Plus, Save, Shield, Download, X, Edit2 
} from 'lucide-react';

// --- Mock Data ---
const INITIAL_MANDATES = [
  { id: 1, title: "2FA Biometric for AEPS", desc: "Require agent biometric auth every 24 hours (NPCI Rule).", active: true, category: "Security" },
  { id: 2, title: "DMT Monthly Sender Cap", desc: "Hard limit of ₹25,000 per mobile number per month.", active: true, category: "Limit" },
  { id: 3, title: "Corporate PAN Validation", desc: "Mandatory GST + PAN verification for new Distributors.", active: false, category: "KYC" },
  { id: 4, title: "Geo-Fencing Check", desc: "Block transactions if GPS coordinates mismatch shop location.", active: true, category: "Fraud" },
];

const INITIAL_LOGS = [
  { id: 1, event: "Updated PPI Limits", user: "Admin (You)", time: "10 mins ago", type: "info" },
  { id: 2, event: "Disabled 2FA for Test Group", user: "SysAdmin", time: "2 hrs ago", type: "alert" },
  { id: 3, event: "New GST Rule Added", user: "Compliance Officer", time: "1 day ago", type: "info" },
];

const GuidelineControl = () => {
  const [mandates, setMandates] = useState(INITIAL_MANDATES);
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [showAlert, setShowAlert] = useState(true);
  
  // Edit Modal State
  const [editingRule, setEditingRule] = useState(null);
  const [formData, setFormData] = useState({ title: '', desc: '', category: '' });

  // --- Actions ---

  // 1. Toggle Rule & Add Log
  const toggleMandate = (id) => {
    const rule = mandates.find(m => m.id === id);
    const newState = !rule.active;

    setMandates(mandates.map(m => m.id === id ? { ...m, active: newState } : m));

    const newLog = {
        id: Date.now(),
        event: `${newState ? 'Enabled' : 'Disabled'}: ${rule.title}`,
        user: "Admin (You)",
        time: "Just now",
        type: newState ? "success" : "alert"
    };
    setLogs([newLog, ...logs]);
  };

  // 2. Open Edit Modal
  const openEditModal = (rule) => {
    setEditingRule(rule);
    setFormData({ title: rule.title, desc: rule.desc, category: rule.category });
  };

  // 3. Save Edited Rule
  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingRule) return;

    // Update Data
    setMandates(mandates.map(m => m.id === editingRule.id ? { ...m, ...formData } : m));

    // Log the change
    const newLog = {
        id: Date.now(),
        event: `Modified Rule: ${formData.title}`,
        user: "Admin (You)",
        time: "Just now",
        type: "info"
    };
    setLogs([newLog, ...logs]);
    
    // Close Modal
    setEditingRule(null);
  };

  // 4. Add New Mandate (Simulation)
  const handleAddRule = () => {
    const newRule = {
        id: Date.now(),
        title: "New Compliance Rule",
        desc: "New rule description placeholder.",
        active: false,
        category: "Custom"
    };
    setMandates([...mandates, newRule]);
    // Automatically open edit for the new rule
    openEditModal(newRule);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 font-sans text-slate-900">
        
        {/* --- Left Column: Active Mandates --- */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* Section Header */}
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                        <Shield size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900">Regulatory Controls</h3>
                        <p className="text-xs text-slate-500 font-medium">Manage RBI & NPCI enforcement rules.</p>
                    </div>
                </div>
                <button 
                    onClick={handleAddRule}
                    className="flex items-center gap-2 text-slate-600 font-bold text-xs bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl hover:bg-slate-100 transition-colors"
                >
                    <Plus size={14} /> Add Rule
                </button>
            </div>

            {/* Rules List */}
            <div className="space-y-4">
                <AnimatePresence>
                    {mandates.map((rule) => (
                        <motion.div 
                            key={rule.id}
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-6 rounded-2xl border transition-all group relative ${
                                rule.active 
                                ? 'bg-white border-slate-200 shadow-sm' 
                                : 'bg-slate-50 border-slate-200 opacity-80'
                            }`}
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex-1 pr-12">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h4 className={`font-bold text-sm ${rule.active ? 'text-slate-900' : 'text-slate-500'}`}>
                                            {rule.title}
                                        </h4>
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                                            rule.active 
                                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                                            : 'bg-slate-200 text-slate-500 border-slate-300'
                                        }`}>
                                            {rule.active ? 'Active' : 'Disabled'}
                                        </span>
                                        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                                            {rule.category}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500 max-w-md leading-relaxed">{rule.desc}</p>
                                </div>

                                {/* Actions: Edit & Toggle */}
                                <div className="flex items-center gap-4">
                                    <button 
                                        onClick={() => openEditModal(rule)}
                                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                        title="Edit Rule Details"
                                    >
                                        <Edit2 size={16} />
                                    </button>

                                    <button 
                                        onClick={() => toggleMandate(rule.id)}
                                        className={`relative w-12 h-7 rounded-full transition-colors duration-300 ${
                                            rule.active ? 'bg-blue-600' : 'bg-slate-300'
                                        }`}
                                    >
                                        <motion.div 
                                            className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md"
                                            animate={{ x: rule.active ? 20 : 0 }}
                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>

        {/* --- Right Column: Audit & Alerts --- */}
        <div className="space-y-6">
            
            {/* NPCI Alert Box */}
            <AnimatePresence>
                {showAlert && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                        className="bg-amber-50 border border-amber-100 p-5 rounded-2xl relative overflow-hidden"
                    >
                        <div className="flex gap-3">
                            <div className="p-2 bg-amber-100 text-amber-600 rounded-lg h-fit">
                                <AlertTriangle size={18} />
                            </div>
                            <div>
                                <h5 className="font-bold text-sm text-amber-800">Pending NPCI Review</h5>
                                <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                                    New circular regarding UPI transaction limits needs implementation by 30th Nov.
                                </p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setShowAlert(false)}
                            className="absolute top-2 right-2 p-1 text-amber-400 hover:text-amber-700 transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Audit Log Panel */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[500px]">
                <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 rounded-t-2xl">
                    <h3 className="font-bold text-slate-800 text-sm">Compliance Ledger</h3>
                    <button className="text-xs font-bold text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors flex items-center gap-1">
                        <Download size={12} /> Export
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    <AnimatePresence initial={false}>
                        {logs.map((log) => (
                            <motion.div 
                                key={log.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-start gap-3 p-3 hover:bg-slate-50 rounded-xl transition-colors group"
                            >
                                <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
                                    log.type === 'alert' ? 'bg-rose-500' : 
                                    log.type === 'success' ? 'bg-emerald-500' : 'bg-blue-500'
                                }`} />
                                
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <p className="text-xs font-bold text-slate-700 leading-tight">{log.event}</p>
                                        <span className="text-[10px] text-slate-400 whitespace-nowrap ml-2">{log.time}</span>
                                    </div>
                                    <div className="flex justify-between items-center mt-1">
                                        <p className="text-[10px] text-slate-500 font-medium">By {log.user}</p>
                                        <button className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-blue-600">
                                            <ExternalLink size={12} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
                
                <div className="p-3 border-t border-slate-100 text-center">
                    <span className="text-[10px] text-slate-400 font-mono">LOG_ID: {Date.now().toString().slice(-8)}</span>
                </div>
            </div>
        </div>

        {/* --- EDIT MODAL --- */}
        <AnimatePresence>
            {editingRule && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                    <motion.div 
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
                    >
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h3 className="font-bold text-lg text-slate-800">Edit Rule Configuration</h3>
                            <button onClick={() => setEditingRule(null)} className="text-slate-400 hover:text-slate-600">
                                <X size={20} />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Rule Title</label>
                                <input 
                                    type="text" 
                                    required
                                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                    value={formData.title}
                                    onChange={e => setFormData({...formData, title: e.target.value})}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Category</label>
                                <select 
                                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                    value={formData.category}
                                    onChange={e => setFormData({...formData, category: e.target.value})}
                                >
                                    <option>Security</option>
                                    <option>Limit</option>
                                    <option>KYC</option>
                                    <option>Fraud</option>
                                    <option>Custom</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Description / Logic</label>
                                <textarea 
                                    rows="3"
                                    required
                                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                                    value={formData.desc}
                                    onChange={e => setFormData({...formData, desc: e.target.value})}
                                />
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button type="button" onClick={() => setEditingRule(null)} className="flex-1 py-2.5 border border-slate-300 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50">Cancel</button>
                                <button type="submit" className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 shadow-lg flex items-center justify-center gap-2">
                                    <Save size={16} /> Save Changes
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>

    </div>
  );
};

export default GuidelineControl;