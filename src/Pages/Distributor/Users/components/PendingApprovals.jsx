import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Eye, FileText } from 'lucide-react';

const INITIAL_QUEUE = [
  { id: 1, name: "New Age Tech", type: "Distributor", date: "2 hrs ago", status: "KYC Pending" },
  { id: 2, name: "Kumar Point", type: "Retailer", date: "5 hrs ago", status: "Doc Review" },
  { id: 3, name: "Fast Pay", type: "Retailer", date: "1 day ago", status: "KYC Pending" },
];

const PendingApprovals = () => {
  const [queue, setQueue] = useState(INITIAL_QUEUE);

  const handleAction = (id, action) => {
    setQueue(queue.filter(q => q.id !== id));
    // In a real app, this would trigger an API call
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Pending KYC Approvals</h3>
            <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold">{queue.length} Pending</span>
        </div>
        
        <div className="divide-y divide-slate-100">
            <AnimatePresence>
                {queue.length === 0 ? (
                    <div className="p-12 text-center text-slate-400">All caught up! No pending approvals.</div>
                ) : (
                    queue.map((item) => (
                        <motion.div 
                            key={item.id}
                            exit={{ opacity: 0, height: 0 }}
                            className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-slate-100 rounded-xl text-slate-500">
                                    <FileText size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">{item.name}</h4>
                                    <p className="text-xs text-slate-500">{item.type} • Applied {item.date}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Docs">
                                    <Eye size={18} />
                                </button>
                                <button onClick={() => handleAction(item.id, 'reject')} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Reject">
                                    <X size={18} />
                                </button>
                                <button onClick={() => handleAction(item.id, 'approve')} className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Approve">
                                    <Check size={18} />
                                </button>
                            </div>
                        </motion.div>
                    ))
                )}
            </AnimatePresence>
        </div>
    </div>
  );
};

export default PendingApprovals;