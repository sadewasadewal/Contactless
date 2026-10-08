"use client";

import { useState, useRef, MouseEvent } from "react";
import Image from "next/image";
import { playNfcTapSound, playClickSound } from "@/utils/audio";

interface FlagshipCard {
  id: string;
  name: string;
  file: string;
  material: string;
}

const FLAGSHIP_CARDS: FlagshipCard[] = [
  {
    id: "titanium-v8",
    name: "Titanium V8 Space Black",
    file: "/images/CardArt-titanium-v8-2-lhN26PvF96.png",
    material: "Grade 5 Aerospace Titanium",
  },
  {
    id: "apple-black",
    name: "Apple Black Visa Edition",
    file: "/images/CardArt-apple-black-visa-PGMoMuOF9O.png",
    material: "Obsidian PVD Ceramic",
  },
  {
    id: "black-revolut",
    name: "Revolut Stealth Black",
    file: "/images/CardArt-black-revolut-5jaGhZsUY9.png",
    material: "Brushed Carbon Composite",
  },
  {
    id: "coutts-silk",
    name: "Coutts Silk Bespoke",
    file: "/images/CardArt-coutts-silk-charge-card-updated-2026-design-rM23Nc49vc.png",
    material: "Solid Platinum Guilloché",
  },
  {
    id: "liquid-glass",
    name: "Liquid Glass Luminescent",
    file: "/images/CardArt-apple-cash-liquid-glass-DTHKHxAtyK.png",
    material: "Optical Frosted Acrylic",
  },
];

export default function HeroSection() {
  const [selectedCard, setSelectedCard] = useState<FlagshipCard>(FLAGSHIP_CARDS[0]);
  const [waves, setWaves] = useState<number[]>([]);
  const cardTiltRef = useRef<HTMLDivElement | null>(null);
  const glareRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardTiltRef.current || !glareRef.current) return;
    const rect = cardTiltRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * 14;
    const rotateY = ((x - centerX) / centerX) * 16;

    cardTiltRef.current.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;

    // Move specular glare
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    glareRef.current.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.04) 40%, transparent 70%)`;
  };

  const handleMouseLeave = () => {
    if (!cardTiltRef.current || !glareRef.current) return;
    cardTiltRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    glareRef.current.style.background = `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.18) 0%, transparent 60%)`;
  };

  const triggerTapSimulation = () => {
    playNfcTapSound();
    const id = Date.now();
    setWaves((prev) => [...prev, id]);

    // Small haptic bounce on card
    if (cardTiltRef.current) {
      cardTiltRef.current.style.transform = `perspective(1000px) scale3d(0.97, 0.97, 0.97)`;
      setTimeout(() => {
        if (cardTiltRef.current) {
          cardTiltRef.current.style.transform = `perspective(1000px) scale3d(1.03, 1.03, 1.03)`;
        }
      }, 100);
      setTimeout(() => {
        if (cardTiltRef.current) {
          cardTiltRef.current.style.transform = `perspective(1000px) scale3d(1, 1, 1)`;
        }
      }, 250);
    }

    setTimeout(() => {
      setWaves((prev) => prev.filter((w) => w !== id));
    }, 2500);
  };

  const selectCard = (card: FlagshipCard) => {
    playClickSound();
    setSelectedCard(card);
  };

  return (
    <section className="hero-section" id="hero">
      <div className="container hero-grid">
        {/* Left Column: Typography & Positioning */}
        <div className="hero-content">
          <h1 className="hero-title">
            The architecture of <br />
            <span className="font-script accent-script">seamless</span> proximity.
          </h1>

          <p className="hero-subtitle">
            We engineer bespoke contactless physical credentials, architectural RFID nodes, and cryptographic NFC hardware for visionary brands and institutions.
          </p>

          <div className="hero-cta-group">
            <a href="#terminal" onClick={playClickSound} className="btn-primary">
              <span className="btn-wave-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9a9 9 0 0 1 0 6" />
                  <path d="M10 7a6 6 0 0 1 0 10" />
                  <circle cx="15" cy="12" r="1.5" fill="currentColor" />
                </svg>
              </span>
              <span>Test Interactive Tap</span>
            </a>

            <a href="#showcase" onClick={playClickSound} className="btn-secondary">
              <span>Explore The Vault (50+ Designs)</span>
            </a>
          </div>

          {/* Metrics Strip */}
          <div className="hero-metrics">
            <div className="metric-item">
              <div className="metric-val">
                &lt; 10<span className="metric-unit">ms</span>
              </div>
              <div className="metric-lbl">Contactless Handshake</div>
            </div>
            <div className="metric-divider" />
            <div className="metric-item">
              <div className="metric-val">
                13.56<span className="metric-unit">MHz</span>
              </div>
              <div className="metric-lbl">High-Frequency Carrier</div>
            </div>
            <div className="metric-divider" />
            <div className="metric-item">
              <div className="metric-val">
                EAL6<span className="metric-unit">+</span>
              </div>
              <div className="metric-lbl">Cryptographic Core</div>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Interactive Card Showcase */}
        <div className="hero-visual">
          <div
            className="card-3d-scene"
            id="hero-card-scene"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="card-3d-wrapper" ref={cardTiltRef} onClick={triggerTapSimulation} style={{ cursor: "pointer" }}>
              <div className="card-3d-face">
                <Image
                  src={selectedCard.file}
                  alt={selectedCard.name}
                  width={800}
                  height={505}
                  priority
                  className="card-art-img"
                />
                <div className="card-specular-glare" ref={glareRef} />
                <div className="card-nfc-indicator">
                  <div className="nfc-mini-wave">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated Radio Wave Emitter */}
            <div className="hero-signal-emitter" aria-hidden="true">
              {waves.map((id) => (
                <div key={id} className="signal-wave" />
              ))}
            </div>
          </div>

          {/* Quick Flagship Selector & Tap Trigger */}
          <div className="hero-card-controls">
            <div className="control-label">
              <span className="text-muted" style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Flagship Edition:
              </span>
              <span className="text-white" style={{ fontWeight: 600 }}>
                {selectedCard.name}
              </span>
            </div>

            <div className="hero-card-thumbnails">
              {FLAGSHIP_CARDS.map((card) => (
                <button
                  key={card.id}
                  onClick={() => selectCard(card)}
                  className={`hero-thumb ${selectedCard.id === card.id ? "active" : ""}`}
                  title={card.name}
                  aria-label={`Select ${card.name}`}
                >
                  <Image src={card.file} alt={card.name} width={64} height={40} />
                </button>
              ))}
            </div>

            <button
              onClick={triggerTapSimulation}
              className="btn-tap-simulate"
              title="Simulate Contactless Tap"
            >
              <span className="tap-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 8a12 12 0 0 1 0 8" />
                  <path d="M8 6a8 8 0 0 1 0 12" />
                  <path d="M12 4a5 5 0 0 1 0 16" />
                  <circle cx="16" cy="12" r="2" fill="currentColor" />
                </svg>
              </span>
              <span>Simulate 13.56 MHz Tap</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <a href="#showcase" onClick={playClickSound} className="scroll-cue" aria-label="Scroll down to showcase">
        <span className="cue-label">Explore The Vault</span>
        <div className="cue-line" />
      </a>
    </section>
  );
}
