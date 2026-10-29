import React, { useState } from 'react';
import { Sparkles, Play, Scan, ArrowRight, ShieldCheck, Zap, Layers, Cpu } from 'lucide-react';
import { soundEffects } from '../utils/audio';

export default function Hero({ onOpenScanner }) {
  const [activeTab, setActiveTab] = useState('live');

  return (
    <section id="topo" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & Value Proposition */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium backdrop-blur-sm shadow-inner">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span className="font-semibold text-white">Sprint 4 · React + Tailwind</span>
              <span className="text-slate-500">•</span>
              <span>Challenge JOVI + FIAP 2026</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-white leading-[1.12]">
              A câmera inteligente que{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-indigo-500">
                transforma sua aula
              </span>{' '}
              em aprendizado real.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Esqueça fotos com sombras da cabeça, reflexos que apagam fórmulas e rolo da câmera desorganizado. O <strong className="text-white font-semibold">Jovi Study Hub</strong> une um <span className="text-cyan-300">Live Viewfinder com 10 AI Effects</span> ao poder do <span className="text-indigo-300">Google Gemini Vision</span> para extrair resumos, flashcards e mapas mentais em segundos.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#scanner"
                onClick={() => soundEffects.click()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-white font-semibold text-sm shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all border border-cyan-400/30"
              >
                <Scan className="w-4 h-4 text-cyan-200" />
                <span>Testar Scanner Anti-Sombra</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#demonstracao"
                onClick={() => soundEffects.click()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 hover:text-white font-semibold text-sm border border-white/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Play className="w-4 h-4 text-indigo-400 fill-indigo-400/20" />
                <span>Ver Demonstração em Vídeo</span>
              </a>
            </div>

            {/* Key Metrics / Student Trust */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="text-left">
                <div className="text-2xl sm:text-3xl font-display font-extrabold text-white">+40</div>
                <div className="text-xs text-slate-400">Alunos universitários entrevistados</div>
              </div>
              <div className="text-left">
                <div className="text-2xl sm:text-3xl font-display font-extrabold text-cyan-400">1 Toque</div>
                <div className="text-xs text-slate-400">Da foto da lousa aos flashcards</div>
              </div>
              <div className="text-left">
                <div className="text-2xl sm:text-3xl font-display font-extrabold text-indigo-400">100%</div>
                <div className="text-xs text-slate-400">Integrado ao Gemini Vision</div>
              </div>
            </div>

          </div>

          {/* Right Column: High-End Live Interactive Camera Mockup */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md rounded-2xl p-[1.5px] bg-gradient-to-b from-cyan-400/30 via-indigo-500/20 to-transparent shadow-2xl shadow-indigo-950/60">
              
              <div className="relative rounded-[15px] bg-[#0c1220] overflow-hidden border border-white/10">
                {/* Mockup Topbar */}
                <div className="bg-[#090d18] px-4 py-3 flex items-center justify-between border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-300">
                    <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Jovi AI Viewfinder · 60 FPS</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase font-semibold">ATIVO</span>
                  </div>
                </div>

                {/* Viewport Frame with Scanner Overlay */}
                <div className="relative aspect-[4/3] bg-black overflow-hidden group">
                  <img
                    src="/assets/images/student-chalkboard-video-cover.jpg"
                    alt="Estudante em sala de aula escaneando a lousa com o Jovi Study Hub"
                    className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Scanning Laser Beam */}
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-scan pointer-events-none" />

                  {/* Crosshair Viewfinder corners */}
                  <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-cyan-400 pointer-events-none"></div>
                  <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-cyan-400 pointer-events-none"></div>
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-cyan-400 pointer-events-none"></div>
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-cyan-400 pointer-events-none"></div>

                  {/* Target Detection Box */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-32 border border-dashed border-cyan-400/60 rounded-lg flex items-center justify-center pointer-events-none">
                    <span className="text-[10px] font-mono text-cyan-300 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm border border-cyan-400/40">
                      Cálculo I: Integral de Riemann
                    </span>
                  </div>

                  {/* Floating Live Badge */}
                  <div className="absolute bottom-3 left-3 right-3 bg-black/75 backdrop-blur-md rounded-xl p-2.5 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-cyan-300">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">Algoritmo Anti-Sombra</div>
                        <div className="text-[10px] text-emerald-400 font-mono">Correção de Luminância +94%</div>
                      </div>
                    </div>
                    <a
                      href="#studio"
                      onClick={() => soundEffects.click()}
                      className="text-[11px] font-semibold text-white bg-indigo-600 hover:bg-indigo-500 px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 shadow-sm"
                    >
                      <span>Abrir Studio</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Viewfinder Controls Footer */}
                <div className="bg-[#090d18] px-4 py-3 flex items-center justify-between text-xs text-slate-400 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                      F/1.8 · ISO 200
                    </span>
                    <span className="font-mono text-[11px] text-cyan-400">
                      HDR Auto
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[11px]">Sem reflexos detectados</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Subtle decorative badge floating */}
            <div className="hidden sm:flex absolute -bottom-5 -left-6 bg-slate-900/90 backdrop-blur-md border border-white/10 p-3 rounded-2xl shadow-xl items-center gap-3 z-10 animate-float">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Gemini Vision 2.5</div>
                <div className="text-[10px] text-slate-400">Extração OCR Multimodal</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

