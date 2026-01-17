import React from 'react';
import { Server, CheckCircle, XCircle, Clock } from 'lucide-react';

const ApiPerformance = () => {
  const apis = [
    { name: "Yes Bank AEPS", success: 98.2, failed: 1.8, latency: "120ms", status: "Excellent" },
    { name: "ICICI DMT", success: 96.5, failed: 3.5, latency: "240ms", status: "Good" },
    { name: "Paytm UPI", success: 88.0, failed: 12.0, latency: "800ms", status: "Degraded" },
    { name: "CyberPlat", success: 99.1, failed: 0.9, latency: "90ms", status: "Excellent" },
  ];

  return (
    <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
            {apis.map((api, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-slate-100 rounded-xl text-slate-600">
                                <Server size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">{api.name}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className={`px-2 py-0.5 text-xs font-bold rounded ${
                                        api.status === 'Excellent' ? 'bg-green-100 text-green-700' :
                                        api.status === 'Good' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                        {api.status}
                                    </span>
                                    <span className="text-xs text-slate-400 flex items-center gap-1">
                                        <Clock size={12} /> {api.latency} avg
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Metrics */}
                        <div className="flex gap-8">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">{api.success}%</div>
                                <div className="text-xs font-bold text-slate-400 uppercase">Success</div>
                            </div>
                            <div className="text-center">
                                <div className={`text-2xl font-bold ${api.failed > 5 ? 'text-red-500' : 'text-slate-600'}`}>{api.failed}%</div>
                                <div className="text-xs font-bold text-slate-400 uppercase">Failure</div>
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar Visual */}
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden flex">
                        <div className="h-full bg-green-500" style={{ width: `${api.success}%` }}></div>
                        <div className="h-full bg-red-500" style={{ width: `${api.failed}%` }}></div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default ApiPerformance;