import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRightLeft, ShieldCheck, Smartphone, Globe, CreditCard, 
  Settings2, Save, CheckCircle2, AlertCircle, X, Server, 
  Plus, Edit2, Trash2, Zap
} from 'lucide-react';

// --- Mock Data ---
const PROVIDERS = ["Yes Bank API", "ICICI Stack", "Paytm Payouts", "CyberPlat", "Razorpay", "Eko Connect", "None"];
const CATEGORIES = ["Banking", "Utility", "Payment", "Verification", "Travel"];

const INITIAL_SERVICES = [
  { id: 101, name: "AEPS Withdrawal", category: "Banking", primary: "Yes Bank API", backup: "ICICI Stack", icon: <ShieldCheck size={20} />, timeout: 5000, retries: 2 },
  { id: 102, name: "Money Transfer (DMT)", category: "Banking", primary: "ICICI Stack", backup: "Paytm Payouts", icon: <Globe size={20} />, timeout: 3000, retries: 1 },
  { id: 103, name: "Mobile Recharge", category: "Utility", primary: "CyberPlat", backup: "Eko Connect", icon: <Smartphone size={20} />, timeout: 8000, retries: 0 },
  { id: 104, name: "Credit Card Bill", category: "Utility", primary: "Razorpay", backup: "None", icon: <CreditCard size={20} />, timeout: 10000, retries: 3 },
];

const AServiceMapping = () => {
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [isSaved, setIsSaved] = useState(false);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'Banking',
    primary: PROVIDERS[0],
    backup: 'None',
    timeout: 5000,
    retries: 1
  });

  // --- Actions ---

  // 1. Open Modal (Add or Edit)
  const openModal = (service = null) => {
    if (service) {
      setEditingService(service);
      setFormData({
        name: service.name,
        category: service.category,
        primary: service.primary,
        backup: service.backup,
        timeout: service.timeout,
        retries: service.retries
      });
    } else {
      setEditingService(null);
      setFormData({
        name: '',
        category: 'Banking',
        primary: PROVIDERS[0],
        backup: 'None',
        timeout: 5000,
        retries: 1
      });
    }
    setIsModalOpen(true);
  };

  // 2. Save Service (Create/Update)
  const handleSaveService = (e) => {
    e.preventDefault();
    
    // Assign a default icon based on category for new items
    const getIcon = (cat) => {
        if(cat === 'Banking') return <ShieldCheck size={20} />;
        if(cat === 'Utility') return <Smartphone size={20} />;
        return <Zap size={20} />;
    };

    const payload = {
        ...formData,
        id: editingService ? editingService.id : Date.now(),
        icon: editingService ? editingService.icon : getIcon(formData.category)
    };

    if (editingService) {
        setServices(services.map(s => s.id === editingService.id ? payload : s));
    } else {
        setServices([...services, payload]);
    }
    
    setIsModalOpen(false);
    setIsSaved(false);
  };

  // 3. Delete Service
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this service map?")) {
        setServices(services.filter(s => s.id !== id));
        setIsSaved(false);
    }
  };

  // 4. Quick Route Update (Directly from table)
  const handleRouteUpdate = (id, field, value) => {
    setServices(services.map(s => s.id === id ? { ...s, [field]: value } : s));
    setIsSaved(false);
  };

  // 5. Global Save Simulation
  const handleGlobalSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 font-sans text-slate-900">
      
      {/* --- Page Header --- */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Service API Mapping</h1>
          <p className="text-slate-500 text-sm mt-1">Define which API provider handles specific services.</p>
        </div>
        
        <div className="flex gap-3">
            {isSaved && (
                <motion.div 
                    initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-bold border border-emerald-100"
                >
                    <CheckCircle2 size={16} /> Changes Saved
                </motion.div>
            )}
            <button 
                onClick={handleGlobalSave}
                className="flex items-center gap-2 bg-white border border-slate-300 text-slate-700 px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all"
            >
                <Save size={18} /> Save All
            </button>
            <button 
                onClick={() => openModal()}
                className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 active:scale-95"
            >
                <Plus size={18} /> Add Service
            </button>
        </div>
      </div>

      {/* --- Routing Engine Info --- */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-6 rounded-2xl flex items-start gap-4">
        <div className="p-3 bg-blue-100 rounded-xl h-fit text-blue-600 shadow-sm">
            <ArrowRightLeft size={24} />
        </div>
        <div>
            <h3 className="font-bold text-blue-900 text-lg">Active Routing Engine</h3>
            <p className="text-sm text-blue-700 mt-1 max-w-3xl leading-relaxed">
                Transactions are routed to the <strong>Primary Route</strong> first. 
                If the API fails or response time exceeds the configured timeout, 
                the system automatically switches to the <strong>Backup Route</strong>.
            </p>
        </div>
      </div>

      {/* --- Mapping Table --- */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
                <tr className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <th className="px-6 py-4">Service Name</th>
                    <th className="px-6 py-4">Primary Route (Priority 1)</th>
                    <th className="px-6 py-4">Backup Route (Priority 2)</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                <AnimatePresence>
                    {services.map((s) => (
                        <motion.tr 
                            key={s.id} 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="hover:bg-slate-50/80 transition-colors group"
                        >
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 bg-slate-100 rounded-xl text-slate-600 border border-slate-200">
                                        {s.icon}
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-800 text-sm">{s.name}</div>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide bg-slate-100 px-1.5 py-0.5 rounded">
                                                {s.category}
                                            </span>
                                            <span className="text-[10px] text-slate-400">
                                                {s.timeout}ms limit
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            
                            <td className="px-6 py-4">
                                <div className="relative">
                                    <Server className="absolute left-3 top-2.5 text-emerald-600" size={14} />
                                    <select 
                                        value={s.primary}
                                        onChange={(e) => handleRouteUpdate(s.id, 'primary', e.target.value)}
                                        className="pl-9 pr-4 py-2 w-full max-w-[200px] bg-white border border-slate-300 rounded-lg text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 cursor-pointer hover:border-emerald-400 transition-colors appearance-none"
                                    >
                                        {PROVIDERS.map(p => (
                                            <option key={p} value={p}>{p}</option>
                                        ))}
                                    </select>
                                </div>
                            </td>
                            
                            <td className="px-6 py-4">
                                <div className="relative">
                                    <Server className="absolute left-3 top-2.5 text-blue-600" size={14} />
                                    <select 
                                        value={s.backup}
                                        onChange={(e) => handleRouteUpdate(s.id, 'backup', e.target.value)}
                                        className="pl-9 pr-4 py-2 w-full max-w-[200px] bg-white border border-slate-300 rounded-lg text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer hover:border-blue-400 transition-colors appearance-none"
                                    >
                                        {PROVIDERS.map(p => (
                                            <option key={p} value={p} disabled={p === s.primary}>
                                                {p}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </td>
                            
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button 
                                        onClick={() => openModal(s)}
                                        className="p-2 hover:bg-blue-50 rounded-lg text-slate-400 hover:text-blue-600 transition-colors"
                                        title="Edit Service Config"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(s.id)}
                                        className="p-2 hover:bg-rose-50 rounded-lg text-slate-400 hover:text-rose-600 transition-colors"
                                        title="Delete Service"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </motion.tr>
                    ))}
                </AnimatePresence>
            </tbody>
        </table>
      </div>

      {/* --- ADD / EDIT MODAL --- */}
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
                        <h3 className="font-bold text-lg text-slate-800">{editingService ? 'Edit Service API' : 'Add New Service'}</h3>
                        <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                            <X size={20} />
                        </button>
                    </div>
                    
                    <form onSubmit={handleSaveService} className="p-6 space-y-4">
                        
                        {/* Name & Category */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Service Name</label>
                                <input 
                                    type="text" 
                                    required
                                    placeholder="e.g. Fastag Recharge"
                                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Category</label>
                                <select 
                                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                    value={formData.category}
                                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                                >
                                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="h-px bg-slate-100 my-2"></div>

                        {/* Routing Configuration */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Primary API</label>
                                <select 
                                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                    value={formData.primary}
                                    onChange={(e) => setFormData({...formData, primary: e.target.value})}
                                >
                                    {PROVIDERS.map(p => <option key={p}>{p}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Backup API</label>
                                <select 
                                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                    value={formData.backup}
                                    onChange={(e) => setFormData({...formData, backup: e.target.value})}
                                >
                                    {PROVIDERS.map(p => <option key={p} disabled={p === formData.primary}>{p}</option>)}
                                </select>
                            </div>
                        </div>

                        {/* Tech Config */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Timeout (ms)</label>
                                <input 
                                    type="number" step="500" min="1000" required
                                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                    value={formData.timeout}
                                    onChange={(e) => setFormData({...formData, timeout: Number(e.target.value)})}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Retries</label>
                                <select 
                                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                    value={formData.retries}
                                    onChange={(e) => setFormData({...formData, retries: Number(e.target.value)})}
                                >
                                    <option value="0">0 (None)</option>
                                    <option value="1">1 Retry</option>
                                    <option value="2">2 Retries</option>
                                    <option value="3">3 Retries</option>
                                </select>
                            </div>
                        </div>

                        <div className="pt-4 flex gap-3">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2.5 border border-slate-300 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50">Cancel</button>
                            <button type="submit" className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 shadow-lg">
                                {editingService ? 'Update Service' : 'Create Service'}
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

export default AServiceMapping;