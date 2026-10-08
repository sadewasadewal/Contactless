"use client";

import { useState } from "react";
import Image from "next/image";
import { CardItem } from "@/data/cards";
import { playClickSound, playNfcTapSound } from "@/utils/audio";

interface CardModalProps {
  card: CardItem | null;
  onClose: () => void;
  onLoadIntoTerminal: (card: CardItem) => void;
}

export default function CardModal({
  card,
  onClose,
  onLoadIntoTerminal,
}: CardModalProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  if (!card) return null;

  const toggleFlip = () => {
    playClickSound();
    setIsFlipped(!isFlipped);
  };

  const handleTerminalClick = () => {
    playNfcTapSound();
    onLoadIntoTerminal(card);
    onClose();
    const terminalEl = document.getElementById("terminal");
    if (terminalEl) {
      terminalEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCustomize = () => {
    playClickSound();
    onClose();
    const configEl = document.getElementById("configurator");
    if (configEl) {
      configEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={`modal-backdrop ${card ? "open" : ""}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={() => {
            playClickSound();
            onClose();
          }}
          className="modal-close-btn"
          aria-label="Close modal"
        >
          &times;
        </button>

        <div className="modal-content-grid">
          {/* Left: 3D Interactive Flipper */}
          <div className="modal-card-display">
            <div className={`modal-card-flipper ${isFlipped ? "flipped" : ""}`}>
              {/* Front Face */}
              <div className="modal-face modal-face-front">
                <Image
                  src={`/${card.file}`}
                  alt={card.title}
                  width={800}
                  height={505}
                  priority
                />
                <div className="modal-face-glare" />
              </div>

              {/* Back Face */}
              <div className="modal-face modal-face-back">
                <div className="card-magstripe" />
                <div className="card-back-details">
                  <div className="card-signature-box">
                    <div className="sig-lines" />
                    <div className="sig-cvv">042</div>
                  </div>

                  <div className="card-back-antenna-wireframe">
                    <div className="antenna-tag">13.56 MHz NFC LOOP EMBEDDED</div>
                  </div>

                  <div className="card-back-copy">
                    CONTACTLESS ID &bull; {card.chip.toUpperCase()} &bull; ZERO FRICTION
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-flip-instructions">
              <button onClick={toggleFlip} className="btn-sm-secondary">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>{isFlipped ? "Show Front Face" : "Show Reverse Face"}</span>
              </button>
            </div>
          </div>

          {/* Right: Technical Details Panel */}
          <div className="modal-info-panel">
            <div className="modal-tag">{card.category.toUpperCase()}</div>
            <h3 className="modal-title">{card.title}</h3>
            <p className="modal-desc">
              Precision manufactured with high-durability finish and an integrated cryptographic RF loop antenna. Resonant at 13.56 MHz with zero physical battery required.
            </p>

            <div className="modal-specs-list">
              <div className="modal-spec-row">
                <span className="modal-spec-lbl">Material Composition:</span>
                <span className="modal-spec-val">{card.material}</span>
              </div>
              <div className="modal-spec-row">
                <span className="modal-spec-lbl">Integrated Silicon:</span>
                <span className="modal-spec-val">{card.chip}</span>
              </div>
              <div className="modal-spec-row">
                <span className="modal-spec-lbl">Carrier Frequency:</span>
                <span className="modal-spec-val">13.56 MHz (HF ISM)</span>
              </div>
              <div className="modal-spec-row">
                <span className="modal-spec-lbl">Security Standard:</span>
                <span className="modal-spec-val">{card.nfcPayload.security}</span>
              </div>
              <div className="modal-spec-row">
                <span className="modal-spec-lbl">Coupling Range:</span>
                <span className="modal-spec-val">0 to 45 mm (Omni-Directional)</span>
              </div>
            </div>

            <div className="modal-actions-row">
              <button onClick={handleTerminalClick} className="btn-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 8a12 12 0 0 1 0 8" />
                  <path d="M8 6a8 8 0 0 1 0 12" />
                  <circle cx="16" cy="12" r="2" fill="currentColor" />
                </svg>
                <span>Load Into Tap Terminal</span>
              </button>
              <button onClick={handleCustomize} className="btn-secondary">
                <span>Customize This Edition</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
