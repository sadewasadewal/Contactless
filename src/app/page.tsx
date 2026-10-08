"use client";

import { useState } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollBlurObserver from "@/components/ScrollBlurObserver";
import AmbientBackground from "@/components/AmbientBackground";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import VaultSection from "@/components/VaultSection";
import TerminalSection from "@/components/TerminalSection";
import SolutionsSection from "@/components/SolutionsSection";
import ConfiguratorSection, { ConfiguratorState } from "@/components/ConfiguratorSection";
import TechnologySection from "@/components/TechnologySection";
import EditorialSection from "@/components/EditorialSection";
import Footer from "@/components/Footer";
import CardModal from "@/components/CardModal";
import BriefModal from "@/components/BriefModal";
import { CARDS_DATA, CardItem } from "@/data/cards";

export default function Home() {
  const [currentTerminalCard, setCurrentTerminalCard] = useState<CardItem>(CARDS_DATA[0]);
  const [inspectingCard, setInspectingCard] = useState<CardItem | null>(null);
  const [projectBrief, setProjectBrief] = useState<ConfiguratorState | null>(null);

  return (
    <ThemeProvider>
      {/* Inertial Smooth Scroll & Scroll Blur Reveal */}
      <SmoothScroll />
      <ScrollBlurObserver />

      {/* Dynamic Background Ambience & Custom Cursor */}
      <AmbientBackground />
      <CustomCursor />

      {/* Primary Layout */}
      <Navbar />

      <main>
        <HeroSection />

        <VaultSection
          onInspectCard={(card) => setInspectingCard(card)}
          onSelectForTerminal={(card) => setCurrentTerminalCard(card)}
        />

        <TerminalSection
          currentCard={currentTerminalCard}
          onSelectCard={(card) => setCurrentTerminalCard(card)}
        />

        <SolutionsSection />

        <ConfiguratorSection
          onGenerateBrief={(brief) => setProjectBrief(brief)}
        />

        <TechnologySection />

        <EditorialSection />
      </main>

      <Footer />

      {/* Modals */}
      <CardModal
        card={inspectingCard}
        onClose={() => setInspectingCard(null)}
        onLoadIntoTerminal={(card) => setCurrentTerminalCard(card)}
      />

      <BriefModal
        brief={projectBrief}
        onClose={() => setProjectBrief(null)}
      />
    </ThemeProvider>
  );
}
