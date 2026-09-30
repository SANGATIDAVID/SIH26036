import React from 'react';
import { useVerification } from '../context/VerificationContext';
import { Scale, Building2, ShieldCheck, QrCode, ArrowRight } from 'lucide-react';
import { UserRole } from '../types';

export const LoginRoleSelect: React.FC = () => {
  const { setRole, setActiveTab } = useVerification();

  const handleSelectRole = (role: UserRole, targetTab: string = 'dashboard') => {
    setRole(role);
    setActiveTab(targetTab);
  };

  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <div className="text-center mb-10">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 text-white flex items-center justify-center mx-auto mb-4 shadow-[0_0_25px_rgba(59,130,246,0.4)] border border-white/20">
          <Scale className="w-7 h-7 text-cyan-200" />
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Select Demo Account</h1>
        <p className="text-sm text-slate-400 mt-2">
          For this hackathon prototype, choose a simulated role to access the relevant workflow.
        </p>
      </div>

      <div className="space-y-4">
        {/* Role 1: Business */}
        <div
          onClick={() => handleSelectRole('business', 'dashboard')}
          className="glass-card rounded-2xl p-6 shadow-glass hover:border-blue-500/40 hover:shadow-[0_0_25px_rgba(59,130,246,0.25)] cursor-pointer transition-all flex items-center justify-between group"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.2)]">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-white group-hover:text-blue-300 transition-colors">
                  Business / User
                </h3>
                <span className="text-[11px] font-mono bg-blue-500/10 text-blue-300 px-2 py-0.5 rounded border border-blue-500/30">
                  Demo: Ravi (ABC Traders)
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Register weighing scales, submit verification requests, and track application status.
              </p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
        </div>

        {/* Role 2: Officer */}
        <div
          onClick={() => handleSelectRole('officer', 'dashboard')}
          className="glass-card rounded-2xl p-6 shadow-glass hover:border-emerald-500/40 hover:shadow-[0_0_25px_rgba(16,185,129,0.25)] cursor-pointer transition-all flex items-center justify-between group"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-white group-hover:text-emerald-300 transition-colors">
                  Legal Metrology Officer
                </h3>
                <span className="text-[11px] font-mono bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                  Demo: Insp. Rajesh Kumar
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Review applications, schedule field inspections, execute tolerance checks, and issue certificates.
              </p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
        </div>

        {/* Role 3: Public Verification */}
        <div
          onClick={() => handleSelectRole('public', 'verify')}
          className="glass-card rounded-2xl p-6 shadow-glass hover:border-amber-500/40 hover:shadow-[0_0_25px_rgba(245,158,11,0.25)] cursor-pointer transition-all flex items-center justify-between group"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-white group-hover:text-amber-300 transition-colors">
                  Public Certificate Verification
                </h3>
                <span className="text-[11px] font-mono bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                  No Login Required
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Instant QR scanner & certificate lookup for consumers and traders to verify instrument validity.
              </p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
        </div>
      </div>

      <div className="mt-10 text-center text-xs text-slate-500 font-mono">
        Department of Legal Metrology • Official Hackathon Demonstration Portal
      </div>
    </div>
  );
};
