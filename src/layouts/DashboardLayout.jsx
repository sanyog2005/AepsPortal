import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LogOut, Menu, X, Bell, Search, ChevronDown, Zap, 
  Settings, User, ChevronRight, Command
} from 'lucide-react';

const DashboardLayout = ({ role, links }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const pathSegments = location.pathname.split('/').filter(Boolean);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex text-slate-800 overflow-hidden">
      
      {/* --- CUSTOM SCROLLBAR STYLES --- 
          Tip: You can move this to your index.css for global usage 
      */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
          height: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #334155; /* slate-700 */
          border-radius: 10px;
          transition: background 0.3s;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #475569; /* slate-600 */
        }
        /* Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #334155 transparent;
        }
      `}</style>

      {/* --- SIDEBAR --- */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-[#020617] text-slate-300 transition-transform duration-300 ease-out
          md:translate-x-0 shadow-2xl flex flex-col border-r border-slate-800/50
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* 1. Brand Header */}
        <div className="h-20 flex-shrink-0 flex items-center px-6 border-b border-slate-800/60 bg-[#020617] z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Zap size={20} className="text-white fill-white" />
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-tight text-white leading-none">QuickNpay</h1>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Workspace</span>
            </div>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden ml-auto text-slate-400 hover:text-white p-1"
          >
            <X size={24} />
          </button>
        </div>

        {/* 2. Navigation (With Custom Scrollbar) */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1 custom-scrollbar hover:overflow-y-auto overflow-x-hidden">
          {links.map((item, index) => {
            if (item.header) {
              return (
                <div key={index} className="mt-6 mb-2 px-4 animate-in fade-in slide-in-from-left-4 duration-500 delay-75">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.header}</span>
                </div>
              );
            }

            const isActive = location.pathname.includes(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  relative group flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                  ${isActive 
                    ? 'text-white bg-gradient-to-r from-indigo-600/20 to-indigo-600/10 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.15)]' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                <div className="flex items-center gap-3 relative z-10">
                  <span className={`transition-all duration-300 ${isActive ? 'text-indigo-400 scale-110' : 'group-hover:text-indigo-400 group-hover:scale-110'}`}>
                    {item.icon}
                  </span>
                  {item.label}
                </div>
                
                {/* Active Indicator (Glowing Dot) */}
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.8)] animate-pulse"></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* 3. Sidebar Footer (Sticky at bottom) */}
        <div className="p-4 border-t border-slate-800/60 bg-[#020617] flex-shrink-0 z-20">
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800/50 transition-colors cursor-pointer group">
            <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600 group-hover:border-indigo-500/50 transition-colors">
              <User size={16} className="text-slate-300 group-hover:text-white" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors">Signed in as</p>
              <p className="text-xs text-slate-500 truncate capitalize">{role.replace('_', ' ')}</p>
            </div>
            <button onClick={handleLogout} className="text-slate-500 hover:text-red-400 transition-colors p-1.5 hover:bg-white/5 rounded-lg">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 md:ml-72 flex flex-col min-h-screen transition-all duration-300 relative">
        
        {/* 1. Header */}
        <header className="h-20 sticky top-0 z-30 px-6 md:px-8 flex items-center justify-between bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
          
          {/* Left: Mobile Toggle & Breadcrumbs */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>

            <div className="flex flex-col">
              <div className="hidden md:flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <span>App</span>
                <ChevronRight size={10} />
                <span className="text-indigo-600">
                  {pathSegments.length > 0 ? pathSegments[0] : 'Dashboard'}
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-800 capitalize leading-tight">
                {pathSegments.length > 0 ? pathSegments[pathSegments.length - 1].replace(/-/g, ' ') : 'Overview'}
              </h2>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4 md:gap-6">
            
            {/* Command Search */}
            <div className="hidden lg:flex items-center relative group">
              <Search size={16} className="absolute left-3.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Type to search..." 
                className="pl-10 pr-12 py-2.5 bg-slate-100/50 border border-transparent hover:border-slate-200 rounded-full text-sm font-medium w-64 focus:ring-4 focus:ring-indigo-500/10 focus:bg-white focus:border-indigo-200 transition-all placeholder:text-slate-400 text-slate-700" 
              />
              <div className="absolute right-3 flex items-center gap-1 px-1.5 py-0.5 rounded border border-slate-200 bg-white text-[10px] font-bold text-slate-400 shadow-sm">
                <Command size={10} /> K
              </div>
            </div>

            {/* Notification */}
            <button className="relative p-2.5 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 rounded-full transition-all">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border border-white animate-ping"></span>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
            </button>

            {/* Profile Menu */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 pl-1 pr-2 py-1 rounded-full hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200 group"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-[2px] shadow-sm group-hover:shadow-md transition-all">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <span className="text-xs font-bold text-indigo-700">AM</span>
                  </div>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-xs font-bold text-slate-700 leading-none group-hover:text-indigo-600 transition-colors">Alex Morgan</p>
                  <p className="text-[10px] text-slate-400 font-medium leading-none mt-1">Admin</p>
                </div>
                <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown */}
              {isProfileOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)}></div>
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 py-2 z-20 origin-top-right animate-in fade-in zoom-in-95 duration-200">
                    <div className="px-4 py-2 border-b border-slate-50 mb-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Account</p>
                      <p className="text-sm font-bold text-slate-800 truncate mt-0.5">alex@quicknpay.com</p>
                    </div>
                    
                    <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors">
                      <User size={16} /> My Profile
                    </Link>
                    <Link to="/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors">
                      <Settings size={16} /> Settings
                    </Link>
                    
                    <div className="border-t border-slate-50 mt-1 pt-1">
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <LogOut size={16} /> Sign Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* 2. Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto custom-scrollbar">
          <div className="max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Outlet />
          </div>
        </main>

      </div>

      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-900/60 z-40 md:hidden backdrop-blur-sm transition-opacity"
        />
      )}
    </div>
  );
};

export default DashboardLayout;