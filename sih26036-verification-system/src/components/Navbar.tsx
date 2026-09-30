import React from 'react';
import { useVerification } from '../context/VerificationContext';
import { Scale, ShieldCheck, UserCheck, QrCode, RefreshCw } from 'lucide-react';
import { UserRole } from '../types';

export const Navbar: React.FC = () => {
  const { role, setRole, activeTab, setActiveTab, resetDemoData } = useVerification();

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole === 'public') {
      setActiveTab('verify');
    } else {
      setActiveTab('dashboard');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/70 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
      {/* Official Government of India Top Mast */}
      <div className="bg-slate-950/90 border-b border-white/5 text-slate-400 text-xs px-4 py-1.5 flex items-center justify-between font-mono tracking-wide">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="font-semibold text-white tracking-wider">GOVERNMENT OF INDIA</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">Department of Legal Metrology • e-MapTol Portal</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 text-cyan-300 px-2.5 py-0.5 rounded text-[11px] border border-cyan-500/30 font-mono shadow-[0_0_10px_rgba(6,182,212,0.15)]">
            SIH-2026 Prototype
          </span>
          <button 
            onClick={resetDemoData}
            title="Reset to fresh demo state"
            className="flex items-center space-x-1.5 text-slate-400 hover:text-cyan-300 transition-colors text-[11px] group"
          >
            <RefreshCw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>

      {/* Main Header & Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Portal Identity */}
          <div 
            onClick={() => setActiveTab('landing')}
            className="flex items-center space-x-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 flex items-center justify-center text-white shadow-[0_0_20px_rgba(59,130,246,0.35)] border border-white/20 group-hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] transition-all">
              <Scale className="w-5 h-5 text-cyan-200" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-white text-lg tracking-tight group-hover:text-cyan-300 transition-colors">
                  e-MapTol
                </span>
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  SIH26036
                </span>
              </div>
              <p className="text-[11px] text-slate-400 -mt-0.5">Online Verification of Weighing & Measuring Instruments</p>
            </div>
          </div>

          {/* Navigation Links according to role */}
          <nav className="hidden md:flex items-center space-x-1.5">
            {role === 'business' && (
              <>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'dashboard' 
                      ? 'bg-gradient-to-r from-blue-600/25 via-indigo-600/25 to-violet-600/25 text-white border border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.3)]' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('instruments')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'instruments' || activeTab === 'register' 
                      ? 'bg-gradient-to-r from-blue-600/25 via-indigo-600/25 to-violet-600/25 text-white border border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.3)]' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  My Instruments
                </button>
                <button
                  onClick={() => setActiveTab('applications')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'applications' || activeTab === 'application_timeline' 
                      ? 'bg-gradient-to-r from-blue-600/25 via-indigo-600/25 to-violet-600/25 text-white border border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.3)]' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  Applications
                </button>
                <button
                  onClick={() => setActiveTab('certificates')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'certificates' || activeTab === 'certificate_view' 
                      ? 'bg-gradient-to-r from-blue-600/25 via-indigo-600/25 to-violet-600/25 text-white border border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.3)]' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  Certificates
                </button>
              </>
            )}

            {role === 'officer' && (
              <>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'dashboard' 
                      ? 'bg-gradient-to-r from-emerald-600/25 to-teal-600/25 text-emerald-200 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  Control Center
                </button>
                <button
                  onClick={() => setActiveTab('applications')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'applications' || activeTab === 'document_validation' 
                      ? 'bg-gradient-to-r from-emerald-600/25 to-teal-600/25 text-emerald-200 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  Applications
                </button>
                <button
                  onClick={() => setActiveTab('inspections')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'inspections' || activeTab === 'schedule_inspection' || activeTab === 'field_inspection' 
                      ? 'bg-gradient-to-r from-emerald-600/25 to-teal-600/25 text-emerald-200 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  Inspections
                </button>
                <button
                  onClick={() => setActiveTab('certificates')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'certificates' || activeTab === 'certificate_view' 
                      ? 'bg-gradient-to-r from-emerald-600/25 to-teal-600/25 text-emerald-200 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  Certificates
                </button>
              </>
            )}

            {role === 'public' && (
              <>
                <button
                  onClick={() => setActiveTab('landing')}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 border border-transparent transition-all"
                >
                  Home
                </button>
                <button
                  onClick={() => setActiveTab('verify')}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-amber-500/25 to-orange-500/25 text-amber-200 border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                >
                  Verify Certificate
                </button>
              </>
            )}
          </nav>

          {/* Role Switcher & Persona Badge */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <span className="text-[11px] text-slate-500 mr-2 hidden sm:inline font-mono">Role:</span>
              <div className="flex bg-slate-900/80 p-1 rounded-xl border border-white/10 text-xs font-medium backdrop-blur-md shadow-inner">
                <button
                  onClick={() => handleRoleChange('business')}
                  className={`px-3 py-1 rounded-lg transition-all flex items-center space-x-1.5 ${
                    role === 'business' 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)] font-semibold border border-white/20' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Business</span>
                </button>
                <button
                  onClick={() => handleRoleChange('officer')}
                  className={`px-3 py-1 rounded-lg transition-all flex items-center space-x-1.5 ${
                    role === 'officer' 
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)] font-semibold border border-white/20' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Officer</span>
                </button>
                <button
                  onClick={() => handleRoleChange('public')}
                  className={`px-3 py-1 rounded-lg transition-all flex items-center space-x-1.5 ${
                    role === 'public' 
                      ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-[0_0_15px_rgba(245,158,11,0.4)] font-semibold border border-white/20' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Public QR</span>
                </button>
              </div>
            </div>

            {/* Profile Avatar / Indicator */}
            <div className="hidden lg:flex items-center pl-3 border-l border-white/10 text-left">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 text-cyan-300 flex items-center justify-center font-bold text-xs shadow-soft font-mono">
                {role === 'business' ? 'RV' : role === 'officer' ? 'RK' : 'QR'}
              </div>
              <div className="ml-2.5">
                <div className="text-xs font-semibold text-slate-200 leading-tight">
                  {role === 'business' ? 'Ravi Verma' : role === 'officer' ? 'Rajesh Kumar' : 'Public Visitor'}
                </div>
                <div className="text-[10px] text-slate-500 leading-tight font-mono">
                  {role === 'business' ? 'ABC Traders' : role === 'officer' ? 'Inspector Zone 4' : 'Citizen Verification'}
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
