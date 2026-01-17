import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Plus, Edit2, Trash2, X, Save, AlertCircle, CheckCircle2 } from 'lucide-react';

// --- Mock Initial Data ---
const INITIAL_DATA = [
  { id: 1, category: 'AEPS', min: 100, max: 499, type: 'Flat', ret: 0.50, dist: 0.10, sa: 0.05 },
  { id: 2, category: 'AEPS', min: 500, max: 999, type: 'Flat', ret: 1.50, dist: 0.25, sa: 0.10 },
  { id: 3, category: 'AEPS', min: 1000, max: 2999, type: 'Percentage', ret: 0.25, dist: 0.05, sa: 0.02 },
  { id: 4, category: 'DMT', min: 100, max: 5000, type: 'Percentage', ret: 0.50, dist: 0.10, sa: 0.05 },
  { id: 5, category: 'Recharge', min: 10, max: 10000, type: 'Percentage', ret: 2.50, dist: 0.50, sa: 0.10 },
];

const ACommissionSetup = () => {
  const [data, setData] = useState(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState('AEPS');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    min: '', max: '', type: 'Flat', ret: '', dist: '', sa: ''
  });

  // --- Actions ---

  // 1. Filter Data based on Tab
  const filteredData = data.filter(item => item.category === activeTab);

  // 2. Delete Row
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this slab?")) {
      setData(data.filter(item => item.id !== id));
    }
  };

  // 3. Open Modal (Add or Edit)
  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({ min: '', max: '', type: 'Flat', ret: '', dist: '', sa: '' });
    }
    setIsModalOpen(true);
  };

  // 4. Save Data
  const handleSave = (e) => {
    e.preventDefault();
    const payload = {
        ...formData,
        id: editingItem ? editingItem.id : Date.now(),
        category: activeTab,
        min: Number(formData.min),
        max: Number(formData.max),
        ret: Number(formData.ret),
        dist: Number(formData.dist),
        sa: Number(formData.sa),
    };

    if (editingItem) {
        setData(data.map(item => item.id === editingItem.id ? payload : item));
    } else {
        setData([...data, payload]);
    }
    setIsModalOpen(false);
  };

  // 5. Download Dummy CSV
  const handleDownload = () => {
    const csvContent = "data:text/csv;charset=utf-8,Category,Min,Max,Type,Retailer,Distributor,Admin\n" 
        + data.map(e => `${e.category},${e.min},${e.max},${e.type},${e.ret},${e.dist},${e.sa}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "commission_slabs.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="space-y-6 font-sans text-slate-900">
      
      {/* --- Top Controls --- */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        
        {/* Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-lg overflow-x-auto max-w-full">
            {['AEPS', 'DMT', 'Recharge', 'Bill Pay'].map((tab) => (
                <button 
                    key={tab} 
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2 text-sm font-bold rounded-md transition-all whitespace-nowrap ${
                        activeTab === tab 
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                    {tab}
                </button>
            ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
            <button 
                onClick={handleDownload}
                className="flex items-center gap-2 text-slate-600 font-bold text-sm bg-white border border-slate-300 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors"
            >
                <Download size={16} /> <span className="hidden sm:inline">Export CSV</span>
            </button>
            <button 
                onClick={() => openModal()}
                className="flex items-center gap-2 text-white font-bold text-sm bg-slate-900 px-4 py-2 rounded-lg hover:bg-slate-800 shadow-md transition-all hover:scale-105"
            >
                <Plus size={16} /> Add Slab
            </button>
        </div>
      </div>

      {/* --- Data Table --- */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        {filteredData.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
                <AlertCircle className="mx-auto mb-2 h-10 w-10 text-slate-300" />
                <p>No commission slabs found for {activeTab}.</p>
                <button onClick={() => openModal()} className="text-blue-600 font-bold text-sm mt-2 hover:underline">Add First Slab</button>
            </div>
        ) : (
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr className="text-xs text-slate-500 uppercase tracking-wider">
                            <th className="px-6 py-4 font-semibold">Transaction Range (₹)</th>
                            <th className="px-6 py-4 font-semibold text-center">Type</th>
                            <th className="px-6 py-4 font-semibold text-right bg-emerald-50/50 text-emerald-700">Retailer</th>
                            <th className="px-6 py-4 font-semibold text-right bg-blue-50/50 text-blue-700">Distributor</th>
                            <th className="px-6 py-4 font-semibold text-right bg-indigo-50/50 text-indigo-700">Super Admin</th>
                            <th className="px-6 py-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                        {filteredData.map((row) => (
                            <motion.tr 
                                key={row.id} 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="hover:bg-slate-50/80 transition-colors group"
                            >
                                <td className="px-6 py-4 font-mono font-medium text-slate-600">
                                    ₹ {row.min} - ₹ {row.max === 100000 ? 'Unlimited' : row.max}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border ${
                                        row.type === 'Flat' 
                                        ? 'bg-amber-50 border-amber-200 text-amber-700' 
                                        : 'bg-purple-50 border-purple-200 text-purple-700'
                                    }`}>
                                        {row.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right font-mono font-bold text-emerald-600 bg-emerald-50/10">
                                    {row.type === 'Flat' ? '₹' : ''} {row.ret} {row.type === 'Percentage' ? '%' : ''}
                                </td>
                                <td className="px-6 py-4 text-right font-mono font-bold text-blue-600 bg-blue-50/10">
                                    {row.type === 'Flat' ? '₹' : ''} {row.dist} {row.type === 'Percentage' ? '%' : ''}
                                </td>
                                <td className="px-6 py-4 text-right font-mono font-bold text-indigo-600 bg-indigo-50/10">
                                    {row.type === 'Flat' ? '₹' : ''} {row.sa} {row.type === 'Percentage' ? '%' : ''}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => openModal(row)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-blue-600 transition-colors">
                                            <Edit2 size={16}/>
                                        </button>
                                        <button onClick={() => handleDelete(row.id)} className="p-2 hover:bg-red-50 rounded-lg text-slate-500 hover:text-red-600 transition-colors">
                                            <Trash2 size={16}/>
                                        </button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
      </div>

      {/* --- ADD / EDIT MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
                >
                    <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <h3 className="font-bold text-lg text-slate-800">{editingItem ? 'Edit Commission Slab' : 'Add New Slab'}</h3>
                        <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                            <X size={20} />
                        </button>
                    </div>
                    
                    <form onSubmit={handleSave} className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Min Amount (₹)</label>
                                <input 
                                    type="number" 
                                    required
                                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                    value={formData.min}
                                    onChange={e => setFormData({...formData, min: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Max Amount (₹)</label>
                                <input 
                                    type="number" 
                                    required
                                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                    value={formData.max}
                                    onChange={e => setFormData({...formData, max: e.target.value})}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Commission Type</label>
                            <select 
                                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                value={formData.type}
                                onChange={e => setFormData({...formData, type: e.target.value})}
                            >
                                <option value="Flat">Flat Amount (₹)</option>
                                <option value="Percentage">Percentage (%)</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-3 gap-3 pt-2">
                            <div>
                                <label className="block text-[10px] font-bold text-emerald-600 uppercase mb-1">Retailer</label>
                                <input type="number" step="0.01" required className="w-full border border-emerald-200 bg-emerald-50/30 rounded-lg px-3 py-2 text-sm font-bold text-emerald-800"
                                    value={formData.ret} onChange={e => setFormData({...formData, ret: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-blue-600 uppercase mb-1">Distributor</label>
                                <input type="number" step="0.01" required className="w-full border border-blue-200 bg-blue-50/30 rounded-lg px-3 py-2 text-sm font-bold text-blue-800"
                                    value={formData.dist} onChange={e => setFormData({...formData, dist: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-indigo-600 uppercase mb-1">Super Admin</label>
                                <input type="number" step="0.01" required className="w-full border border-indigo-200 bg-indigo-50/30 rounded-lg px-3 py-2 text-sm font-bold text-indigo-800"
                                    value={formData.sa} onChange={e => setFormData({...formData, sa: e.target.value})} />
                            </div>
                        </div>

                        <div className="pt-4 flex gap-3">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2.5 border border-slate-300 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50">Cancel</button>
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

export default ACommissionSetup;