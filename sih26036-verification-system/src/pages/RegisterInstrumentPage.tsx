import React, { useState } from 'react';
import { useVerification } from '../context/VerificationContext';
import { 
  ArrowLeft, 
  Upload, 
  FileCheck, 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';

export const RegisterInstrumentPage: React.FC = () => {
  const { registerInstrument, setActiveTab, setSelectedAppId } = useVerification();

  const [formData, setFormData] = useState({
    type: 'Digital Weighing Scale',
    manufacturer: 'ABC Industries',
    modelNumber: 'ABC-500',
    serialNumber: 'WS123456',
    capacity: '50 kg (Class III, e=10g)',
    businessName: 'ABC Traders',
    ownerName: 'Ravi Verma',
    installationLocation: 'Shop 42, Mandi Gate, Central Market, New Delhi',
    previousCertNo: 'VC-2025-08129',
    previousVerificationDate: '2025-09-08'
  });

  const [prevCertUploaded, setPrevCertUploaded] = useState(true);
  const [invoiceUploaded, setInvoiceUploaded] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdAppId, setCreatedAppId] = useState<string | null>(null);

  const handleAutofillDemo = () => {
    setFormData({
      type: 'Digital Weighing Scale',
      manufacturer: 'ABC Industries',
      modelNumber: 'ABC-500',
      serialNumber: 'WS123456',
      capacity: '50 kg (Class III, e=10g)',
      businessName: 'ABC Traders',
      ownerName: 'Ravi Verma',
      installationLocation: 'Shop 42, Mandi Gate, Central Market, New Delhi',
      previousCertNo: 'VC-2025-08129',
      previousVerificationDate: '2025-09-08'
    });
    setPrevCertUploaded(true);
    setInvoiceUploaded(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const appId = registerInstrument(formData, true);
      setCreatedAppId(appId);
      setIsSubmitting(false);
    }, 600);
  };

  if (createdAppId) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center">
        <div className="glass-panel-elevated rounded-3xl p-8 shadow-glass border-emerald-500/30">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-bold text-white">Application Submitted!</h2>
          <p className="text-sm text-slate-400 mt-2">
            Your verification request has been received and routed to the Legal Metrology officer.
          </p>

          <div className="my-6 p-4 rounded-xl bg-slate-950/60 border border-white/10 text-left font-mono text-xs space-y-2.5">
            <div className="flex justify-between">
              <span className="text-slate-500">Application ID:</span>
              <span className="font-bold text-cyan-400">{createdAppId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Instrument:</span>
              <span className="font-medium text-slate-200">{formData.type} ({formData.modelNumber})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Serial Number:</span>
              <span className="font-medium text-cyan-300">{formData.serialNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Current Stage:</span>
              <span className="font-bold text-amber-400">Document Validation</span>
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedAppId(createdAppId);
              setActiveTab('application_timeline');
            }}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-all"
          >
            Track Application Timeline →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      
      {/* Navigation & Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setActiveTab('dashboard')}
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <button
          type="button"
          onClick={handleAutofillDemo}
          className="inline-flex items-center space-x-1.5 text-xs font-mono px-3.5 py-1.5 rounded-xl bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all shadow-[0_0_10px_rgba(6,182,212,0.2)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Autofill Demo Scale</span>
        </button>
      </div>

      <div className="glass-panel-elevated rounded-2xl shadow-glass overflow-hidden border border-white/10">
        <div className="px-6 py-5 border-b border-white/10 bg-slate-950/40">
          <h1 className="text-xl font-bold text-white">Register Instrument</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Submit specifications and documentation for legal verification certification.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          
          {/* Section 1: Instrument Specifications */}
          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 mb-4">
              1. Instrument Specifications
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Instrument Type *
                </label>
                <input
                  type="text"
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="glass-input w-full px-3.5 py-2.5 text-sm rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Manufacturer *
                </label>
                <input
                  type="text"
                  required
                  value={formData.manufacturer}
                  onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                  className="glass-input w-full px-3.5 py-2.5 text-sm rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Model Number *
                </label>
                <input
                  type="text"
                  required
                  value={formData.modelNumber}
                  onChange={(e) => setFormData({ ...formData, modelNumber: e.target.value })}
                  className="glass-input w-full px-3.5 py-2.5 text-sm rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Serial Number *
                </label>
                <input
                  type="text"
                  required
                  value={formData.serialNumber}
                  onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                  className="glass-input w-full px-3.5 py-2.5 text-sm rounded-xl font-mono text-cyan-300"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Capacity & Verification Interval *
                </label>
                <input
                  type="text"
                  required
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  className="glass-input w-full px-3.5 py-2.5 text-sm rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Ownership & Location */}
          <div className="pt-4 border-t border-white/10">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 mb-4">
              2. Ownership & Installation Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Business / Establishment Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="glass-input w-full px-3.5 py-2.5 text-sm rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Owner / Authorized Signatory Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.ownerName}
                  onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                  className="glass-input w-full px-3.5 py-2.5 text-sm rounded-xl"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Installation Location / Mandi / Shop Address *
                </label>
                <input
                  type="text"
                  required
                  value={formData.installationLocation}
                  onChange={(e) => setFormData({ ...formData, installationLocation: e.target.value })}
                  className="glass-input w-full px-3.5 py-2.5 text-sm rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Previous Certificate Number (if re-verification)
                </label>
                <input
                  type="text"
                  value={formData.previousCertNo}
                  onChange={(e) => setFormData({ ...formData, previousCertNo: e.target.value })}
                  className="glass-input w-full px-3.5 py-2.5 text-sm rounded-xl font-mono text-cyan-300"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Previous Verification Date
                </label>
                <input
                  type="date"
                  value={formData.previousVerificationDate}
                  onChange={(e) => setFormData({ ...formData, previousVerificationDate: e.target.value })}
                  className="glass-input w-full px-3.5 py-2.5 text-sm rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Document Uploads */}
          <div className="pt-4 border-t border-white/10">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 mb-4">
              3. Verification Documents
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Doc 1 */}
              <div 
                onClick={() => setPrevCertUploaded(!prevCertUploaded)}
                className={`p-4 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
                  prevCertUploaded 
                    ? 'border-emerald-500/40 bg-emerald-950/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]' 
                    : 'border-white/10 hover:border-cyan-500/30 bg-slate-900/40'
                }`}
              >
                <div className="flex items-center space-x-3.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    prevCertUploaded 
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                      : 'bg-slate-800 text-slate-400 border border-white/10'
                  }`}>
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-white">Upload Previous Certificate</div>
                    <div className="text-[11px] text-slate-400 mt-0.5 font-mono">
                      {prevCertUploaded ? 'prev_cert_vc2025.pdf (1.2 MB) ✓' : 'Click to attach PDF / scanned copy'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Doc 2 */}
              <div 
                onClick={() => setInvoiceUploaded(!invoiceUploaded)}
                className={`p-4 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
                  invoiceUploaded 
                    ? 'border-emerald-500/40 bg-emerald-950/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]' 
                    : 'border-white/10 hover:border-cyan-500/30 bg-slate-900/40'
                }`}
              >
                <div className="flex items-center space-x-3.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    invoiceUploaded 
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                      : 'bg-slate-800 text-slate-400 border border-white/10'
                  }`}>
                    <Upload className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-white">Upload Purchase/Ownership Document</div>
                    <div className="text-[11px] text-slate-400 mt-0.5 font-mono">
                      {invoiceUploaded ? 'invoice_abc_industries.pdf (850 KB) ✓' : 'Click to attach tax invoice / title proof'}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-semibold text-sm shadow-[0_0_25px_rgba(59,130,246,0.35)] hover:shadow-[0_0_35px_rgba(99,102,241,0.5)] border border-white/20 transition-all flex items-center justify-center space-x-2 active:scale-[0.98]"
            >
              {isSubmitting ? (
                <span>Submitting Verification Request...</span>
              ) : (
                <span>Continue to Verification →</span>
              )}
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};
