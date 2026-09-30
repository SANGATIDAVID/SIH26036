import { Instrument, VerificationApplication, DigitalCertificate, FieldInspectionRecord } from '../types';

export const INITIAL_INSTRUMENTS: Instrument[] = [
  {
    id: 'INST-001',
    type: 'Digital Weighing Scale',
    manufacturer: 'ABC Industries',
    modelNumber: 'ABC-500',
    serialNumber: 'WS123456',
    capacity: '50 kg (Class III, e=10g)',
    ownerName: 'Ravi Verma',
    businessName: 'ABC Traders',
    installationLocation: 'Shop 42, Mandi Gate, Central Market, New Delhi',
    previousCertNo: 'VC-2025-08129',
    previousVerificationDate: '08 Sep 2025',
    status: 'verification_pending',
    registeredDate: '08 Sep 2026'
  },
  {
    id: 'INST-002',
    type: 'Platform Weighing Bridge',
    manufacturer: 'Metro Weighing Systems',
    modelNumber: 'PB-2000X',
    serialNumber: 'PB992104',
    capacity: '1000 kg (Class II)',
    ownerName: 'Ravi Verma',
    businessName: 'ABC Traders Logistics Yard',
    installationLocation: 'Warehouse 12, Industrial Area, Sector 58',
    previousCertNo: 'VC-2025-04412',
    previousVerificationDate: '15 Mar 2025',
    status: 'expiring_soon',
    registeredDate: '15 Mar 2025'
  }
];

export const INITIAL_APPLICATIONS: VerificationApplication[] = [
  {
    id: 'LM-2026-00125',
    instrumentId: 'INST-001',
    businessName: 'ABC Traders',
    applicantName: 'Ravi Verma',
    applicantPhone: '+91 98765 43210',
    applicantEmail: 'ravi@abctraders.in',
    submittedDate: '08 Sep 2026',
    status: 'document_validation',
    documents: [
      {
        id: 'DOC-01',
        name: 'Previous Verification Certificate (VC-2025-08129)',
        type: 'previous_cert',
        filename: 'prev_cert_vc2025.pdf',
        uploadDate: '08 Sep 2026',
        size: '1.2 MB',
        status: 'verified'
      },
      {
        id: 'DOC-02',
        name: 'Purchase Bill & Ownership Proof',
        type: 'ownership_proof',
        filename: 'invoice_abc_industries.pdf',
        uploadDate: '08 Sep 2026',
        size: '850 KB',
        status: 'verified'
      }
    ],
    validationChecklist: {
      detailsComplete: true,
      instrumentVerified: true,
      previousCertValid: true,
      ownershipValid: true
    },
    scheduledDate: '10 Sep 2026',
    scheduledTime: '11:30 AM',
    scheduledLocation: 'Shop 42, Mandi Gate, Central Market, New Delhi',
    assignedOfficer: 'Rajesh Kumar'
  },
  {
    id: 'LM-2026-00098',
    instrumentId: 'INST-002',
    businessName: 'ABC Traders Logistics Yard',
    applicantName: 'Ravi Verma',
    applicantPhone: '+91 98765 43210',
    applicantEmail: 'ravi@abctraders.in',
    submittedDate: '01 Sep 2026',
    status: 'verified',
    documents: [
      {
        id: 'DOC-03',
        name: 'Previous Verification Certificate',
        type: 'previous_cert',
        filename: 'cert_pb2000x.pdf',
        uploadDate: '01 Sep 2026',
        size: '1.4 MB',
        status: 'verified'
      }
    ],
    validationChecklist: {
      detailsComplete: true,
      instrumentVerified: true,
      previousCertValid: true,
      ownershipValid: true
    },
    scheduledDate: '04 Sep 2026',
    scheduledTime: '02:00 PM',
    scheduledLocation: 'Warehouse 12, Industrial Area, Sector 58',
    assignedOfficer: 'Priya Sharma',
    completedDate: '05 Sep 2026',
    certificateId: 'VC-2026-00389'
  }
];

export const INITIAL_INSPECTIONS: FieldInspectionRecord[] = [
  {
    id: 'INSP-2026-091',
    applicationId: 'LM-2026-00125',
    instrumentId: 'INST-001',
    officerName: 'Rajesh Kumar',
    inspectionDate: '08 Sep 2026',
    checklist: {
      accuracyTest: true,
      physicalCondition: true,
      displayReadability: true,
      sealMarkings: true
    },
    measurements: {
      referenceValue: 10.00,
      observedValue: 10.01,
      unit: 'kg',
      tolerance: 0.05,
      computedPass: true
    },
    officerRemarks: 'Instrument functioning within permitted tolerance. Holographic tamper-evident seal verified intact.',
    photoUploaded: true,
    photoUrl: 'scale_inspection_photo.jpg',
    status: 'PASS'
  }
];

export const INITIAL_CERTIFICATES: DigitalCertificate[] = [
  {
    id: 'VC-2026-00421',
    applicationId: 'LM-2026-00125',
    instrumentId: 'INST-001',
    instrumentName: 'Digital Weighing Scale',
    manufacturer: 'ABC Industries',
    modelNumber: 'ABC-500',
    serialNumber: 'WS123456',
    capacity: '50 kg (Class III, e=10g)',
    businessName: 'ABC Traders',
    installationLocation: 'Shop 42, Mandi Gate, Central Market, New Delhi',
    verifiedOn: '08 September 2026',
    validUntil: '08 September 2027',
    status: 'VALID',
    officerName: 'Rajesh Kumar',
    officerDesignation: 'Legal Metrology Officer (Inspector Zone 4)',
    issuingAuthority: 'Department of Legal Metrology, Government of India',
    qrPayload: 'https://legalmetrology.gov.in/verify?cert=VC-2026-00421&sn=WS123456',
    digitalSignatureHash: '0x9a8f4c2e1b7d5a3f8c0e2a4b6c8e0f1a3b5d7e9c',
    daysRemaining: 365
  },
  {
    id: 'VC-2025-08129',
    applicationId: 'LM-2025-00812',
    instrumentId: 'INST-001',
    instrumentName: 'Digital Weighing Scale',
    manufacturer: 'ABC Industries',
    modelNumber: 'ABC-500',
    serialNumber: 'WS123456',
    capacity: '50 kg (Class III, e=10g)',
    businessName: 'ABC Traders',
    installationLocation: 'Shop 42, Mandi Gate, Central Market, New Delhi',
    verifiedOn: '08 September 2025',
    validUntil: '05 October 2026',
    status: 'EXPIRING_SOON',
    officerName: 'Rajesh Kumar',
    officerDesignation: 'Legal Metrology Officer (Inspector Zone 4)',
    issuingAuthority: 'Department of Legal Metrology, Government of India',
    qrPayload: 'https://legalmetrology.gov.in/verify?cert=VC-2025-08129&sn=WS123456',
    digitalSignatureHash: '0x4f2e1b7d5a3f8c0e2a4b6c8e0f1a3b5d7e9c9a8f',
    daysRemaining: 27
  },
  {
    id: 'VC-2024-00192',
    applicationId: 'LM-2024-00119',
    instrumentId: 'INST-003',
    instrumentName: 'Fuel Dispensing Unit (Nozzle 1)',
    manufacturer: 'Tokheim India',
    modelNumber: 'TK-400',
    serialNumber: 'FDU77123',
    capacity: '50 Litres/min',
    businessName: 'Northern Highway Auto Fuels',
    installationLocation: 'NH-44 Mile 108, Sonipat',
    verifiedOn: '12 January 2024',
    validUntil: '11 January 2025',
    status: 'EXPIRED',
    officerName: 'Arun Kumar',
    officerDesignation: 'Senior Metrology Officer',
    issuingAuthority: 'Department of Legal Metrology, Government of India',
    qrPayload: 'https://legalmetrology.gov.in/verify?cert=VC-2024-00192&sn=FDU77123',
    digitalSignatureHash: '0x1b7d5a3f8c0e2a4b6c8e0f1a3b5d7e9c9a8f4c2e',
    daysRemaining: 0
  }
];

export const AVAILABLE_OFFICERS = [
  { id: 'OFF-01', name: 'Rajesh Kumar', zone: 'Zone 4 (Central Market)', pending: 3 },
  { id: 'OFF-02', name: 'Priya Sharma', zone: 'Zone 2 (Industrial Area)', pending: 2 },
  { id: 'OFF-03', name: 'Arun Kumar', zone: 'Zone 7 (North Highway)', pending: 4 }
];
