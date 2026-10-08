"use client";

import { useState } from "react";
import { ConfiguratorState } from "./ConfiguratorSection";
import { playClickSound } from "@/utils/audio";

interface BriefModalProps {
  brief: ConfiguratorState | null;
  onClose: () => void;
}

export default function BriefModal({ brief, onClose }: BriefModalProps) {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!brief) return null;

  const summaryText = `[CONTACTLESS BESPOKE SPECIFICATION]
Material: ${brief.materialName} (${brief.weight})
Chipset: ${brief.chip}
Cardholder Engraving: ${brief.cardholder}
Serial Engraving: ${brief.serial}
Operating Frequency: 13.56 MHz (ISO/IEC 14443-A)
Timestamp: ${new Date().toISOString()}`;

  const handleCopy = () => {
    playClickSound();
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleConfirm = () => {
    playClickSound();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div
      className={`modal-backdrop ${brief ? "open" : ""}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-dialog modal-dialog-sm" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => {
            playClickSound();
            onClose();
          }}
          className="modal-close-btn"
          aria-label="Close dialog"
        >
          &times;
        </button>

        <div className="brief-modal-content">
          <div className="brief-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h3 className="brief-title">Project Specification Compiled</h3>
          <p className="text-muted" style={{ fontSize: "0.85rem" }}>
            Your bespoke contactless hardware specification is ready for engineering review.
          </p>

          <div className="brief-summary-box">
            <div className="brief-summary-line">
              <span className="text-muted">Material:</span>
              <span className="text-white">{brief.materialName}</span>
            </div>
            <div className="brief-summary-line">
              <span className="text-muted">Hardware Weight:</span>
              <span className="text-white">{brief.weight}</span>
            </div>
            <div className="brief-summary-line">
              <span className="text-muted">Integrated Silicon:</span>
              <span className="text-white">{brief.chip}</span>
            </div>
            <div className="brief-summary-line">
              <span className="text-muted">Entity Name:</span>
              <span className="text-white">{brief.cardholder}</span>
            </div>
            <div className="brief-summary-line">
              <span className="text-muted">Serial Code:</span>
              <span className="text-white">{brief.serial}</span>
            </div>
            <div className="brief-summary-line">
              <span className="text-muted">Frequency:</span>
              <span className="text-white">13.56 MHz High-Frequency</span>
            </div>
          </div>

          {submitted ? (
            <div className="text-green" style={{ fontSize: "0.875rem", padding: "1rem" }}>
              ✓ Specification transmitted to engineering. An associate will reach out shortly.
            </div>
          ) : (
            <div className="w-full" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <button onClick={handleCopy} className="btn-secondary w-full justify-center">
                <span>{copied ? "✓ Copied to Clipboard" : "Copy Specification"}</span>
              </button>
              <button onClick={handleConfirm} className="btn-primary w-full justify-center">
                <span>Transmit to Engineering &rarr;</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
