import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Sliders, ArrowLeftRight, Check, AlertCircle } from 'lucide-react';
import { soundEffects } from '../utils/audio';

export default function AntiShadowScanner() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('calculo');
  const containerRef = useRef(null);

  const subjects = [
    {
      id: 'calculo',
      name: 'Lousa de Giz · Cálculo I',
      shadowImg: '/assets/images/chalkboard-shadow.jpg',
      cleanImg: '/assets/images/chalkboard-clean.jpg',
      pain: 'Sombra da cabeça do aluno cobrindo o expoente e a constante de integração (+ C).',
      gain: 'Equalização de contraste adaptativo que isolou o traço do giz e eliminou a mancha escura.'
    },
    {
      id: 'engenharia',
      name: 'Quadro Branco · Arquitetura de Software',
      shadowImg: '/assets/images/hero-scan.jpg',
      cleanImg: '/assets/images/student-pov-scan.jpg',
      pain: 'Reflexo da lâmpada fluorescente apagando a seta de herança do diagrama de classes.',
      gain: 'Correção de brilho e redução de reflexo sem apagar as canetas mais claras.'
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
    <section id="scanner" className="py-20 relative bg-[#090e18] border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono font-semibold text-indigo-400 uppercase tracking-wider">
            Processamento de Imagem
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Arraste para comparar a foto original com a tratada
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Testamos com fotos reais tiradas em sala de aula na FIAP. Arraste a barra central para a esquerda e para a direita para ver a diferença prática.
          </p>

          {/* Subject Switcher */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {subjects.map(s => (
              <button
                key={s.id}
                onClick={() => {
                  soundEffects.click();
                  setSelectedSubject(s.id);
                }}
                className={`text-xs font-medium px-3.5 py-1.5 rounded-lg transition-colors border ${
                  selectedSubject === s.id
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          {/* Main Visual Slider (8 cols) */}
          <div className="lg:col-span-8">
            <div className="rounded-xl overflow-hidden border border-slate-800 bg-black shadow-xl">
              
              <div
                ref={containerRef}
                onMouseDown={handleMouseDown}
                onTouchMove={handleTouchMove}
                className="relative aspect-[16/10] w-full cursor-ew-resize select-none overflow-hidden"
              >
                {/* Clean Image (Processed) */}
                <img
                  src={currentSubject.cleanImg}
                  alt="Lousa tratada sem sombras"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                <div className="absolute top-3 right-3 z-20 bg-slate-900/90 text-emerald-400 font-mono text-[10px] font-semibold px-2.5 py-1 rounded border border-emerald-500/30">
                  Tratado pelo Jovi
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
                  <div className="absolute top-3 left-3 z-20 bg-slate-900/90 text-rose-400 font-mono text-[10px] font-semibold px-2.5 py-1 rounded border border-rose-500/30">
                    Foto Original da Câmera
                  </div>
                </div>

                {/* Slider Handle Divider */}
                <div
                  className="absolute top-0 bottom-0 z-30 w-0.5 bg-white"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900 border border-white text-white flex items-center justify-center shadow-lg">
                    <ArrowLeftRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Slider Footer */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 text-xs text-slate-400 border-t border-slate-800/80">
                <span className="font-mono text-[11px]">Comparativo: {Math.round(sliderPosition)}%</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      soundEffects.click();
                      setSliderPosition(20);
                    }}
                    className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px]"
                  >
                    Original
                  </button>
                  <button
                    onClick={() => {
                      soundEffects.click();
                      setSliderPosition(50);
                    }}
                    className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px]"
                  >
                    50 / 50
                  </button>
                  <button
                    onClick={() => {
                      soundEffects.click();
                      setSliderPosition(80);
                    }}
                    className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px]"
                  >
                    Tratado
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Technical Explanations Panel (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 text-xs space-y-4">
              <h3 className="text-sm font-semibold text-white">Como o algoritmo atua nesta cena</h3>
              
              <div>
                <span className="font-medium text-rose-400 block mb-1">Dificuldade da foto bruta:</span>
                <p className="text-slate-300 leading-relaxed">{currentSubject.pain}</p>
              </div>

              <div className="pt-3 border-t border-slate-800">
                <span className="font-medium text-emerald-400 block mb-1">Tratamento realizado:</span>
                <p className="text-slate-300 leading-relaxed">{currentSubject.gain}</p>
              </div>

              <div className="pt-3 border-t border-slate-800 space-y-2">
                <span className="font-medium text-slate-200 block">Etapas do pipeline no navegador:</span>
                <ul className="space-y-1.5 text-slate-400">
                  <li className="flex items-start gap-1.5">
                    <span className="text-indigo-400 font-bold">1.</span>
                    <span>Segmentação da área de interesse da lousa</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-indigo-400 font-bold">2.</span>
                    <span>Equalização local de histograma de luz</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-indigo-400 font-bold">3.</span>
                    <span>Acentuação de bordas do giz e canetas</span>
                  </li>
                </ul>
              </div>
            </div>

            <a
              href="#studio"
              className="w-full text-center block py-2.5 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition-colors"
            >
              Ver Flashcards Gerados a Partir Desta Lousa →
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}
