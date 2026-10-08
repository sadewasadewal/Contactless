"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { isSoundEnabled, setSoundEnabled, playClickSound } from "@/utils/audio";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const [soundOn, setSoundOn] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setSoundOn(isSoundEnabled());
  }, []);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) {
      playClickSound();
    }
  };

  const handleNavClick = () => {
    playClickSound();
    setMobileOpen(false);
  };

  const handleThemeToggle = () => {
    playClickSound();
    toggleTheme();
  };

  const logoSrc =
    theme === "light"
      ? "/assets/logo-full-black-tight.png"
      : "/assets/logo-full-white-tight.png";

  return (
    <>
      {/* Main Navbar */}
      <header className="navbar" id="navbar">
        <div className="container nav-container">
          {/* Logo */}
          <a href="#" className="brand-link" aria-label="Contactless Home" onClick={handleNavClick}>
            <div className="brand-logo-wrap">
              <Image
                key={logoSrc}
                src={logoSrc}
                alt="Contactless Logo"
                width={160}
                height={42}
                className="brand-wordmark"
                priority
              />
            </div>
          </a>

          {/* Desktop Links */}
          <nav className="nav-menu" aria-label="Primary Navigation">
            <a href="#showcase" onClick={handleNavClick} className="nav-link">
              The Vault
            </a>
            <a href="#terminal" onClick={handleNavClick} className="nav-link">
              Interactive Tap
            </a>
            <a href="#solutions" onClick={handleNavClick} className="nav-link">
              Solutions
            </a>
            <a href="#configurator" onClick={handleNavClick} className="nav-link">
              Custom Studio
            </a>
            <a href="#technology" onClick={handleNavClick} className="nav-link">
              NFC Tech
            </a>
          </nav>

          {/* Actions */}
          <div className="nav-actions">
            {/* Theme Toggle (Light / Dark) */}
            <button
              onClick={handleThemeToggle}
              className="icon-btn"
              aria-label={theme === "dark" ? "Switch to light monochrome mode" : "Switch to dark monochrome mode"}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? (
                // Sun Icon (to switch to light mode)
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                // Moon Icon (to switch to dark mode)
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            {/* Tactile Sound Toggle */}
            <button
              onClick={toggleSound}
              className="icon-btn"
              aria-label={soundOn ? "Mute tactile audio" : "Enable tactile audio"}
              title={soundOn ? "Tactile audio active" : "Audio muted"}
            >
              {soundOn ? (
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              )}
            </button>

            <a href="#configurator" onClick={handleNavClick} className="btn-primary-sm">
              <span>Initiate Project</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="mobile-toggle"
              aria-label="Toggle navigation drawer"
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${mobileOpen ? "open" : ""}`}>
        <nav className="mobile-nav-links">
          <a href="#showcase" onClick={handleNavClick} className="mobile-link">
            The Vault (50+ Designs)
          </a>
          <a href="#terminal" onClick={handleNavClick} className="mobile-link">
            Interactive Tap Terminal
          </a>
          <a href="#solutions" onClick={handleNavClick} className="mobile-link">
            Solutions &amp; Hardware
          </a>
          <a href="#configurator" onClick={handleNavClick} className="mobile-link">
            Custom Studio
          </a>
          <a href="#technology" onClick={handleNavClick} className="mobile-link">
            NFC Engineering
          </a>

          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <button onClick={handleThemeToggle} className="btn-secondary" style={{ flex: 1, justifyContent: "center" }}>
              {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>

          <a href="#configurator" onClick={handleNavClick} className="btn-primary" style={{ marginTop: "1.5rem" }}>
            Initiate Bespoke Project
          </a>
        </nav>
      </div>
    </>
  );
}
