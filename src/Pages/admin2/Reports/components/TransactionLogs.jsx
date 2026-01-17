import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, ArrowUpRight, ArrowDownLeft, 
  Download, Eye, CheckCircle2, AlertCircle, Clock,
  Users, Store, Briefcase, Shield
} from 'lucide-react';

// --- Mock Data with Roles ---
const INITIAL_LOGS = [
  { id: "TXN_99201", date: "2023-10-24 10:42 AM", user: "Rahul Telecom", role: "Retailer", type: "Credit", service: "AEPS Cash W/D", amt: 2500, status: "Success", ref: "RRN882910" },
  { id: "TXN_99202", date: "2023-10-24 10:40 AM", user: "City Point", role: "Distributor", type: "Debit", service: "DMT Transfer", amt: 5000, status: "Pending", ref: "RRN772192" },
  { id: "TXN_99203", date: "2023-10-24 10:35 AM", user: "Vijay Store", role: "Retailer", type: "Credit", service: "Mobile Rech.", amt: 299, status: "Failed", ref: "RRN110293" },
  { id: "TXN_99204", date: "2023-10-24 10:12 AM", user: "Amit Pan", role: "Distributor", type: "Debit", service: "Payout", amt: 15000, status: "Success", ref: "RRN332190" },
  { id: "TXN_99205", date: "2023-10-23 09:00 PM", user: "Admin System", role: "Admin", type: "Credit", service: "Bill Payment", amt: 1450, status: "Success", ref: "RRN442100" },
  { id: "TXN_99206", date: "2023-10-23 08:30 PM", user: "Global Tech", role: "Retailer", type: "Credit", service: "AEPS Cash W/D", amt: 10000, status: "Success", ref: "RRN552101" },
];

const TransactionLogs = () => {
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filters
  const [statusFilter, setStatusFilter] = useState("All");
  const [serviceFilter, setServiceFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All"); // New Role Filter

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // --- Filtering Logic ---
  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
        log.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
        log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.ref.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || log.status === statusFilter;
    const matchesService = serviceFilter === "All" || log.service.includes(serviceFilter);
    const matchesRole = roleFilter === "All" || log.role === roleFilter; // Role Check

    return matchesSearch && matchesStatus && matchesService && matchesRole;
  });

  // --- Pagination Logic ---
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const paginatedLogs = filteredLogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(val);

  // Helper for Role Badges
  const getRoleIcon = (role) => {
      switch(role) {
          case 'Retailer': return <Store size={10} />;
          case 'Distributor': return <Briefcase size={10} />;
          case 'Admin': return <Shield size={10} />;
          default: return <Users size={10} />;
      }
  };

  return (
    <div className="space-y-6 font-sans text-slate-900">
      
      {/* --- Filter Toolbar --- */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col xl:flex-row gap-4 justify-between items-start xl:items-center">
          
          <div className="flex flex-col md:flex-row gap-3 w-full xl:w-auto">
              {/* Search */}
              <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                  <input 
                      type="text" 
                      placeholder="Search ID, User, RRN..." 
                      className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                  />
              </div>

              {/* Role Filter (New) */}
              <div className="relative">
                  <Users className="absolute left-3 top-2.5 text-slate-400" size={16} />
                  <select 
                      className="pl-9 pr-8 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer bg-white appearance-none w-full md:w-40 transition-all"
                      value={roleFilter}
                      onChange={(e) => setRoleFilter(e.target.value)}
                  >
                      <option value="All">All Roles</option>
                      <option value="Retailer">Retailer</option>
                      <option value="Distributor">Distributor</option>
                      <option value="Admin">Admin</option>
                  </select>
                  <div className="absolute right-3 top-3 pointer-events-none">
                      <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-slate-400"></div>
                  </div>
              </div>

              {/* Service Filter */}
              <div className="relative">
                  <Filter className="absolute left-3 top-2.5 text-slate-400" size={16} />
                  <select 
                      className="pl-9 pr-8 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer bg-white appearance-none w-full md:w-40 transition-all"
                      value={serviceFilter}
                      onChange={(e) => setServiceFilter(e.target.value)}
                  >
                      <option value="All">All Services</option>
                      <option value="AEPS">AEPS</option>
                      <option value="DMT">Money Transfer</option>
                      <option value="Rech">Recharge</option>
                      <option value="Payout">Payout</option>
                  </select>
                  <div className="absolute right-3 top-3 pointer-events-none">
                      <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-slate-400"></div>
                  </div>
              </div>
          </div>

          {/* Status Tabs */}
          <div className="flex p-1 bg-slate-100 rounded-lg w-full xl:w-auto overflow-x-auto no-scrollbar">
              {['All', 'Success', 'Pending', 'Failed'].map((status) => (
                  <button 
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all whitespace-nowrap ${
                          statusFilter === status 
                          ? 'bg-white text-slate-900 shadow-sm' 
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                  >
                      {status}
                  </button>
              ))}
          </div>
      </div>

      {/* --- Data Table --- */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm min-h-[400px] flex flex-col">
          <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-200">
                      <tr className="text-xs text-slate-500 uppercase tracking-wider">
                          <th className="px-6 py-4 font-bold">Transaction Details</th>
                          <th className="px-6 py-4 font-bold">User / Role</th>
                          <th className="px-6 py-4 font-bold">Service</th>
                          <th className="px-6 py-4 font-bold">Amount</th>
                          <th className="px-6 py-4 font-bold">Status</th>
                          <th className="px-6 py-4 font-bold text-right">Action</th>
                      </tr>
                  </thead>
                  <tbody className="text-sm text-slate-700 divide-y divide-slate-100">
                      <AnimatePresence mode='wait'>
                          {paginatedLogs.length === 0 ? (
                              <tr>
                                  <td colSpan="6" className="px-6 py-12 text-center text-slate-400">
                                      No transactions found.
                                  </td>
                              </tr>
                          ) : (
                              paginatedLogs.map((row) => (
                                  <motion.tr 
                                      key={row.id}
                                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                      className="hover:bg-slate-50/80 transition-colors group"
                                  >
                                      <td className="px-6 py-4">
                                          <div className="font-bold text-slate-900 text-sm">{row.id}</div>
                                          <div className="text-xs text-slate-400 mt-0.5 font-mono">{row.date}</div>
                                      </td>
                                      <td className="px-6 py-4">
                                          <div className="font-bold text-slate-700">{row.user}</div>
                                          <div className="flex items-center gap-1.5 mt-1">
                                              <span className={`flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                                                  row.role === 'Retailer' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                                  row.role === 'Distributor' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                                                  'bg-slate-100 text-slate-600 border-slate-200'
                                              }`}>
                                                  {getRoleIcon(row.role)} {row.role}
                                              </span>
                                              <span className="text-[10px] text-slate-400">Ref: {row.ref}</span>
                                          </div>
                                      </td>
                                      <td className="px-6 py-4">
                                          <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg text-xs font-bold border border-slate-200">
                                              {row.service}
                                          </span>
                                      </td>
                                      <td className="px-6 py-4">
                                          <div className={`flex items-center gap-1 font-bold ${row.type === 'Credit' ? 'text-emerald-600' : 'text-slate-900'}`}>
                                              {row.type === 'Credit' ? <ArrowDownLeft size={14}/> : <ArrowUpRight size={14}/>}
                                              {formatCurrency(row.amt)}
                                          </div>
                                      </td>
                                      <td className="px-6 py-4">
                                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${
                                              row.status === 'Success' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                                              row.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-rose-50 text-rose-700 border-rose-100'
                                          }`}>
                                              {row.status === 'Success' && <CheckCircle2 size={12}/>}
                                              {row.status === 'Pending' && <Clock size={12}/>}
                                              {row.status === 'Failed' && <AlertCircle size={12}/>}
                                              {row.status}
                                          </span>
                                      </td>
                                      <td className="px-6 py-4 text-right">
                                          <button className="text-slate-400 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-all" title="View Receipt">
                                              <Eye size={16} />
                                          </button>
                                      </td>
                                  </motion.tr>
                              ))
                          )}
                      </AnimatePresence>
                  </tbody>
              </table>
          </div>

          {/* --- Pagination Footer --- */}
          <div className="mt-auto px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center text-xs font-medium text-slate-500">
              <span>
                  Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredLogs.length)} - {Math.min(currentPage * itemsPerPage, filteredLogs.length)} of {filteredLogs.length}
              </span>
              
              <div className="flex gap-2">
                  <button 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1.5 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 disabled:opacity-50 transition-colors"
                  >
                      Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button 
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
                              currentPage === page 
                              ? 'bg-slate-900 text-white font-bold' 
                              : 'bg-white border border-slate-200 hover:bg-slate-50'
                          }`}
                      >
                          {page}
                      </button>
                  ))}
                  <button 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages || totalPages === 0}
                      className="px-3 py-1.5 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 disabled:opacity-50 transition-colors"
                  >
                      Next
                  </button>
              </div>
          </div>
      </div>

    </div>
  );
};

export default TransactionLogs;