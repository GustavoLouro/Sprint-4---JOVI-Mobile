import React from 'react';
import { ArrowUp } from 'lucide-react';
import { soundEffects } from '../utils/audio';

export default function Footer() {
  const scrollToTop = () => {
    soundEffects.click();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#060a12] border-t border-slate-800 text-slate-400 text-xs py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800/60">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              <span className="text-white font-semibold text-sm">Jovi Study Hub</span>
              <span className="text-slate-500 text-[11px] font-mono">Sprint 4</span>
            </div>
            <p className="text-slate-400 text-xs mt-1">
              Challenge JOVI + FIAP 2026 · Engenharia de Software
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px] border border-slate-800 transition-colors"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
          <p>© 2026 Jovi Study Hub · Projeto acadêmico desenvolvido pelos estudantes da FIAP.</p>
          <p>Entrega conjunta: Front-End Design &amp; Web Development</p>
        </div>
      </div>
    </footer>
  );
}
