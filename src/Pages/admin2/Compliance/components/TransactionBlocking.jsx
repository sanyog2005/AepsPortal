import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldBan, Unlock, Smartphone, Globe, CreditCard, 
  Search, UserX, Wallet, AlertTriangle, X, CheckCircle2, Ban
} from 'lucide-react';

// --- Mock Data ---
const INITIAL_SERVICES = [
  { id: 1, name: "AEPS Cash Withdrawal", icon: <CreditCard size={20}/>, status: "Active" },
  { id: 2, name: "Money Transfer (DMT)", icon: <Globe size={20}/>, status: "Active" },
  { id: 3, name: "Mobile Recharge", icon: <Smartphone size={20}/>, status: "Blocked" },
];

const MOCK_USER = {
  id: "RT00921",
  name: "Rahul Telecom",
  role: "Retailer",
  location: "Delhi, India",
  walletBalance: "₹ 12,450.00",
  status: "Active",
  avatar: "R"
};

const TransactionBlocking = () => {
  const [services, setServices] = useState(INITIAL_SERVICES);
  
  // User Search State
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [foundUser, setFoundUser] = useState(null);
  const [searchError, setSearchError] = useState(false);

  // Modal State
  const [modal, setModal] = useState({ open: false, type: '', data: null });

  // --- Actions ---

  // 1. Service Blocking Logic
  const toggleService = (service) => {
    // If blocking, ask confirmation. If unblocking, just do it.
    if (service.status === 'Active') {
        setModal({ open: true, type: 'block_service', data: service });
    } else {
        updateServiceStatus(service.id, 'Active');
    }
  };

  const updateServiceStatus = (id, status) => {
    setServices(services.map(s => s.id === id ? { ...s, status } : s));
  };

  // 2. User Search Logic
  const handleSearch = (e) => {
    e.preventDefault();
    if (!query) return;

    setIsSearching(true);
    setSearchError(false);
    setFoundUser(null);

    // Simulate API call
    setTimeout(() => {
        setIsSearching(false);
        if (query.toLowerCase() === 'rt00921' || query.toLowerCase() === 'rahul') {
            setFoundUser(MOCK_USER);
        } else {
            setSearchError(true);
        }
    }, 800);
  };

  // 3. User Blocking Logic
  const initiateUserAction = (actionType) => {
    setModal({ open: true, type: actionType, data: foundUser });
  };

  // 4. Confirm Modal Action
  const confirmModalAction = () => {
    if (modal.type === 'block_service') {
        updateServiceStatus(modal.data.id, 'Blocked');
    } else if (modal.type === 'block_wallet') {
        setFoundUser({ ...foundUser, status: 'Wallet Frozen' });
    } else if (modal.type === 'block_account') {
        setFoundUser({ ...foundUser, status: 'Banned' });
    }
    setModal({ open: false, type: '', data: null });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans text-slate-900">
        
        {/* --- Left Column: Global Service Controls --- */}
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-full">
                <div className="mb-6">
                    <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                        <ShieldBan className="text-slate-400" size={20} /> Service Kill Switch
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                        Temporarily disable specific services platform-wide. Useful during maintenance or API outages.
                    </p>
                </div>
                
                <div className="space-y-3">
                    {services.map((s) => (
                        <motion.div 
                            key={s.id}
                            layout
                            className={`flex justify-between items-center p-4 rounded-xl border transition-all ${
                                s.status === 'Blocked' 
                                ? 'bg-red-50 border-red-100' 
                                : 'bg-slate-50 border-slate-100'
                            }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-2.5 rounded-lg ${s.status === 'Blocked' ? 'bg-white text-red-500' : 'bg-white text-slate-500'}`}>
                                    {s.icon}
                                </div>
                                <div>
                                    <span className="font-bold text-sm text-slate-800 block">{s.name}</span>
                                    <span className={`text-[10px] font-bold uppercase tracking-wider ${s.status === 'Blocked' ? 'text-red-600' : 'text-emerald-600'}`}>
                                        {s.status}
                                    </span>
                                </div>
                            </div>
                            
                            <button 
                                onClick={() => toggleService(s)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold border transition-all active:scale-95 ${
                                    s.status === 'Blocked' 
                                    ? 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/20' 
                                    : 'bg-white border-slate-200 text-slate-600 hover:border-red-200 hover:text-red-600 hover:bg-red-50'
                                }`}
                            >
                                {s.status === 'Blocked' ? <Unlock size={14} /> : <ShieldBan size={14} />}
                                {s.status === 'Blocked' ? 'Unblock' : 'Block'}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>

        {/* --- Right Column: User Blocking --- */}
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-full flex flex-col">
                <div className="mb-6">
                    <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                        <UserX className="text-slate-400" size={20} /> Targeted Blocking
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                        Freeze a specific user's wallet or suspend their account entirely.
                    </p>
                </div>

                {/* Search Box */}
                <form onSubmit={handleSearch} className="relative mb-6">
                    <input 
                        type="text" 
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 transition-all" 
                        placeholder="Enter User ID or Mobile (e.g. RT00921)" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <Search className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
                    <button 
                        type="submit"
                        disabled={isSearching || !query}
                        className="absolute right-2 top-2 bg-slate-900 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-800 disabled:opacity-50 transition-all"
                    >
                        {isSearching ? '...' : 'Search'}
                    </button>
                </form>

                {/* Search Result Area */}
                <div className="flex-1">
                    <AnimatePresence mode="wait">
                        {isSearching ? (
                            <motion.div 
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="h-40 flex items-center justify-center text-slate-400 text-sm"
                            >
                                Searching database...
                            </motion.div>
                        ) : searchError ? (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                className="bg-red-50 border border-red-100 rounded-xl p-4 text-center"
                            >
                                <p className="text-sm text-red-600 font-bold">User not found.</p>
                                <p className="text-xs text-red-400 mt-1">Please check the ID and try again.</p>
                            </motion.div>
                        ) : foundUser ? (
                            <motion.div 
                                key="user-card"
                                initial={{ opacity: 0, scale: 0.95 }} 
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-slate-50 border border-slate-200 rounded-xl p-5"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-600/20">
                                        {foundUser.avatar}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-lg">{foundUser.name}</h4>
                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <span className="bg-white border border-slate-200 px-1.5 py-0.5 rounded">{foundUser.id}</span>
                                            <span>• {foundUser.location}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-slate-100 mb-6">
                                    <span className="text-xs font-bold text-slate-500">Wallet Balance</span>
                                    <span className="font-mono font-bold text-slate-800">{foundUser.walletBalance}</span>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <button 
                                        onClick={() => initiateUserAction('block_wallet')}
                                        disabled={foundUser.status.includes('Frozen')}
                                        className="py-2.5 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-orange-50 hover:border-orange-200 hover:text-orange-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        <Wallet size={16} /> {foundUser.status.includes('Frozen') ? 'Wallet Frozen' : 'Freeze Wallet'}
                                    </button>
                                    <button 
                                        onClick={() => initiateUserAction('block_account')}
                                        disabled={foundUser.status === 'Banned'}
                                        className="py-2.5 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        <Ban size={16} /> {foundUser.status === 'Banned' ? 'Account Banned' : 'Ban Account'}
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="h-40 flex flex-col items-center justify-center text-slate-300 border-2 border-dashed border-slate-100 rounded-xl">
                                <Search size={32} className="mb-2 opacity-50" />
                                <p className="text-sm font-medium">Search for a user to manage access.</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>

        {/* --- Confirmation Modal --- */}
        <AnimatePresence>
            {modal.open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                    <motion.div 
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
                    >
                        <div className="p-6 text-center">
                            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
                                <AlertTriangle size={32} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Are you sure?</h3>
                            <p className="text-sm text-slate-500 mb-6 px-4">
                                {modal.type === 'block_service' && `You are about to disable ${modal.data.name}. This will stop all transactions for this service immediately.`}
                                {modal.type === 'block_wallet' && `This will freeze the wallet for ${modal.data.name}. They won't be able to transact.`}
                                {modal.type === 'block_account' && `This will permanently ban ${modal.data.name} from logging in.`}
                            </p>
                            
                            <div className="flex gap-3">
                                <button 
                                    onClick={() => setModal({ open: false, type: '', data: null })}
                                    className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={confirmModalAction}
                                    className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 shadow-lg shadow-red-600/20"
                                >
                                    Confirm Block
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>

    </div>
  );
};

export default TransactionBlocking;