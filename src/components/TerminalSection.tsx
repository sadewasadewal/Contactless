"use client";

import { useState } from "react";
import Image from "next/image";
import { CARDS_DATA, CardItem } from "@/data/cards";
import { playNfcTapSound, playClickSound } from "@/utils/audio";

interface TerminalSectionProps {
  currentCard: CardItem;
  onSelectCard: (card: CardItem) => void;
}

export default function TerminalSection({
  currentCard,
  onSelectCard,
}: TerminalSectionProps) {
  const [isActive, setIsActive] = useState(false);
  const [latency, setLatency] = useState<number>(8);
  const [actionTriggered, setActionTriggered] = useState(false);

  const simulateTap = (card?: CardItem) => {
    const targetCard = card || currentCard;
    if (card) {
      onSelectCard(card);
    }
    playNfcTapSound();
    setIsActive(true);
    setLatency(Math.floor(Math.random() * 6) + 6); // 6-12ms realistic latency
    setActionTriggered(false);

    setTimeout(() => {
      setIsActive(false);
    }, 2800);
  };

  const handleTriggerAction = () => {
    playClickSound();
    setActionTriggered(true);
    setTimeout(() => {
      setActionTriggered(false);
    }, 3500);
  };

  return (
    <section className="section terminal-section" id="terminal">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="section-tag">
            <span>LIVE INTERACTIVE LAB</span>
          </div>
          <h2 className="section-title">
            The Contactless <span className="font-script accent-script">terminal</span>.
          </h2>
          <p className="section-desc max-w-2xl mx-auto">
            Experience our near-instant radio frequency coupling. Tap the sensor pad below or pick any card from the deck to execute a live cryptographic payload handshake.
          </p>
        </div>

        {/* Terminal Stage: Physical Pad + Console */}
        <div className="terminal-stage">
          {/* Physical Reader Pad */}
          <div className={`terminal-device ${isActive ? "active" : ""}`} id="terminal-device">
            <div className="terminal-rim">
              <div
                className="terminal-surface"
                onClick={() => simulateTap()}
                title="Click or tap onto reader sensor"
                role="button"
                tabIndex={0}
              >
                {/* Concentric Guide Rings */}
                <div className="target-rings" aria-hidden="true">
                  <div className="ring ring-3" />
                  <div className="ring ring-2" />
                  <div className="ring ring-1" />
                </div>

                {/* Central Brand Sensor Core */}
                <div className="terminal-core">
                  <div className="core-wave wave-1" />
                  <div className="core-wave wave-2" />
                  <div className="core-wave wave-3" />
                  <Image
                    src="/assets/logo-icon-white-tight.png"
                    alt="Contactless NFC Sensor Core"
                    width={56}
                    height={76}
                    className="terminal-icon-img"
                  />
                </div>

                {/* Status Indicator */}
                <div className="terminal-status-indicator">
                  <span className="status-beacon" />
                  <span className="status-label">
                    {isActive ? "COUPLED // 13.56 MHz ACTIVE" : "STANDBY // TAP PAD OR CARD"}
                  </span>
                </div>

                {/* Drop Hint */}
                <div className="drop-hint">
                  <span>{isActive ? "HANDSHAKE VERIFIED" : "CLICK SENSOR TO TAP"}</span>
                </div>
              </div>
            </div>

            {/* Hardware Chassis Footer */}
            <div className="terminal-base-bar">
              <div>READER ID: CTLS-NODE-X1</div>
              <div>13.56 MHz // ISO/IEC 14443-A</div>
              <div>AES-128 CMAC HARDWARE</div>
            </div>
          </div>

          {/* Cryptographic Payload Console */}
          <div className="terminal-console">
            <div className="console-header">
              <div className="console-title">
                <span className="console-led" />
                <span>CRYPTOGRAPHIC PAYLOAD MONITOR</span>
              </div>
              <div className="console-latency">
                LATENCY: {isActive ? `${latency} ms` : "-- ms"}
              </div>
            </div>

            <div className="console-body">
              <div className="console-line">
                <span className="console-key">PROTOCOL:</span>
                <span className="console-val">{currentCard.nfcPayload.protocol}</span>
              </div>
              <div className="console-line">
                <span className="console-key">CHIP ARCHITECTURE:</span>
                <span className="console-val">{currentCard.chip}</span>
              </div>
              <div className="console-line">
                <span className="console-key">UNIQUE HARDWARE UID:</span>
                <span className="console-val text-white font-mono">{currentCard.nfcPayload.uid}</span>
              </div>
              <div className="console-line">
                <span className="console-key">ACTIVE CARD EDITION:</span>
                <span className="console-val text-white">{currentCard.title}</span>
              </div>
              <div className="console-line">
                <span className="console-key">MATERIAL / CASING:</span>
                <span className="console-val">{currentCard.material}</span>
              </div>
              <div className="console-line">
                <span className="console-key">TAMPER CHECK:</span>
                <span className="console-val text-green">{currentCard.nfcPayload.security}</span>
              </div>

              {/* Payload Box */}
              <div className="console-line console-payload-box">
                <span className="console-key">DYNAMIC SUN PAYLOAD URL:</span>
                <div className="console-val font-mono payload-text">
                  https://contactless.id/auth/{currentCard.rawName}?cmac=E8A91B4C&amp;ctr=0042
                </div>
              </div>
            </div>

            {/* Action Output */}
            <div className="console-footer">
              <button onClick={handleTriggerAction} className="btn-console-action">
                <span>{actionTriggered ? "✓ Payload Executed Successfully" : "Trigger Transmitted Action"}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Card Deck Carousel Tray */}
        <div className="terminal-deck-tray">
          <div className="tray-header">
            <span className="tray-title">Select Card To Load &amp; Tap:</span>
            <span className="tray-sub">Click any card below to instant-test on the reader</span>
          </div>

          <div className="deck-scroll">
            {CARDS_DATA.slice(0, 16).map((card) => (
              <div
                key={card.id}
                onClick={() => simulateTap(card)}
                className={`deck-card-item ${currentCard.id === card.id ? "selected" : ""}`}
                role="button"
                tabIndex={0}
              >
                <div className="deck-card-img">
                  <Image src={`/${card.file}`} alt={card.title} width={240} height={151} />
                </div>
                <div className="deck-card-name">{card.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
