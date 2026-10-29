import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SolutionBento from './components/SolutionBento';
import AntiShadowScanner from './components/AntiShadowScanner';
import InteractiveStudyStudio from './components/InteractiveStudyStudio';
import VideoDemoPlayer from './components/VideoDemoPlayer';
import PersonasSection from './components/PersonasSection';
import AiArchiveGallery from './components/AiArchiveGallery';
import TeamSection from './components/TeamSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { soundEffects } from './utils/audio';

export default function App() {
  const [isMuted, setIsMuted] = useState(soundEffects.getIsMuted());

  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Navbar */}
      <Navbar
        isMuted={isMuted}
        setIsMuted={setIsMuted}
      />

      {/* Main Page Sections */}
      <main id="conteudo">
        <Hero />
        <SolutionBento />
        <AntiShadowScanner />
        <InteractiveStudyStudio />
        <VideoDemoPlayer />
        <PersonasSection />
        <AiArchiveGallery />
        <TeamSection />
        <ContactSection />
      </main>

      {/* Academic Footer */}
      <Footer />
    </div>
  );
}

