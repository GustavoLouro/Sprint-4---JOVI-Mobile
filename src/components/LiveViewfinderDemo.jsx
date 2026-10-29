import React, { useState } from 'react';
import { Camera, ZoomIn, Sliders, Sparkles, Shield, Circle, Sun, Moon, Contrast, Palette } from 'lucide-react';
import { soundEffects } from '../utils/audio';

export default function LiveViewfinderDemo() {
  const [selectedEffect, setSelectedEffect] = useState('anti-shadow');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedFeedback, setCapturedFeedback] = useState(false);

  const effects = [
    { id: 'anti-shadow', name: 'Anti-Sombra', filter: 'brightness(1.15) contrast(1.25) saturate(1.1)', desc: 'Equalização de luminância e remoção de sombras projetadas.', icon: Shield },
    { id: 'chalkboard-mono', name: 'Lousa Mono', filter: 'grayscale(100%) contrast(1.5) brightness(1.1)', desc: 'Preto e branco de alto contraste para fórmulas matemáticas.', icon: Contrast },
    { id: 'night-vision', name: 'Night Vision', filter: 'hue-rotate(85deg) brightness(1.2) contrast(1.3)', desc: 'Otimizado para salas de aula escuras com projetor.', icon: Moon },
    { id: 'blueprint', name: 'Blueprint', filter: 'invert(90%) hue-rotate(180deg) contrast(1.4)', desc: 'Estilo cianótipo técnico para diagramas e circuitos.', icon: Palette },
    { id: 'anime-boost', name: 'Anime Boost', filter: 'saturate(2) contrast(1.2) brightness(1.05)', desc: 'Cores vibrantes para canetas coloridas de resumos.', icon: Sparkles },
    { id: 'high-contrast', name: 'Ultra Contraste', filter: 'contrast(1.8) brightness(1.05)', desc: 'Isola o texto escrito de imperfeições da parede.', icon: Contrast },
    { id: 'warm-lecture', name: 'Aula Aconchegante', filter: 'sepia(35%) contrast(1.1) brightness(1.05)', desc: 'Temperatura de cor quente para leitura prolongada.', icon: Sun },
    { id: 'cyberpunk', name: 'Cyberpunk HUD', filter: 'hue-rotate(240deg) saturate(1.8) contrast(1.3)', desc: 'Gradiente magenta/ciano para foco em pontos de destaque.', icon: Sparkles },
    { id: 'invert-xray', name: 'Raio-X Invertido', filter: 'invert(100%) contrast(1.5)', desc: 'Inverte lousa escura em papel branco com texto escuro.', icon: Circle },
    { id: 'clean-whiteboard', name: 'Lousa Branca', filter: 'brightness(1.2) contrast(1.35) saturate(0.9)', desc: 'Remove o reflexo característico de canetas piloto.', icon: Sliders },
  ];

  const currentEffect = effects.find(e => e.id === selectedEffect) || effects[0];

  const handleCapture = () => {
    soundEffects.shutter();
    setIsCapturing(true);
    setCapturedFeedback(true);
    setTimeout(() => {
      setIsCapturing(false);
      setTimeout(() => setCapturedFeedback(false), 2000);
    }, 200);
  };

  return (
    <div className="bg-[#0b101e] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-lg">
            SIMULADOR DO OBTURADOR
          </span>
          <h3 className="text-xl font-bold text-white mt-2">Live Viewfinder: 10 AI Effects Armados no Disparo</h3>
          <p className="text-xs text-slate-400 mt-1">
            Escolha um estilo fotográfico abaixo e veja a alteração em tempo real no feed da câmera.
          </p>
        </div>

        {/* Zoom controls */}
        <div className="flex items-center gap-1.5 bg-slate-900 border border-white/10 p-1 rounded-xl">
          {[1, 2, 3].map(z => (
            <button
              key={z}
              onClick={() => {
                soundEffects.click();
                setZoomLevel(z);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                zoomLevel === z
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {z}×
            </button>
          ))}
        </div>
      </div>

      {/* Camera Live Preview */}
      <div className="relative aspect-[16/9] bg-black rounded-2xl overflow-hidden border border-white/10 select-none group">
        
        {/* Flash overlay upon shutter */}
        {isCapturing && (
          <div className="absolute inset-0 bg-white z-50 animate-ping opacity-90 pointer-events-none" />
        )}

        {/* Scaled & Filtered Image */}
        <div
          className="w-full h-full transition-all duration-300 flex items-center justify-center overflow-hidden"
          style={{
            filter: currentEffect.filter,
            transform: `scale(${zoomLevel})`,
          }}
        >
          <img
            src="/assets/images/student-chalkboard-video-cover.jpg"
            alt="Simulação da câmera do Jovi"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Live HUD Elements */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
          <div className="bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[11px] font-mono text-cyan-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>EFEITO: {currentEffect.name.toUpperCase()}</span>
          </div>
          <div className="bg-black/70 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/10 text-[11px] font-mono text-slate-300">
            {zoomLevel}× ZOOM
          </div>
        </div>

        <div className="absolute top-4 right-4 z-20 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[11px] font-mono text-slate-300">
          60 FPS · 4K RAW
        </div>

        {/* Viewfinder Grid overlay */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none border border-white/5 opacity-40">
          <div className="border-r border-b border-white/15"></div>
          <div className="border-r border-b border-white/15"></div>
          <div className="border-b border-white/15"></div>
          <div className="border-r border-b border-white/15"></div>
          <div className="border-r border-b border-white/15"></div>
          <div className="border-b border-white/15"></div>
          <div className="border-r border-white/15"></div>
          <div className="border-r border-white/15"></div>
          <div></div>
        </div>

        {/* Captured Toast */}
        {capturedFeedback && (
          <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/50 backdrop-blur-sm">
            <div className="bg-slate-900 border border-emerald-400/50 p-4 rounded-2xl text-center shadow-2xl animate-bounce">
              <span className="text-2xl block mb-1">📸</span>
              <div className="text-xs font-bold text-white">Foto Capturada com {currentEffect.name}!</div>
              <div className="text-[10px] text-slate-400">Enviada para processamento do Gemini Vision</div>
            </div>
          </div>
        )}

        {/* Bottom Shutter Bar */}
        <div className="absolute bottom-4 inset-x-4 z-20 flex items-center justify-between bg-black/70 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10">
          <div className="text-xs text-slate-300 max-w-sm truncate hidden sm:block">
            {currentEffect.desc}
          </div>

          {/* Shutter Button */}
          <button
            onClick={handleCapture}
            className="mx-auto sm:mx-0 relative w-12 h-12 rounded-full border-2 border-white p-1 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
            aria-label="Disparar foto"
          >
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-500 shadow-[0_0_12px_#06b6d4]"></div>
          </button>
        </div>

      </div>

      {/* 10 AI Effects Carousel Chips */}
      <div className="mt-6">
        <div className="text-xs font-mono text-slate-400 mb-3">SELECIONE O EFEITO DESEJADO:</div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {effects.map(effect => {
            const Icon = effect.icon;
            const isSelected = selectedEffect === effect.id;
            return (
              <button
                key={effect.id}
                onClick={() => {
                  soundEffects.click();
                  setSelectedEffect(effect.id);
                }}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-indigo-600/30 border-cyan-400 text-white shadow-lg shadow-indigo-600/20'
                    : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <span className="text-xs font-bold truncate">{effect.name}</span>
                </div>
                <div className="text-[10px] text-slate-400 line-clamp-1">{effect.desc}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

