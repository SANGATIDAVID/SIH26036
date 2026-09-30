import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserRole, 
  Instrument, 
  VerificationApplication, 
  FieldInspectionRecord, 
  DigitalCertificate,
  InspectionChecklist,
  MeasurementData
} from '../types';
import { 
  INITIAL_INSTRUMENTS, 
  INITIAL_APPLICATIONS, 
  INITIAL_INSPECTIONS, 
  INITIAL_CERTIFICATES 
} from '../mock/seedData';
import confetti from 'canvas-confetti';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

interface VerificationContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  instruments: Instrument[];
  applications: VerificationApplication[];
  inspections: FieldInspectionRecord[];
  certificates: DigitalCertificate[];
  selectedAppId: string;
  setSelectedAppId: (id: string) => void;
  selectedCertId: string;
  setSelectedCertId: (id: string) => void;
  toasts: Toast[];
  addToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  
  // Workflow methods
  registerInstrument: (data: Omit<Instrument, 'id' | 'status' | 'registeredDate'>, autoApply?: boolean) => string;
  acceptApplication: (appId: string) => void;
  rejectApplication: (appId: string, reason: string) => void;
  scheduleInspection: (appId: string, date: string, time: string, location: string, officer: string) => void;
  submitInspection: (
    appId: string, 
    checklist: InspectionChecklist, 
    measurements: MeasurementData, 
    remarks: string, 
    isPass: boolean,
    photoUploaded: boolean
  ) => DigitalCertificate | null;
  scheduleReinspection: (appId: string) => void;
  startReverification: (certId: string) => void;
  
  // Demo helper controls
  resetDemoData: () => void;
  demoStep: number;
  setDemoStep: (step: number) => void;
  jumpToDemoStep: (step: number) => void;
}

const VerificationContext = createContext<VerificationContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'sih26036_state_v1';

export const VerificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('business');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [demoStep, setDemoStep] = useState<number>(1);
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  const [instruments, setInstruments] = useState<Instrument[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_instruments');
    return saved ? JSON.parse(saved) : INITIAL_INSTRUMENTS;
  });

  const [applications, setApplications] = useState<VerificationApplication[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_applications');
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  const [inspections, setInspections] = useState<FieldInspectionRecord[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_inspections');
    return saved ? JSON.parse(saved) : INITIAL_INSPECTIONS;
  });

  const [certificates, setCertificates] = useState<DigitalCertificate[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_certificates');
    return saved ? JSON.parse(saved) : INITIAL_CERTIFICATES;
  });

  const [selectedAppId, setSelectedAppId] = useState<string>('LM-2026-00125');
  const [selectedCertId, setSelectedCertId] = useState<string>('VC-2026-00421');

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY + '_instruments', JSON.stringify(instruments));
    localStorage.setItem(LOCAL_STORAGE_KEY + '_applications', JSON.stringify(applications));
    localStorage.setItem(LOCAL_STORAGE_KEY + '_inspections', JSON.stringify(inspections));
    localStorage.setItem(LOCAL_STORAGE_KEY + '_certificates', JSON.stringify(certificates));
  }, [instruments, applications, inspections, certificates]);

  const addToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => removeToast(id), 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const registerInstrument = (
    data: Omit<Instrument, 'id' | 'status' | 'registeredDate'>, 
    autoApply: boolean = true
  ): string => {
    const newId = 'INST-' + String(instruments.length + 1).padStart(3, '0');
    const newAppId = 'LM-2026-00' + String(120 + applications.length + 1);

    const newInstrument: Instrument = {
      ...data,
      id: newId,
      status: 'verification_pending',
      registeredDate: '08 Sep 2026'
    };

    setInstruments((prev) => [newInstrument, ...prev]);

    if (autoApply) {
      const newApp: VerificationApplication = {
        id: newAppId,
        instrumentId: newId,
        businessName: data.businessName,
        applicantName: data.ownerName,
        applicantPhone: '+91 98765 43210',
        applicantEmail: 'contact@abctraders.in',
        submittedDate: '08 Sep 2026',
        status: 'document_validation',
        documents: [
          {
            id: 'DOC-' + Math.random().toString(36).substring(2, 6),
            name: 'Previous Verification Certificate (' + (data.previousCertNo || 'VC-2025-08129') + ')',
            type: 'previous_cert',
            filename: 'previous_cert_verified.pdf',
            uploadDate: '08 Sep 2026',
            size: '1.2 MB',
            status: 'verified'
          },
          {
            id: 'DOC-' + Math.random().toString(36).substring(2, 6),
            name: 'Invoice & Ownership Undertaking',
            type: 'ownership_proof',
            filename: 'purchase_invoice_2026.pdf',
            uploadDate: '08 Sep 2026',
            size: '890 KB',
            status: 'verified'
          }
        ],
        validationChecklist: {
          detailsComplete: true,
          instrumentVerified: true,
          previousCertValid: true,
          ownershipValid: true
        }
      };

      setApplications((prev) => [newApp, ...prev]);
      setSelectedAppId(newAppId);
      addToast('Instrument registered and verification application ' + newAppId + ' generated!', 'success');
      return newAppId;
    }

    addToast('Instrument ' + newInstrument.modelNumber + ' registered successfully!', 'success');
    return newId;
  };

  const acceptApplication = (appId: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === appId
          ? { ...app, status: 'inspection_scheduled' }
          : app
      )
    );
    addToast('Application ' + appId + ' documents validated. Ready for scheduling.', 'success');
  };

  const rejectApplication = (appId: string, reason: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === appId
          ? { ...app, status: 'rejected', rejectionReason: reason }
          : app
      )
    );
    addToast('Application ' + appId + ' rejected: ' + reason, 'warning');
  };

  const scheduleInspection = (
    appId: string, 
    date: string, 
    time: string, 
    location: string, 
    officer: string
  ) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === appId
          ? {
              ...app,
              status: 'field_inspection',
              scheduledDate: date,
              scheduledTime: time,
              scheduledLocation: location,
              assignedOfficer: officer
            }
          : app
      )
    );

    // Update instrument status
    const targetApp = applications.find(a => a.id === appId);
    if (targetApp) {
      setInstruments(prev => prev.map(inst => 
        inst.id === targetApp.instrumentId ? { ...inst, status: 'inspection_scheduled' } : inst
      ));
    }

    addToast('Inspection scheduled with Officer ' + officer + ' on ' + date + ' at ' + time, 'success');
  };

  const submitInspection = (
    appId: string,
    checklist: InspectionChecklist,
    measurements: MeasurementData,
    remarks: string,
    isPass: boolean,
    photoUploaded: boolean
  ): DigitalCertificate | null => {
    const targetApp = applications.find(a => a.id === appId);
    const instrumentId = targetApp ? targetApp.instrumentId : 'INST-001';
    const instrument = instruments.find(i => i.id === instrumentId) || INITIAL_INSTRUMENTS[0];

    const inspRecord: FieldInspectionRecord = {
      id: 'INSP-2026-' + Math.floor(100 + Math.random() * 900),
      applicationId: appId,
      instrumentId: instrumentId,
      officerName: targetApp?.assignedOfficer || 'Rajesh Kumar',
      inspectionDate: '08 Sep 2026',
      checklist,
      measurements,
      officerRemarks: remarks,
      photoUploaded,
      photoUrl: 'scale_inspection_photo.jpg',
      status: isPass ? 'PASS' : 'FAIL',
      failureReason: isPass ? undefined : 'Instrument accuracy exceeds permitted tolerance limit of ±0.05 kg.'
    };

    setInspections(prev => [inspRecord, ...prev]);

    if (!isPass) {
      setApplications(prev => prev.map(app => 
        app.id === appId ? { ...app, rejectionReason: inspRecord.failureReason } : app
      ));
      addToast('Inspection marked FAIL: ' + (inspRecord.failureReason || 'Tolerance exceeded'), 'error');
      return null;
    }

    // Generate certificate on PASS
    const newCertId = 'VC-2026-00' + Math.floor(420 + Math.random() * 80);
    const newCertificate: DigitalCertificate = {
      id: newCertId,
      applicationId: appId,
      instrumentId: instrument.id,
      instrumentName: instrument.type,
      manufacturer: instrument.manufacturer,
      modelNumber: instrument.modelNumber,
      serialNumber: instrument.serialNumber,
      capacity: instrument.capacity,
      businessName: instrument.businessName,
      installationLocation: instrument.installationLocation,
      verifiedOn: '08 September 2026',
      validUntil: '08 September 2027',
      status: 'VALID',
      officerName: targetApp?.assignedOfficer || 'Rajesh Kumar',
      officerDesignation: 'Legal Metrology Officer (Inspector Zone 4)',
      issuingAuthority: 'Department of Legal Metrology, Government of India',
      qrPayload: 'https://legalmetrology.gov.in/verify?cert=' + newCertId + '&sn=' + instrument.serialNumber,
      digitalSignatureHash: '0x' + Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join(''),
      daysRemaining: 365
    };

    setCertificates(prev => [newCertificate, ...prev]);
    setSelectedCertId(newCertId);

    // Update application & instrument status
    setApplications(prev => prev.map(app => 
      app.id === appId ? { ...app, status: 'verified', certificateId: newCertId, completedDate: '08 Sep 2026' } : app
    ));

    setInstruments(prev => prev.map(inst => 
      inst.id === instrument.id ? { ...inst, status: 'verified' } : inst
    ));

    // Delightful micro-confetti burst
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }

    addToast('Digital Verification Certificate ' + newCertId + ' issued successfully!', 'success');
    return newCertificate;
  };

  const scheduleReinspection = (appId: string) => {
    setApplications(prev => prev.map(app => 
      app.id === appId ? { 
        ...app, 
        status: 'field_inspection', 
        scheduledDate: '12 Sep 2026', 
        scheduledTime: '10:00 AM',
        rejectionReason: undefined 
      } : app
    ));
    addToast('Re-inspection scheduled for ' + appId + ' after recalibration.', 'info');
  };

  const startReverification = (certId: string) => {
    const cert = certificates.find(c => c.id === certId);
    if (!cert) return;
    
    const newAppId = 'LM-2026-00' + Math.floor(200 + Math.random() * 800);
    const newApp: VerificationApplication = {
      id: newAppId,
      instrumentId: cert.instrumentId,
      businessName: cert.businessName,
      applicantName: 'Ravi Verma',
      applicantPhone: '+91 98765 43210',
      applicantEmail: 'contact@abctraders.in',
      submittedDate: '08 Sep 2026',
      status: 'document_validation',
      documents: [
        {
          id: 'DOC-RE-' + Math.random().toString(36).substring(2, 6),
          name: 'Expiring Certificate (' + cert.id + ')',
          type: 'previous_cert',
          filename: 'cert_' + cert.id + '.pdf',
          uploadDate: '08 Sep 2026',
          size: '1.1 MB',
          status: 'verified'
        }
      ],
      validationChecklist: {
        detailsComplete: true,
        instrumentVerified: true,
        previousCertValid: true,
        ownershipValid: true
      }
    };

    setApplications(prev => [newApp, ...prev]);
    setSelectedAppId(newAppId);
    setRole('business');
    setActiveTab('application_timeline');
    addToast('Re-verification request ' + newAppId + ' created for certificate ' + certId, 'success');
  };

  const resetDemoData = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY + '_instruments');
    localStorage.removeItem(LOCAL_STORAGE_KEY + '_applications');
    localStorage.removeItem(LOCAL_STORAGE_KEY + '_inspections');
    localStorage.removeItem(LOCAL_STORAGE_KEY + '_certificates');

    setInstruments(INITIAL_INSTRUMENTS);
    setApplications(INITIAL_APPLICATIONS);
    setInspections(INITIAL_INSPECTIONS);
    setCertificates(INITIAL_CERTIFICATES);
    setSelectedAppId('LM-2026-00125');
    setSelectedCertId('VC-2026-00421');
    setRole('business');
    setActiveTab('landing');
    setDemoStep(1);
    addToast('Demo data reset to clean initial state.', 'info');
  };

  const jumpToDemoStep = (step: number) => {
    setDemoStep(step);
    switch (step) {
      case 1: // Landing Page
        setActiveTab('landing');
        break;
      case 2: // Business Dashboard
        setRole('business');
        setActiveTab('dashboard');
        break;
      case 3: // Register Instrument
        setRole('business');
        setActiveTab('register');
        break;
      case 4: // Application Timeline
        setRole('business');
        setSelectedAppId('LM-2026-00125');
        setActiveTab('application_timeline');
        break;
      case 5: // Officer Dashboard
        setRole('officer');
        setActiveTab('dashboard');
        break;
      case 6: // Document Validation
        setRole('officer');
        setSelectedAppId('LM-2026-00125');
        setActiveTab('document_validation');
        break;
      case 7: // Inspection Scheduling
        setRole('officer');
        setSelectedAppId('LM-2026-00125');
        setActiveTab('schedule_inspection');
        break;
      case 8: // Field Inspection
        setRole('officer');
        setSelectedAppId('LM-2026-00125');
        setActiveTab('field_inspection');
        break;
      case 9: // Digital Certificate View
        setSelectedCertId('VC-2026-00421');
        setActiveTab('certificate_view');
        break;
      case 10: // Public QR Verification
        setRole('public');
        setSelectedCertId('VC-2026-00421');
        setActiveTab('verify');
        break;
      case 11: // Expiry Monitoring
        setRole('business');
        setActiveTab('certificates');
        break;
      default:
        setActiveTab('landing');
        break;
    }
  };

  return (
    <VerificationContext.Provider
      value={{
        role,
        setRole,
        activeTab,
        setActiveTab,
        instruments,
        applications,
        inspections,
        certificates,
        selectedAppId,
        setSelectedAppId,
        selectedCertId,
        setSelectedCertId,
        toasts,
        addToast,
        removeToast,
        registerInstrument,
        acceptApplication,
        rejectApplication,
        scheduleInspection,
        submitInspection,
        scheduleReinspection,
        startReverification,
        resetDemoData,
        demoStep,
        setDemoStep,
        jumpToDemoStep
      }}
    >
      {children}
    </VerificationContext.Provider>
  );
};

export const useVerification = () => {
  const context = useContext(VerificationContext);
  if (!context) {
    throw new Error('useVerification must be used within a VerificationProvider');
  }
  return context;
};
