import React, { useState } from 'react';
import { useVerification } from '../context/VerificationContext';
import { 
  QrCode, 
  Search, 
  CheckCircle2, 
  AlertCircle
} from 'lucide-react';

export const PublicVerificationPage: React.FC = () => {
  const { certificates, selectedCertId } = useVerification();

  const [searchQuery, setSearchQuery] = useState(selectedCertId || 'VC-2026-00421');
  const [activeResult, setActiveResult] = useState<any>(() => {
    return certificates.find(c => c.id === searchQuery) || certificates[0];
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = certificates.find(
      c => c.id.toLowerCase() === searchQuery.trim().toLowerCase() ||
           c.serialNumber.toLowerCase() === searchQuery.trim().toLowerCase()
    );
    setActiveResult(found || null);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      
      {/* Public Header */}
      <div className="text-center max-w-xl mx-auto">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 text-white flex items-center justify-center mx-auto mb-4 shadow-[0_0_25px_rgba(59,130,246,0.4)] border border-white/20">
          <QrCode className="w-7 h-7 text-cyan-200" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Certificate <span className="text-gradient-cyan">Verification</span>
        </h1>
        <p className="text-sm text-slate-400 mt-2">
          Public portal for authenticating legal metrology verification certificates of commercial scales.
        </p>
      </div>

      {/* Lookup Bar */}
      <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter Certificate ID (e.g. VC-2026-00421) or Serial No..."
          className="glass-input w-full pl-11 pr-28 py-3.5 rounded-2xl text-sm font-mono placeholder:text-slate-500 shadow-glass"
        />
        <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-4" />
        <button
          type="submit"
          className="absolute right-2 top-2 px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold transition-all shadow-[0_0_15px_rgba(59,130,246,0.35)]"
        >
          Verify
        </button>
      </form>

      {/* Verified Certificate Result Card */}
      {activeResult ? (
        <div className="glass-panel-elevated rounded-3xl p-6 sm:p-8 shadow-glass border border-emerald-500/30 space-y-6">
          
          {/* Status Header */}
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between shadow-[0_0_20px_rgba(16,185,129,0.15)]">
            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-500/40">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <div className="text-base font-extrabold text-emerald-300 tracking-wide font-mono">
                  ✓ VALID CERTIFICATE
                </div>
                <div className="text-xs text-emerald-400/80">
                  Instrument verified and certified for commercial use
                </div>
              </div>
            </div>
            <span className="hidden sm:inline-block text-xs font-mono font-bold text-emerald-300 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
              LEGAL STATUS: COMPLIANT
            </span>
          </div>

          {/* Details Table */}
          <div className="divide-y divide-white/5 text-xs">
            <div className="py-3 flex justify-between">
              <span className="text-slate-400 font-mono">Certificate ID:</span>
              <span className="font-mono font-bold text-cyan-300 text-sm">{activeResult.id}</span>
            </div>
            <div className="py-3 flex justify-between">
              <span className="text-slate-400 font-mono">Instrument:</span>
              <span className="font-bold text-white">{activeResult.instrumentName}</span>
            </div>
            <div className="py-3 flex justify-between">
              <span className="text-slate-400 font-mono">Serial Number:</span>
              <span className="font-mono font-bold text-cyan-400">{activeResult.serialNumber}</span>
            </div>
            <div className="py-3 flex justify-between">
              <span className="text-slate-400 font-mono">Model Number:</span>
              <span className="font-mono text-slate-200">{activeResult.modelNumber}</span>
            </div>
            <div className="py-3 flex justify-between">
              <span className="text-slate-400 font-mono">Business Establishment:</span>
              <span className="font-semibold text-white">{activeResult.businessName}</span>
            </div>
            <div className="py-3 flex justify-between">
              <span className="text-slate-400 font-mono">Issued:</span>
              <span className="font-mono text-slate-200">{activeResult.verifiedOn}</span>
            </div>
            <div className="py-3 flex justify-between">
              <span className="text-slate-400 font-mono">Valid Until:</span>
              <span className="font-mono font-bold text-emerald-400">{activeResult.validUntil}</span>
            </div>
            <div className="py-3 flex justify-between">
              <span className="text-slate-400 font-mono">Issuing Authority:</span>
              <span className="text-slate-200">{activeResult.issuingAuthority}</span>
            </div>
          </div>

          {/* Subtle Trust Statement */}
          <div className="pt-4 border-t border-white/10 text-center">
            <p className="text-xs text-slate-400 italic">
              "This certificate record was retrieved from the digital verification system."
            </p>
            <div className="mt-2 text-[10px] font-mono text-slate-500">
              Hash: {activeResult.digitalSignatureHash}
            </div>
          </div>

        </div>
      ) : (
        <div className="glass-panel rounded-2xl border border-rose-500/30 p-8 text-center space-y-3 shadow-glass">
          <AlertCircle className="w-10 h-10 text-rose-400 mx-auto" />
          <h3 className="text-base font-bold text-white">Certificate Not Found</h3>
          <p className="text-xs text-slate-400">
            No active legal metrology verification record exists for "{searchQuery}". Please check the certificate number and try again.
          </p>
        </div>
      )}

    </div>
  );
};
