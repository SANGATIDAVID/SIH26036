import React from 'react';
import { useVerification } from '../context/VerificationContext';
import { 
  ArrowLeft, 
  Printer, 
  ShieldCheck, 
  QrCode, 
  CheckCircle2, 
  Scale
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export const CertificateViewPage: React.FC = () => {
  const { certificates, selectedCertId, setActiveTab, setRole, setSelectedCertId } = useVerification();

  const cert = certificates.find(c => c.id === selectedCertId) || certificates[0];

  const handlePrint = () => {
    window.print();
  };

  const handleOpenPublicVerify = () => {
    setRole('public');
    setSelectedCertId(cert.id);
    setActiveTab('verify');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      
      {/* Top Bar - No print */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={() => setActiveTab('dashboard')}
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleOpenPublicVerify}
            className="px-4 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-cyan-300 hover:text-white hover:bg-slate-800/80 text-xs font-semibold shadow-soft transition-all flex items-center space-x-2 backdrop-blur-md"
          >
            <QrCode className="w-3.5 h-3.5 text-cyan-400" />
            <span>Open Public QR Verification</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-all flex items-center space-x-2 border border-white/20"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Download Certificate</span>
          </button>
        </div>
      </div>

      {/* ━━━━━━━━ HOLOGRAPHIC DIGITAL CREDENTIAL CERTIFICATE ━━━━━━━━ */}
      <div className="p-[1.5px] rounded-3xl bg-gradient-to-br from-cyan-500/40 via-indigo-500/30 to-violet-500/40 shadow-cert">
        <div className="print-certificate-card bg-slate-950/90 backdrop-blur-2xl rounded-3xl p-8 sm:p-12 border border-white/10 relative overflow-hidden">
          
          {/* Subtle Guilloche / Security Pattern Border */}
          <div className="absolute inset-3 border border-white/5 pointer-events-none rounded-2xl"></div>
          <div className="absolute top-0 right-0 transform translate-x-12 -translate-y-12 w-48 h-48 bg-gradient-to-br from-cyan-500/10 to-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Certificate Header */}
          <div className="text-center pb-8 border-b border-white/10 relative">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 text-white flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)] border border-white/20">
                <Scale className="w-6 h-6 text-cyan-200" />
              </div>
            </div>
            
            <div className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-semibold">
              Government of India • Ministry of Consumer Affairs, Food & Public Distribution
            </div>
            <div className="text-sm font-bold text-slate-200 mt-1 uppercase tracking-wider">
              Department of Legal Metrology
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white mt-3 uppercase tracking-tight font-mono">
              Verification Certificate
            </h1>
            <div className="text-xs text-slate-400 mt-1 font-mono">
              Issued under Section 24 of The Legal Metrology Act, 2009
            </div>

            <div className="mt-5 inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold font-mono tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>STATUS: ✓ VERIFIED & CERTIFIED</span>
            </div>
          </div>

          {/* Certificate ID & Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-b border-white/10 text-xs font-mono">
            <div>
              <span className="text-slate-500 block">Certificate Number:</span>
              <span className="text-base font-bold text-cyan-300 mt-1 block">
                {cert.id}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Verified On:</span>
              <span className="text-sm font-bold text-white mt-1 block">
                {cert.verifiedOn}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Valid Until:</span>
              <span className="text-sm font-bold text-emerald-400 mt-1 block drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]">
                {cert.validUntil}
              </span>
            </div>
          </div>

          {/* Instrument Specifications Grid */}
          <div className="py-6 border-b border-white/10 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
              Certified Instrument Specifications
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 text-xs">
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-400">Instrument Type:</span>
                <span className="font-bold text-white">{cert.instrumentName}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-400">Manufacturer:</span>
                <span className="font-semibold text-white">{cert.manufacturer}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-400">Model Number:</span>
                <span className="font-mono text-cyan-300 font-medium">{cert.modelNumber}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-400">Serial Number:</span>
                <span className="font-mono font-bold text-cyan-400">{cert.serialNumber}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-400">Verification Capacity:</span>
                <span className="font-semibold text-white">{cert.capacity}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-400">Business / Owner:</span>
                <span className="font-semibold text-white">{cert.businessName}</span>
              </div>
              <div className="sm:col-span-2 flex justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-400">Installation Address:</span>
                <span className="font-medium text-slate-200">{cert.installationLocation}</span>
              </div>
            </div>
          </div>

          {/* Cryptographic QR & Signatures Section */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            
            {/* QR Code Container */}
            <div 
              onClick={handleOpenPublicVerify}
              className="flex items-center space-x-4 cursor-pointer p-3 rounded-2xl hover:bg-white/[0.03] transition-all border border-transparent hover:border-cyan-500/30"
              title="Click to simulate scanning this QR code"
            >
              <div className="p-2.5 bg-white rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.2)] border border-white">
                <QRCodeSVG 
                  value={`https://legalmetrology.gov.in/verify?cert=${cert.id}&sn=${cert.serialNumber}`}
                  size={96}
                  level="M"
                />
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center space-x-1.5">
                  <QrCode className="w-4 h-4 text-cyan-400" />
                  <span>Scan to Authenticate</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1 max-w-[180px]">
                  Direct public validation on the central metrology ledger.
                </div>
                <span className="text-[11px] text-cyan-400 underline font-medium mt-1.5 block">
                  Click to test verify →
                </span>
              </div>
            </div>

            {/* Digital Signature */}
            <div className="text-right sm:border-l border-white/10 sm:pl-8">
              <div className="inline-block p-2.5 rounded-xl bg-slate-950/80 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)] mb-2.5">
                <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>CRYPTOGRAPHIC SIGNATURE</span>
                </div>
                <div className="text-[9px] font-mono text-slate-400 truncate max-w-[200px] mt-0.5">
                  {cert.digitalSignatureHash}
                </div>
              </div>

              <div className="text-xs font-bold text-white">{cert.officerName}</div>
              <div className="text-[11px] text-slate-400">{cert.officerDesignation}</div>
              <div className="text-[10px] text-slate-500 mt-0.5 font-mono">{cert.issuingAuthority}</div>
            </div>

          </div>

          {/* Prototype Watermark Disclaimer */}
          <div className="mt-8 pt-4 border-t border-white/10 text-center text-[10px] text-slate-500 font-mono">
            PROTOTYPE DEMONSTRATION RECORD • SIH26036 • LEGAL METROLOGY ACT COMPLIANCE ENGINE
          </div>

        </div>
      </div>

    </div>
  );
};
