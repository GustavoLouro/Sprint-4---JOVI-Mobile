import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { soundEffects } from '../utils/audio';

export default function Navbar({ isMuted, setIsMuted }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['solucao', 'scanner', 'studio', 'demonstracao', 'publico', 'galeria', 'equipe', 'contato'];
      const scrollPos = window.scrollY + 180;

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
    { href: '#solucao', label: 'Problema & Solução', id: 'solucao' },
    { href: '#scanner', label: 'Anti-Sombra', id: 'scanner' },
    { href: '#studio', label: 'Estúdio de Estudo', id: 'studio' },
    { href: '#demonstracao', label: 'Vídeo da Aula', id: 'demonstracao' },
    { href: '#publico', label: 'Pesquisa com Alunos', id: 'publico' },
    { href: '#galeria', label: 'Protótipo', id: 'galeria' },
    { href: '#equipe', label: 'Equipe FIAP', id: 'equipe' },
  ];

  const handleLinkClick = () => {
    soundEffects.click();
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-[#080c14]/90 backdrop-blur-md border-b border-slate-800/80 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a
            href="#topo"
            onClick={handleLinkClick}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:bg-indigo-500 transition-colors">
              J
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold tracking-tight text-white flex items-center gap-1.5">
                Jovi <span className="text-slate-400 font-normal">Study Hub</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono -mt-1 hidden sm:block">
                Sprint 4 · Engenharia de Software
              </span>
            </div>
          </a>

          {/* Nav links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 border border-slate-800/80 px-2 py-1 rounded-full">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`text-xs font-medium px-3.5 py-1.5 rounded-full transition-colors ${
                    isActive
                      ? 'text-white bg-slate-800 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleSound}
              type="button"
              title={isMuted ? 'Ativar sons da interface' : 'Silenciar sons'}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-indigo-400" />}
            </button>

            <a
              href="#contato"
              onClick={handleLinkClick}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
            >
              <span>Fale Conosco</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => {
                soundEffects.click();
                setIsOpen(!isOpen);
              }}
              type="button"
              className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
              aria-label="Abrir menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[57px] bg-[#080c14] border-b border-slate-800 p-5 shadow-2xl">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={handleLinkClick}
                className="text-sm font-medium py-2.5 px-3 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contato"
              onClick={handleLinkClick}
              className="mt-3 text-center text-xs font-semibold py-2.5 px-4 rounded-lg bg-indigo-600 text-white"
            >
              Fale com os Desenvolvedores
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
