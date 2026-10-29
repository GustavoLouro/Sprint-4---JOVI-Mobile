import React from 'react';
import { ArrowUp, ExternalLink, Heart } from 'lucide-react';
import { soundEffects } from '../utils/audio';

export default function Footer() {
  const scrollToTop = () => {
    soundEffects.click();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#05070d] border-t border-white/10 text-slate-400 text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Col (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-[1.5px]">
                <div className="w-full h-full bg-[#080c16] rounded-[10px] flex items-center justify-center">
                  <span className="w-2.5 h-2.5 rounded-full border border-cyan-400"></span>
                </div>
              </div>
              <span className="text-lg font-display font-black text-white">
                Jovi<span className="text-cyan-400">Hub</span>
                <span className="ml-1 text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20">
                  Sprint 4
                </span>
              </span>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm max-w-sm leading-relaxed">
              A câmera que não só fotografa: ela ensina. Desenvolvida para resolver as dores reais de estudantes universitários através de visão computacional e inteligência artificial generativa.
            </p>

            <div className="text-[11px] font-mono text-slate-500">
              Challenge JOVI + FIAP 2026 · Engenharia de Software
            </div>
          </div>

          {/* Navigation Col (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Navegação
            </h4>
            <ul className="space-y-2">
              <li><a href="#solucao" className="hover:text-cyan-400 transition-colors">A Solução</a></li>
              <li><a href="#scanner" className="hover:text-cyan-400 transition-colors">Scanner Anti-Sombra</a></li>
              <li><a href="#studio" className="hover:text-cyan-400 transition-colors">AI Studio &amp; Flashcards</a></li>
              <li><a href="#demonstracao" className="hover:text-cyan-400 transition-colors">Demonstração em Vídeo</a></li>
              <li><a href="#publico" className="hover:text-cyan-400 transition-colors">Público-Alvo</a></li>
              <li><a href="#galeria" className="hover:text-cyan-400 transition-colors">Galeria Visual</a></li>
              <li><a href="#equipe" className="hover:text-cyan-400 transition-colors">Nossa Equipe</a></li>
              <li><a href="#contato" className="hover:text-cyan-400 transition-colors">Fale Conosco</a></li>
            </ul>
          </div>

          {/* Academic specs (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Entrega Conjunta · Sprint 4
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Projeto unificado para as disciplinas de <strong className="text-white">Front-End Design</strong> e <strong className="text-white">Web Development</strong>.
            </p>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 space-y-1.5 text-[11px] font-mono">
              <div className="text-cyan-300">⚛️ React 18 SPA + Vite</div>
              <div className="text-indigo-300">🎨 Tailwind CSS v3 Responsivo</div>
              <div className="text-emerald-300">🚀 Publicação Git + Vercel</div>
              <div className="text-slate-300">📄 INTEGRANTES.TXT incluso na raiz</div>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-slate-500">
            © 2026 Jovi Study Hub · Desenvolvido pelo Grupo de Engenharia de Software da FIAP.
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/5 text-[11px] font-mono transition-colors"
          >
            <span>Voltar ao Topo</span>
            <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>
      </div>
    </footer>
  );
}
