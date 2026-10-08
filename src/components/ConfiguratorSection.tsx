"use client";

import { useState } from "react";
import Image from "next/image";
import { playClickSound } from "@/utils/audio";

export interface ConfiguratorState {
  material: string;
  materialName: string;
  materialImg: string;
  weight: string;
  chip: string;
  cardholder: string;
  serial: string;
}

interface ConfiguratorSectionProps {
  onGenerateBrief: (state: ConfiguratorState) => void;
}

export default function ConfiguratorSection({ onGenerateBrief }: ConfiguratorSectionProps) {
  const [material, setMaterial] = useState("titanium");
  const [materialName, setMaterialName] = useState("Titanium Space Black");
  const [materialImg, setMaterialImg] = useState("/images/CardArt-titanium-v8-2-lhN26PvF96.png");
  const [weight, setWeight] = useState("22.4g Solid Titanium");
  const [chip, setChip] = useState("NTAG424 DNA");
  const [cardholder, setCardholder] = useState("ALEXANDER VANE");
  const [serial, setSerial] = useState("CTLS // 0048-9214-X");

  const handleMaterialChange = (
    val: string,
    name: string,
    img: string,
    w: string
  ) => {
    playClickSound();
    setMaterial(val);
    setMaterialName(name);
    setMaterialImg(img);
    setWeight(w);
  };

  const handleChipChange = (val: string) => {
    playClickSound();
    setChip(val);
  };

  const handleSubmit = () => {
    playClickSound();
    onGenerateBrief({
      material,
      materialName,
      materialImg,
      weight,
      chip,
      cardholder: cardholder || "ANONYMOUS ENTITY",
      serial: serial || "CTLS // 0000-0000-X",
    });
  };

  return (
    <section className="section configurator-section" id="configurator">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="section-tag">
            <span>BESPOKE STUDIO</span>
          </div>
          <h2 className="section-title">
            Tailor your <span className="font-script accent-script">identity</span>.
          </h2>
          <p className="section-desc max-w-2xl mx-auto">
            Design your custom contactless credential in real time. Select your base material, chip architecture, and engraving details.
          </p>
        </div>

        {/* Studio Workspace */}
        <div className="configurator-wrap">
          {/* Left: 3D Live Card Preview */}
          <div className="config-preview-panel">
            <div className="config-card-3d">
              <div className="custom-card-body">
                <div className="custom-card-art">
                  <Image
                    src={materialImg}
                    alt="Custom Preview Card"
                    width={800}
                    height={505}
                    priority
                  />
                </div>

                <div className="custom-card-sheen" />

                <div className="custom-card-overlay">
                  <div className="overlay-top">
                    <div className="overlay-brand">
                      <Image
                        src="/assets/logo-full-white-tight.png"
                        alt="Contactless"
                        width={120}
                        height={32}
                        style={{ height: "18px", width: "auto" }}
                      />
                    </div>
                    <div className="overlay-chip-badge">{chip}</div>
                  </div>

                  <div className="overlay-mid">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 8.5a8 8 0 0 1 0 7" />
                      <path d="M8.5 7a5 5 0 0 1 0 10" />
                      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                    </svg>
                  </div>

                  <div className="overlay-bottom">
                    <div className="custom-card-holder">
                      {cardholder || "ALEXANDER VANE"}
                    </div>
                    <div className="custom-card-serial">
                      {serial || "CTLS // 0048-9214-X"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Spec Badges */}
            <div className="config-card-specs-bar">
              <div className="spec-pill">
                <span className="text-muted">Weight:</span>
                <span>{weight}</span>
              </div>
              <div className="spec-pill">
                <span className="text-muted">Coupling:</span>
                <span>0 – 45mm Inductive</span>
              </div>
              <div className="spec-pill">
                <span className="text-muted">Standard:</span>
                <span>ISO 14443-A</span>
              </div>
            </div>
          </div>

          {/* Right: Controls Panel */}
          <div className="config-controls-panel">
            <form onSubmit={(e) => e.preventDefault()}>
              {/* Material Selection */}
              <div className="control-group">
                <label className="control-heading">01 / BASE MATERIAL &amp; FINISH</label>
                <div className="material-options">
                  <label className="material-radio">
                    <input
                      type="radio"
                      name="material"
                      value="titanium"
                      checked={material === "titanium"}
                      onChange={() =>
                        handleMaterialChange(
                          "titanium",
                          "Titanium Space Black",
                          "/images/CardArt-titanium-v8-2-lhN26PvF96.png",
                          "22.4g Solid Titanium"
                        )
                      }
                    />
                    <div className="radio-box">
                      <span className="swatch swatch-titanium" />
                      <div className="radio-text">
                        <span className="name">Titanium Space Black</span>
                        <span className="desc">Aerospace titanium alloy</span>
                      </div>
                    </div>
                  </label>

                  <label className="material-radio">
                    <input
                      type="radio"
                      name="material"
                      value="obsidian"
                      checked={material === "obsidian"}
                      onChange={() =>
                        handleMaterialChange(
                          "obsidian",
                          "Matte Obsidian Stealth",
                          "/images/CardArt-apple-black-visa-PGMoMuOF9O.png",
                          "19.8g Ceramic Obsidian"
                        )
                      }
                    />
                    <div className="radio-box">
                      <span className="swatch swatch-obsidian" />
                      <div className="radio-text">
                        <span className="name">Matte Obsidian</span>
                        <span className="desc">Diamond-like anti-fingerprint</span>
                      </div>
                    </div>
                  </label>

                  <label className="material-radio">
                    <input
                      type="radio"
                      name="material"
                      value="liquidglass"
                      checked={material === "liquidglass"}
                      onChange={() =>
                        handleMaterialChange(
                          "liquidglass",
                          "Liquid Glass Ice",
                          "/images/CardArt-apple-cash-liquid-glass-DTHKHxAtyK.png",
                          "16.5g Liquid Glass"
                        )
                      }
                    />
                    <div className="radio-box">
                      <span className="swatch swatch-glass" />
                      <div className="radio-text">
                        <span className="name">Liquid Glass</span>
                        <span className="desc">Optical frosted acrylic</span>
                      </div>
                    </div>
                  </label>

                  <label className="material-radio">
                    <input
                      type="radio"
                      name="material"
                      value="silk"
                      checked={material === "silk"}
                      onChange={() =>
                        handleMaterialChange(
                          "silk",
                          "Silk Monochrome Platinum",
                          "/images/CardArt-coutts-silk-charge-card-updated-2026-design-rM23Nc49vc.png",
                          "21.0g Silk Platinum"
                        )
                      }
                    />
                    <div className="radio-box">
                      <span className="swatch swatch-silver" />
                      <div className="radio-text">
                        <span className="name">Silk Monochrome</span>
                        <span className="desc">Intricate laser guilloché</span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Silicon Selection */}
              <div className="control-group">
                <label className="control-heading">02 / INTEGRATED NFC SILICON</label>
                <div className="chip-options">
                  <label className="chip-radio">
                    <input
                      type="radio"
                      name="chip"
                      value="NTAG424 DNA"
                      checked={chip === "NTAG424 DNA"}
                      onChange={() => handleChipChange("NTAG424 DNA")}
                    />
                    <div className="chip-box">
                      <span className="chip-name">NXP NTAG424 DNA</span>
                      <span className="chip-desc">AES-128 cryptographic tamper &amp; dynamic SUN hash</span>
                    </div>
                  </label>

                  <label className="chip-radio">
                    <input
                      type="radio"
                      name="chip"
                      value="DESFire EV3"
                      checked={chip === "DESFire EV3"}
                      onChange={() => handleChipChange("DESFire EV3")}
                    />
                    <div className="chip-box">
                      <span className="chip-name">MIFARE DESFire EV3</span>
                      <span className="chip-desc">Multi-application spatial access &amp; transit</span>
                    </div>
                  </label>

                  <label className="chip-radio">
                    <input
                      type="radio"
                      name="chip"
                      value="NTAG216"
                      checked={chip === "NTAG216"}
                      onChange={() => handleChipChange("NTAG216")}
                    />
                    <div className="chip-box">
                      <span className="chip-name">NTAG216 (888 Bytes)</span>
                      <span className="chip-desc">Universal NFC Forum Type 2 high capacity storage</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Laser Engraving Inputs */}
              <div className="control-group">
                <label className="control-heading">03 / CUSTOM FIBER LASER ENGRAVING</label>
                <div className="input-row">
                  <div className="input-field">
                    <label htmlFor="cfg-cardholder">Cardholder / Entity Name</label>
                    <input
                      id="cfg-cardholder"
                      type="text"
                      maxLength={26}
                      value={cardholder}
                      onChange={(e) => setCardholder(e.target.value.toUpperCase())}
                      placeholder="E.G. ALEXANDER VANE"
                    />
                  </div>
                  <div className="input-field">
                    <label htmlFor="cfg-serial">Identifier / Serial</label>
                    <input
                      id="cfg-serial"
                      type="text"
                      maxLength={22}
                      value={serial}
                      onChange={(e) => setSerial(e.target.value.toUpperCase())}
                      placeholder="E.G. CTLS // 0048-9214-X"
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="config-submit-box">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="btn-primary w-full justify-center"
                >
                  <span>Generate Project Specification</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
                <p className="text-muted text-center" style={{ fontSize: "0.75rem", marginTop: "0.5rem" }}>
                  Zero minimum order for prototyping. Enterprise batch runs up to 100,000+ units.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
