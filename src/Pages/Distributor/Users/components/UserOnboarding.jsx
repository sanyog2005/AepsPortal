import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserPlus, ShieldCheck, Smartphone, Mail, CreditCard, 
  ScanFace, CheckCircle2, ChevronRight, Loader2, ArrowLeft,
  Building2, Lock, Percent, Settings2, Receipt
} from 'lucide-react';

const UserOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form Data State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    role: 'Retailer',
    shopName: '',
    mobile: '',
    email: '',
    pan: '',
    aadhaar: ''
  });

  // Commission State
  const [commissionMode, setCommissionMode] = useState('Default'); // 'Default' or 'Custom'
  const [rates, setRates] = useState({
    aeps: '0.25',   // %
    dmt: '1.00',    // % Surcharge
    recharge: '2.50', // % Margin
    bbps: '5.00'    // Flat Fee
  });

  // Verification Status State
  const [verification, setVerification] = useState({
    mobile: 'pending',
    email: 'pending',
    pan: 'pending',
    aadhaar: 'pending'
  });

  // --- Actions ---

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (['mobile', 'email', 'pan', 'aadhaar'].includes(field)) {
      setVerification(prev => ({ ...prev, [field]: 'pending' }));
    }
  };

  const simulateVerification = (field) => {
    if (!formData[field]) return alert(`Please enter ${field} first`);
    setVerification(prev => ({ ...prev, [field]: 'verifying' }));
    setTimeout(() => {
      setVerification(prev => ({ ...prev, [field]: 'verified' }));
    }, 1500);
  };

  const handleSubmit = () => {
    // Basic Validation
    if (verification.pan !== 'verified' || verification.aadhaar !== 'verified') {
        alert("Please complete KYC verification before onboarding.");
        return;
    }
    
    setIsSubmitting(true);
    setTimeout(() => {
        setIsSubmitting(false);
        console.log("Submitting:", { ...formData, commissionMode, rates });
        alert(`User ${formData.firstName} onboarded with ${commissionMode} commission rates!`);
        // Reset or redirect
    }, 2000);
  };

  // --- Steps Config ---
  const steps = [
    { id: 1, title: "Account", icon: <UserPlus size={18} /> },
    { id: 2, title: "Contact", icon: <Smartphone size={18} /> },
    { id: 3, title: "KYC Check", icon: <ShieldCheck size={18} /> },
    { id: 4, title: "Commercials", icon: <Percent size={18} /> },
  ];

  return (
    <div className="space-y-6 font-sans text-slate-900 max-w-5xl mx-auto">
      
      {/* --- Header --- */}
      <div className="flex justify-between items-center pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">New User Onboarding</h1>
          <p className="text-slate-500 text-sm mt-1">Create account, verify identity, and set commissions.</p>
        </div>
        <div className="flex gap-2">
            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold border border-blue-100">
                Mode: Manual Entry
            </span>
        </div>
      </div>

      {/* --- Progress Stepper --- */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center relative overflow-hidden">
         <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -z-0"></div>
         <div className="absolute top-1/2 left-0 h-1 bg-slate-900 transition-all duration-500 -z-0" style={{ width: `${((currentStep - 1) / 3) * 100}%` }}></div>

         {steps.map((step) => (
             <div key={step.id} className="relative z-10 flex flex-col items-center gap-2 w-24">
                 <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-4 transition-colors ${
                     currentStep >= step.id 
                     ? 'bg-slate-900 text-white border-white shadow-lg' 
                     : 'bg-white text-slate-400 border-slate-100'
                 }`}>
                     {currentStep > step.id ? <CheckCircle2 size={20} /> : step.icon}
                 </div>
                 <span className={`text-xs font-bold ${currentStep >= step.id ? 'text-slate-800' : 'text-slate-400'}`}>
                     {step.title}
                 </span>
             </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- LEFT: Input Form --- */}
        <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm min-h-[500px] flex flex-col">
                <div className="flex-1">
                    <AnimatePresence mode="wait">
                        
                        {/* STEP 1: Basic Info */}
                        {currentStep === 1 && (
                            <motion.div 
                                key="step1"
                                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h3 className="font-bold text-lg text-slate-800 mb-4">Role & Basic Information</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Role</label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-3 text-slate-400" size={16} />
                                            <select 
                                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none"
                                                value={formData.role}
                                                onChange={(e) => handleInputChange('role', e.target.value)}
                                            >
                                                <option>Retailer</option>
                                                <option>Distributor</option>
                                                <option>Super Distributor</option>
                                                <option>Admin</option>
                                                
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Shop Name</label>
                                        <div className="relative">
                                            <Building2 className="absolute left-3 top-3 text-slate-400" size={16} />
                                            <input 
                                                type="text" 
                                                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500/50"
                                                value={formData.shopName}
                                                onChange={(e) => handleInputChange('shopName', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <input 
                                        type="text" placeholder="First Name"
                                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500/50"
                                        value={formData.firstName}
                                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                                    />
                                    <input 
                                        type="text" placeholder="Last Name"
                                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500/50"
                                        value={formData.lastName}
                                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 2: Contact */}
                        {currentStep === 2 && (
                            <motion.div 
                                key="step2"
                                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h3 className="font-bold text-lg text-slate-800 mb-4">Contact Verification</h3>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Mobile Number</label>
                                    <div className="flex gap-3">
                                        <div className="relative flex-1">
                                            <Smartphone className="absolute left-3 top-3 text-slate-400" size={16} />
                                            <input 
                                                type="text" maxLength={10}
                                                className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm font-medium outline-none focus:ring-2 ${verification.mobile === 'verified' ? 'border-green-200 bg-green-50' : 'border-slate-200 bg-white'}`}
                                                value={formData.mobile}
                                                onChange={(e) => handleInputChange('mobile', e.target.value)}
                                            />
                                        </div>
                                        <button onClick={() => simulateVerification('mobile')} disabled={verification.mobile === 'verified'}
                                            className={`px-6 py-2 rounded-xl text-sm font-bold min-w-[120px] transition-all ${verification.mobile === 'verified' ? 'bg-green-100 text-green-700' : 'bg-slate-900 text-white'}`}>
                                            {verification.mobile === 'verifying' ? <Loader2 className="animate-spin mx-auto" size={18} /> : verification.mobile === 'verified' ? 'Verified' : 'Send OTP'}
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Email</label>
                                    <div className="flex gap-3">
                                        <div className="relative flex-1">
                                            <Mail className="absolute left-3 top-3 text-slate-400" size={16} />
                                            <input 
                                                type="email" 
                                                className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm font-medium outline-none focus:ring-2 ${verification.email === 'verified' ? 'border-green-200 bg-green-50' : 'border-slate-200 bg-white'}`}
                                                value={formData.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                            />
                                        </div>
                                        <button onClick={() => simulateVerification('email')} disabled={verification.email === 'verified'}
                                            className={`px-6 py-2 rounded-xl text-sm font-bold min-w-[120px] transition-all ${verification.email === 'verified' ? 'bg-green-100 text-green-700' : 'bg-slate-900 text-white'}`}>
                                            {verification.email === 'verifying' ? <Loader2 className="animate-spin mx-auto" size={18} /> : verification.email === 'verified' ? 'Verified' : 'Verify'}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 3: KYC */}
                        {currentStep === 3 && (
                            <motion.div 
                                key="step3"
                                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h3 className="font-bold text-lg text-slate-800 mb-4">Identity Verification (KYC)</h3>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">PAN</label>
                                    <div className="flex gap-3">
                                        <div className="relative flex-1">
                                            <CreditCard className="absolute left-3 top-3 text-slate-400" size={16} />
                                            <input 
                                                type="text" maxLength={10}
                                                className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm font-medium outline-none focus:ring-2 uppercase ${verification.pan === 'verified' ? 'border-green-200 bg-green-50' : 'border-slate-200 bg-white'}`}
                                                value={formData.pan}
                                                onChange={(e) => handleInputChange('pan', e.target.value)}
                                            />
                                        </div>
                                        <button onClick={() => simulateVerification('pan')} disabled={verification.pan === 'verified'}
                                            className={`px-6 py-2 rounded-xl text-sm font-bold min-w-[140px] transition-all ${verification.pan === 'verified' ? 'bg-green-100 text-green-700' : 'bg-blue-600 text-white'}`}>
                                            {verification.pan === 'verifying' ? <Loader2 className="animate-spin mx-auto" size={18} /> : verification.pan === 'verified' ? 'Verified' : 'Fetch Details'}
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Aadhaar</label>
                                    <div className="flex gap-3">
                                        <div className="relative flex-1">
                                            <ScanFace className="absolute left-3 top-3 text-slate-400" size={16} />
                                            <input 
                                                type="text" maxLength={12}
                                                className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm font-medium outline-none focus:ring-2 ${verification.aadhaar === 'verified' ? 'border-green-200 bg-green-50' : 'border-slate-200 bg-white'}`}
                                                value={formData.aadhaar}
                                                onChange={(e) => handleInputChange('aadhaar', e.target.value)}
                                            />
                                        </div>
                                        <button onClick={() => simulateVerification('aadhaar')} disabled={verification.aadhaar === 'verified'}
                                            className={`px-6 py-2 rounded-xl text-sm font-bold min-w-[140px] transition-all ${verification.aadhaar === 'verified' ? 'bg-green-100 text-green-700' : 'bg-blue-600 text-white'}`}>
                                            {verification.aadhaar === 'verifying' ? <Loader2 className="animate-spin mx-auto" size={18} /> : verification.aadhaar === 'verified' ? 'Verified' : 'Verify UID'}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 4: Commercials (New Step) */}
                        {currentStep === 4 && (
                            <motion.div 
                                key="step4"
                                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-lg text-slate-800">Commission & Margins</h3>
                                    <div className="flex bg-slate-100 p-1 rounded-lg">
                                        <button 
                                            onClick={() => setCommissionMode('Default')}
                                            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${commissionMode === 'Default' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
                                        >
                                            Default
                                        </button>
                                        <button 
                                            onClick={() => setCommissionMode('Custom')}
                                            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${commissionMode === 'Custom' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}
                                        >
                                            Custom Rates
                                        </button>
                                    </div>
                                </div>

                                {commissionMode === 'Default' ? (
                                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 text-center space-y-3">
                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto text-blue-600 shadow-sm">
                                            <Receipt size={24} />
                                        </div>
                                        <h4 className="font-bold text-slate-800">Standard {formData.role} Plan</h4>
                                        <p className="text-sm text-slate-500 max-w-sm mx-auto">
                                            This user will inherit the default commission structure assigned to the <strong>{formData.role}</strong> role in global settings.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-4">
                                        {/* AEPS Input */}
                                        <div className="p-4 rounded-xl border border-slate-200 bg-white">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg"><Settings2 size={16}/></div>
                                                <span className="text-sm font-bold text-slate-700">AEPS Commission</span>
                                            </div>
                                            <div className="relative">
                                                <input 
                                                    type="number" 
                                                    value={rates.aeps}
                                                    onChange={e => setRates({...rates, aeps: e.target.value})}
                                                    className="w-full pl-3 pr-8 py-2 border border-slate-200 rounded-lg text-sm font-bold focus:ring-2 focus:ring-indigo-500/50 outline-none"
                                                />
                                                <span className="absolute right-3 top-2 text-xs font-bold text-slate-400">%</span>
                                            </div>
                                            <p className="text-[10px] text-slate-400 mt-1">Margin on cash withdrawal</p>
                                        </div>

                                        {/* DMT Input */}
                                        <div className="p-4 rounded-xl border border-slate-200 bg-white">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg"><Settings2 size={16}/></div>
                                                <span className="text-sm font-bold text-slate-700">DMT Surcharge</span>
                                            </div>
                                            <div className="relative">
                                                <input 
                                                    type="number" 
                                                    value={rates.dmt}
                                                    onChange={e => setRates({...rates, dmt: e.target.value})}
                                                    className="w-full pl-3 pr-8 py-2 border border-slate-200 rounded-lg text-sm font-bold focus:ring-2 focus:ring-emerald-500/50 outline-none"
                                                />
                                                <span className="absolute right-3 top-2 text-xs font-bold text-slate-400">%</span>
                                            </div>
                                            <p className="text-[10px] text-slate-400 mt-1">Fee charged to customer</p>
                                        </div>

                                        {/* Recharge Input */}
                                        <div className="p-4 rounded-xl border border-slate-200 bg-white">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="p-1.5 bg-orange-50 text-orange-600 rounded-lg"><Settings2 size={16}/></div>
                                                <span className="text-sm font-bold text-slate-700">Mobile Recharge</span>
                                            </div>
                                            <div className="relative">
                                                <input 
                                                    type="number" 
                                                    value={rates.recharge}
                                                    onChange={e => setRates({...rates, recharge: e.target.value})}
                                                    className="w-full pl-3 pr-8 py-2 border border-slate-200 rounded-lg text-sm font-bold focus:ring-2 focus:ring-orange-500/50 outline-none"
                                                />
                                                <span className="absolute right-3 top-2 text-xs font-bold text-slate-400">%</span>
                                            </div>
                                            <p className="text-[10px] text-slate-400 mt-1">Flat margin on top-ups</p>
                                        </div>

                                        {/* BBPS Input */}
                                        <div className="p-4 rounded-xl border border-slate-200 bg-white">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg"><Settings2 size={16}/></div>
                                                <span className="text-sm font-bold text-slate-700">Bill Payment</span>
                                            </div>
                                            <div className="relative">
                                                <span className="absolute left-3 top-2 text-xs font-bold text-slate-400">₹</span>
                                                <input 
                                                    type="number" 
                                                    value={rates.bbps}
                                                    onChange={e => setRates({...rates, bbps: e.target.value})}
                                                    className="w-full pl-6 pr-4 py-2 border border-slate-200 rounded-lg text-sm font-bold focus:ring-2 focus:ring-blue-500/50 outline-none"
                                                />
                                            </div>
                                            <p className="text-[10px] text-slate-400 mt-1">Flat fee per bill</p>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer Controls */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-100">
                    <button 
                        onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                        disabled={currentStep === 1}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                    >
                        <ArrowLeft size={16} /> Back
                    </button>
                    
                    {currentStep < 4 ? (
                        <button 
                            onClick={() => setCurrentStep(prev => Math.min(4, prev + 1))}
                            className="flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 shadow-lg shadow-slate-900/20 active:scale-95"
                        >
                            Next Step <ChevronRight size={16} />
                        </button>
                    ) : (
                        <button 
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 active:scale-95 transition-all"
                        >
                            {isSubmitting ? (
                                <><Loader2 className="animate-spin" size={18} /> Creating User...</>
                            ) : (
                                <><CheckCircle2 size={18} /> Complete Onboarding</>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>

        {/* --- RIGHT: Live Preview --- */}
        <div className="space-y-6">
            <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl shadow-slate-900/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Live Preview</h3>
                
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center font-bold text-2xl">
                        {formData.firstName ? formData.firstName[0] : 'U'}
                    </div>
                    <div>
                        <div className="text-lg font-bold">{formData.firstName || "New"} {formData.lastName || "User"}</div>
                        <div className="text-sm text-slate-400">{formData.role}</div>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                        <div className="flex items-center gap-3">
                            <Smartphone size={16} className="text-slate-400" />
                            <span className="text-sm">Mobile</span>
                        </div>
                        {verification.mobile === 'verified' ? <CheckCircle2 size={16} className="text-emerald-400" /> : <div className="w-2 h-2 bg-slate-600 rounded-full"></div>}
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                        <div className="flex items-center gap-3">
                            <CreditCard size={16} className="text-slate-400" />
                            <span className="text-sm">KYC Status</span>
                        </div>
                        {verification.pan === 'verified' ? <span className="text-xs font-bold text-emerald-400">VERIFIED</span> : <span className="text-xs text-slate-500">PENDING</span>}
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                        <div className="flex items-center gap-3">
                            <Percent size={16} className="text-slate-400" />
                            <span className="text-sm">Commission</span>
                        </div>
                        <span className={`text-xs font-bold ${commissionMode === 'Custom' ? 'text-blue-400' : 'text-slate-400'}`}>
                            {commissionMode.toUpperCase()}
                        </span>
                    </div>
                </div>
            </div>

            {/* Custom Rate Preview Box */}
            {commissionMode === 'Custom' && (
                <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
                    <h4 className="font-bold text-slate-800 text-sm mb-3">Proposed Rates</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex justify-between p-2 bg-slate-50 rounded">
                            <span>AEPS:</span> <span className="font-bold">{rates.aeps}%</span>
                        </div>
                        <div className="flex justify-between p-2 bg-slate-50 rounded">
                            <span>DMT:</span> <span className="font-bold">{rates.dmt}%</span>
                        </div>
                        <div className="flex justify-between p-2 bg-slate-50 rounded">
                            <span>Rech:</span> <span className="font-bold">{rates.recharge}%</span>
                        </div>
                        <div className="flex justify-between p-2 bg-slate-50 rounded">
                            <span>Bill:</span> <span className="font-bold">₹{rates.bbps}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>

      </div>
    </div>
  );
};

export default UserOnboarding;