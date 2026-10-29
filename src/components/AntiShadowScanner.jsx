import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Sliders, CheckCircle2, AlertTriangle, Eye, Zap, Layers, RefreshCw, ZoomIn, Download } from 'lucide-react';
import { soundEffects } from '../utils/audio';

export default function AntiShadowScanner() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('calculo');
  const [activeFilterMode, setActiveFilterMode] = useState('smart-clean');
  const containerRef = useRef(null);

  const subjects = [
    {
      id: 'calculo',
      name: 'Cálculo I · Integrais',
      shadowImg: '/assets/images/chalkboard-shadow.jpg',
      cleanImg: '/assets/images/chalkboard-clean.jpg',
      equation: '∫ (3x² + 2x - 5) dx = x³ + x² - 5x + C',
      pain: 'Sombra da cabeça do aluno bloqueando a constante C e limites de integração.',
      gain: 'Contraste adaptativo restaurou as fórmulas com nitidez de livro didático.'
    },
    {
      id: 'engenharia',
      name: 'Engenharia de Software · Arquitetura',
      shadowImg: '/assets/images/hero-scan.jpg',
      cleanImg: '/assets/images/student-pov-scan.jpg',
      equation: 'Class: StudySession -> [ScanService] -> GeminiVisionAPI',
      pain: 'Reflexo das lâmpadas fluorescentes da sala apagando anotações de fluxo.',
      gain: 'Eliminação de aberrações de luz e isolamento vetorial das caixas UML.'
    }
  ];

  const currentSubject = subjects.find(s => s.id === selectedSubject) || subjects[0];

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percent);
  }, []);

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseDown = () => {
    setIsDragging(true);
    soundEffects.click();
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMoveWindow = (e) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMoveWindow);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMoveWindow);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMove]);

  return (
    <section id="scanner" className="py-24 relative overflow-hidden bg-[#070b14]/70 border-y border-white/5">
      
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b08_1px,transparent_1px),linear-gradient(to_bottom,#1e293b08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>ALGORITMO ANTI-SOMBRA INTERATIVO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Arraste e veja a sombra <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">desaparecer da lousa</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base leading-relaxed">
            Teste você mesmo a tecnologia central do Jovi. Compare lado a lado a foto comum tirada pelo estudante com a versão tratada em tempo real pelo algoritmo de equalização de luminância.
          </p>

          {/* Subject Switcher Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {subjects.map(s => (
              <button
                key={s.id}
                onClick={() => {
                  soundEffects.click();
                  setSelectedSubject(s.id);
                }}
                className={`text-xs font-medium px-4 py-2 rounded-xl transition-all border ${
                  selectedSubject === s.id
                    ? 'bg-indigo-600 text-white border-indigo-400/50 shadow-lg shadow-indigo-600/30 scale-105'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white border-white/5 hover:bg-slate-700/60'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Comparison Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Visual Slider (8 cols) */}
          <div className="lg:col-span-8">
            <div className="relative rounded-2xl p-1 bg-gradient-to-b from-white/10 via-white/5 to-transparent shadow-2xl">
              
              {/* Image Comparison Box */}
              <div
                ref={containerRef}
                onMouseDown={handleMouseDown}
                onTouchMove={handleTouchMove}
                className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-xl overflow-hidden cursor-ew-resize select-none bg-black shadow-inner"
              >
                {/* Clean Image (Processed - Background Base) */}
                <img
                  src={currentSubject.cleanImg}
                  alt="Lousa processada sem sombras"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Clean Label Badge */}
                <div className="absolute top-4 right-4 z-20 bg-emerald-500/90 text-slate-950 font-mono text-[11px] font-bold px-3 py-1 rounded-full shadow-lg backdrop-blur-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-950" />
                  <span>Jovi Smart Clean</span>
                </div>

                {/* Shadow Image (Clipped by slider percentage) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img
                    src={currentSubject.shadowImg}
                    alt="Foto original com sombra"
                    className="absolute inset-0 w-full h-full object-cover max-w-none"
                    style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }}
                  />
                  {/* Shadow Label Badge */}
                  <div className="absolute top-4 left-4 z-20 bg-rose-500/90 text-white font-mono text-[11px] font-bold px-3 py-1 rounded-full shadow-lg backdrop-blur-sm flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-white" />
                    <span>Captura Original com Sombra</span>
                  </div>
                </div>

                {/* Slider Handle Divider */}
                <div
                  className="absolute top-0 bottom-0 z-30 w-0.5 bg-white shadow-[0_0_12px_#ffffff]"
                  style={{ left: `${sliderPosition}%` }}
                >
                  {/* Center Circle Knob */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900 border-2 border-white shadow-xl flex items-center justify-center text-white cursor-ew-resize hover:scale-110 active:scale-95 transition-transform">
                    <Sliders className="w-4 h-4 text-cyan-400 rotate-90" />
                  </div>
                </div>

                {/* Bottom Overlay Hint */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none bg-black/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-[11px] text-slate-300 font-mono flex items-center gap-2">
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Arraste para a esquerda ou direita</span>
                </div>
              </div>

              {/* Slider Quick Presets Buttons */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#0a0f1d] rounded-b-xl border-t border-white/5 text-xs text-slate-400">
                <span className="font-mono">Posição: {Math.round(sliderPosition)}%</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      soundEffects.click();
                      setSliderPosition(20);
                    }}
                    className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  >
                    20% (Original)
                  </button>
                  <button
                    onClick={() => {
                      soundEffects.click();
                      setSliderPosition(50);
                    }}
                    className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  >
                    50% (Divisão)
                  </button>
                  <button
                    onClick={() => {
                      soundEffects.click();
                      setSliderPosition(80);
                    }}
                    className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  >
                    80% (Processado)
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Metrics & Analytical Panel (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            
            <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-xl">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Telemetria do Algoritmo</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1 mb-5">
                Processamento local de imagem com WebGL shaders e aceleração gráfica.
              </p>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-slate-300">Remoção de Sombra</span>
                    <span className="text-emerald-400 font-bold">98.4%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full rounded-full w-[98.4%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-slate-300">Preservação do Giz/Caneta</span>
                    <span className="text-cyan-400 font-bold">99.1%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full rounded-full w-[99.1%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-slate-300">Acurácia OCR Gemini</span>
                    <span className="text-indigo-400 font-bold">100%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full w-[100%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-slate-300">Latência do Disparo</span>
                    <span className="text-amber-400 font-bold">18ms</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full rounded-full w-[15%]"></div>
                  </div>
                </div>
              </div>

              {/* Diagnosis box */}
              <div className="mt-6 pt-5 border-t border-white/5 space-y-3">
                <div className="text-xs">
                  <span className="text-rose-400 font-semibold block mb-0.5">Problema Detectado:</span>
                  <span className="text-slate-300">{currentSubject.pain}</span>
                </div>
                <div className="text-xs">
                  <span className="text-emerald-400 font-semibold block mb-0.5">Solução Aplicada:</span>
                  <span className="text-slate-300">{currentSubject.gain}</span>
                </div>
              </div>
            </div>

            {/* Quick action button to AI Studio */}
            <a
              href="#studio"
              onClick={() => soundEffects.click()}
              className="w-full inline-flex items-center justify-center gap-2 p-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold text-xs transition-all shadow-lg shadow-indigo-600/20 border border-indigo-400/30"
            >
              <span>Gerar Flashcards e Resumo Desta Lousa</span>
              <Layers className="w-4 h-4 text-cyan-300" />
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}

