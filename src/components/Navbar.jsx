import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Sparkles, Camera, ArrowRight } from 'lucide-react';
import { soundEffects } from '../utils/audio';

export default function Navbar({ isMuted, setIsMuted, onOpenStudio }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['solucao', 'scanner', 'studio', 'demonstracao', 'publico', 'galeria', 'equipe', 'contato'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const nextMuted = soundEffects.toggleMuted();
    setIsMuted(nextMuted);
    if (!nextMuted) soundEffects.click();
  };

  const navLinks = [
    { href: '#solucao', label: 'A Solução', id: 'solucao' },
    { href: '#scanner', label: 'Anti-Sombra', id: 'scanner' },
    { href: '#studio', label: 'AI Studio', id: 'studio', isNew: true },
    { href: '#demonstracao', label: 'Demonstração', id: 'demonstracao' },
    { href: '#publico', label: 'Público', id: 'publico' },
    { href: '#galeria', label: 'Galeria', id: 'galeria' },
    { href: '#equipe', label: 'Equipe', id: 'equipe' },
  ];

  const handleLinkClick = () => {
    soundEffects.click();
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#060911]/85 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a
            href="#topo"
            onClick={handleLinkClick}
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-1"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-[#080c16] rounded-[10px] flex items-center justify-center relative overflow-hidden">
                <span className="w-4 h-4 rounded-full border-2 border-cyan-400/80"></span>
                <span className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-display font-extrabold tracking-tight text-white flex items-center gap-1">
                Jovi<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Hub</span>
                <span className="ml-1 text-[10px] font-mono tracking-widest uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-1.5 py-0.5 rounded-full">
                  v4.0
                </span>
              </span>
              <span className="text-[10px] text-slate-400 -mt-1 hidden sm:block tracking-wide">
                Challenge JOVI · FIAP
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/40 border border-white/5 backdrop-blur-md px-3 py-1.5 rounded-full shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`relative text-xs tracking-wide font-medium px-3.5 py-2 rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-white bg-indigo-600/30 text-indigo-300 shadow-sm border border-indigo-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                  {link.isNew && (
                    <span className="inline-flex items-center text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                      LIVE
                    </span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Audio Toggle */}
            <button
              onClick={handleToggleSound}
              type="button"
              title={isMuted ? 'Ativar efeitos sonoros da interface' : 'Silenciar efeitos sonoros'}
              aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
              className="p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-700/60 text-slate-300 hover:text-white border border-white/5 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
            </button>

            {/* Quick Action Button */}
            <a
              href="#contato"
              onClick={handleLinkClick}
              className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white shadow-lg shadow-indigo-600/25 border border-indigo-400/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Fale Conosco</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                soundEffects.click();
                setIsOpen(!isOpen);
              }}
              type="button"
              className="lg:hidden p-2.5 rounded-xl bg-slate-800/60 text-slate-300 hover:text-white border border-white/5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Abrir menu mobile"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5 text-indigo-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-[#080c16]/98 backdrop-blur-xl border-b border-white/10 shadow-2xl px-6 py-6 transition-all animate-fadeIn">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={handleLinkClick}
                className="flex items-center justify-between text-sm font-medium py-3 px-4 rounded-xl text-slate-200 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/5"
              >
                <span>{link.label}</span>
                {link.isNew && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    NOVO NO REACT
                  </span>
                )}
              </a>
            ))}
            <a
              href="#contato"
              onClick={handleLinkClick}
              className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/30"
            >
              <span>Entrar em Contato com a Equipe</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
