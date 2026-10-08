import React from "react";

export default function TechnologySection() {
  return (
    <section className="section tech-section" id="technology">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="section-tag">
            <span>ELECTROMAGNETIC STANDARDS</span>
          </div>
          <h2 className="section-title">
            Invisible physics. <span className="font-script accent-script">Uncompromising</span> security.
          </h2>
          <p className="section-desc max-w-2xl mx-auto">
            Contactless operates at the intersection of resonant inductive coupling and hardware-isolated cryptography.
          </p>
        </div>

        {/* 3 Tech Cards */}
        <div className="tech-grid">
          <div className="tech-spec-card">
            <div className="tech-header">
              <span className="tech-badge">CARRIER FREQUENCY</span>
              <h3 className="tech-val">13.56 MHz</h3>
            </div>
            <p className="tech-text">
              High-frequency (HF) ISM band conforming to ISO/IEC 14443 Type A/B and ISO/IEC 15693. Precision tuned antenna geometry ensures rapid resonant coupling even through metal shields.
            </p>
            <div className="tech-footer">
              <span>Bandwidth: &plusmn;7 kHz</span>
              <span>Modulation: 100% ASK</span>
            </div>
          </div>

          <div className="tech-spec-card">
            <div className="tech-header">
              <span className="tech-badge">ZERO-CONTACT LATENCY</span>
              <h3 className="tech-val">&lt; 12 ms</h3>
            </div>
            <p className="tech-text">
              Ultra-rapid handshake execution. Handshake, anti-collision loop, cryptographic mutual authentication, and payload transfer occur faster than human touch perception.
            </p>
            <div className="tech-footer">
              <span>Baud Rate: 106–848 kbps</span>
              <span>Anti-Collision: Bit-frame</span>
            </div>
          </div>

          <div className="tech-spec-card">
            <div className="tech-header">
              <span className="tech-badge">TAMPER DETECTION</span>
              <h3 className="tech-val">SUN &times; AES</h3>
            </div>
            <p className="tech-text">
              Secure Unique NFC (SUN) generates a fresh cryptographic CMAC cipher key on every physical tap. It is mathematically impossible to clone or replay the signal.
            </p>
            <div className="tech-footer">
              <span>Cipher: AES-128 / AES-256</span>
              <span>Common Criteria: EAL6+</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
