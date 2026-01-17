import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Edit2, ShieldAlert, Key, 
  X, Ban, Unlock, Percent, Save, FileText, Eye, CheckCircle2, XCircle, AlertTriangle
} from 'lucide-react';

// --- ENHANCED MOCK DATA WITH DOCUMENTS ---
const INITIAL_USERS = [
  { 
    id: "RT001", name: "Rahul Telecom", role: "Retailer", mobile: "9876543210", email: "rahul@demo.com", 
    status: "Active", wallet: 12500, 
    permissions: { aeps: true, dmt: true, payout: true, recharge: true },
    commissions: { aeps: 0.18, dmt: 0.50, payout: 2.00, recharge: 1.50 },
    documents: [
        { type: "Aadhaar Front", url: "https://placehold.co/600x400/e2e8f0/1e293b?text=Aadhaar+Front+Preview", status: "Verified", date: "12 Oct 2023" },
        { type: "Aadhaar Back", url: "https://placehold.co/600x400/e2e8f0/1e293b?text=Aadhaar+Back+Preview", status: "Verified", date: "12 Oct 2023" },
        { type: "PAN Card", url: "https://placehold.co/600x400/cbd5e1/1e293b?text=PAN+Card+Preview", status: "Pending", date: "14 Jan 2024" },
        { type: "Shop Photo", url: "https://placehold.co/600x400/f1f5f9/1e293b?text=Shop+Entrance+Image", status: "Verified", date: "12 Oct 2023" }
    ]
  },
  { 
    id: "DT005", name: "Singh Enterprises", role: "Distributor", mobile: "9988776655", email: "singh@demo.com", 
    status: "Active", wallet: 45000, 
    permissions: { aeps: true, dmt: true, payout: true, recharge: true },
    commissions: { aeps: 0.25, dmt: 0.60, payout: 5.00, recharge: 2.00 },
    documents: [
        { type: "GST Certificate", url: "https://placehold.co/600x800/e2e8f0/1e293b?text=GST+Certificate+Doc", status: "Verified", date: "20 Sep 2023" },
        { type: "Udyam Aadhar", url: "https://placehold.co/600x800/cbd5e1/1e293b?text=Udyam+Reg+Certificate", status: "Verified", date: "20 Sep 2023" }
    ]
  },
  { 
    id: "RT009", name: "Amit Shop", role: "Retailer", mobile: "8877665544", email: "amit@demo.com", 
    status: "Suspended", wallet: 500, 
    permissions: { aeps: false, dmt: false, payout: false, recharge: true },
    commissions: { aeps: 0.10, dmt: 0.40, payout: 2.00, recharge: 1.00 },
    documents: [
        { type: "Aadhaar Front", url: "https://placehold.co/600x400/fee2e2/991b1b?text=Blurry+Aadhaar+Image", status: "Rejected", date: "01 Jan 2024", note: "Image too blurry" },
        { type: "PAN Card", url: "https://placehold.co/600x400/cbd5e1/1e293b?text=PAN+Card", status: "Pending", date: "02 Jan 2024" }
    ]
  },
];

const UserManagement = () => {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Modals state
  const [activeModal, setActiveModal] = useState(null); // 'edit', 'permissions', 'ban', 'commissions', 'docs'
  const [selectedUser, setSelectedUser] = useState(null);
  const [fullViewDoc, setFullViewDoc] = useState(null); // For full screen image preview
  
  // Temporary Form States
  const [editForm, setEditForm] = useState({});
  const [permForm, setPermForm] = useState({});
  const [commForm, setCommForm] = useState({}); 
  const [banReason, setBanReason] = useState("");

  // --- Actions ---

  const openModal = (type, user) => {
    setSelectedUser(user);
    setActiveModal(type);
    
    if(type === 'edit') setEditForm({ ...user });
    if(type === 'permissions') setPermForm({ ...user.permissions });
    if(type === 'commissions') setCommForm({ ...user.commissions });
    if(type === 'ban') setBanReason("");
  };

  const handleSaveEdit = () => {
    setUsers(users.map(u => u.id === selectedUser.id ? { ...u, ...editForm } : u));
    setActiveModal(null);
  };

  const handleSavePermissions = () => {
    setUsers(users.map(u => u.id === selectedUser.id ? { ...u, permissions: permForm } : u));
    setActiveModal(null);
  };

  const handleSaveCommissions = () => {
    setUsers(users.map(u => u.id === selectedUser.id ? { ...u, commissions: commForm } : u));
    setActiveModal(null);
  };

  const handleBanUser = () => {
    const newStatus = selectedUser.status === 'Active' ? 'Banned' : 'Active';
    setUsers(users.map(u => u.id === selectedUser.id ? { ...u, status: newStatus } : u));
    setActiveModal(null);
  };

  const handleDocAction = (docIndex, status) => {
    const updatedDocs = [...selectedUser.documents];
    updatedDocs[docIndex].status = status;
    const updatedUser = { ...selectedUser, documents: updatedDocs };
    setUsers(users.map(u => u.id === selectedUser.id ? updatedUser : u));
    setSelectedUser(updatedUser); 
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.mobile.includes(searchTerm) ||
    u.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Filters Header */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <input 
                  type="text" 
                  placeholder="Search by Name, Mobile, ID..." 
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 outline-none focus:ring-2 focus:ring-blue-500/20"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
              />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50">
              <Filter size={16} /> Filters
          </button>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm min-h-[400px]">
          <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200">
                  <tr className="text-xs text-slate-500 uppercase tracking-wider">
                      <th className="px-6 py-4 font-bold">User Details</th>
                      <th className="px-6 py-4 font-bold">Role</th>
                      <th className="px-6 py-4 font-bold">Wallet</th>
                      <th className="px-6 py-4 font-bold">Status</th>
                      <th className="px-6 py-4 font-bold text-right">Actions</th>
                  </tr>
              </thead>
              <tbody className="text-sm text-slate-700 divide-y divide-slate-100">
                  {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50/80 transition-colors group">
                          <td className="px-6 py-4">
                              <div className="font-bold text-slate-900">{user.name}</div>
                              <div className="text-xs text-slate-400 mt-0.5">{user.mobile} • {user.id}</div>
                          </td>
                          <td className="px-6 py-4">
                              <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-bold border border-slate-200">
                                  {user.role}
                              </span>
                          </td>
                          <td className="px-6 py-4 font-mono font-bold text-slate-800">
                              ₹ {user.wallet.toLocaleString()}
                          </td>
                          <td className="px-6 py-4">
                              <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                                  user.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 
                                  user.status === 'Suspended' ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-slate-100 text-slate-600'
                              }`}>
                                  {user.status}
                              </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                  {/* Document Button with Count Badge */}
                                  <div className="relative">
                                    <button onClick={() => openModal('docs', user)} className="p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors" title="View KYC Documents">
                                        <FileText size={16} />
                                    </button>
                                    {user.documents.length > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 text-white text-[9px] flex items-center justify-center rounded-full border border-white font-bold">{user.documents.length}</span>}
                                  </div>

                                  <button onClick={() => openModal('commissions', user)} className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Edit Commissions">
                                      <Percent size={16} />
                                  </button>
                                  <button onClick={() => openModal('edit', user)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit Details">
                                      <Edit2 size={16} />
                                  </button>
                                  <button onClick={() => openModal('permissions', user)} className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors" title="Manage Permissions">
                                      <Key size={16} />
                                  </button>
                                  <button onClick={() => openModal('ban', user)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Ban/Suspend">
                                      <ShieldAlert size={16} />
                                  </button>
                              </div>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>

      {/* --- MODALS --- */}
      <AnimatePresence>
        {activeModal && selectedUser && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className={`bg-white rounded-2xl shadow-2xl w-full overflow-hidden ${activeModal === 'docs' ? 'max-w-4xl' : 'max-w-md'}`}
                >
                    {/* Modal Header */}
                    <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                            {activeModal === 'docs' && <FileText size={20} className="text-orange-500" />}
                            {activeModal === 'edit' && 'Edit User Details'}
                            {activeModal === 'permissions' && 'Service Permissions'}
                            {activeModal === 'commissions' && 'Commission Structure'}
                            {activeModal === 'docs' && `KYC Documents: ${selectedUser.name}`}
                            {activeModal === 'ban' && (selectedUser.status === 'Active' ? 'Ban User' : 'Unban User')}
                        </h3>
                        <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600">
                            <X size={20} />
                        </button>
                    </div>

                    {/* 1. DOCUMENT VIEWER MODAL */}
                    {activeModal === 'docs' && (
                        <div className="p-6 max-h-[80vh] overflow-y-auto bg-slate-50">
                            {(!selectedUser.documents || selectedUser.documents.length === 0) ? (
                                <div className="text-center py-10 text-slate-400">
                                    <FileText size={48} className="mx-auto mb-2 opacity-20" />
                                    <p>No documents uploaded by this user.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {selectedUser.documents.map((doc, index) => (
                                        <div key={index} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col group">
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <h4 className="font-bold text-slate-800 text-sm">{doc.type}</h4>
                                                    <p className="text-xs text-slate-400">Uploaded: {doc.date}</p>
                                                </div>
                                                <span className={`text-[10px] font-bold px-2 py-1 rounded border ${
                                                    doc.status === 'Verified' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                                    doc.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-100' :
                                                    'bg-amber-50 text-amber-700 border-amber-100'
                                                }`}>
                                                    {doc.status}
                                                </span>
                                            </div>
                                            
                                            {/* Image Preview */}
                                            <div className="bg-slate-100 rounded-lg aspect-video mb-4 flex items-center justify-center overflow-hidden border border-slate-200 relative">
                                                <img src={doc.url} alt={doc.type} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
                                                
                                                {/* Full View Overlay */}
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <button 
                                                        onClick={() => setFullViewDoc(doc)}
                                                        className="text-white text-xs font-bold flex items-center gap-1 bg-white/20 backdrop-blur-md border border-white/50 px-4 py-2 rounded-full hover:bg-white/30 transition-all"
                                                    >
                                                        <Eye size={14} /> View Full
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Reject Reason Display */}
                                            {doc.status === 'Rejected' && doc.note && (
                                                <div className="mb-4 bg-red-50 text-red-700 text-xs p-2 rounded-lg border border-red-100 flex items-center gap-2">
                                                    <AlertTriangle size={12} /> Reason: {doc.note}
                                                </div>
                                            )}

                                            {/* Action Buttons */}
                                            <div className="flex gap-2 mt-auto pt-3 border-t border-slate-50">
                                                <button 
                                                    onClick={() => handleDocAction(index, 'Rejected')}
                                                    className="flex-1 py-2 text-xs font-bold text-red-600 border border-red-200 bg-red-50 rounded-lg hover:bg-red-100 flex items-center justify-center gap-1 transition-colors"
                                                >
                                                    <XCircle size={14}/> Reject
                                                </button>
                                                <button 
                                                    onClick={() => handleDocAction(index, 'Verified')}
                                                    className="flex-1 py-2 text-xs font-bold text-emerald-600 border border-emerald-200 bg-emerald-50 rounded-lg hover:bg-emerald-100 flex items-center justify-center gap-1 transition-colors"
                                                >
                                                    <CheckCircle2 size={14}/> Verify
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* 2. EDIT FORM */}
                    {activeModal === 'edit' && (
                        <div className="p-6 space-y-4">
                            <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Name</label><input type="text" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm font-bold" /></div>
                            <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Mobile</label><input type="text" value={editForm.mobile} onChange={e => setEditForm({...editForm, mobile: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm font-bold" /></div>
                            <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email</label><input type="email" value={editForm.email} onChange={e => setEditForm({...editForm, email: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm font-bold" /></div>
                            <button onClick={handleSaveEdit} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-sm mt-2 hover:bg-blue-700 flex justify-center items-center gap-2"><Save size={18} /> Save Changes</button>
                        </div>
                    )}

                    {/* 3. COMMISSIONS FORM */}
                    {activeModal === 'commissions' && (
                        <div className="p-6 space-y-4">
                             <div className="bg-emerald-50 text-emerald-800 p-3 rounded-lg text-xs font-medium border border-emerald-100 mb-2">Define commission % for <strong>{selectedUser.name}</strong>.</div>
                            <div className="grid grid-cols-2 gap-4">
                                {Object.keys(commForm).map(key => (
                                    <div key={key}>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{key} (%)</label>
                                        <div className="relative"><input type="number" step="0.01" value={commForm[key]} onChange={e => setCommForm({...commForm, [key]: parseFloat(e.target.value)})} className="w-full border rounded-lg p-2.5 pr-8 text-sm font-bold outline-none" /><span className="absolute right-3 top-2.5 text-slate-400 text-xs font-bold">%</span></div>
                                    </div>
                                ))}
                            </div>
                            <button onClick={handleSaveCommissions} className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold text-sm mt-4 hover:bg-emerald-700 flex justify-center items-center gap-2"><Save size={18} /> Update Commissions</button>
                        </div>
                    )}

                    {/* 4. PERMISSIONS FORM */}
                    {activeModal === 'permissions' && (
                        <div className="p-6 space-y-4">
                            <p className="text-sm text-slate-500 mb-2">Toggle allowed services for <strong>{selectedUser.name}</strong>.</p>
                            {Object.keys(permForm).map(key => (
                                <div key={key} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                                    <span className="font-bold text-slate-700 uppercase text-xs">{key} Service</span>
                                    <button onClick={() => setPermForm({...permForm, [key]: !permForm[key]})} className={`w-12 h-6 rounded-full relative transition-colors ${permForm[key] ? 'bg-indigo-600' : 'bg-slate-300'}`}><div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${permForm[key] ? 'left-7' : 'left-1'}`}></div></button>
                                </div>
                            ))}
                            <button onClick={handleSavePermissions} className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-sm mt-2 hover:bg-slate-800">Update Permissions</button>
                        </div>
                    )}

                    {/* 5. BAN FORM */}
                    {activeModal === 'ban' && (
                        <div className="p-6 text-center">
                            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">{selectedUser.status === 'Active' ? <Ban size={32} /> : <Unlock size={32} />}</div>
                            <h3 className="text-lg font-bold text-slate-900">{selectedUser.status === 'Active' ? 'Suspend Account?' : 'Reactivate Account?'}</h3>
                            <p className="text-sm text-slate-500 mb-6 px-4">{selectedUser.status === 'Active' ? "This will immediately stop all API transactions and login access for this user." : "This will restore full access to services and login for this user."}</p>
                            {selectedUser.status === 'Active' && (<textarea placeholder="Reason for suspension..." className="w-full border border-slate-300 rounded-lg p-3 text-sm mb-4 resize-none h-24" value={banReason} onChange={e => setBanReason(e.target.value)} />)}
                            <div className="flex gap-3"><button onClick={() => setActiveModal(null)} className="flex-1 py-3 border border-slate-200 rounded-xl font-bold text-sm text-slate-600 hover:bg-slate-50">Cancel</button><button onClick={handleBanUser} className={`flex-1 py-3 text-white rounded-xl font-bold text-sm ${selectedUser.status === 'Active' ? 'bg-red-600 hover:bg-red-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}>{selectedUser.status === 'Active' ? 'Confirm Ban' : 'Reactivate'}</button></div>
                        </div>
                    )}

                </motion.div>
            </div>
        )}

        {/* --- FULL SCREEN IMAGE PREVIEW MODAL --- */}
        {fullViewDoc && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" onClick={() => setFullViewDoc(null)}>
                <button className="absolute top-4 right-4 text-white hover:text-slate-300">
                    <X size={32} />
                </button>
                <div className="max-w-4xl max-h-screen p-2" onClick={e => e.stopPropagation()}>
                    <img src={fullViewDoc.url} alt={fullViewDoc.type} className="max-w-full max-h-[85vh] rounded-lg shadow-2xl border border-white/20" />
                    <div className="text-center mt-4 text-white">
                        <h3 className="font-bold text-lg">{fullViewDoc.type}</h3>
                        <p className="text-sm opacity-70">Status: {fullViewDoc.status}</p>
                    </div>
                </div>
            </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default UserManagement;