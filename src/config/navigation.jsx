import React, { useState } from 'react';
import { 
  Server, Share2, GitMerge, DollarSign, Shield, Wallet, BarChart3, 
  Users, FileCheck, AlertTriangle, UserPlus, Banknote, Fingerprint, 
  Send, QrCode, History, LayoutDashboard, Settings, LogOut, ChevronRight,
  FileText 
} from 'lucide-react';

// --- CONFIGURATION CONSTANTS ---

export const SUPER_ADMIN_LINKS = [
  { label: "Overview", path: "/super-admin/dashboard", icon: <LayoutDashboard size={20} /> },
  { header: "System Control" }, 
  { label: "Money Request", path: "/super-admin/system/providers", icon: <Share2 size={20}/> },
  // { label: "API Mapping", path: "/super-admin/system/mapping", icon: <Share2 size={20} /> },
  { label: "Business Summary", path: "/super-admin/system/buisnessSummary", icon: <Settings size={20} /> },
  { label: "Reports", path: "/super-admin/system/reports", icon: <GitMerge size={20} /> },
  // { label: "Commissions", path: "/super-admin/system/commissions", icon: <DollarSign size={20} /> },
  
  { header: "Management" },
  { label: "Users", path: "/super-admin/users", icon: <Users size={20} /> },
  { label: "Compliance & KYC", path: "/super-admin/compliance", icon: <Shield size={20} /> },
  { label: "Manage Funds", path: "/super-admin/wallet", icon: <Wallet size={20} /> },
  { label: "Statements", path: "/super-admin/statement", icon: <BarChart3 size={20} /> },
  { header: "Settings" },
  { label: "Settings", path: "/super-admin/settings", icon: <Settings size={20} /> },
];

export const ADMIN_LINKS = [
 { label: "Overview", path: "/Admin/dashboard", icon: <LayoutDashboard size={20} /> },
  { header: "System Control" }, 
  { label: "Money Request", path: "/Admin/system/providers", icon: <Share2 size={20}/> },
  // { label: "API Mapping", path: "/super-admin/system/mapping", icon: <Share2 size={20} /> },
  { label: "Business Summary", path: "/Admin/system/buisnessSummary", icon: <Settings size={20} /> },
  { label: "Reports", path: "/Admin/system/reports", icon: <GitMerge size={20} /> },
  // { label: "Commissions", path: "/super-admin/system/commissions", icon: <DollarSign size={20} /> },
  
  { header: "Management" },
  { label: "Users", path: "/Admin/users", icon: <Users size={20} /> },
  { label: "Compliance & KYC", path: "/Admin/compliance", icon: <Shield size={20} /> },
  { label: "Manage Funds", path: "/Admin/wallet", icon: <Wallet size={20} /> },
  { label: "Statements", path: "/Admin/statement", icon: <BarChart3 size={20} /> },
  { header: "Settings" },
  { label: "Settings", path: "/Admin/settings", icon: <Settings size={20} /> },
];

export const DISTRIBUTOR_LINKS = [
  { label: "Overview", path: "/distributor/dashboard", icon: <LayoutDashboard size={20} /> },

  { header: "Network" },
  
    { label: "Business Summary", path: "/distributor/buisnessSummary", icon: <Fingerprint size={20} /> },

    { label: "Users", path: "/distributor/users", icon: <Users size={20} /> },


    { label: "statements", path: "/distributor/statements", icon: <GitMerge size={20} /> },
    
  { label: "Reports", path: "/distributor/reports", icon: <GitMerge size={20} /> },
    { label: "Money Request", path: "/distributor/moneyReq", icon: <Share2 size={20}/> },
  { label: "Manage Funds", path: "/distributor/manageFunds", icon: <Wallet size={20} /> },
 { header: "Settings" },
  { label: "Settings", path: "/distributor/settings", icon: <Settings size={20} /> },
  
    

  
];

// ✅ UPDATED RETAILER LINKS
export const RETAILER_LINKS = [
  { header: "Main" },
  { label: "Dashboard", path: "/retailer/dashboard", icon: <LayoutDashboard size={20} /> },

  { header: "Services" },
  { label: "Business Summary", path: "/retailer/buisnessSummary", icon: <Fingerprint size={20} /> },

   { label: "Reports", path: "/retailer/rreports", icon: <GitMerge size={20} /> },

   { label: "Charge Commission", path: "/retailer/ChargeCommission", icon: <DollarSign size={20} /> },

  { header: "Account" },
  { label: "Manage Fund History", path: "/retailer/manageFundHistory", icon: <History size={20} /> },
  { label: "Refund Pending", path: "/retailer/refundPending", icon: <History size={20} /> },
  { label: "Fund Request", path: "/retailer/fundRequest", icon: <History size={20} /> },

     { label: "statement", path: "/retailer/statement", icon: <GitMerge size={20} /> },

  
  { header: "Account" },
  { label: "Wallet & Funds", path: "/retailer/wallet", icon: <Wallet size={20} /> },
  { label: "Reports & Receipts", path: "/retailer/reports", icon: <FileText size={20} /> },
  { header: "Settings" },
  { label: "Settings", path: "/retailer/settings", icon: <Settings size={20} /> },
];

// --- SIDEBAR COMPONENT ---

const Sidebar = ({ role = 'super_admin' }) => {
  // Simulating active state - in a real app, use useLocation() from react-router
  // Default to the dashboard of the specific role
  const getInitialPath = (r) => {
      switch(r) {
          case 'super_admin': return "/super-admin/dashboard";
          case 'admin': return "/admin/dashboard";
          case 'retailer': return "/retailer/dashboard";
          default: return "/super-admin/dashboard";
      }
  };
  
  const [activePath, setActivePath] = useState(getInitialPath(role));

  // Determine which links to show based on role
  const getLinks = () => {
    switch(role) {
      case 'super_admin': return SUPER_ADMIN_LINKS;
      case 'admin': return ADMIN_LINKS;
      case 'distributor': return DISTRIBUTOR_LINKS;
      case 'retailer': return RETAILER_LINKS;
      default: return SUPER_ADMIN_LINKS;
    }
  };

  const links = getLinks();

  return (
    <div className="h-screen w-72 bg-slate-900 text-slate-300 flex flex-col font-sans border-r border-slate-800 shadow-2xl">
      
      {/* Brand Logo Area */}
      <div className="h-20 flex items-center px-6 border-b border-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg text-white">
            <Server size={24} />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">FinTech<span className="text-indigo-500">Pro</span></span>
        </div>
      </div>

      {/* Scrollable Navigation Area */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
        {links.map((item, index) => {
          // Render Section Header
          if (item.header) {
            return (
              <div key={index} className="mt-6 mb-2 px-2">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {item.header}
                </p>
              </div>
            );
          }

          // Render Navigation Link
          const isActive = activePath === item.path;
          return (
            <button
              key={index}
              onClick={() => setActivePath(item.path)}
              className={`
                w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 group
                ${isActive 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' 
                  : 'hover:bg-slate-800 hover:text-white text-slate-400'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <span className={`${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>
                  {item.icon}
                </span>
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              {isActive && <ChevronRight size={16} className="opacity-70" />}
            </button>
          );
        })}
      </div>

      {/* User Profile / Footer Area */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/50">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold uppercase">
            {role.substring(0, 2)}
          </div>
          <div className="flex-1 overflow-hidden">
            <h4 className="text-sm font-semibold text-white truncate capitalize">{role.replace('_', ' ')}</h4>
            <p className="text-xs text-slate-500 truncate">user@fintech.com</p>
          </div>
          <LogOut size={18} className="text-slate-500 hover:text-red-400 transition-colors" />
        </div>
      </div>
    </div>
  );
};

// --- DEMO CONTAINER ---
export default function App() {
  const [role, setRole] = useState('super_admin');

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar role={role} />
      
      {/* Demo Content Area */}
      <div className="flex-1 flex flex-col">
        <header className="h-20 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-8">
          <h2 className="text-slate-200 text-lg font-medium">Role Previewer</h2>
          <div className="flex gap-2">
            {['super_admin', 'admin', 'retailer'].map(r => (
              <button 
                key={r}
                onClick={() => setRole(r)}
                className={`px-4 py-2 rounded text-xs font-bold uppercase transition-colors ${role === r ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}
              >
                {r.replace('_', ' ')}
              </button>
            ))}
          </div>
        </header>
        <main className="flex-1 p-8 text-slate-500">
          <div className="border-2 border-dashed border-slate-800 rounded-2xl h-full flex items-center justify-center">
             <div className="text-center">
                <p className="text-xl font-bold text-slate-600 mb-2">Current View: {role.toUpperCase()}</p>
                <p>Check the Sidebar to see the updated navigation links.</p>
             </div>
          </div>
        </main>
      </div>
    </div>
  );
}