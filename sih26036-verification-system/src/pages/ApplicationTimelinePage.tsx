import React from 'react';
import { useVerification } from '../context/VerificationContext';
import { 
  ArrowLeft, 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { WorkflowStepper } from '../components/WorkflowStepper';

export const ApplicationTimelinePage: React.FC = () => {
  const { 
    applications, 
    selectedAppId, 
    instruments, 
    setActiveTab, 
    setRole,
    setSelectedCertId 
  } = useVerification();

  const app = applications.find(a => a.id === selectedAppId) || applications[0];
  const instrument = instruments.find(i => i.id === app?.instrumentId) || instruments[0];

  if (!app) {
    return <div className="p-8 text-center text-slate-500">No application selected.</div>;
  }

  const timelineStages = [
    {
      key: 'app_submitted',
      label: 'Application Submitted',
      completed: true,
      timestamp: app.submittedDate + ' • 10:14 AM',
      detail: 'Registration completed and formal verification request filed by ' + app.applicantName
    },
    {
      key: 'docs_uploaded',
      label: 'Documents Uploaded',
      completed: true,
      timestamp: app.submittedDate + ' • 10:15 AM',
      detail: 'Previous Certificate and Ownership Bill attached and cryptographic hash verified'
    },
    {
      key: 'doc_validation',
      label: 'Document Validation',
      completed: app.status !== 'submitted',
      isActive: app.status === 'document_validation',
      timestamp: app.status !== 'submitted' ? 'Under Review' : 'Pending',
      detail: 'Legal Metrology Officer verifying serial numbers and model approval specifications'
    },
    {
      key: 'inspection_sched',
      label: 'Inspection Scheduled',
      completed: app.status === 'inspection_scheduled' || app.status === 'field_inspection' || app.status === 'verified',
      isActive: app.status === 'inspection_scheduled',
      timestamp: app.scheduledDate ? app.scheduledDate + ' at ' + app.scheduledTime : 'Pending document approval',
      detail: app.assignedOfficer ? 'Assigned Officer: ' + app.assignedOfficer : 'Officer to be dispatched'
    },
    {
      key: 'field_inspection',
      label: 'Field Inspection',
      completed: app.status === 'verified',
      isActive: app.status === 'field_inspection',
      timestamp: app.status === 'verified' ? 'Completed 08 Sep 2026' : 'Pending inspection date',
      detail: 'Physical calibration tolerance tests & tamper seal inspection'
    },
    {
      key: 'certificate_issued',
      label: 'Certificate Issued',
      completed: app.status === 'verified',
      isActive: false,
      timestamp: app.completedDate ? app.completedDate : 'Pending inspection outcome',
      detail: app.certificateId ? 'Digital Certificate ID: ' + app.certificateId : 'Digital signature upon pass'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      
      {/* Navigation & Quick Demo Bridge */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveTab('dashboard')}
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        {/* Seamless Demo Transition Button */}
        {app.status === 'document_validation' && (
          <button
            onClick={() => {
              setRole('officer');
              setActiveTab('document_validation');
            }}
            className="inline-flex items-center space-x-2 text-xs font-semibold px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] border border-white/20 transition-all active:scale-[0.98]"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Switch to Officer to Validate Documents →</span>
          </button>
        )}

        {app.status === 'field_inspection' && (
          <button
            onClick={() => {
              setRole('officer');
              setActiveTab('field_inspection');
            }}
            className="inline-flex items-center space-x-2 text-xs font-semibold px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] border border-white/20 transition-all active:scale-[0.98]"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Switch to Officer to Complete Field Inspection →</span>
          </button>
        )}

        {app.status === 'verified' && (
          <button
            onClick={() => {
              setSelectedCertId(app.certificateId || 'VC-2026-00421');
              setActiveTab('certificate_view');
            }}
            className="inline-flex items-center space-x-2 text-xs font-semibold px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] border border-white/20 transition-all active:scale-[0.98]"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>View Generated Certificate →</span>
          </button>
        )}
      </div>

      {/* Application Overview Card */}
      <div className="glass-panel-elevated rounded-2xl p-6 sm:p-8 shadow-glass border border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <span className="text-[11px] font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
              APPLICATION ID
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 font-mono tracking-tight">{app.id}</h1>
          </div>

          <div className="sm:text-right">
            <span className="text-xs text-slate-400 block font-mono">Current Status</span>
            <span className={`inline-block mt-1 text-xs font-bold font-mono px-3.5 py-1 rounded-full uppercase tracking-wider ${
              app.status === 'verified'
                ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
                : app.status === 'rejected'
                ? 'bg-rose-500/10 text-rose-300 border border-rose-500/30 shadow-[0_0_12px_rgba(244,63,94,0.25)]'
                : 'bg-amber-500/10 text-amber-300 border border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
            }`}>
              {app.status.replace('_', ' ')}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5 text-xs">
          <div>
            <span className="text-slate-500 block">Instrument</span>
            <span className="font-bold text-slate-100 mt-1 block">{instrument.type}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Model & Serial</span>
            <span className="font-mono text-cyan-300 mt-1 block font-medium">{instrument.modelNumber} • {instrument.serialNumber}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Applicant</span>
            <span className="font-medium text-slate-200 mt-1 block">{app.applicantName}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Submitted On</span>
            <span className="font-mono text-slate-300 mt-1 block">{app.submittedDate}</span>
          </div>
        </div>
      </div>

      {/* Detailed Lifecycle Progress Stepper */}
      <WorkflowStepper currentStatus={app.status} />

      {/* Vertical Detailed Timeline */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 shadow-glass border border-white/10">
        <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-widest font-mono mb-8">
          Lifecycle Verification Audit Trail
        </h2>

        <div className="space-y-7 relative pl-6 border-l-2 border-slate-800 ml-3">
          {timelineStages.map((stage) => {
            return (
              <div key={stage.key} className="relative group">
                {/* Node icon */}
                <div className={`absolute -left-[35px] top-0 w-7 h-7 rounded-xl flex items-center justify-center transition-all ${
                  stage.completed
                    ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)] border border-emerald-400/40'
                    : stage.isActive
                    ? 'bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.6)] border border-cyan-400/50 animate-pulse'
                    : 'bg-slate-900 text-slate-600 border border-white/10'
                }`}>
                  {stage.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-white"></span>
                  )}
                </div>

                {/* Content */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className={`text-sm font-bold tracking-wide ${
                      stage.completed || stage.isActive ? 'text-white' : 'text-slate-500'
                    }`}>
                      {stage.label}
                    </h4>
                    <span className="text-xs font-mono text-slate-400">
                      {stage.timestamp}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    {stage.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Uploaded Documents Preview */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 shadow-glass border border-white/10">
        <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-4">
          Attached Verification Documents
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {app.documents.map((doc) => (
            <div key={doc.id} className="p-4 rounded-xl border border-white/10 bg-slate-950/50 flex items-center justify-between hover:border-cyan-500/30 transition-all">
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{doc.name}</div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">{doc.filename} • {doc.size}</div>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-mono">
                Verified
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
