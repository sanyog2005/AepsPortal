import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, ArrowDownLeft, ArrowUpRight, CreditCard, Landmark, 
  Wallet, Download, Plus, X, Search, User, History, 
  MinusCircle, AlertCircle, CheckCircle2, AlertTriangle, Clock
} from 'lucide-react';

// --- EXPANDED MOCK DATA ---

const INITIAL_TXNS = [
  { id: 9921, type: "Credit", from: "Yes Bank API (Auto-Sweep)", amount: 5000000, time: "10:30 AM", status: "Success" },
  { id: 9920, type: "Debit", from: "Settlement Batch #B-9921", amount: 2400000, time: "09:15 AM", status: "Processed" },
  { id: 9919, type: "Credit", from: "Razorpay Gateway Settlement", amount: 1250000, time: "Yesterday", status: "Success" },
  { id: 9918, type: "Debit", from: "Manual Payout - Vendor", amount: 45000, time: "Yesterday", status: "Success" },
  { id: 9917, type: "Credit", from: "ICICI Virtual Acct *8821", amount: 200000, time: "Yesterday", status: "Success" },
  { id: 9916, type: "Debit", from: "Server Cost Allocation", amount: 12000, time: "2 Days Ago", status: "Processed" },
  { id: 9915, type: "Credit", from: "HDFC API (Auto-Sweep)", amount: 3500000, time: "2 Days Ago", status: "Success" },
  { id: 9914, type: "Debit", from: "Failed Txn Reversal (Batch)", amount: 5400, time: "3 Days Ago", status: "Pending" },
];

const MOCK_USERS = [
    { 
        id: "RT001", 
        name: "Rahul Telecom", 
        balance: 24500.50, 
        type: "Retailer", 
        status: "Active", 
        history: [
            { id: 101, type: "Debit", desc: "Mobile Recharge (Jio)", amount: 299, time: "10:00 AM", status: "Success" },
            { id: 102, type: "Credit", desc: "Wallet Load via UPI", amount: 5000, time: "Yesterday", status: "Success" },
            { id: 103, type: "Debit", desc: "DMT Transfer", amount: 2000, time: "Yesterday", status: "Success" }
        ]
    },
    { 
        id: "DT002", 
        name: "Digital India Seva", 
        balance: 145000.00, 
        type: "Distributor", 
        status: "Active", 
        history: [
            { id: 201, type: "Credit", desc: "Commission Settlement", amount: 12450, time: "09:30 AM", status: "Success" },
            { id: 202, type: "Debit", desc: "Fund Transfer to RT001", amount: 50000, time: "2 Days Ago", status: "Success" }
        ]
    },
    { 
        id: "RT003", 
        name: "Vijay Communications", 
        balance: 450.00, 
        type: "Retailer", 
        status: "Low Balance", 
        history: [
            { id: 301, type: "Debit", desc: "Bill Payment (Failed)", amount: 1200, time: "11:00 AM", status: "Failed" },
            { id: 302, type: "Credit", desc: "Refund: TXN #8821", amount: 1200, time: "11:05 AM", status: "Success" }
        ]
    },
    { 
        id: "API99", 
        name: "PayWorld Tech Solutions", 
        balance: 8540200.00, 
        type: "API Partner", 
        status: "Active", 
        history: [
            { id: 401, type: "Debit", desc: "API Hit Charges (Bulk)", amount: 25000, time: "08:00 AM", status: "Processed" },
            { id: 402, type: "Credit", desc: "Margin Settlement", amount: 450000, time: "Yesterday", status: "Success" }
        ]
    },
    { 
        id: "RT005", 
        name: "Amit General Store", 
        balance: 0.00, 
        type: "Retailer", 
        status: "Suspended", 
        history: [
            { id: 501, type: "Debit", desc: "Penalty / Chargeback", amount: 5000, time: "Last Week", status: "Success" }
        ]
    },
    { 
        id: "DT006", 
        name: "Cyber Zone Enterprise", 
        balance: 52400.00, 
        type: "Distributor", 
        status: "Active", 
        history: []
    }
];

const MasterOverview = () => {
  const [balance, setBalance] = useState(14250000); 
  const [transactions, setTransactions] = useState(INITIAL_TXNS);
  
  // Modal States
  const [isLoadModalOpen, setIsLoadModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  
  // User Management States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [userActionType, setUserActionType] = useState("Credit"); // Credit or Debit
  const [userActionAmount, setUserActionAmount] = useState("");
  const [activeTab, setActiveTab] = useState("actions"); // actions or history

  // Load Money Logic (Master Wallet)
  const [masterLoadAmount, setMasterLoadAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // --- Actions ---

  const handleMasterLoad = (e) => {
    e.preventDefault();
    if (!masterLoadAmount) return;
    setIsProcessing(true);
    setTimeout(() => {
        setBalance(prev => prev + Number(masterLoadAmount));
        setTransactions([{
            id: Date.now(), type: "Credit", from: "Manual Load (HDFC)", amount: Number(masterLoadAmount), time: "Just now", status: "Success"
        }, ...transactions]);
        setIsProcessing(false);
        setIsLoadModalOpen(false);
        setMasterLoadAmount("");
    }, 1000);
  };

  const handleUserSearch = (e) => {
      e.preventDefault();
      // Case insensitive search for ID or Name
      const user = MOCK_USERS.find(u => 
          u.id.toLowerCase() === searchQuery.toLowerCase() || 
          u.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      if (user) {
          setSelectedUser(user);
          setIsUserModalOpen(true);
          setSearchQuery("");
      } else {
          alert("User not found! Try searching for 'RT001', 'Vijay', or 'API99'");
      }
  };

  const handleUserFundAction = (e) => {
      e.preventDefault();
      if (!userActionAmount || !selectedUser) return;
      setIsProcessing(true);
      
      setTimeout(() => {
          const amt = Number(userActionAmount);
          const newHistoryItem = {
              id: Date.now(),
              type: userActionType === "Credit" ? "Credit" : "Debit",
              desc: `Admin ${userActionType === "Credit" ? "Credit" : "Debit"} Adjustment`,
              amount: amt,
              time: "Just now",
              status: "Success"
          };
          
          // Update local mock state to reflect change immediately
          const updatedUser = { 
              ...selectedUser, 
              balance: userActionType === "Credit" ? selectedUser.balance + amt : selectedUser.balance - amt,
              history: [newHistoryItem, ...selectedUser.history]
          };
          
          setSelectedUser(updatedUser);
          setIsProcessing(false);
          setUserActionAmount("");
      }, 1000);
  };

  const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(val);

  return (
    <div className="space-y-8 font-sans text-slate-900 pb-10">
      
      {/* --- Balance Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Master Wallet */}
        <div className="md:col-span-1 bg-slate-900 p-6 rounded-[24px] text-white shadow-xl shadow-slate-900/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full -mr-10 -mt-10 blur-3xl group-hover:bg-blue-500/30 transition-colors"></div>
            <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">Main Liquidity Balance</h3>
                        <Wallet size={18} />
                    </div>
                    <div className="text-3xl font-bold font-mono tracking-tight">{formatCurrency(balance)}</div>
                </div>
                <div className="flex gap-3 mt-8">
                    <button onClick={() => setIsLoadModalOpen(true)} className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-bold shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2">
                        <Plus size={16} /> Load Money
                    </button>
                    <button className="flex-1 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold flex items-center justify-center gap-2">
                        <Download size={16} /> Statement
                    </button>
                </div>
            </div>
        </div>

        {/* AEPS Pool */}
        <div className="bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-emerald-100 text-emerald-700 rounded-xl"><Landmark size={24} /></div>
                    <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-1 rounded uppercase">Live Pool</span>
                </div>
                <h3 className="text-slate-500 text-xs font-bold uppercase mb-1">AEPS Settlement Pool</h3>
                <div className="text-2xl font-bold text-slate-900 tracking-tight">₹ 84,20,500.00</div>
            </div>
        </div>

        {/* Lien Balance */}
        <div className="bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-rose-100 text-rose-700 rounded-xl"><AlertCircle size={24} /></div>
                    <span className="text-[10px] font-bold bg-rose-50 text-rose-700 px-2 py-1 rounded uppercase">Disputed</span>
                </div>
                <h3 className="text-slate-500 text-xs font-bold uppercase mb-1">Lien Marked Amount</h3>
                <div className="text-2xl font-bold text-slate-900 tracking-tight">₹ 1,12,000.00</div>
            </div>
        </div>
      </div>

      {/* --- USER MANAGEMENT SECTION --- */}
      <div className="bg-white border border-slate-200 rounded-[24px] p-8 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-6">
              <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <User className="text-blue-600" size={20} /> User Wallet Manager
                  </h3>
                  <p className="text-slate-500 text-sm mt-1">Search for a Retailer, Distributor or API Partner to manage funds.</p>
              </div>
              <form onSubmit={handleUserSearch} className="flex w-full md:w-auto gap-2">
                  <input 
                      type="text" 
                      placeholder="Try 'RT001' or 'Vijay'" 
                      className="border border-slate-300 rounded-xl px-4 py-2.5 text-sm w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button type="submit" className="bg-slate-900 text-white px-4 py-2.5 rounded-xl hover:bg-slate-800 transition-colors">
                      <Search size={20} />
                  </button>
              </form>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-xl p-8 text-center text-slate-400">
              <div className="flex flex-wrap justify-center gap-3 mt-2">
                 <span className="text-xs font-bold px-2 py-1 bg-white border rounded text-slate-500">Available Mock IDs:</span>
                 {MOCK_USERS.map(u => (
                    <span key={u.id} className="text-xs font-mono bg-blue-50 text-blue-600 px-2 py-1 rounded cursor-pointer hover:bg-blue-100" onClick={() => setSearchQuery(u.id)}>{u.id}</span>
                 ))}
              </div>
          </div>
      </div>

      {/* --- RECENT TRANSACTIONS --- */}
     

      {/* --- MODAL: USER DETAILS & ACTIONS --- */}
      <AnimatePresence>
        {isUserModalOpen && selectedUser && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
                >
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                                {selectedUser.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-slate-800">{selectedUser.name}</h3>
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                    <span className="bg-slate-200 px-1.5 py-0.5 rounded text-slate-600 font-bold">{selectedUser.type}</span>
                                    <span>ID: {selectedUser.id}</span>
                                    <span className={`font-bold ${selectedUser.status === 'Active' ? 'text-emerald-600' : 'text-rose-600'}`}>• {selectedUser.status}</span>
                                </div>
                            </div>
                        </div>
                        <button onClick={() => setIsUserModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                            <X size={20} className="text-slate-500" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 overflow-y-auto">
                        
                        {/* User Balance Display */}
                        <div className="flex justify-between items-center p-4 bg-slate-900 text-white rounded-xl mb-6 shadow-lg">
                            <div>
                                <p className="text-xs text-slate-400 uppercase font-bold">Current Wallet Balance</p>
                                <p className="text-3xl font-bold font-mono">{formatCurrency(selectedUser.balance)}</p>
                            </div>
                            <Wallet size={32} className="text-blue-500 opacity-50" />
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-slate-200 mb-6">
                            <button 
                                onClick={() => setActiveTab("actions")}
                                className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors ${activeTab === "actions" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
                            >
                                Fund Actions
                            </button>
                            <button 
                                onClick={() => setActiveTab("history")}
                                className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors ${activeTab === "history" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
                            >
                                Transaction History
                            </button>
                        </div>

                        {activeTab === "actions" ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <button 
                                        onClick={() => setUserActionType("Credit")}
                                        className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${userActionType === "Credit" ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-slate-200 hover:border-emerald-200"}`}
                                    >
                                        <Plus size={24} />
                                        <span className="font-bold">Add Funds (Credit)</span>
                                    </button>
                                    <button 
                                        onClick={() => setUserActionType("Debit")}
                                        className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${userActionType === "Debit" ? "border-rose-500 bg-rose-50 text-rose-700" : "border-slate-200 hover:border-rose-200"}`}
                                    >
                                        <MinusCircle size={24} />
                                        <span className="font-bold">Withdraw (Debit)</span>
                                    </button>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Amount to {userActionType}</label>
                                    <input 
                                        type="number" 
                                        className="w-full border border-slate-300 rounded-xl px-4 py-3 text-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                        placeholder="0.00"
                                        value={userActionAmount}
                                        onChange={(e) => setUserActionAmount(e.target.value)}
                                        autoFocus
                                    />
                                </div>
                                
                                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-500 flex gap-2">
                                    <AlertCircle size={16} className="shrink-0" />
                                    <span>This action will be logged under admin adjustments. An SMS notification will be sent to the user.</span>
                                </div>

                                <button 
                                    onClick={handleUserFundAction}
                                    disabled={isProcessing || !userActionAmount}
                                    className={`w-full py-3.5 text-white rounded-xl text-sm font-bold shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 ${userActionType === "Credit" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-rose-600 hover:bg-rose-700"}`}
                                >
                                    {isProcessing ? "Processing..." : `Confirm ${userActionType}`}
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {selectedUser.history.length > 0 ? (
                                    selectedUser.history.map((tx) => (
                                        <div key={tx.id} className="flex justify-between items-center p-3 border border-slate-100 rounded-lg text-sm bg-slate-50/50">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-full ${tx.type === 'Credit' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-500'}`}>
                                                    {tx.type === 'Credit' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-800">{tx.desc}</div>
                                                    <div className="text-xs text-slate-400 flex items-center gap-1"><Clock size={10}/> {tx.time}</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className={`font-bold font-mono ${tx.type === 'Credit' ? 'text-emerald-600' : 'text-slate-900'}`}>
                                                    {tx.type === 'Credit' ? '+' : '-'} {formatCurrency(tx.amount)}
                                                </div>
                                                <span className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded ${tx.status === 'Failed' ? 'bg-rose-100 text-rose-600' : 'bg-slate-200 text-slate-500'}`}>
                                                    {tx.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-slate-400 flex flex-col items-center gap-2">
                                        <History size={32} className="opacity-20" />
                                        <p className="text-sm">No recent transactions found for this user.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

      {/* --- MODAL: LOAD MASTER WALLET --- */}
      <AnimatePresence>
        {isLoadModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
                >
                    <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <h3 className="font-bold text-lg text-slate-800">Load Master Wallet</h3>
                        <button onClick={() => setIsLoadModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                            <X size={20} />
                        </button>
                    </div>
                    <form onSubmit={handleMasterLoad} className="p-6 space-y-5">
                        <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex gap-3 items-start">
                            <Landmark className="text-blue-600 shrink-0 mt-0.5" size={20} />
                            <div>
                                <p className="text-sm font-bold text-blue-900">Virtual Account Transfer</p>
                                <p className="text-xs text-blue-700 mt-1">Instant credit via IMPS/NEFT to <span className="font-mono font-bold">YESB00022991</span></p>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Amount (₹)</label>
                            <input 
                                type="number" 
                                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                placeholder="0.00"
                                value={masterLoadAmount}
                                onChange={(e) => setMasterLoadAmount(e.target.value)}
                                autoFocus
                            />
                        </div>
                        <button disabled={isProcessing} className="w-full py-3.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 transition-all">
                            {isProcessing ? "Processing..." : "Confirm Load"}
                        </button>
                    </form>
                </motion.div>
            </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MasterOverview;