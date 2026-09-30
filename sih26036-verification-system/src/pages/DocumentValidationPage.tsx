import React, { useState } from 'react';
import { useVerification } from '../context/VerificationContext';
import { 
  ArrowLeft, 
  FileText, 
  Check, 
  X, 
  Building2, 
  Scale, 
  CheckCircle2, 
  AlertTriangle
} from 'lucide-react';

export const DocumentValidationPage: React.FC = () => {
  const { 
    applications, 
    selectedAppId, 
    instruments, 
    acceptApplication, 
    rejectApplication, 
    setActiveTab 
  } = useVerification();

  const app = applications.find(a => a.id === selectedAppId) || applications[0];
  const instrument = instruments.find(i => i.id === app?.instrumentId) || instruments[0];

  const [checklist, setChecklist] = useState({
    detailsComplete: true,
    instrumentVerified: true,
    previousCertValid: true,
    ownershipValid: true
  });

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('Incomplete model certification certificate or illegible serial number plate photo.');

  const allChecked = Object.values(checklist).every(Boolean);

  const handleAccept = () => {
    acceptApplication(app.id);
    setActiveTab('schedule_inspection');
  };

  const handleReject = () => {
    rejectApplication(app.id, rejectReason);
    setShowRejectModal(false);
    setActiveTab('dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      
      {/* Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveTab('dashboard')}
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Control Center</span>
        </button>

        <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
          Document Validation Stage
        </span>
      </div>

      {/* Main Review Card */}
      <div className="glass-panel-elevated rounded-2xl shadow-glass overflow-hidden border border-white/10">
        
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-white/10 bg-slate-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
              VERIFICATION APPLICATION
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 font-mono">{app.id}</h1>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            Submitted: <span className="text-white font-semibold">{app.submittedDate}</span>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Applicant & Instrument Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Applicant Information */}
            <div className="p-5 rounded-2xl bg-slate-950/50 border border-white/10">
              <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-3.5">
                <Building2 className="w-4 h-4" />
                <span>Applicant Information</span>
              </div>
              <div className="space-y-2 text-xs">
                <div><span className="text-slate-500">Business Name:</span> <span className="font-bold text-white ml-1">{app.businessName}</span></div>
                <div><span className="text-slate-500">Applicant:</span> <span className="font-medium text-slate-200 ml-1">{app.applicantName}</span></div>
                <div><span className="text-slate-500">Contact:</span> <span className="font-mono text-cyan-300 ml-1">{app.applicantPhone}</span></div>
                <div><span className="text-slate-500">Email:</span> <span className="font-mono text-slate-300 ml-1">{app.applicantEmail}</span></div>
                <div><span className="text-slate-500">Premises:</span> <span className="text-slate-300 ml-1">{instrument.installationLocation}</span></div>
              </div>
            </div>

            {/* Instrument Information */}
            <div className="p-5 rounded-2xl bg-slate-950/50 border border-white/10">
              <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-3.5">
                <Scale className="w-4 h-4" />
                <span>Instrument Information</span>
              </div>
              <div className="space-y-2 text-xs">
                <div><span className="text-slate-500">Instrument Type:</span> <span className="font-bold text-white ml-1">{instrument.type}</span></div>
                <div><span className="text-slate-500">Manufacturer:</span> <span className="font-medium text-slate-200 ml-1">{instrument.manufacturer}</span></div>
                <div><span className="text-slate-500">Model Number:</span> <span className="font-mono text-slate-300 ml-1">{instrument.modelNumber}</span></div>
                <div><span className="text-slate-500">Serial Number:</span> <span className="font-mono font-bold text-cyan-300 ml-1">{instrument.serialNumber}</span></div>
                <div><span className="text-slate-500">Capacity & Class:</span> <span className="text-slate-300 ml-1">{instrument.capacity}</span></div>
              </div>
            </div>

          </div>

          {/* Uploaded Documents Cards */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-3.5">
              Uploaded Documents for Validation
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {app.documents.map((doc) => (
                <div key={doc.id} className="p-4 rounded-xl border border-white/10 bg-slate-950/60 shadow-glass flex items-start justify-between">
                  <div className="flex items-start space-x-3.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{doc.name}</div>
                      <div className="text-[11px] font-mono text-slate-400 mt-0.5">{doc.filename} ({doc.size})</div>
                      <div className="text-[11px] text-emerald-400 font-medium mt-1 flex items-center space-x-1 font-mono">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>SHA-256 Checksum Verified</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert('Simulated document viewer: ' + doc.name)}
                    className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    Preview
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Validation Checklist */}
          <div className="p-6 rounded-2xl bg-slate-950/60 border border-white/10">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-4">
              Officer Validation Checklist
            </h3>

            <div className="space-y-3">
              <label className="flex items-center space-x-3 text-xs font-medium text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={checklist.detailsComplete}
                  onChange={(e) => setChecklist({ ...checklist, detailsComplete: e.target.checked })}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-700 bg-slate-900"
                />
                <span>Application details complete & verified against trade license</span>
              </label>

              <label className="flex items-center space-x-3 text-xs font-medium text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={checklist.instrumentVerified}
                  onChange={(e) => setChecklist({ ...checklist, instrumentVerified: e.target.checked })}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-700 bg-slate-900"
                />
                <span>Instrument specifications match approved model certificate registry</span>
              </label>

              <label className="flex items-center space-x-3 text-xs font-medium text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={checklist.previousCertValid}
                  onChange={(e) => setChecklist({ ...checklist, previousCertValid: e.target.checked })}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-700 bg-slate-900"
                />
                <span>Previous certificate uploaded and verified against central database</span>
              </label>

              <label className="flex items-center space-x-3 text-xs font-medium text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={checklist.ownershipValid}
                  onChange={(e) => setChecklist({ ...checklist, ownershipValid: e.target.checked })}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-700 bg-slate-900"
                />
                <span>Ownership document and establishment premise proof verified</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              onClick={() => setShowRejectModal(true)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-rose-500/30 text-rose-300 hover:bg-rose-500/10 text-xs font-semibold transition-all flex items-center justify-center space-x-1.5"
            >
              <X className="w-4 h-4" />
              <span>Reject Application</span>
            </button>

            <button
              onClick={handleAccept}
              disabled={!allChecked}
              className={`w-full sm:w-auto px-6 py-2.5 rounded-xl text-white text-xs font-semibold shadow-sm transition-all flex items-center justify-center space-x-1.5 ${
                allChecked
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-[0_0_20px_rgba(16,185,129,0.35)] border border-white/20 active:scale-[0.98]'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>Accept Application & Schedule Inspection →</span>
            </button>
          </div>

        </div>
      </div>

      {/* Reject Reason Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
          <div className="glass-panel-elevated rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-rose-500/30">
            <div className="flex items-center space-x-2 text-rose-400">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="text-base font-bold text-white">Reject Application</h3>
            </div>
            
            <p className="text-xs text-slate-400">
              Specify the legal metrology objection for rejecting application {app.id}.
            </p>

            <textarea
              rows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="glass-input w-full p-3 text-xs rounded-xl"
            />

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.4)]"
              >
                Confirm Reject Application
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
