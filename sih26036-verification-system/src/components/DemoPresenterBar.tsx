import React, { useState } from 'react';
import { useVerification } from '../context/VerificationContext';
import { 
  RotateCcw, 
  Sparkles,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

export const DemoPresenterBar: React.FC = () => {
  const { jumpToDemoStep, resetDemoData, activeTab, role } = useVerification();
  const [collapsed, setCollapsed] = useState(false);

  const steps = [
    { num: 1, label: 'Landing', tab: 'landing', role: 'business' },
    { num: 2, label: 'Business Hub', tab: 'dashboard', role: 'business' },
    { num: 3, label: 'Register Scale', tab: 'register', role: 'business' },
    { num: 4, label: 'Timeline Tracker', tab: 'application_timeline', role: 'business' },
    { num: 5, label: 'Officer Hub', tab: 'dashboard', role: 'officer' },
    { num: 6, label: 'Doc Validation', tab: 'document_validation', role: 'officer' },
    { num: 7, label: 'Schedule Inspection', tab: 'schedule_inspection', role: 'officer' },
    { num: 8, label: 'Field Inspection', tab: 'field_inspection', role: 'officer' },
    { num: 9, label: 'Digital Certificate', tab: 'certificate_view', role: 'business' },
    { num: 10, label: 'Public QR Verification', tab: 'verify', role: 'public' },
    { num: 11, label: 'Expiry & Re-verify', tab: 'certificates', role: 'business' }
  ];

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 no-print transition-all duration-300">
      {/* Collapsed toggle tab */}
      <div className="max-w-7xl mx-auto px-4 flex justify-end">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="bg-slate-950/90 backdrop-blur-xl text-slate-300 hover:text-white text-xs font-mono px-3.5 py-1.5 rounded-t-xl shadow-glass border-t border-x border-white/10 flex items-center space-x-2 transition-all hover:border-cyan-500/40"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-semibold text-white">Hackathon Live Demo Stepper</span>
          {collapsed ? <ChevronUp className="w-3.5 h-3.5 text-cyan-400" /> : <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />}
        </button>
      </div>

      {!collapsed && (
        <div className="bg-slate-950/90 backdrop-blur-2xl text-white border-t border-white/10 shadow-[0_-12px_40px_rgba(0,0,0,0.7)] px-4 py-3">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
            
            {/* Legend & quick reset */}
            <div className="flex items-center space-x-3 text-xs">
              <span className="bg-gradient-to-r from-blue-950/80 to-indigo-950/80 text-cyan-300 px-2.5 py-1 rounded-lg font-mono text-[11px] border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                3–5 MIN DEMO FLOW
              </span>
              <button
                onClick={resetDemoData}
                className="flex items-center space-x-1.5 text-slate-400 hover:text-rose-300 px-2.5 py-1 rounded-lg bg-slate-900/90 hover:bg-rose-950/30 border border-white/5 hover:border-rose-500/30 transition-all text-[11px]"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Demo State</span>
              </button>
            </div>

            {/* Quick Flow Jump Buttons */}
            <div className="flex items-center space-x-1.5 overflow-x-auto max-w-full pb-1 md:pb-0 scrollbar-thin">
              {steps.map((step) => {
                const isActive = activeTab === step.tab && role === step.role;
                return (
                  <button
                    key={step.num}
                    onClick={() => jumpToDemoStep(step.num)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap flex items-center space-x-1.5 transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_18px_rgba(6,182,212,0.5)] border border-white/20'
                        : 'bg-slate-900/80 text-slate-400 hover:bg-slate-800/80 hover:text-white border border-white/5 hover:border-white/10'
                    }`}
                  >
                    <span className="text-[10px] opacity-75 font-mono">#{step.num}</span>
                    <span>{step.label}</span>
                  </button>
                );
              })}
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
