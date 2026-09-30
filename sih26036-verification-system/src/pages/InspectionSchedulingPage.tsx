import React, { useState } from 'react';
import { useVerification } from '../context/VerificationContext';
import { 
  ArrowLeft, 
  CheckCircle2
} from 'lucide-react';
import { AVAILABLE_OFFICERS } from '../mock/seedData';

export const InspectionSchedulingPage: React.FC = () => {
  const { 
    applications, 
    selectedAppId, 
    instruments, 
    scheduleInspection, 
    setActiveTab 
  } = useVerification();

  const app = applications.find(a => a.id === selectedAppId) || applications[0];
  const instrument = instruments.find(i => i.id === app?.instrumentId) || instruments[0];

  const [date, setDate] = useState('2026-09-10');
  const [time, setTime] = useState('11:30 AM');
  const [location, setLocation] = useState(instrument.installationLocation);
  const [selectedOfficer, setSelectedOfficer] = useState('Rajesh Kumar');
  const [isScheduled, setIsScheduled] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    scheduleInspection(app.id, date, time, location, selectedOfficer);
    setIsScheduled(true);
  };

  if (isScheduled) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center">
        <div className="glass-panel-elevated rounded-3xl p-8 shadow-glass border-blue-500/30">
          <div className="w-16 h-16 rounded-2xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-bold text-white">Inspection Scheduled!</h2>
          <p className="text-sm text-slate-400 mt-2">
            Officer has been assigned and inspection slot has been confirmed on the portal.
          </p>

          <div className="my-6 p-4 rounded-xl bg-slate-950/60 border border-white/10 text-left font-mono text-xs space-y-2.5">
            <div className="flex justify-between">
              <span className="text-slate-500">Application:</span>
              <span className="font-bold text-white">{app.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Assigned Officer:</span>
              <span className="font-bold text-emerald-400">{selectedOfficer}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Scheduled Time:</span>
              <span className="font-medium text-cyan-300">{date} • {time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Location:</span>
              <span className="font-medium text-slate-200 truncate max-w-[200px]">{location}</span>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('field_inspection')}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-sm shadow-[0_0_20px_rgba(6,182,212,0.35)] transition-all flex items-center justify-center space-x-2"
          >
            <span>Proceed to Field Inspection Checklist →</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      
      {/* Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setActiveTab('dashboard')}
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Control Center</span>
        </button>

        <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-cyan-300 border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
          Inspection Scheduling & Officer Assignment
        </span>
      </div>

      <div className="glass-panel-elevated rounded-2xl shadow-glass overflow-hidden border border-white/10">
        <div className="px-6 py-5 border-b border-white/10 bg-slate-950/40">
          <div className="text-xs font-mono font-bold text-cyan-400">APPLICATION {app.id}</div>
          <h1 className="text-xl font-bold text-white mt-1">Schedule Field Inspection</h1>
          <p className="text-xs text-slate-400">
            Designate the inspecting metrology officer, date, and location for on-site calibration verification.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Inspection Date *
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="glass-input w-full px-3.5 py-2.5 text-sm rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Inspection Time *
              </label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="glass-input w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-900"
              >
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:30 AM">11:30 AM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="03:30 PM">03:30 PM</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Inspection Location *
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="glass-input w-full px-3.5 py-2.5 text-sm rounded-xl"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Assign Legal Metrology Officer *
              </label>
              <select
                value={selectedOfficer}
                onChange={(e) => setSelectedOfficer(e.target.value)}
                className="glass-input w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-900 font-medium text-white"
              >
                {AVAILABLE_OFFICERS.map((officer) => (
                  <option key={officer.id} value={officer.name} className="bg-slate-900 text-white">
                    {officer.name} — {officer.zone} ({officer.pending} pending inspections)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Officer Assignment Info Banner */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-white/10 flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 flex items-center justify-center font-bold text-xs font-mono shadow-[0_0_10px_rgba(16,185,129,0.25)]">
              RK
            </div>
            <div>
              <div className="text-xs font-bold text-white">Selected: {selectedOfficer}</div>
              <div className="text-[11px] text-slate-400">
                Department of Legal Metrology • Authorised Inspector Zone 4
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-semibold text-sm shadow-[0_0_25px_rgba(59,130,246,0.35)] hover:shadow-[0_0_35px_rgba(99,102,241,0.5)] border border-white/20 transition-all active:scale-[0.98]"
          >
            Schedule Inspection & Notify Applicant →
          </button>

        </form>
      </div>

    </div>
  );
};
