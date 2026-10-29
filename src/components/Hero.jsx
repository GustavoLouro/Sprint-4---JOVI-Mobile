import React from 'react';
import { ArrowRight, Play, Eye, Sliders, CheckCircle, Shield } from 'lucide-react';
import { soundEffects } from '../utils/audio';

export default function Hero() {
  return (
    <section id="topo" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      
      {/* Background subtle radial gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-gradient-to-b from-indigo-950/20 via-transparent to-transparent pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Context & Real Student Problem */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Challenge JOVI · FIAP 2026</span>
              <span className="text-slate-500">/</span>
              <span className="text-slate-400">Engenharia de Software</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-white leading-tight">
              Chega de foto da lousa com sombra e fórmula apagada.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              A gente sabe como é: você senta na carteira, tira foto do quadro e a própria sombra ou o reflexo da lâmpada tampa a resolução do professor. O <strong className="text-white font-medium">Jovi Study Hub</strong> equaliza a iluminação na hora e já organiza a matéria em resumos e flashcards de revisão para a semana de provas.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1">
              <a
                href="#scanner"
                onClick={() => soundEffects.click()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors shadow-sm"
              >
                <span>Testar Remoção de Sombra</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#demonstracao"
                onClick={() => soundEffects.click()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 font-medium text-sm border border-slate-700/60 transition-colors"
              >
                <Play className="w-4 h-4 fill-slate-300 text-slate-300" />
                <span>Ver Vídeo da Demonstração</span>
              </a>
            </div>

            {/* Real project facts */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white">42 alunos</div>
                <div className="text-xs text-slate-400 mt-0.5">Entrevistados na pesquisa de campo</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white">Direto no App</div>
                <div className="text-xs text-slate-400 mt-0.5">Sem precisar transcrever à mão</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white">100% Web</div>
                <div className="text-xs text-slate-400 mt-0.5">Construído em React + Tailwind</div>
              </div>
            </div>

          </div>

          {/* Right Column: Realistic Viewfinder Mockup */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-2 shadow-2xl">
              
              {/* Header Bar */}
              <div className="px-3 py-2 flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/60 mb-2">
                <span className="font-mono text-[11px] text-slate-300">Câmera Jovi · Sala 402</span>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Anti-Sombra Ativo
                </span>
              </div>

              {/* Viewfinder Preview */}
              <div className="relative aspect-[4/3] bg-black rounded-lg overflow-hidden">
                <img
                  src="/assets/images/student-chalkboard-video-cover.jpg"
                  alt="Estudante fotografando a lousa de cálculo"
                  className="w-full h-full object-cover"
                />

                {/* Focus Crosshairs */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-36 h-28 border border-white/40 rounded flex items-center justify-center">
                    <span className="text-[10px] font-mono text-white/90 bg-black/60 px-2 py-0.5 rounded">
                      ∫ f(x) dx · Foco
                    </span>
                  </div>
                </div>

                {/* Viewfinder corners */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-white/70"></div>
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-white/70"></div>
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-white/70"></div>
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-white/70"></div>

                {/* Bottom info tag */}
                <div className="absolute bottom-2.5 inset-x-2.5 bg-black/80 backdrop-blur-sm rounded-md px-3 py-1.5 border border-white/10 flex items-center justify-between text-[11px]">
                  <span className="text-slate-300">Correção de luminância em tempo real</span>
                  <a
                    href="#scanner"
                    className="text-indigo-400 hover:text-indigo-300 font-medium"
                  >
                    Comparar →
                  </a>
                </div>
              </div>

              {/* Footer controls */}
              <div className="px-3 py-2 flex items-center justify-between text-[11px] text-slate-400 mt-1">
                <span>Lousa: Verde Fosco</span>
                <span className="font-mono">Filtro: Alto Contraste</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
