import React from "react";

export default function SolutionsSection() {
  return (
    <section className="section solutions-section" id="solutions">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="section-tag">
            <span>CORE CAPABILITIES</span>
          </div>
          <h2 className="section-title">
            Engineering for <span className="font-script accent-script">every</span> dimension.
          </h2>
          <p className="section-desc max-w-2xl mx-auto">
            From single bespoke titanium credentials to city-scale architectural contactless deployments, we build hardware that disappears into everyday life.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="solutions-grid">
          {/* Pillar 1 */}
          <article className="solution-card">
            <div className="solution-num">01 // CREDENTIALS</div>
            <div className="solution-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
            </div>
            <h3 className="solution-title">Bespoke Metal &amp; Carbon NFC</h3>
            <p className="solution-text">
              Weighted solid titanium, mirror-polished steel, and matte obsidian ceramic. Precision fiber-laser etched with isolated RF transmission windows for unhindered coupling.
            </p>
            <ul className="solution-features">
              <li>18g – 24g weighted metal body</li>
              <li>High-durability PVD &amp; DLC coating</li>
              <li>Embedded multi-color LED pulse coil</li>
            </ul>
          </article>

          {/* Pillar 2 */}
          <article className="solution-card">
            <div className="solution-num">02 // ARCHITECTURE</div>
            <div className="solution-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <h3 className="solution-title">Spatial &amp; Turnstile Access Nodes</h3>
            <p className="solution-text">
              Flush-mount architectural readers engineered for stone, marble, tinted glass, and custom turnstiles. Low-power, extreme read speed, and seamless building integration.
            </p>
            <ul className="solution-features">
              <li>Sub-15ms authentication speed</li>
              <li>OSDP v2 &amp; Wiegand multi-protocol</li>
              <li>IP68 weather &amp; tamper resistant</li>
            </ul>
          </article>

          {/* Pillar 3 */}
          <article className="solution-card">
            <div className="solution-num">03 // AMBIENT IOT</div>
            <div className="solution-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12a4 4 0 0 1 8 0" />
                <line x1="12" y1="12" x2="12" y2="16" />
              </svg>
            </div>
            <h3 className="solution-title">Tap-to-Experience Packaging</h3>
            <p className="solution-text">
              Invisible NFC tags integrated into high-fashion garments, luxury spirit bottles, and physical art. Instant brand authenticity verification with zero mobile app required.
            </p>
            <ul className="solution-features">
              <li>Tamper-loop physical seal detection</li>
              <li>Zero-battery 13.56 MHz energy harvesting</li>
              <li>Web3 &amp; Digital Twin certificate binding</li>
            </ul>
          </article>

          {/* Pillar 4 */}
          <article className="solution-card">
            <div className="solution-num">04 // ENCRYPTION</div>
            <div className="solution-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h3 className="solution-title">EAL6+ Cryptographic Tokens</h3>
            <p className="solution-text">
              Defense-grade NFC authentication tokens leveraging NXP NTAG424 DNA and MIFARE DESFire EV3 silicon. Mutual cryptographic authentication resistant to cloning.
            </p>
            <ul className="solution-features">
              <li>SUN (Secure Unique NFC) dynamic URL hash</li>
              <li>AES-128 / AES-256 hardware cipher</li>
              <li>Zero-knowledge proof tap verification</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
