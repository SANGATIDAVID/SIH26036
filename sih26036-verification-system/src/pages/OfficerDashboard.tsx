import React from 'react';
import { useVerification } from '../context/VerificationContext';
import { 
  ShieldCheck, 
  ChevronRight, 
  Eye
} from 'lucide-react';

export const OfficerDashboard: React.FC = () => {
  const { applications, setSelectedAppId, setActiveTab } = useVerification();

  const pendingApps = applications.filter(a => a.status === 'document_validation' || a.status === 'submitted');
  const todayInspections = applications.filter(a => a.status === 'field_inspection');
  const completedCount = applications.filter(a => a.status === 'verified').length;
  const expiringCount = 1;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Officer Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
              OFFICER ZONE 4 • CENTRAL DELHI
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
            Verification <span className="text-gradient-cyan">Control Center</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Review incoming verification applications, schedule field inspections, and record calibration audits.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="glass-card px-4 py-2 rounded-xl text-xs font-mono border border-white/10 text-slate-300 shadow-soft">
            Inspector: <span className="font-bold text-white">Rajesh Kumar</span>
          </div>
        </div>
      </div>

      {/* 4 Concise Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel rounded-2xl p-5 shadow-glass hover:border-amber-500/30 transition-all">
          <div className="text-xs font-mono font-medium text-amber-400 uppercase">
            Pending Applications
          </div>
          <div className="text-3xl font-extrabold font-mono text-amber-400 mt-2 drop-shadow-[0_0_12px_rgba(245,158,11,0.4)]">
            {pendingApps.length}
          </div>
          <div className="text-xs text-slate-500 mt-1">Awaiting document validation</div>
        </div>

        <div className="glass-panel rounded-2xl p-5 shadow-glass hover:border-cyan-500/30 transition-all">
          <div className="text-xs font-mono font-medium text-cyan-400 uppercase">
            Today's Inspections
          </div>
          <div className="text-3xl font-extrabold font-mono text-cyan-300 mt-2 drop-shadow-[0_0_12px_rgba(6,182,212,0.4)]">
            {todayInspections.length > 0 ? todayInspections.length : 1}
          </div>
          <div className="text-xs text-slate-500 mt-1">Scheduled in jurisdiction</div>
        </div>

        <div className="glass-panel rounded-2xl p-5 shadow-glass hover:border-emerald-500/30 transition-all">
          <div className="text-xs font-mono font-medium text-emerald-400 uppercase">
            Completed Inspections
          </div>
          <div className="text-3xl font-extrabold font-mono text-emerald-400 mt-2 drop-shadow-[0_0_12px_rgba(16,185,129,0.4)]">
            {completedCount}
          </div>
          <div className="text-xs text-slate-500 mt-1">Certificates issued this month</div>
        </div>

        <div className="glass-panel rounded-2xl p-5 shadow-glass hover:border-rose-500/30 transition-all">
          <div className="text-xs font-mono font-medium text-rose-400 uppercase">
            Expiring Certificates
          </div>
          <div className="text-3xl font-extrabold font-mono text-rose-400 mt-2 drop-shadow-[0_0_12px_rgba(244,63,94,0.4)]">
            {expiringCount}
          </div>
          <div className="text-xs text-slate-500 mt-1">Due for mandatory reverification</div>
        </div>
      </div>

      {/* Clean Application Table (Enterprise GovTech Dashboard) */}
      <div className="glass-panel rounded-2xl shadow-glass overflow-hidden border border-white/10">
        <div className="px-6 py-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-slate-950/40">
          <div>
            <h2 className="text-base font-bold text-white">Incoming Verification Applications</h2>
            <p className="text-xs text-slate-400">Legal Metrology verification requests pending officer action</p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono bg-slate-900 border border-white/10 text-cyan-300 px-3 py-1 rounded-lg">
              Showing {applications.length} requests
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-950/60 border-b border-white/5 text-slate-400 text-xs font-mono uppercase">
                <th className="py-3.5 px-6">Application ID</th>
                <th className="py-3.5 px-6">Business</th>
                <th className="py-3.5 px-6">Instrument</th>
                <th className="py-3.5 px-6">Submitted</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {applications.map((app) => {
                const isPendingReview = app.status === 'document_validation' || app.status === 'submitted';
                const isScheduled = app.status === 'field_inspection' || app.status === 'inspection_scheduled';
                const isVerified = app.status === 'verified';

                return (
                  <tr key={app.id} className="hover:bg-white/[0.03] transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-cyan-400">
                      {app.id}
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-semibold text-white">{app.businessName}</div>
                      <div className="text-xs text-slate-400">{app.applicantName}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-slate-200 font-medium">Digital Weighing Scale</div>
                      <div className="text-xs text-slate-500 font-mono">Model ABC-500</div>
                    </td>
                    <td className="py-4 px-6 font-mono text-xs text-slate-400">
                      {app.submittedDate}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-block text-xs font-semibold font-mono px-3 py-1 rounded-full uppercase tracking-wider ${
                        isVerified
                          ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.25)]'
                          : isPendingReview
                          ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.25)]'
                          : 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.25)]'
                      }`}>
                        {app.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      {isPendingReview && (
                        <button
                          onClick={() => {
                            setSelectedAppId(app.id);
                            setActiveTab('document_validation');
                          }}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all inline-flex items-center space-x-1.5"
                        >
                          <span>Review</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {app.status === 'inspection_scheduled' && (
                        <button
                          onClick={() => {
                            setSelectedAppId(app.id);
                            setActiveTab('schedule_inspection');
                          }}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all inline-flex items-center space-x-1.5"
                        >
                          <span>Schedule Officer</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {app.status === 'field_inspection' && (
                        <button
                          onClick={() => {
                            setSelectedAppId(app.id);
                            setActiveTab('field_inspection');
                          }}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all inline-flex items-center space-x-1.5"
                        >
                          <span>Execute Inspection</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {isVerified && (
                        <button
                          onClick={() => {
                            setSelectedAppId(app.id);
                            setActiveTab('application_timeline');
                          }}
                          className="px-3.5 py-1.5 rounded-xl border border-white/10 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-colors inline-flex items-center space-x-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Log</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
