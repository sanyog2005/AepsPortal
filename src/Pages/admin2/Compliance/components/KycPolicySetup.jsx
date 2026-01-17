import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckSquare, Square, Plus, Save, Trash2, 
  FileCheck, ShieldCheck, Cpu, X 
} from 'lucide-react';

// --- Mock Data ---
const INITIAL_DOCS = [
  { id: 1, doc: "Aadhaar Card (Front/Back)", ret: true, dist: true, ai: true },
  { id: 2, doc: "PAN Card", ret: true, dist: true, ai: true },
  { id: 3, doc: "Live Selfie / Video KYC", ret: true, dist: true, ai: false },
  { id: 4, doc: "Shop Establishment License", ret: false, dist: true, ai: false },
  { id: 5, doc: "Cancelled Cheque / Passbook", ret: true, dist: true, ai: true },
  { id: 6, doc: "Police Verification Certificate", ret: false, dist: false, ai: false },
];

const KycPolicySetup = () => {
  const [documents, setDocuments] = useState(INITIAL_DOCS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDocName, setNewDocName] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  // --- Statistics ---
  const mandatoryCount = documents.filter(d => d.ret).length;
  const aiEnabledCount = documents.filter(d => d.ai).length;

  // --- Actions ---

  const toggleField = (id, field) => {
    setDocuments(documents.map(doc => 
      doc.id === id ? { ...doc, [field]: !doc[field] } : doc
    ));
    setIsSaved(false);
  };

  const handleDelete = (id) => {
    if(window.confirm("Remove this document requirement?")) {
      setDocuments(documents.filter(d => d.id !== id));
      setIsSaved(false);
    }
  };

  const handleAddDoc = (e) => {
    e.preventDefault();
    if (!newDocName.trim()) return;

    const newDoc = {
      id: Date.now(),
      doc: newDocName,
      ret: false,
      dist: false,
      ai: false
    };

    setDocuments([...documents, newDoc]);
    setNewDocName("");
    setIsModalOpen(false);
    setIsSaved(false);
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 font-sans text-slate-900">
      
      {/* --- Header & Quick Stats --- */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileCheck className="text-blue-600" size={20} /> KYC Policy Configuration
          </h3>
          <p className="text-sm text-slate-500 mt-1 max-w-xl">
             Define mandatory documents for onboarding. Changes apply instantly to the signup flow.
          </p>
          <div className="flex gap-3 mt-4">
             <span className="text-xs font-bold px-2 py-1 bg-emerald-50 text-emerald-700 rounded border border-emerald-100">
                {mandatoryCount} Mandatory Docs
             </span>
             <span className="text-xs font-bold px-2 py-1 bg-purple-50 text-purple-700 rounded border border-purple-100">
                {aiEnabledCount} AI Verified
             </span>
          </div>
        </div>
        
        <div className="flex gap-3">
             {isSaved && (
                <motion.div 
                    initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-bold border border-emerald-100"
                >
                    Saved Successfully
                </motion.div>
             )}
             <button 
                onClick={handleSave}
                className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 active:scale-95"
             >
                <Save size={18} /> Save Policy
             </button>
        </div>
      </div>

      {/* --- Document Table --- */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
         <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-slate-50/50">
             <h4 className="font-bold text-slate-700 text-sm">Document Requirements</h4>
             <button 
                onClick={() => setIsModalOpen(true)}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
             >
                <Plus size={14} /> Add Document
             </button>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200">
                    <tr className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        <th className="px-6 py-4">Document Name</th>
                        <th className="px-6 py-4 text-center">Retailer</th>
                        <th className="px-6 py-4 text-center">Distributor</th>
                        <th className="px-6 py-4 text-center">AI Verification</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                    <AnimatePresence>
                        {documents.map((row) => (
                            <motion.tr 
                                key={row.id}
                                layout
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="hover:bg-slate-50/80 transition-colors group"
                            >
                                <td className="px-6 py-4 font-bold text-slate-800">
                                    {row.doc}
                                </td>
                                
                                {/* Retailer Toggle */}
                                <td className="px-6 py-4 text-center">
                                    <button 
                                        onClick={() => toggleField(row.id, 'ret')}
                                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all active:scale-95 ${
                                            row.ret 
                                            ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100' 
                                            : 'bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100'
                                        }`}
                                    >
                                        {row.ret ? <CheckSquare size={14}/> : <Square size={14}/>} 
                                        {row.ret ? 'Mandatory' : 'Optional'}
                                    </button>
                                </td>

                                {/* Distributor Toggle */}
                                <td className="px-6 py-4 text-center">
                                    <button 
                                        onClick={() => toggleField(row.id, 'dist')}
                                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all active:scale-95 ${
                                            row.dist 
                                            ? 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100' 
                                            : 'bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100'
                                        }`}
                                    >
                                        {row.dist ? <CheckSquare size={14}/> : <Square size={14}/>} 
                                        {row.dist ? 'Mandatory' : 'Optional'}
                                    </button>
                                </td>

                                {/* AI Toggle */}
                                <td className="px-6 py-4 text-center">
                                    <button 
                                        onClick={() => toggleField(row.id, 'ai')}
                                        className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold transition-all ${
                                            row.ai 
                                            ? 'bg-purple-50 border-purple-200 text-purple-700' 
                                            : 'bg-slate-50 border-slate-200 text-slate-400'
                                        }`}
                                    >
                                        {row.ai ? <Cpu size={14}/> : <ShieldCheck size={14}/>}
                                        {row.ai ? 'Auto-Verify' : 'Manual'}
                                        
                                        {/* Status Dot */}
                                        <span className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-white ${row.ai ? 'bg-green-500' : 'bg-slate-300'}`}></span>
                                    </button>
                                </td>

                                {/* Delete Action */}
                                <td className="px-6 py-4 text-right">
                                    <button 
                                        onClick={() => handleDelete(row.id)}
                                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </AnimatePresence>
                </tbody>
            </table>
         </div>
      </div>

      {/* --- Add Document Modal --- */}
      <AnimatePresence>
        {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
                >
                    <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <h3 className="font-bold text-lg text-slate-800">Add Requirement</h3>
                        <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                            <X size={20} />
                        </button>
                    </div>
                    
                    <form onSubmit={handleAddDoc} className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Document Name</label>
                            <input 
                                type="text" 
                                required
                                autoFocus
                                placeholder="e.g. GST Certificate"
                                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                value={newDocName}
                                onChange={(e) => setNewDocName(e.target.value)}
                            />
                        </div>

                        <div className="pt-2 flex gap-3">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2.5 border border-slate-300 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50">Cancel</button>
                            <button type="submit" className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 shadow-lg">
                                Add Document
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

export default KycPolicySetup;