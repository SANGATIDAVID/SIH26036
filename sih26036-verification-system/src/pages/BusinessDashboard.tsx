import React from 'react';
import { useVerification } from '../context/VerificationContext';
import { 
  Plus, 
  Scale, 
  Clock, 
  ChevronRight,
  ShieldCheck,
  Eye
} from 'lucide-react';

export const BusinessDashboard: React.FC = () => {
  const { 
    instruments, 
    applications, 
    certificates, 
    setActiveTab, 
    setSelectedAppId,
    setSelectedCertId 
  } = useVerification();

  const pendingCount = applications.filter(a => a.status !== 'verified' && a.status !== 'rejected').length;
  const activeCertsCount = certificates.filter(c => c.status === 'VALID').length;
  const expiringCount = certificates.filter(c => c.status === 'EXPIRING_SOON').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* ━━━━━━━━ HEADER & PRIMARY CTA ━━━━━━━━ */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Good morning, <span className="text-gradient-cyan">Ravi</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage your instruments and verification requests.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('register')}
          className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-medium text-sm shadow-[0_0_20px_rgba(59,130,246,0.35)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] border border-white/20 transition-all active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>+ Register Instrument</span>
        </button>
      </div>

      {/* ━━━━━━━━ 4 USEFUL STATISTICS (GLOWING GLASS METRICS) ━━━━━━━━ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel rounded-2xl p-5 shadow-glass hover:border-white/20 transition-all">
          <div className="text-xs font-mono font-medium text-slate-400 uppercase">
            Registered Instruments
          </div>
          <div className="text-3xl font-extrabold font-mono text-white mt-2">
            {instruments.length}
          </div>
          <div className="text-xs text-slate-500 mt-1">Commercial equipment</div>
        </div>

        <div className="glass-panel rounded-2xl p-5 shadow-glass hover:border-amber-500/30 transition-all">
          <div className="text-xs font-mono font-medium text-amber-400 uppercase">
            Pending Applications
          </div>
          <div className="text-3xl font-extrabold font-mono text-amber-400 mt-2 drop-shadow-[0_0_12px_rgba(245,158,11,0.4)]">
            {pendingCount}
          </div>
          <div className="text-xs text-slate-500 mt-1">In validation / inspection</div>
        </div>

        <div className="glass-panel rounded-2xl p-5 shadow-glass hover:border-emerald-500/30 transition-all">
          <div className="text-xs font-mono font-medium text-emerald-400 uppercase">
            Active Certificates
          </div>
          <div className="text-3xl font-extrabold font-mono text-emerald-400 mt-2 drop-shadow-[0_0_12px_rgba(16,185,129,0.4)]">
            {activeCertsCount}
          </div>
          <div className="text-xs text-slate-500 mt-1">Legally verified & active</div>
        </div>

        <div className="glass-panel rounded-2xl p-5 shadow-glass hover:border-rose-500/30 transition-all">
          <div className="text-xs font-mono font-medium text-rose-400 uppercase">
            Expiring Soon
          </div>
          <div className="text-3xl font-extrabold font-mono text-rose-400 mt-2 drop-shadow-[0_0_12px_rgba(244,63,94,0.4)]">
            {expiringCount}
          </div>
          <div className="text-xs text-slate-500 mt-1">Requires re-verification</div>
        </div>
      </div>

      {/* ━━━━━━━━ ACTIVE LIFECYCLE BANNER ━━━━━━━━ */}
      {applications.length > 0 && (
        <div className="glass-panel-elevated border-blue-500/30 rounded-2xl p-6 shadow-[0_0_25px_rgba(59,130,246,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.25)]">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono text-cyan-400 font-semibold uppercase">
                Active Verification Request • {applications[0].id}
              </div>
              <div className="text-base font-bold text-white mt-0.5">
                Digital Weighing Scale (Model ABC-500)
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Current status: <span className="font-semibold text-cyan-300 capitalize">{applications[0].status.replace('_', ' ')}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedAppId(applications[0].id);
              setActiveTab('application_timeline');
            }}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-semibold shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all whitespace-nowrap self-start sm:self-auto active:scale-[0.98]"
          >
            <span>Track Application Timeline</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ━━━━━━━━ YOUR INSTRUMENTS LIST ━━━━━━━━ */}
      <div className="glass-panel rounded-2xl shadow-glass overflow-hidden border border-white/10">
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-slate-950/40">
          <div>
            <h2 className="text-base font-bold text-white">Your Instruments</h2>
            <p className="text-xs text-slate-400">Verified and registered measuring tools for ABC Traders</p>
          </div>
          <button
            onClick={() => setActiveTab('register')}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            + Add Another
          </button>
        </div>

        <div className="divide-y divide-white/5">
          {instruments.map((inst) => {
            const relApp = applications.find(a => a.instrumentId === inst.id);
            const isVerified = inst.status === 'verified';
            const isPending = inst.status === 'verification_pending' || inst.status === 'inspection_scheduled';

            return (
              <div key={inst.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors">
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/10 text-cyan-400 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-inner">
                    <Scale className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2.5">
                      <h3 className="text-base font-bold text-white">{inst.type}</h3>
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-mono font-medium ${
                        isVerified
                          ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                          : isPending
                          ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {isVerified ? '✓ Verified' : 'Verification Pending'}
                      </span>
                    </div>

                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-1 text-xs text-slate-400">
                      <div><span className="text-slate-500">Manufacturer:</span> <span className="text-slate-200">{inst.manufacturer}</span></div>
                      <div><span className="text-slate-500">Model:</span> <span className="text-slate-200">{inst.modelNumber}</span></div>
                      <div><span className="text-slate-500">Serial No:</span> <span className="font-mono text-cyan-300 font-medium">{inst.serialNumber}</span></div>
                      <div><span className="text-slate-500">Capacity:</span> <span className="text-slate-200">{inst.capacity}</span></div>
                      <div className="sm:col-span-2"><span className="text-slate-500">Location:</span> <span className="text-slate-200">{inst.installationLocation}</span></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5 self-end md:self-center">
                  {relApp && (
                    <button
                      onClick={() => {
                        setSelectedAppId(relApp.id);
                        setActiveTab('application_timeline');
                      }}
                      className="px-4 py-2 rounded-xl border border-white/10 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-all flex items-center space-x-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Details</span>
                    </button>
                  )}

                  {isVerified && (
                    <button
                      onClick={() => {
                        setSelectedCertId('VC-2026-00421');
                        setActiveTab('certificate_view');
                      }}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all flex items-center space-x-1.5"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>View Certificate</span>
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
