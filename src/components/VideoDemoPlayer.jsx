import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Maximize, Shield, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';
import { soundEffects } from '../utils/audio';

export default function VideoDemoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(10);
  const [isAntiShadowActive, setIsAntiShadowActive] = useState(true);
  const videoRef = useRef(null);
  const timelineRef = useRef(null);
  const playerContainerRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        setDuration(video.duration);
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    soundEffects.click();
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleAntiShadow = () => {
    soundEffects.click();
    setIsAntiShadowActive(!isAntiShadowActive);
  };

  const handleTimelineClick = (e) => {
    const video = videoRef.current;
    const timeline = timelineRef.current;
    if (!video || !timeline) return;

    const rect = timeline.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    video.currentTime = pos * (duration || 10);
    setCurrentTime(video.currentTime);
  };

  const handleFullscreen = () => {
    soundEffects.click();
    const el = playerContainerRef.current;
    if (!el) return;

    if (!document.fullscreenElement) {
      if (el.requestFullscreen) {
        el.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const formatTime = (timeInSeconds) => {
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section id="demonstracao" className="py-24 relative overflow-hidden bg-[#070b14]/70 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono mb-4">
            <Play className="w-3.5 h-3.5 text-cyan-400" />
            <span>VÍDEO DA DEMONSTRAÇÃO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Veja o Jovi escaneando a lousa em <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">tempo real</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base leading-relaxed">
            Assista ao fluxo completo: o universitário aponta o smartphone para a lousa com equações de cálculo, o algoritmo suprime sombras e reflexos e envia as anotações para o Gemini.
          </p>
        </div>

        {/* Video Player Container */}
        <div className="max-w-4xl mx-auto mb-16">
          <div
            ref={playerContainerRef}
            className="relative rounded-3xl overflow-hidden bg-black border border-white/10 shadow-2xl group"
          >
            {/* Topbar HUD */}
            <div className="absolute top-0 inset-x-0 z-30 p-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                <span className="text-[11px] font-mono text-white tracking-wider">
                  GRAVAÇÃO EM SALA DE AULA · 1080P 60FPS
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono bg-indigo-600/60 border border-indigo-400/40 text-cyan-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Gemini Vision Ativo</span>
                </span>
                <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                  4K HDR
                </span>
              </div>
            </div>

            {/* Video Element */}
            <div
              onClick={togglePlay}
              className="relative aspect-video w-full cursor-pointer overflow-hidden flex items-center justify-center bg-black"
            >
              <video
                ref={videoRef}
                playsInline
                loop
                muted
                poster="/assets/images/student-chalkboard-video-cover.jpg"
                className="w-full h-full object-cover transition-all duration-300"
                style={{
                  filter: isAntiShadowActive ? 'none' : 'brightness(0.7) contrast(0.85) grayscale(20%)'
                }}
              >
                <source src="/assets/videos/video-demo.mp4" type="video/mp4" />
                Seu navegador não suporta vídeos HTML5.
              </video>

              {/* Center Play Button Overlay */}
              {!isPlaying && (
                <div className="absolute w-20 h-20 rounded-full bg-indigo-600/90 text-white flex items-center justify-center shadow-2xl backdrop-blur-sm border border-white/30 hover:scale-110 active:scale-95 transition-transform z-20">
                  <Play className="w-8 h-8 fill-white ml-1" />
                </div>
              )}
            </div>

            {/* Bottom Controls Bar */}
            <div className="bg-slate-950/95 backdrop-blur-md px-5 py-3 border-t border-white/10 space-y-2">
              
              {/* Timeline Scrubber */}
              <div
                ref={timelineRef}
                onClick={handleTimelineClick}
                className="relative h-2 bg-slate-800 rounded-full cursor-pointer group/timeline overflow-hidden"
              >
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full relative transition-all duration-100"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>

              {/* Controls Row */}
              <div className="flex items-center justify-between text-xs text-slate-300 pt-1">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="p-1.5 rounded-lg hover:bg-slate-800 text-white transition-colors"
                    aria-label={isPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>
                  <span className="font-mono text-slate-400 text-[11px]">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Anti-Shadow Toggle */}
                  <button
                    onClick={toggleAntiShadow}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all border ${
                      isAntiShadowActive
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40 shadow-sm'
                        : 'bg-slate-800 text-slate-400 border-white/5'
                    }`}
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>{isAntiShadowActive ? 'Anti-Sombra: LIGADO' : 'Anti-Sombra: DESLIGADO'}</span>
                  </button>

                  {/* Fullscreen Button */}
                  <button
                    onClick={handleFullscreen}
                    className="p-1.5 rounded-lg hover:bg-slate-800 text-white transition-colors"
                    aria-label="Alternar tela cheia"
                  >
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* 3 Step Breakdown Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-cyan-500/30 transition-all">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-lg mb-4">
              Passo 01
            </div>
            <div className="text-2xl mb-2">🎯</div>
            <h3 className="text-base font-bold text-white mb-2">Detecção Inteligente do Quadro</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              O estudante enquadra a lousa de qualquer carteira da sala. O algoritmo calcula a perspectiva angular e foca no conteúdo em milissegundos.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-indigo-500/30 transition-all">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-lg mb-4">
              Passo 02
            </div>
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="text-base font-bold text-white mb-2">Filtro Anti-Sombra &amp; Clareamento</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              A sombra do estudante ou da mão é eliminada em tempo real, preservando 100% da nitidez do giz e das canetas coloridas de quadro branco.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-purple-500/30 transition-all">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-lg mb-4">
              Passo 03
            </div>
            <div className="text-2xl mb-2">🧠</div>
            <h3 className="text-base font-bold text-white mb-2">Extração com Gemini Vision</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Reconhecimento semântico de equações integrais, diagramas e termos da aula, gerando automaticamente flashcards para estudo no app.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
