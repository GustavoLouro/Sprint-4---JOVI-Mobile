import React from 'react';
import { Camera, Sparkles, Sliders, Layers, Clock, ShieldAlert, Cpu, ArrowRight } from 'lucide-react';
import LiveViewfinderDemo from './LiveViewfinderDemo';

export default function SolutionBento() {
  return (
    <section id="solucao" className="py-24 relative overflow-hidden bg-[#060911]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>A SOLUÇÃO JOVI STUDY HUB</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            A câmera inteligente que entende a <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">rotina do estudante universitário</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base leading-relaxed">
            Unimos captura fotográfica em tempo real, inteligência artificial generativa multimodal (Google Gemini) e um repositório centralizado para transformar anotações soltas em aprovação nas disciplinas.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">
          
          {/* Card 1: The Problem (5 cols) */}
          <div className="md:col-span-5 bg-gradient-to-br from-rose-950/20 via-slate-900 to-slate-900 border border-rose-500/20 rounded-3xl p-7 shadow-xl flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 font-mono text-[10px] uppercase font-bold mb-4">
                <ShieldAlert className="w-3 h-3 text-rose-400" />
                <span>O Problema em Sala de Aula</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Fotos escuras, sombras bloqueando fórmulas e galerias caóticas
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Universitários tiram centenas de fotos do quadro toda semana. Quando a prova chega, a sombra da cabeça do próprio aluno ou reflexos de lâmpadas tampam números vitais, e as fotos ficam perdidas no meio de memes e prints aleatórios.
              </p>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-rose-500/10">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-rose-500/20 text-xs text-rose-200 flex items-center gap-2">
                <span className="text-base">📸</span>
                <span>87% dos alunos relatam não achar a foto exata na véspera da prova</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-rose-500/20 text-xs text-rose-200 flex items-center gap-2">
                <span className="text-base">🌑</span>
                <span>Sombras projetadas na lousa inviabilizam a compreensão de passos lógicos</span>
              </div>
            </div>
          </div>

          {/* Card 2: 10 AI Effects (3 cols) */}
          <div className="md:col-span-3 bg-gradient-to-br from-indigo-950/30 via-slate-900 to-slate-900 border border-indigo-500/20 rounded-3xl p-7 shadow-xl flex flex-col justify-between">
            <div>
              <div className="text-4xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 mb-2">
                10
              </div>
              <h4 className="text-base font-bold text-white mb-2">AI Effects Fotográficos</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Anti-Sombra, Night Vision, Chalkboard Mono, Blueprint, Anime Boost e outros estilos de disparo já integrados à câmera móvel.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-mono text-cyan-300">
              Armados no obturador a 60 FPS
            </div>
          </div>

          {/* Card 3: AI Studio Multi-Intent (4 cols) */}
          <div className="md:col-span-4 bg-gradient-to-br from-cyan-950/20 via-slate-900 to-slate-900 border border-cyan-500/20 rounded-3xl p-7 shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">AI Studio Multi-Intent</h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Chat multimodal conectado ao Gemini Vision que transforma a foto em 4 formatos de estudo ativo simultâneos: Resumo, Flashcards, Mapas e Perguntas de Prova.
              </p>
            </div>
            <a
              href="#studio"
              className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <span>Conhecer o Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* Embedded Interactive Live Viewfinder Simulator */}
        <div className="mb-16">
          <LiveViewfinderDemo />
        </div>

        {/* 24-Hour Student Journey Timeline */}
        <div className="bg-[#0b101e] border border-white/10 rounded-3xl p-8 shadow-2xl">
          <h3 className="text-xl font-bold text-white text-center mb-10">
            Jornada 24h: Do primeiro clique à revisão no AI Archive
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="relative p-5 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-indigo-500/30 transition-colors">
              <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">
                09:00 · EM AULA
              </span>
              <h4 className="text-sm font-bold text-white mt-3 mb-1">Live Viewfinder</h4>
              <p className="text-xs text-slate-400">
                Disparo instantâneo com zoom óptico e filtro anti-sombra em tempo real sem precisar levantar da carteira.
              </p>
            </div>

            <div className="relative p-5 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-indigo-500/30 transition-colors">
              <span className="text-[10px] font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                10:30 · INTERVALO
              </span>
              <h4 className="text-sm font-bold text-white mt-3 mb-1">AI Studio</h4>
              <p className="text-xs text-slate-400">
                O Gemini Vision extrai as equações da lousa e gera um deck de flashcards com animação 3D de flip.
              </p>
            </div>

            <div className="relative p-5 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-indigo-500/30 transition-colors">
              <span className="text-[10px] font-mono font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
                15:00 · GRUPO DE ESTUDO
              </span>
              <h4 className="text-sm font-bold text-white mt-3 mb-1">Mapa Conceitual</h4>
              <p className="text-xs text-slate-400">
                Navegação visual pelas ramificações conceituais da matéria para conectar teoremas a exercícios práticos.
              </p>
            </div>

            <div className="relative p-5 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-indigo-500/30 transition-colors">
              <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                21:00 · VÉSPERA DA PROVA
              </span>
              <h4 className="text-sm font-bold text-white mt-3 mb-1">AI Archive Central</h4>
              <p className="text-xs text-slate-400">
                Revisão rápida de todos os flashcards e anotações categorizadas por disciplina com busca inteligente.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
