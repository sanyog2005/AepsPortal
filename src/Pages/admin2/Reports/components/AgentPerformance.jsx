import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Medal, TrendingUp, MapPin, Search, Bell, 
  User, Phone, Mail, ArrowUpRight, AlertCircle, CheckCircle2 
} from 'lucide-react';

// --- Mock Data ---
const TOP_AGENTS = [
  { id: 1, name: "Rahul Telecom", loc: "Delhi, DL", vol: "₹ 45.2L", txns: 1200, growth: 12.5, rank: 1 },
  { id: 2, name: "Singh Travels", loc: "Ludhiana, PB", vol: "₹ 38.5L", txns: 980, growth: 8.2, rank: 2 },
  { id: 3, name: "City Point", loc: "Mumbai, MH", vol: "₹ 32.1L", txns: 850, growth: 5.4, rank: 3 },
  { id: 4, name: "Amit General Store", loc: "Patna, BR", vol: "₹ 28.0L", txns: 1400, growth: -2.1, rank: 4 },
  { id: 5, name: "Vijay Digital", loc: "Jaipur, RJ", vol: "₹ 21.5L", txns: 650, growth: 4.0, rank: 5 },
];

const INACTIVE_AGENTS = [
  { id: 101, name: "Kumar Shop", days: 45, reason: "Zero Balance", phone: "+91 9876543210" },
  { id: 102, name: "Ravi Digital Seva", days: 32, reason: "KYC Pending", phone: "+91 9988776655" },
  { id: 103, name: "Pooja General Store", days: 28, reason: "Inactive", phone: "+91 8877665544" },
  { id: 104, name: "Tech World", days: 60, reason: "Fraud Flag", phone: "+91 7766554433" },
];

const AgentPerformance = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [notifying, setNotifying] = useState(null); // Stores ID of agent being notified

  // --- Filtering ---
  const filteredAgents = TOP_AGENTS.filter(agent => 
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    agent.loc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- Actions ---
  const handleNotify = (id) => {
    setNotifying(id);
    setTimeout(() => {
      setNotifying(null);
      alert("Reminder SMS sent successfully!");
    }, 1500);
  };

  const getRankStyle = (rank) => {
    if (rank === 1) return "bg-yellow-100 text-yellow-700 border-yellow-200";
    if (rank === 2) return "bg-slate-100 text-slate-600 border-slate-300";
    if (rank === 3) return "bg-orange-100 text-orange-700 border-orange-200";
    return "bg-white text-slate-500 border-slate-200";
  };

  return (
    <div className="space-y-6 font-sans text-slate-900">
      
      {/* --- Summary Stats --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Agents</p>
                  <h3 className="text-2xl font-extrabold text-slate-900 mt-1">1,492</h3>
              </div>
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <User size={24} />
              </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Ratio</p>
                  <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">84%</h3>
              </div>
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                  <TrendingUp size={24} />
              </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Churn Risk</p>
                  <h3 className="text-2xl font-extrabold text-rose-600 mt-1">4.2%</h3>
              </div>
              <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
                  <AlertCircle size={24} />
              </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* --- Top Performers (Leaderboard) --- */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-full flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                    <Medal className="text-yellow-500" /> Leaderboard
                </h3>
                
                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                    <input 
                        type="text" 
                        placeholder="Search agent..." 
                        className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-blue-500/20 w-48"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex-1 space-y-3">
                <AnimatePresence>
                    {filteredAgents.map((agent) => (
                        <motion.div 
                            key={agent.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100 hover:shadow-md transition-all group"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 flex items-center justify-center font-bold text-sm rounded-full border-2 shadow-sm ${getRankStyle(agent.rank)}`}>
                                    {agent.rank}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">{agent.name}</h4>
                                    <p className="text-[11px] text-slate-500 flex items-center gap-1 font-medium mt-0.5">
                                        <MapPin size={10} /> {agent.loc}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="text-right">
                                <div className="font-bold text-slate-900 text-sm">{agent.vol}</div>
                                <div className={`text-[10px] font-bold flex items-center justify-end gap-1 ${agent.growth >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                    {agent.growth >= 0 ? '+' : ''}{agent.growth}% <ArrowUpRight size={10} className={agent.growth < 0 ? "rotate-90" : ""} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>

        {/* --- Dormant / Inactive Agents --- */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-full flex flex-col">
            <h3 className="font-bold text-slate-800 text-lg mb-6 flex items-center gap-2">
                <AlertCircle className="text-rose-500" /> Retention Watchlist
            </h3>
            
            <div className="flex-1 space-y-4">
                {INACTIVE_AGENTS.map((agent) => (
                    <div key={agent.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-rose-50/50 rounded-xl border border-rose-100 gap-4">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-white rounded-full border border-rose-100 text-rose-500">
                                <User size={16} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 text-sm">{agent.name}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[10px] font-bold bg-white border border-rose-200 text-rose-600 px-1.5 py-0.5 rounded">
                                        Inactive: {agent.days} Days
                                    </span>
                                    <span className="text-[10px] text-slate-500 font-medium">
                                        Reason: {agent.reason}
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-colors" title="Call Agent">
                                <Phone size={16} />
                            </button>
                            <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-colors" title="Email Agent">
                                <Mail size={16} />
                            </button>
                            <button 
                                onClick={() => handleNotify(agent.id)}
                                disabled={notifying === agent.id}
                                className="flex items-center gap-2 px-3 py-2 bg-rose-100 text-rose-700 text-xs font-bold rounded-lg hover:bg-rose-200 transition-colors disabled:opacity-70 w-24 justify-center"
                            >
                                {notifying === agent.id ? (
                                    <span className="animate-spin rounded-full h-3 w-3 border-b-2 border-rose-700"></span>
                                ) : (
                                    <><Bell size={14} /> Notify</>
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
                <p className="text-xs text-slate-500">
                    Automated retention emails are sent every Monday for inactive users 
                    30 days.
                </p>
            </div>
        </div>

      </div>
    </div>
  );
};

export default AgentPerformance;