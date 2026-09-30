import React, { useState } from 'react';
import { useVerification } from '../context/VerificationContext';
import { 
  ArrowLeft, 
  X, 
  Camera, 
  ShieldCheck, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const FieldInspectionPage: React.FC = () => {
  const { 
    applications, 
    selectedAppId, 
    instruments, 
    submitInspection, 
    scheduleReinspection,
    setActiveTab, 
    setSelectedCertId 
  } = useVerification();

  const app = applications.find(a => a.id === selectedAppId) || applications[0];
  const instrument = instruments.find(i => i.id === app?.instrumentId) || instruments[0];

  // Checklist states (default to PASS for primary happy path)
  const [checklist, setChecklist] = useState({
    accuracyTest: true,
    physicalCondition: true,
    displayReadability: true,
    sealMarkings: true
  });

  // Measurement states
  const [referenceValue] = useState(10.00); // 10 kg standard weight
  const [observedValue, setObservedValue] = useState(10.01);
  const tolerance = 0.05; // ±0.05 kg
  const [remarks, setRemarks] = useState('Instrument functioning within permitted tolerance.');
  const [photoUploaded, setPhotoUploaded] = useState(true);

  // Failure simulation state
  const [inspectionResultState, setInspectionResultState] = useState<'IDLE' | 'PASS' | 'FAIL'>('IDLE');

  // Compute tolerance pass/fail
  const errorDelta = Math.abs(observedValue - referenceValue);
  const measurementPass = errorDelta <= tolerance;
  const overallPass = Object.values(checklist).every(Boolean) && measurementPass;

  const handleCompleteInspection = () => {
    if (!overallPass) {
      setInspectionResultState('FAIL');
      submitInspection(
        app.id,
        checklist,
        {
          referenceValue,
          observedValue,
          unit: 'kg',
          tolerance,
          computedPass: false
        },
        remarks,
        false,
        photoUploaded
      );
      return;
    }

    const cert = submitInspection(
      app.id,
      checklist,
      {
        referenceValue,
        observedValue,
        unit: 'kg',
        tolerance,
        computedPass: true
      },
      remarks,
      true,
      photoUploaded
    );

    if (cert) {
      setSelectedCertId(cert.id);
      setActiveTab('certificate_view');
    }
  };

  const handleSimulateFail = () => {
    setChecklist({
      accuracyTest: false,
      physicalCondition: true,
      displayReadability: true,
      sealMarkings: true
    });
    setObservedValue(10.12); // Exceeds tolerance
    setRemarks('Accuracy test failed: observed weight 10.12 kg exceeds ±0.05 kg permitted error limit.');
  };

  const handleResetToPass = () => {
    setChecklist({
      accuracyTest: true,
      physicalCondition: true,
      displayReadability: true,
      sealMarkings: true
    });
    setObservedValue(10.01);
    setRemarks('Instrument functioning within permitted tolerance.');
    setInspectionResultState('IDLE');
  };

  if (inspectionResultState === 'FAIL') {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center">
        <div className="glass-panel-elevated rounded-3xl p-8 shadow-glass border-rose-500/40">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(244,63,94,0.3)]">
            <X className="w-8 h-8" />
          </div>

          <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/30">
            Inspection Outcome
          </span>
          <h2 className="text-2xl font-bold text-white mt-2">Verification Failed</h2>
          <p className="text-sm text-slate-400 mt-2">
            Instrument accuracy exceeds permitted tolerance. The commercial instrument cannot be legally certified in its current calibration state.
          </p>

          <div className="my-6 p-4 rounded-xl bg-slate-950/60 border border-white/10 text-left font-mono text-xs space-y-2.5">
            <div className="flex justify-between">
              <span className="text-slate-500">Reason:</span>
              <span className="font-bold text-rose-400">Tolerance limit exceeded (Observed: {observedValue} kg)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Remedy:</span>
              <span className="font-bold text-amber-400">Correction Required (Recalibrate Scale)</span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => {
                scheduleReinspection(app.id);
                handleResetToPass();
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all flex items-center justify-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Schedule Re-inspection</span>
            </button>

            <button
              onClick={handleResetToPass}
              className="w-full py-2.5 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 font-medium text-xs transition-colors"
            >
              Return to Inspection Screen & Reset to PASS
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      
      {/* Navigation & Simulation Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={() => setActiveTab('dashboard')}
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Control Center</span>
        </button>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-500 font-mono">Demo Toggle:</span>
          <button
            type="button"
            onClick={handleSimulateFail}
            className="px-3 py-1 rounded-lg bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 border border-rose-500/30 text-xs font-mono transition-all"
          >
            Simulate FAIL Outcome
          </button>
          <button
            type="button"
            onClick={handleResetToPass}
            className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs font-mono transition-all"
          >
            Default to PASS
          </button>
        </div>
      </div>

      {/* Main Inspection Card */}
      <div className="glass-panel-elevated rounded-2xl shadow-glass overflow-hidden border border-white/10">
        
        {/* Header with instrument details */}
        <div className="p-6 sm:p-8 border-b border-white/10 bg-slate-950/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                ON-SITE METROLOGICAL AUDIT
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 font-mono">Field Inspection</h1>
            </div>
            <div className="text-xs font-mono text-slate-400">
              Inspector: <span className="font-bold text-white">Rajesh Kumar</span> (Zone 4)
            </div>
          </div>

          {/* Instrument summary bar */}
          <div className="mt-4 p-4 rounded-xl bg-slate-950/60 border border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div><span className="text-slate-500">Instrument:</span> <span className="font-bold text-white ml-1">{instrument.type}</span></div>
            <div><span className="text-slate-500">Model:</span> <span className="font-mono text-slate-300 ml-1">{instrument.modelNumber}</span></div>
            <div><span className="text-slate-500">Serial No:</span> <span className="font-mono font-bold text-cyan-300 ml-1">{instrument.serialNumber}</span></div>
            <div><span className="text-slate-500">Capacity:</span> <span className="text-slate-300 ml-1">{instrument.capacity}</span></div>
            <div><span className="text-slate-500">Establishment:</span> <span className="font-semibold text-white ml-1">{instrument.businessName}</span></div>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          
          {/* ━━━━━━━━ REDESIGNED HIGH-END TOGGLES ━━━━━━━━ */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-4">
              1. Physical & Verification Checklist (Interactive Toggles)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Check 1 */}
              <div className="p-4 rounded-xl border border-white/10 bg-slate-950/50 flex items-center justify-between shadow-soft">
                <div>
                  <div className="text-xs font-bold text-white">Accuracy Test</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Tested against standard weights</div>
                </div>
                {/* Premium Segmented Toggle */}
                <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-white/10 shadow-inner">
                  <button
                    type="button"
                    onClick={() => setChecklist({ ...checklist, accuracyTest: true })}
                    className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-all ${
                      checklist.accuracyTest 
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.5)] border border-emerald-400/30' 
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    PASS
                  </button>
                  <button
                    type="button"
                    onClick={() => setChecklist({ ...checklist, accuracyTest: false })}
                    className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-all ${
                      !checklist.accuracyTest 
                        ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-[0_0_12px_rgba(244,63,94,0.5)] border border-rose-400/30' 
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    FAIL
                  </button>
                </div>
              </div>

              {/* Check 2 */}
              <div className="p-4 rounded-xl border border-white/10 bg-slate-950/50 flex items-center justify-between shadow-soft">
                <div>
                  <div className="text-xs font-bold text-white">Physical Condition</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Leveling & platter stability</div>
                </div>
                <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-white/10 shadow-inner">
                  <button
                    type="button"
                    onClick={() => setChecklist({ ...checklist, physicalCondition: true })}
                    className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-all ${
                      checklist.physicalCondition 
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.5)] border border-emerald-400/30' 
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    PASS
                  </button>
                  <button
                    type="button"
                    onClick={() => setChecklist({ ...checklist, physicalCondition: false })}
                    className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-all ${
                      !checklist.physicalCondition 
                        ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-[0_0_12px_rgba(244,63,94,0.5)] border border-rose-400/30' 
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    FAIL
                  </button>
                </div>
              </div>

              {/* Check 3 */}
              <div className="p-4 rounded-xl border border-white/10 bg-slate-950/50 flex items-center justify-between shadow-soft">
                <div>
                  <div className="text-xs font-bold text-white">Display / Readability</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">LED clear, zero tracking ok</div>
                </div>
                <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-white/10 shadow-inner">
                  <button
                    type="button"
                    onClick={() => setChecklist({ ...checklist, displayReadability: true })}
                    className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-all ${
                      checklist.displayReadability 
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.5)] border border-emerald-400/30' 
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    PASS
                  </button>
                  <button
                    type="button"
                    onClick={() => setChecklist({ ...checklist, displayReadability: false })}
                    className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-all ${
                      !checklist.displayReadability 
                        ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-[0_0_12px_rgba(244,63,94,0.5)] border border-rose-400/30' 
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    FAIL
                  </button>
                </div>
              </div>

              {/* Check 4 */}
              <div className="p-4 rounded-xl border border-white/10 bg-slate-950/50 flex items-center justify-between shadow-soft">
                <div>
                  <div className="text-xs font-bold text-white">Seal / Markings</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Security seal & plate intact</div>
                </div>
                <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-white/10 shadow-inner">
                  <button
                    type="button"
                    onClick={() => setChecklist({ ...checklist, sealMarkings: true })}
                    className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-all ${
                      checklist.sealMarkings 
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.5)] border border-emerald-400/30' 
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    PASS
                  </button>
                  <button
                    type="button"
                    onClick={() => setChecklist({ ...checklist, sealMarkings: false })}
                    className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-all ${
                      !checklist.sealMarkings 
                        ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-[0_0_12px_rgba(244,63,94,0.5)] border border-rose-400/30' 
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    FAIL
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* ━━━━━━━━ SECTION 2: TELEMETRY MEASUREMENT OBSERVATION ━━━━━━━━ */}
          <div className="p-6 rounded-2xl bg-slate-950/60 border border-white/10 space-y-4 shadow-glass">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                2. Telemetry Measurement Observation
              </h3>
              <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase font-mono tracking-wider ${
                measurementPass
                  ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                  : 'bg-rose-500/10 text-rose-300 border border-rose-500/30 shadow-[0_0_10px_rgba(244,63,94,0.3)]'
              }`}>
                Result: {measurementPass ? 'PASS' : 'FAIL'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
              
              <div className="glass-panel rounded-xl p-4 border border-white/10">
                <span className="text-slate-500 block font-mono">Reference Value:</span>
                <span className="text-xl font-extrabold text-white font-mono mt-1 block">
                  {referenceValue.toFixed(2)} kg
                </span>
                <span className="text-[10px] text-slate-400 mt-1 block font-mono">Standard Weight</span>
              </div>

              <div className="glass-panel rounded-xl p-4 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                <span className="text-slate-500 block font-mono">Observed Value:</span>
                <input
                  type="number"
                  step="0.01"
                  value={observedValue}
                  onChange={(e) => setObservedValue(parseFloat(e.target.value) || 0)}
                  className="w-full text-xl font-extrabold text-cyan-300 font-mono mt-1 focus:outline-none border-b border-cyan-400 bg-transparent"
                />
                <span className="text-[10px] text-cyan-400/80 mt-1 block font-mono">Editable test input</span>
              </div>

              <div className="glass-panel rounded-xl p-4 border border-white/10">
                <span className="text-slate-500 block font-mono">Tolerance:</span>
                <span className="text-xl font-extrabold text-white font-mono mt-1 block">
                  ±{tolerance.toFixed(2)} kg
                </span>
                <span className="text-[10px] text-slate-400 mt-1 block font-mono">Permissible Error</span>
              </div>

              <div className="glass-panel rounded-xl p-4 border border-white/10">
                <span className="text-slate-500 block font-mono">Deviation:</span>
                <span className={`text-xl font-extrabold font-mono mt-1 block ${
                  measurementPass ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'text-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.4)]'
                }`}>
                  {errorDelta.toFixed(3)} kg
                </span>
                <span className="text-[10px] text-slate-400 mt-1 block font-mono">
                  {measurementPass ? 'Within tolerance' : 'Exceeds limit!'}
                </span>
              </div>

            </div>
          </div>

          {/* Section 3: Remarks & Optional Photo */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Officer Remarks *
              </label>
              <textarea
                rows={2}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="glass-input w-full px-3.5 py-2.5 text-xs rounded-xl"
              />
            </div>

            <div 
              onClick={() => setPhotoUploaded(!photoUploaded)}
              className={`p-4 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
                photoUploaded 
                  ? 'border-emerald-500/40 bg-emerald-950/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]' 
                  : 'border-white/10 bg-slate-950/40 hover:border-cyan-500/30'
              }`}
            >
              <div className="flex items-center space-x-3.5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  photoUploaded 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                    : 'bg-slate-800 text-slate-500 border border-white/10'
                }`}>
                  <Camera className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-white">Inspection Photo Upload (Optional)</div>
                  <div className="text-[11px] text-slate-400 mt-0.5 font-mono">
                    {photoUploaded ? 'IMG_20260908_scale_verified.jpg (Geo-tagged & timestamped) ✓' : 'Click to simulate camera capture of scale & security seal'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Complete Inspection Button */}
          <div className="pt-4 border-t border-white/10">
            <button
              onClick={handleCompleteInspection}
              className={`w-full py-4 rounded-xl font-semibold text-sm shadow-md transition-all flex items-center justify-center space-x-2 active:scale-[0.98] ${
                overallPass
                  ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white shadow-[0_0_25px_rgba(59,130,246,0.4)] border border-white/20'
                  : 'bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white shadow-[0_0_25px_rgba(244,63,94,0.4)] border border-white/20'
              }`}
            >
              {overallPass ? (
                <>
                  <ShieldCheck className="w-4 h-4 text-cyan-300" />
                  <span>Complete Inspection & Issue Digital Certificate →</span>
                </>
              ) : (
                <>
                  <X className="w-4 h-4" />
                  <span>Record Inspection Outcome (Verification FAILED)</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};
