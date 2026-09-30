export type UserRole = 'business' | 'officer' | 'public';

export type InstrumentStatus = 
  | 'verification_pending' 
  | 'inspection_scheduled' 
  | 'verified' 
  | 'expiring_soon' 
  | 'expired' 
  | 'rejected';

export interface Instrument {
  id: string;
  type: string;
  manufacturer: string;
  modelNumber: string;
  serialNumber: string;
  capacity: string;
  ownerName: string;
  businessName: string;
  installationLocation: string;
  previousCertNo: string;
  previousVerificationDate: string;
  status: InstrumentStatus;
  registeredDate: string;
}

export type ApplicationStatus = 
  | 'submitted'
  | 'document_validation'
  | 'inspection_scheduled'
  | 'field_inspection'
  | 'verified'
  | 'rejected';

export interface VerificationDocument {
  id: string;
  name: string;
  type: 'previous_cert' | 'ownership_proof' | 'calibration_sheet' | 'inspection_photo';
  filename: string;
  uploadDate: string;
  size: string;
  status: 'verified' | 'pending' | 'flagged';
}

export interface VerificationApplication {
  id: string; // e.g. LM-2026-00125
  instrumentId: string;
  businessName: string;
  applicantName: string;
  applicantPhone: string;
  applicantEmail: string;
  submittedDate: string;
  status: ApplicationStatus;
  documents: VerificationDocument[];
  validationChecklist: {
    detailsComplete: boolean;
    instrumentVerified: boolean;
    previousCertValid: boolean;
    ownershipValid: boolean;
  };
  scheduledDate?: string;
  scheduledTime?: string;
  scheduledLocation?: string;
  assignedOfficer?: string;
  rejectionReason?: string;
  completedDate?: string;
  certificateId?: string;
}

export interface InspectionChecklist {
  accuracyTest: boolean; // PASS: true, FAIL: false
  physicalCondition: boolean;
  displayReadability: boolean;
  sealMarkings: boolean;
}

export interface MeasurementData {
  referenceValue: number; // e.g. 10.00 kg
  observedValue: number;  // e.g. 10.01 kg
  unit: string;           // 'kg'
  tolerance: number;      // 0.05 kg
  computedPass: boolean;
}

export interface FieldInspectionRecord {
  id: string;
  applicationId: string;
  instrumentId: string;
  officerName: string;
  inspectionDate: string;
  checklist: InspectionChecklist;
  measurements: MeasurementData;
  officerRemarks: string;
  photoUploaded: boolean;
  photoUrl?: string;
  status: 'PASS' | 'FAIL';
  failureReason?: string;
}

export interface DigitalCertificate {
  id: string; // VC-2026-00421
  applicationId: string;
  instrumentId: string;
  instrumentName: string;
  manufacturer: string;
  modelNumber: string;
  serialNumber: string;
  capacity: string;
  businessName: string;
  installationLocation: string;
  verifiedOn: string;
  validUntil: string;
  status: 'VALID' | 'EXPIRING_SOON' | 'EXPIRED';
  officerName: string;
  officerDesignation: string;
  issuingAuthority: string;
  qrPayload: string;
  digitalSignatureHash: string;
  daysRemaining: number;
}
