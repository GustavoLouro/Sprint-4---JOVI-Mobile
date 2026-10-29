import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Maximize, Shield } from 'lucide-react';
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
    <section id="demonstracao" className="py-20 relative bg-[#090e18] border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono font-semibold text-indigo-400 uppercase tracking-wider">
            Demonstração Prática
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Vídeo gravado em sala de aula
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Veja a gravação real feita na carteira de aula mostrando o enquadramento da lousa de cálculo e a aplicação do filtro anti-sombra.
          </p>
        </div>

        {/* Video Player */}
        <div className="max-w-3xl mx-auto mb-10">
          <div
            ref={playerContainerRef}
            className="rounded-xl overflow-hidden bg-black border border-slate-800 shadow-2xl"
          >
            {/* Screen */}
            <div
              onClick={togglePlay}
              className="relative aspect-video w-full cursor-pointer flex items-center justify-center bg-black"
            >
              <video
                ref={videoRef}
                playsInline
                loop
                muted
                poster="/assets/images/student-chalkboard-video-cover.jpg"
                className="w-full h-full object-cover"
                style={{
                  filter: isAntiShadowActive ? 'none' : 'brightness(0.75) contrast(0.85) grayscale(15%)'
                }}
              >
                <source src="/assets/videos/video-demo.mp4" type="video/mp4" />
                Seu navegador não suporta vídeos HTML5.
              </video>

              {!isPlaying && (
                <div className="absolute w-14 h-14 rounded-full bg-indigo-600/90 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                  <Play className="w-6 h-6 fill-white ml-0.5" />
                </div>
              )}
            </div>

            {/* Controls Bar */}
            <div className="bg-slate-950 px-4 py-2.5 border-t border-slate-800 space-y-2">
              
              {/* Scrub line */}
              <div
                ref={timelineRef}
                onClick={handleTimelineClick}
                className="relative h-1.5 bg-slate-800 rounded-full cursor-pointer overflow-hidden"
              >
                <div
                  className="h-full bg-indigo-500 rounded-full transition-all duration-100"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between text-xs text-slate-300 pt-0.5">
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={togglePlay}
                    className="p-1 rounded hover:bg-slate-800 text-white"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>
                  <span className="font-mono text-slate-400 text-[11px]">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleAntiShadow}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs transition-colors border ${
                      isAntiShadowActive
                        ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/40'
                        : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>{isAntiShadowActive ? 'Anti-Sombra: Ativo' : 'Anti-Sombra: Desligado'}</span>
                  </button>

                  <button
                    onClick={handleFullscreen}
                    className="p-1 rounded hover:bg-slate-800 text-white"
                    aria-label="Tela cheia"
                  >
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* 3 Steps in practical terms */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-xs">
          <div className="p-4 rounded bg-slate-900 border border-slate-800">
            <span className="font-semibold text-white block mb-1">Passo 1: Enquadramento</span>
            <p className="text-slate-400">O aluno aponta a câmera da carteira. O sistema ajusta a perspectiva angular do quadro.</p>
          </div>
          <div className="p-4 rounded bg-slate-900 border border-slate-800">
            <span className="font-semibold text-white block mb-1">Passo 2: Supressão da Sombra</span>
            <p className="text-slate-400">A mancha escura da iluminação de fundo é equalizada, restaurando a nitidez do giz.</p>
          </div>
          <div className="p-4 rounded bg-slate-900 border border-slate-800">
            <span className="font-semibold text-white block mb-1">Passo 3: Geração dos Cards</span>
            <p className="text-slate-400">As fórmulas e definições são categorizadas na pasta da matéria no caderno digital.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
