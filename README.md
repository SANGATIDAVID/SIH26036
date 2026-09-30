# SIH26036 – Online Verification System for Weighing & Measuring Instruments

## 📌 Overview

SIH26036 is a digital platform designed to streamline and digitize the verification lifecycle of weighing and measuring instruments.

The platform connects instrument users/businesses, Legal Metrology Officers, administrators, and the public through a centralized verification workflow.

Instead of managing verification through disconnected manual processes, the system provides a structured digital lifecycle covering:

**Registration → Application → Validation → Inspection → Certification → QR Verification → Expiry Monitoring → Re-verification**

> ⚠️ This repository contains a hackathon prototype demonstrating the proposed workflow and user experience. It is not intended to represent a production-ready government system.

---

## 🎯 Problem Statement

The verification of weighing and measuring instruments involves multiple stages such as registration, application submission, document verification, inspection scheduling, physical inspection, certificate generation, and periodic re-verification.

Managing these stages through manual or disconnected processes can make it difficult to:

- Track verification applications
- Manage inspection schedules
- Maintain digital inspection records
- Track certificate validity
- Verify certificates publicly
- Manage re-verification
- Maintain a centralized history of instruments

SIH26036 proposes a centralized digital platform to address these challenges.

---

## 💡 Proposed Solution

Our solution provides an end-to-end digital workflow for instrument verification.

A business or instrument user can register an instrument and submit a verification application. The application is validated by the appropriate authority, an inspection is scheduled, and the assigned officer records the inspection results digitally.

If the instrument passes verification, the system generates a digital certificate with a unique QR code. The QR code allows anyone to verify the certificate through a public verification page.

The system also tracks certificate validity and supports expiry notifications and re-verification.

---

## 🔄 System Workflow

```text
                    ┌────────────────────┐
                    │  User / Business   │
                    └──────────┬─────────┘
                               │
                               ▼
                    Register Instrument
                               │
                               ▼
                  Submit Verification
                      Application
                               │
                               ▼
                    Document Validation
                               │
                 ┌─────────────┴─────────────┐
                 │                           │
              Accepted                    Rejected
                 │
                 ▼
             Schedule
             Inspection
                 │
                 ▼
          Assign LMO / Officer
                 │
                 ▼
           Field Inspection
                 │
                 ▼
        Record Measurements
          & Observations
                 │
            ┌────┴────┐
            │         │
           PASS      FAIL
            │         │
            ▼         ▼
       Generate    Correction /
       Digital     Re-inspection
      Certificate
            │
            ▼
          QR Code
            │
            ▼
     Public Verification
            │
            ▼
     Expiry Monitoring
            │
            ▼
       Re-verification
