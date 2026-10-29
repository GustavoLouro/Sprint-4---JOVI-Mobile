import React, { useState } from 'react';
import { Camera, Sliders, Moon, Sun, Contrast, RotateCw } from 'lucide-react';
import { soundEffects } from '../utils/audio';

export default function LiveViewfinderDemo() {
  const [selectedEffect, setSelectedEffect] = useState('alto-contraste');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [capturedFeedback, setCapturedFeedback] = useState(false);

  const presets = [
    {
      id: 'alto-contraste',
      name: 'Alto Contraste',
      filter: 'contrast(1.6) brightness(1.1)',
      desc: 'Destaca o giz branco em lousas escuras desgastadas.',
      icon: Contrast
    },
    {
      id: 'anti-reflexo',
      name: 'Quadro Branco',
      filter: 'brightness(1.15) contrast(1.3) saturate(0.9)',
      desc: 'Atenua o reflexo direto das lâmpadas de teto nas canetas de quadro.',
      icon: Sun
    },
    {
      id: 'sala-projetor',
      name: 'Sala com Projetor',
      filter: 'brightness(1.25) contrast(1.35) hue-rotate(15deg)',
      desc: 'Melhora a legibilidade quando a sala está com meia-luz.',
      icon: Moon
    },
    {
      id: 'inversao-mono',
      name: 'Inversão para Impressão',
      filter: 'invert(100%) contrast(1.4)',
      desc: 'Transforma fundo escuro em branco com texto preto (economiza tinta).',
      icon: RotateCw
    }
  ];

  const currentPreset = presets.find(p => p.id === selectedEffect) || presets[0];

  const handleCapture = () => {
    soundEffects.shutter();
    setCapturedFeedback(true);
    setTimeout(() => setCapturedFeedback(false), 1600);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-base font-semibold text-white">Simulador da Câmera em Aula</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Teste como a imagem reage a diferentes tipos de iluminação de sala.
          </p>
        </div>

        {/* Zoom */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded border border-slate-800 text-xs font-mono">
          <span className="text-slate-500 px-1 text-[11px]">Zoom:</span>
          {[1, 2, 3].map(z => (
            <button
              key={z}
              onClick={() => {
                soundEffects.click();
                setZoomLevel(z);
              }}
              className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                zoomLevel === z
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {z}×
            </button>
          ))}
        </div>
      </div>

      {/* Frame Preview */}
      <div className="relative aspect-[16/9] bg-black rounded-lg overflow-hidden border border-slate-800">
        <div
          className="w-full h-full transition-all duration-200 overflow-hidden flex items-center justify-center"
          style={{
            filter: currentPreset.filter,
            transform: `scale(${zoomLevel})`
          }}
        >
          <img
            src="/assets/images/student-chalkboard-video-cover.jpg"
            alt="Visão da câmera"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Live Indicator */}
        <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] font-mono text-slate-300 border border-slate-800">
          Modo: {currentPreset.name} ({zoomLevel}×)
        </div>

        {/* Shutter feedback */}
        {capturedFeedback && (
          <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px] flex items-center justify-center pointer-events-none">
            <span className="bg-slate-950 text-white text-xs font-medium px-3 py-1.5 rounded shadow border border-slate-700">
              ✓ Quadro capturado para o caderno
            </span>
          </div>
        )}

        {/* Bottom Shutter Controls */}
        <div className="absolute bottom-3 inset-x-3 bg-slate-950/80 backdrop-blur-sm px-3 py-2 rounded border border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-300 text-[11px] hidden sm:block truncate max-w-xs">
            {currentPreset.desc}
          </span>
          <button
            onClick={handleCapture}
            className="mx-auto sm:mx-0 px-3 py-1.5 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-colors flex items-center gap-1.5"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Disparar Foto</span>
          </button>
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
        {presets.map(preset => {
          const Icon = preset.icon;
          const isSelected = selectedEffect === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => {
                soundEffects.click();
                setSelectedEffect(preset.id);
              }}
              className={`p-2.5 rounded text-left border transition-colors ${
                isSelected
                  ? 'bg-slate-950 border-indigo-500 text-white'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs font-medium text-white mb-0.5">
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-indigo-400' : 'text-slate-500'}`} />
                <span>{preset.name}</span>
              </div>
              <div className="text-[11px] text-slate-500 truncate">{preset.desc}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
