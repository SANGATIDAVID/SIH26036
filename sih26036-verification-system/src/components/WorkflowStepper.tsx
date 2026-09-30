import React from 'react';
import { Check, CheckCircle2 } from 'lucide-react';
import { ApplicationStatus } from '../types';

interface WorkflowStepperProps {
  currentStatus: ApplicationStatus;
}

export const WorkflowStepper: React.FC<WorkflowStepperProps> = ({ currentStatus }) => {
  const steps = [
    { id: 'submitted', label: 'Application Submitted', sub: 'Details provided' },
    { id: 'document_validation', label: 'Document Validation', sub: 'Officer review' },
    { id: 'inspection_scheduled', label: 'Inspection Scheduled', sub: 'Date & officer set' },
    { id: 'field_inspection', label: 'Field Inspection', sub: 'On-site tolerance test' },
    { id: 'verified', label: 'Certificate Issued', sub: 'Digitally signed & QR' }
  ];

  const getStepIndex = (status: ApplicationStatus) => {
    switch (status) {
      case 'submitted': return 0;
      case 'document_validation': return 1;
      case 'inspection_scheduled': return 2;
      case 'field_inspection': return 3;
      case 'verified': return 4;
      case 'rejected': return 1;
      default: return 0;
    }
  };

  const currentIndex = getStepIndex(currentStatus);
  const isRejected = currentStatus === 'rejected';

  return (
    <div className="glass-panel-elevated rounded-2xl p-6 shadow-glass relative overflow-hidden">
      {/* Subtle top gradient accent line */}
      <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 opacity-70"></div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold block">
            End-to-End Lifecycle Tracking
          </span>
          <h3 className="text-sm font-bold text-white mt-0.5">
            Verification Workflow Pipeline
          </h3>
        </div>

        <span className={`text-xs font-semibold px-3 py-1 rounded-full font-mono flex items-center space-x-1.5 ${
          isRejected 
            ? 'bg-rose-500/10 text-rose-300 border border-rose-500/30 shadow-[0_0_12px_rgba(244,63,94,0.3)]' 
            : currentStatus === 'verified'
            ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
            : 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
        }`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
          <span>{isRejected ? 'Application Rejected' : currentStatus === 'verified' ? '✓ Verified & Certified' : 'In Progress'}</span>
        </span>
      </div>

      <div className="relative pt-2 pb-2">
        {/* Glowing track behind nodes */}
        <div className="hidden md:block absolute top-1/2 left-8 right-8 h-1 -translate-y-6 bg-slate-800 rounded-full z-0">
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-blue-500 rounded-full shadow-[0_0_12px_rgba(6,182,212,0.6)] transition-all duration-700"
            style={{ width: `${(Math.min(currentIndex, 4) / 4) * 100}%` }}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
          {steps.map((step, idx) => {
            const isPassed = idx < currentIndex || (idx === currentIndex && currentStatus === 'verified');
            const isCurrent = idx === currentIndex && currentStatus !== 'verified';
            
            return (
              <div key={step.id} className="flex md:flex-col items-center md:text-center space-x-3 md:space-x-0 group">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                  isPassed
                    ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-[0_0_18px_rgba(16,185,129,0.45)] ring-2 ring-emerald-400/40'
                    : isCurrent
                    ? isRejected 
                      ? 'bg-gradient-to-br from-rose-500 to-red-600 text-white shadow-[0_0_18px_rgba(244,63,94,0.45)] ring-2 ring-rose-400/40' 
                      : 'bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.5)] ring-4 ring-cyan-400/30 animate-pulse'
                    : 'bg-slate-900/80 text-slate-500 border border-white/10'
                }`}>
                  {isPassed ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : isCurrent && isRejected ? (
                    '✕'
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </div>
                
                <div className="md:mt-3">
                  <div className={`text-xs font-semibold tracking-wide ${
                    isPassed || isCurrent ? 'text-white' : 'text-slate-500'
                  }`}>
                    {step.label}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {step.sub}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
