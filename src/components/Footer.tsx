"use client";

import { useState } from "react";
import Image from "next/image";
import { playClickSound } from "@/utils/audio";
import { useTheme } from "@/context/ThemeContext";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { theme } = useTheme();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    playClickSound();
    setSubscribed(true);
    setEmail("");
  };

  const logoSrc =
    theme === "light"
      ? "/assets/logo-full-black-tight.png"
      : "/assets/logo-full-white-tight.png";

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        {/* Column 1: Brand */}
        <div className="footer-col brand-col">
          <div className="footer-logo">
            <Image
              key={logoSrc}
              src={logoSrc}
              alt="Contactless Logo"
              width={160}
              height={42}
              style={{ height: "26px", width: "auto" }}
            />
          </div>
          <p className="footer-tagline">
            Crafted for the era of{" "}
            <span className="font-script accent-script text-xl">
              pure touch
            </span>
            .
          </p>
          <p className="footer-about text-muted text-sm">
            Pioneering near-field intelligence, high-grade hardware credentials, and contactless interaction architecture for the world&apos;s most demanding environments.
          </p>
        </div>

        {/* Column 2: Portfolio Links */}
        <div className="footer-col">
          <h4 className="footer-col-title">PORTFOLIO</h4>
          <ul className="footer-links">
            <li>
              <a href="#showcase" onClick={playClickSound}>
                The Vault (50+ Designs)
              </a>
            </li>
            <li>
              <a href="#terminal" onClick={playClickSound}>
                Live Tap Terminal
              </a>
            </li>
            <li>
              <a href="#solutions" onClick={playClickSound}>
                Physical Credentials
              </a>
            </li>
            <li>
              <a href="#solutions" onClick={playClickSound}>
                Architectural Nodes
              </a>
            </li>
            <li>
              <a href="#configurator" onClick={playClickSound}>
                Bespoke Studio
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Standards */}
        <div className="footer-col">
          <h4 className="footer-col-title">STANDARDS</h4>
          <ul className="footer-links">
            <li>
              <a href="#technology" onClick={playClickSound}>
                13.56 MHz HF Carrier
              </a>
            </li>
            <li>
              <a href="#technology" onClick={playClickSound}>
                NXP NTAG424 DNA
              </a>
            </li>
            <li>
              <a href="#technology" onClick={playClickSound}>
                MIFARE DESFire EV3
              </a>
            </li>
            <li>
              <a href="#technology" onClick={playClickSound}>
                ISO/IEC 14443 Type A/B
              </a>
            </li>
            <li>
              <a href="#technology" onClick={playClickSound}>
                EAL6+ Cryptography
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter & Inquiries */}
        <div className="footer-col">
          <h4 className="footer-col-title">DIRECT INQUIRIES</h4>
          <p className="text-sm text-muted" style={{ marginBottom: "1rem" }}>
            Receive confidential updates on new limited card editions and architectural sensor releases.
          </p>

          <form onSubmit={handleSubscribe} className="newsletter-form">
            <div className="newsletter-input-group">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
              />
              <button type="submit" className="newsletter-submit-btn" aria-label="Subscribe">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
            {subscribed && (
              <div className="text-green" style={{ fontSize: "0.75rem", marginTop: "0.5rem" }}>
                ✓ Transmission acknowledged. Welcome to Contactless.
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Legal Bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <div className="footer-copy">
            &copy; {new Date().getFullYear()} Contactless Inc. All rights reserved. Precision near-field engineering.
          </div>
          <div className="footer-legal-links">
            <a href="#">Privacy Protocol</a>
            <span className="sep">&bull;</span>
            <a href="#">Security Audit</a>
            <span className="sep">&bull;</span>
            <a href="#">Hardware Warranty</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
