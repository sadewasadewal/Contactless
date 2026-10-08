"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { CARDS_DATA, CardItem } from "@/data/cards";
import { playClickSound, playNfcTapSound } from "@/utils/audio";

interface VaultSectionProps {
  onInspectCard: (card: CardItem) => void;
  onSelectForTerminal: (card: CardItem) => void;
}

const CATEGORIES = [
  "all",
  "Stealth & Luxury",
  "Liquid & Glass",
  "FinTech & Identity",
  "Pop Culture & Editions",
  "Minimalist Series",
];

export default function VaultSection({
  onInspectCard,
  onSelectForTerminal,
}: VaultSectionProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);

  const filteredCards = useMemo(() => {
    return CARDS_DATA.filter((card) => {
      const matchCat =
        activeCategory === "all" || card.category === activeCategory;
      const matchSearch =
        searchQuery.trim() === "" ||
        card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.chip.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const visibleCards = useMemo(() => {
    return filteredCards.slice(0, visibleCount);
  }, [filteredCards, visibleCount]);

  const handleCategoryChange = (cat: string) => {
    playClickSound();
    setActiveCategory(cat);
    setVisibleCount(12);
  };

  const handleInspect = (card: CardItem) => {
    playClickSound();
    onInspectCard(card);
  };

  const handleTapOnTerminal = (card: CardItem) => {
    playNfcTapSound();
    onSelectForTerminal(card);
    const terminalEl = document.getElementById("terminal");
    if (terminalEl) {
      terminalEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLoadMore = () => {
    playClickSound();
    setVisibleCount((prev) => Math.min(prev + 12, filteredCards.length));
  };

  return (
    <section className="section vault-section" id="showcase">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="section-tag">
            <span>THE CURATED VAULT</span>
          </div>
          <h2 className="section-title">
            Masterpieces of <span className="font-script accent-script">tactile</span> engineering.
          </h2>
          <p className="section-desc max-w-2xl mx-auto">
            Browse our comprehensive archive of 50+ precision-manufactured NFC cards, titanium credentials, frosted optical glass, and limited private editions.
          </p>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="vault-filter-toolbar">
          <div className="filter-tabs" role="tablist">
            {CATEGORIES.map((cat) => {
              const label =
                cat === "all"
                  ? `All Editions (${CARDS_DATA.length})`
                  : cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`filter-tab ${activeCategory === cat ? "active" : ""}`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="vault-search-box">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search by name, material, chip..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(12);
              }}
              aria-label="Search card vault"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="search-clear-btn"
                aria-label="Clear search"
              >
                &times;
              </button>
            )}
          </div>
        </div>

        {/* Card Grid */}
        <div className="cards-grid">
          {visibleCards.map((card) => (
            <article key={card.id} className="card-item">
              <div className="card-thumb-wrap">
                <Image
                  src={`/${card.file}`}
                  alt={card.title}
                  width={480}
                  height={303}
                  loading="lazy"
                />
                <span className="card-category-pill">{card.category}</span>
              </div>

              <div className="card-meta">
                <h3 className="card-title">{card.title}</h3>
                <span className="card-material">{card.material}</span>
                <span className="card-chip">{card.chip}</span>
              </div>

              <div className="card-actions-bar">
                <button
                  onClick={() => handleInspect(card)}
                  className="btn-card-inspect"
                >
                  Inspect 3D
                </button>
                <button
                  onClick={() => handleTapOnTerminal(card)}
                  className="btn-card-tap"
                >
                  Tap On Terminal
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredCards.length && (
          <div className="text-center" style={{ marginTop: "3rem" }}>
            <button onClick={handleLoadMore} className="btn-secondary">
              <span>Load More Editions ({filteredCards.length - visibleCount} remaining)</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
