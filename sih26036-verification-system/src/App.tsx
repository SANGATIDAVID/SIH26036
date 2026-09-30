import React from 'react';
import { useVerification } from './context/VerificationContext';
import { Navbar } from './components/Navbar';
import { DemoPresenterBar } from './components/DemoPresenterBar';
import { LandingPage } from './pages/LandingPage';
import { LoginRoleSelect } from './pages/LoginRoleSelect';
import { BusinessDashboard } from './pages/BusinessDashboard';
import { RegisterInstrumentPage } from './pages/RegisterInstrumentPage';
import { ApplicationTimelinePage } from './pages/ApplicationTimelinePage';
import { OfficerDashboard } from './pages/OfficerDashboard';
import { DocumentValidationPage } from './pages/DocumentValidationPage';
import { InspectionSchedulingPage } from './pages/InspectionSchedulingPage';
import { FieldInspectionPage } from './pages/FieldInspectionPage';
import { CertificateViewPage } from './pages/CertificateViewPage';
import { PublicVerificationPage } from './pages/PublicVerificationPage';
import { CertificatesListPage } from './pages/CertificatesListPage';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export const App: React.FC = () => {
  const { activeTab, role, toasts, removeToast } = useVerification();

  const renderCurrentView = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingPage />;
      case 'login':
        return <LoginRoleSelect />;
      case 'dashboard':
        return role === 'officer' ? <OfficerDashboard /> : <BusinessDashboard />;
      case 'instruments':
      case 'register':
        return <RegisterInstrumentPage />;
      case 'applications':
      case 'application_timeline':
        return <ApplicationTimelinePage />;
      case 'document_validation':
        return <DocumentValidationPage />;
      case 'inspections':
      case 'schedule_inspection':
        return <InspectionSchedulingPage />;
      case 'field_inspection':
        return <FieldInspectionPage />;
      case 'certificate_view':
        return <CertificateViewPage />;
      case 'certificates':
        return <CertificatesListPage />;
      case 'verify':
        return <PublicVerificationPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-canvas-950 text-slate-100 flex flex-col font-sans pb-24 relative overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* ━━━━━━━━ AMBIENT MULTICOLOUR BACKGROUND ━━━━━━━━ */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Subtle high-tech grid layer */}
        <div className="absolute inset-0 bg-grid-tech opacity-40"></div>
        
        {/* Animated ambient gradient blobs */}
        {/* Blob 1: Electric Blue / Cyan (Top Left to Center) */}
        <div className="absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-blue-600/25 via-cyan-500/20 to-transparent blur-[140px] animate-ambient-slow" />

        {/* Blob 2: Violet / Purple / Magenta (Top Right) */}
        <div className="absolute top-10 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-violet-600/20 via-purple-600/20 to-fuchsia-600/10 blur-[150px] animate-ambient-slow-rev" />

        {/* Blob 3: Deep Teal / Cyan (Bottom Left) */}
        <div className="absolute -bottom-40 left-1/4 w-[550px] h-[550px] rounded-full bg-gradient-to-t from-teal-500/15 via-blue-600/15 to-transparent blur-[130px] animate-ambient-slow" />

        {/* Blob 4: Soft Indigo Accent (Center) */}
        <div className="absolute top-1/3 left-1/3 w-[450px] h-[450px] rounded-full bg-indigo-500/10 blur-[120px] animate-ambient-pulse" />
      </div>

      {/* ━━━━━━━━ TOAST NOTIFICATIONS (GLASS MORPHIC) ━━━━━━━━ */}
      <div className="fixed top-20 right-4 z-50 space-y-2.5 max-w-sm w-full no-print">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`p-4 rounded-xl backdrop-blur-xl border flex items-start space-x-3 text-xs font-medium transition-all shadow-glass ${
              toast.type === 'success'
                ? 'bg-slate-900/80 border-emerald-500/40 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                : toast.type === 'error'
                ? 'bg-slate-900/80 border-rose-500/40 text-rose-100 shadow-[0_0_20px_rgba(244,63,94,0.2)]'
                : toast.type === 'warning'
                ? 'bg-slate-900/80 border-amber-500/40 text-amber-100 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                : 'bg-slate-900/80 border-cyan-500/40 text-cyan-100 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
            }`}
          >
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />}
            {toast.type === 'error' && <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />}
            {toast.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />}
            {toast.type === 'info' && <Info className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />}

            <div className="flex-1 leading-snug tracking-wide">{toast.message}</div>

            <button 
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* ━━━━━━━━ MAIN GOVTECH HEADER ━━━━━━━━ */}
      <Navbar />

      {/* ━━━━━━━━ MAIN CONTENT AREA ━━━━━━━━ */}
      <main className="flex-1 relative z-10">
        {renderCurrentView()}
      </main>

      {/* ━━━━━━━━ DOCKED LIVE DEMO PRESENTER BAR ━━━━━━━━ */}
      <DemoPresenterBar />

    </div>
  );
};
