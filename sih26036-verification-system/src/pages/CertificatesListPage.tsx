import React, { useState } from 'react';
import { useVerification } from '../context/VerificationContext';
import { 
  AlertTriangle, 
  RotateCcw, 
  Eye, 
  QrCode
} from 'lucide-react';

export const CertificatesListPage: React.FC = () => {
  const { certificates, setSelectedCertId, setActiveTab, startReverification } = useVerification();
  const [filter, setFilter] = useState<'ALL' | 'VALID' | 'EXPIRING_SOON' | 'EXPIRED'>('ALL');

  const filteredCerts = certificates.filter(c => {
    if (filter === 'ALL') return true;
    return c.status === filter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Verification <span className="text-gradient-cyan">Certificates & Expiry</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Monitor certificate validity periods, upcoming expiration dates, and trigger instant re-verification.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex bg-slate-900/80 p-1 rounded-xl border border-white/10 text-xs font-medium backdrop-blur-md shadow-inner">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-3 py-1 rounded-lg transition-all ${
              filter === 'ALL' ? 'bg-slate-800 text-white font-semibold shadow-soft' : 'text-slate-400 hover:text-white'
            }`}
          >
            All ({certificates.length})
          </button>
          <button
            onClick={() => setFilter('VALID')}
            className={`px-3 py-1 rounded-lg transition-all ${
              filter === 'VALID' ? 'bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('EXPIRING_SOON')}
            className={`px-3 py-1 rounded-lg transition-all ${
              filter === 'EXPIRING_SOON' ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            Expiring Soon (27d)
          </button>
          <button
            onClick={() => setFilter('EXPIRED')}
            className={`px-3 py-1 rounded-lg transition-all ${
              filter === 'EXPIRED' ? 'bg-rose-500/20 text-rose-300 font-semibold border border-rose-500/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            Expired
          </button>
        </div>
      </div>

      {/* Expiry Monitoring Banner */}
      <div className="glass-panel-elevated border-amber-500/30 rounded-2xl p-6 shadow-[0_0_25px_rgba(245,158,11,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.25)]">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-mono text-amber-400 font-bold uppercase">
              EXPIRY NOTIFICATION LIFECYCLE
            </div>
            <div className="text-base font-bold text-white mt-0.5">
              Digital Weighing Scale • Certificate VC-2025-08129 expires in 27 days
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              Annual re-verification is mandated under the Legal Metrology Rules.
            </div>
          </div>
        </div>

        <button
          onClick={() => startReverification('VC-2025-08129')}
          className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-semibold shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all whitespace-nowrap self-start sm:self-auto active:scale-[0.98]"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Start Re-verification</span>
        </button>
      </div>

      {/* Certificates Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCerts.map((cert) => {
          const isValid = cert.status === 'VALID';
          const isExpiring = cert.status === 'EXPIRING_SOON';

          return (
            <div 
              key={cert.id}
              className="glass-panel rounded-2xl p-6 shadow-glass hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-cyan-300 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                    {cert.id}
                  </span>

                  <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    isValid 
                      ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                      : isExpiring
                      ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                      : 'bg-rose-500/10 text-rose-300 border border-rose-500/30 shadow-[0_0_10px_rgba(244,63,94,0.2)]'
                  }`}>
                    {isValid ? '✓ Active' : isExpiring ? 'Expiring in 27d' : 'Expired'}
                  </span>
                </div>

                <h3 className="font-bold text-white text-base mt-2">{cert.instrumentName}</h3>
                <div className="text-xs text-slate-400 font-mono mt-0.5">
                  SN: {cert.serialNumber} • {cert.modelNumber}
                </div>

                <div className="mt-4 pt-4 border-t border-white/5 space-y-2 text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Establishment:</span>
                    <span className="font-medium text-slate-200">{cert.businessName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Verified On:</span>
                    <span className="font-mono text-slate-300">{cert.verifiedOn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Valid Until:</span>
                    <span className="font-mono font-bold text-white">{cert.validUntil}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Inspector:</span>
                    <span className="text-slate-200">{cert.officerName}</span>
                  </div>
                </div>
              </div>

              {/* Card Actions */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => {
                    setSelectedCertId(cert.id);
                    setActiveTab('certificate_view');
                  }}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Certificate</span>
                </button>

                {isExpiring ? (
                  <button
                    onClick={() => startReverification(cert.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold border border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.2)] transition-all flex items-center space-x-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Re-verify</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedCertId(cert.id);
                      setActiveTab('verify');
                    }}
                    className="text-xs font-semibold text-slate-400 hover:text-white flex items-center space-x-1.5 transition-colors"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>Public QR</span>
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
