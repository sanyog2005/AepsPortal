import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// --- Layouts & Config ---
import DashboardLayout from './layouts/DashboardLayout';
import { SUPER_ADMIN_LINKS, ADMIN_LINKS, RETAILER_LINKS,DISTRIBUTOR_LINKS } from './config/navigation'; 

// --- Pages: Public ---
import LandingPage from './LandingPage';
import AuthPage from './AuthPage';

// --- Pages: Super Admin ---
import ReportsAnalytics from './pages/SuperAdmin/Reports/ReportsAnalytics';
import WalletManagement from './pages/SuperAdmin/Wallet/WalletManagement';
import Compliance from './pages/SuperAdmin/Compliance/Compliance';
import DashboardHome from './pages/SuperAdmin/DashboardHome';
import ProviderOnboarding from './pages/SuperAdmin/SystemControl/ProviderOnboarding';
import ServiceMapping from './pages/SuperAdmin/SystemControl/ServiceMapping';

import CommissionSetup from './pages/SuperAdmin/SystemControl/CommissionSetup';
import UserManagement from './Pages/SuperAdmin/Users/UserManagement';
import PaymentReports from './Pages/SuperAdmin/SystemControl/PaymentReports';
import BusinessSummary from './Pages/SuperAdmin/SystemControl/BuisnessSummary';
import SupSettingsPage from './Pages/SuperAdmin/SettingsPage';


// --- Pages: Admin2 ---
import AReportsAnalytics from './pages/admin2/Reports/ReportsAnalytics';
import AWalletManagement from './pages/admin2/Wallet/WalletManagement';
import ACompliance from './pages/admin2/Compliance/Compliance';
import ADashboardHome from './pages/admin2/DashboardHome';
import AProviderOnboarding from './pages/admin2/SystemControl/ProviderOnboarding';
import AServiceMapping from './pages/admin2/SystemControl/ServiceMapping';
import ASwitchRouting from './Pages/admin2/SystemControl/PaymentReports';
import ACommissionSetup from './pages/admin2/SystemControl/CommissionSetup';
import AUserManagement from './Pages/admin2/Users/UserManagement';
import APaymentReports from './Pages/admin2/SystemControl/PaymentReports';
import ABusinessSummary from './Pages/admin2/SystemControl/BuisnessSummary';
import ASettingsPage from './Pages/admin2/SettingsPage';



// --- Pages: Admin ---
import AdminDashboard from './Pages/Admin/AdminDashboard';
import Distributors from './Pages/Admin/Distributors';
import Finance from './Pages/Admin/Finance';
import Reports from './Pages/Admin/Reports';
import SupportDesk from './Pages/Admin/SupportDesk';

// --- Pages: Retailer ---
// Ensure these match the folder structure you created
import AepsPage from './Pages/Retailer/AepsPage';
import DmtPage from './Pages/Retailer/DmtPage';
import UpiPage from './Pages/Retailer/UpiPage';
import WalletPage from './Pages/Retailer/WalletPage';
import ReportsPage from './Pages/Retailer/ReportsPage';
import RetailerDashboard from './Pages/Retailer/RetailerDashboard'; // Or a dedicated Home/Overview component
import RetBusinessSummary from './Pages/Retailer/BuisnessSummary';
import RetPaymentReports from './Pages/Retailer/PaymentReports';
import ChargeCommissionPage from './Pages/Retailer/ChargeCommissionPage';
import AccountStatementPage from './Pages/Retailer/AccountStatementPage';
import ManageFundHistory from './Pages/Retailer/ManageFundHistory';
import RefundPendingPage from './Pages/Retailer/RefundPendingPage';
import FundRequestPage from './Pages/Retailer/FundRequestPage';
import SettingsPage from './Pages/Retailer/SettingsPage';


// --- Pages: Distributor ---
import DistDashboardHome from './Pages/Distributor/DashboardHome';
import DistBusinessSummary from './Pages/Distributor/BuisnessSummary';
import DistUserManagement from './Pages/Distributor/Users/UserManagement';
import DistReportsAnalytics from './Pages/Distributor/Reports/ReportsAnalytics';
import DistPaymentReports from './Pages/Distributor/PaymentReports';
import DistProviderOnboarding from './Pages/Distributor/ProviderOnboarding';
import ManageFundsPage from './Pages/Distributor/ManageFundsPage';
import DistSettingsPage from './Pages/Distributor/SettingsPage';




// --- Helper: Placeholder ---
const Placeholder = ({ title }) => (
  <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
    <div className="text-4xl mb-4">🚧</div>
    <h2 className="text-xl font-bold text-slate-600">{title}</h2>
    <p className="text-sm">This module is under development.</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />

        {/* --- SUPER ADMIN PANEL --- */}
        <Route 
          path="/super-admin" 
          element={
            <DashboardLayout 
              role="Super_Admin" 
              links={SUPER_ADMIN_LINKS} 
            />
          }
        >
          <Route path="dashboard" element={<DashboardHome />} />
          <Route path="system/providers" element={<ProviderOnboarding />} />
          <Route path="system/mapping" element={<ServiceMapping />} />
          <Route path="system/reports" element={<PaymentReports />} />
          <Route path="system/buisnessSummary" element={<BusinessSummary />} />
          
          <Route path="system/commissions" element={<CommissionSetup />} />
          <Route path="compliance" element={<Compliance title="Compliance & KYC Policy" />} />
          <Route path="wallet" element={<WalletManagement />} />
          <Route path="users" element={<UserManagement title="User Management" />} />
          <Route path="statement" element={<ReportsAnalytics title="Global Reports & Analytics" />} />
          <Route path="settings" element={<SupSettingsPage title="Settings Page" />} />
          <Route index element={<Navigate to="system/providers" replace />} />
        </Route>

        {/* --- ADMIN PANEL --- */}
        <Route 
          path="/admin" 
          element={
            <DashboardLayout 
              role="Admin" 
              links={ADMIN_LINKS} 
            />
          }
        >
           <Route path="dashboard" element={<ADashboardHome />} />
          <Route path="system/providers" element={<AProviderOnboarding />} />
          <Route path="system/mapping" element={<AServiceMapping />} />
          <Route path="system/reports" element={<APaymentReports />} />
          <Route path="system/buisnessSummary" element={<ABusinessSummary />} />
          
          <Route path="system/commissions" element={<ACommissionSetup />} />
          <Route path="compliance" element={<ACompliance title="Compliance & KYC Policy" />} />
          <Route path="wallet" element={<AWalletManagement />} />
          <Route path="users" element={<AUserManagement title="User Management" />} />
          <Route path="statement" element={<AReportsAnalytics title="Global Reports & Analytics" />} />
          <Route path="settings" element={<ASettingsPage />} />
          <Route index element={<Navigate to="system/providers" replace />} />
        </Route>

        {/* --- RETAILER PANEL (New) --- */}
        <Route 
          path="/retailer" 
          element={
            <DashboardLayout 
              role="Retailer" 
              links={RETAILER_LINKS} 
            />
          }
        >
          {/* Default Dashboard Overview */}
          <Route path="dashboard" element={<RetailerDashboard />} />
          <Route path="buisnessSummary" element={<RetBusinessSummary />} />
          <Route path="rreports" element={<RetPaymentReports />} />
          <Route path="ChargeCommission" element={<ChargeCommissionPage />} />
          <Route path="statement" element={<AccountStatementPage />} />
          <Route path="manageFundHistory" element={<ManageFundHistory />} />
          <Route path="refundPending" element={<RefundPendingPage />} />
          <Route path="fundRequest" element={<FundRequestPage />} />

          <Route path="settings" element={<SettingsPage />} />



          
          {/* Service Modules */}
          <Route path="aeps" element={<AepsPage />} />
          <Route path="dmt" element={<DmtPage />} />
          <Route path="upi" element={<UpiPage />} />
          <Route path="wallet" element={<WalletPage />} />
          <Route path="reports" element={<ReportsPage />} />

          {/* Default Redirect */}
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        {/* --- DISTRIBUTOR PANEL --- */}
        <Route 
          path="/distributor" 
          element={
            <DashboardLayout 
              role="Distributor" 
              links={DISTRIBUTOR_LINKS} 
            />
          }
        > 
        <Route path="dashboard" element={<DistDashboardHome />} />
          <Route path="buisnessSummary" element={<DistBusinessSummary />} />
          <Route path="users" element={<DistUserManagement />} />
          <Route path="statements" element={<DistReportsAnalytics />} />
          <Route path="reports" element={<DistPaymentReports />} />
          <Route path="moneyReq" element={<DistProviderOnboarding />} />
          <Route path="manageFunds" element={<ManageFundsPage />} />
          <Route path="settings" element={<DistSettingsPage />} />





        <Route index element={<Navigate to="dashboard" replace />} />
        
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;