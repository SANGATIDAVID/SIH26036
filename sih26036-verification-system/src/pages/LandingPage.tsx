import React from 'react';
import { useVerification } from '../context/VerificationContext';
import { 
  ArrowRight, 
  ShieldCheck, 
  QrCode, 
  ChevronRight,
  Zap,
  Building2,
  Lock,
  Sparkles
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActiveTab, setRole } = useVerification();

  const handleExplore = () => {
    setRole('business');
    setActiveTab('dashboard');
  };

  const handleVerify = () => {
    setRole('public');
    setActiveTab('verify');
  };

  const steps = [
    { step: '01', title: 'REGISTER', desc: 'Instrument & business onboarding with specs & past certificate history' },
    { step: '02', title: 'APPLY', desc: 'Digital verification application & document validation audit' },
    { step: '03', title: 'INSPECT', desc: 'On-site metrological inspection with strict error tolerance checks' },
    { step: '04', title: 'CERTIFY', desc: 'Tamper-proof digital certificate generated with cryptographic signature' },
    { step: '05', title: 'VERIFY', desc: 'Instant public QR verification for citizens and retail consumers' }
  ];

  return (
    <div className="space-y-20 py-10">
      
      {/* ━━━━━━━━ HERO SECTION ━━━━━━━━ */}
      <section className="text-center max-w-4xl mx-auto px-4 pt-8 pb-4 relative">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-6 shadow-[0_0_15px_rgba(6,182,212,0.15)] backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          <span className="font-mono">SIH26036 • Legal Metrology Digital Transformation Platform</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.15]">
          <span className="text-white">Digital Verification for a </span>
          <br className="hidden sm:inline" />
          <span className="text-gradient-cyan">
            Trusted Marketplace
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          An online platform for registering, verifying and digitally certifying weighing and measuring instruments.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleExplore}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-semibold text-sm shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:shadow-[0_0_35px_rgba(99,102,241,0.6)] border border-white/20 transition-all flex items-center justify-center space-x-2.5 group active:scale-[0.98]"
          >
            <span>Explore Prototype</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={handleVerify}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900/70 hover:bg-slate-800/80 text-white font-semibold text-sm border border-white/10 hover:border-cyan-500/40 shadow-glass transition-all flex items-center justify-center space-x-2 backdrop-blur-md active:scale-[0.98]"
          >
            <QrCode className="w-4 h-4 text-cyan-400" />
            <span>Verify a Certificate</span>
          </button>
        </div>
      </section>

      {/* ━━━━━━━━ VISUAL WORKFLOW SECTION ━━━━━━━━ */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="glass-panel-elevated rounded-2xl p-8 sm:p-10 shadow-glass relative overflow-hidden">
          {/* Subtle top accent border */}
          <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 opacity-80"></div>

          <div className="text-center mb-8">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 block">
              End-to-End Architecture
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">
              The 5-Stage Verification Lifecycle
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {steps.map((item, idx) => (
              <div 
                key={item.step}
                className="relative glass-card rounded-xl p-5 flex flex-col justify-between hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                      {item.step}
                    </span>
                    {idx < 4 && (
                      <ChevronRight className="hidden md:block w-4 h-4 text-slate-600 absolute -right-3 top-7 z-10 bg-slate-950 rounded-full border border-white/10" />
                    )}
                  </div>
                  <h3 className="font-bold text-white text-base mb-1.5 tracking-wide group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━ PROBLEM & SOLUTION SECTION ━━━━━━━━ */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold block">
            TRANSFORMATION
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-1.5">
            From paperwork to a transparent digital verification lifecycle.
          </h2>
          <p className="text-sm text-slate-400 mt-2.5 max-w-2xl mx-auto">
            Replacing slow manual seals and paper certificates with an auditable, real-time government technology backbone.
          </p>
        </div>

        {/* 3 Concise Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card rounded-2xl p-7 shadow-glass hover:border-blue-500/40 hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-5 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">1. Faster Verification</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Automated document validation, electronic officer assignment, and streamlined field calibration checklists reduce turnaround times from weeks to hours.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-7 shadow-glass hover:border-emerald-500/40 hover:shadow-[0_0_25px_rgba(16,185,129,0.2)] transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-5 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">2. Transparent Records</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Every calibration measurement, tolerance test, and officer remark is cryptographically timestamped into an immutable digital audit log for total accountability.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-7 shadow-glass hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(6,182,212,0.2)] transition-all">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-5 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">3. Instant Certificate Verification</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Public QR codes affixed on verified commercial scales allow consumers, enforcement officers, and traders to instantly verify authenticity with any smartphone camera.
            </p>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━ DEMO PERSONA ACCESS CARDS ━━━━━━━━ */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <div className="glass-panel-elevated rounded-3xl p-8 sm:p-10 shadow-glass relative overflow-hidden">
          <div className="text-center mb-8">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold block">
              Hackathon Evaluation Portal
            </span>
            <h3 className="text-2xl font-bold text-white mt-1">Select Persona to Experience Prototype</h3>
            <p className="text-xs text-slate-400 mt-1">
              Switch roles seamlessly during your live demonstration
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => { setRole('business'); setActiveTab('dashboard'); }}
              className="p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-white/10 hover:border-blue-500/40 text-left transition-all group shadow-soft hover:shadow-[0_0_25px_rgba(59,130,246,0.2)]"
            >
              <div className="text-xs text-blue-400 font-mono mb-1.5 font-semibold">PERSONA 1</div>
              <div className="font-bold text-white group-hover:text-blue-300 transition-colors">Business / User</div>
              <div className="text-xs text-slate-300 mt-1">Ravi Verma (ABC Traders)</div>
              <div className="text-[11px] text-slate-500 mt-2.5">Register scale, track timeline, view certificate</div>
            </button>

            <button
              onClick={() => { setRole('officer'); setActiveTab('dashboard'); }}
              className="p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-white/10 hover:border-emerald-500/40 text-left transition-all group shadow-soft hover:shadow-[0_0_25px_rgba(16,185,129,0.2)]"
            >
              <div className="text-xs text-emerald-400 font-mono mb-1.5 font-semibold">PERSONA 2</div>
              <div className="font-bold text-white group-hover:text-emerald-300 transition-colors">Legal Metrology Officer</div>
              <div className="text-xs text-slate-300 mt-1">Insp. Rajesh Kumar (Zone 4)</div>
              <div className="text-[11px] text-slate-500 mt-2.5">Validate documents, schedule inspection, test tolerance</div>
            </button>

            <button
              onClick={() => { setRole('public'); setActiveTab('verify'); }}
              className="p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-white/10 hover:border-amber-500/40 text-left transition-all group shadow-soft hover:shadow-[0_0_25px_rgba(245,158,11,0.2)]"
            >
              <div className="text-xs text-amber-400 font-mono mb-1.5 font-semibold">PERSONA 3</div>
              <div className="font-bold text-white group-hover:text-amber-300 transition-colors">Public Verification</div>
              <div className="text-xs text-slate-300 mt-1">Citizen / Consumer</div>
              <div className="text-[11px] text-slate-500 mt-2.5">Scan QR code, confirm certificate validity in seconds</div>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
