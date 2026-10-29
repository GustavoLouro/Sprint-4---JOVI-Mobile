import React, { useState } from 'react';
import { Image as ImageIcon, ZoomIn, X, ExternalLink, Sparkles, Filter } from 'lucide-react';
import { soundEffects } from '../utils/audio';

export default function AiArchiveGallery() {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [activeModalItem, setActiveModalItem] = useState(null);

  const galleryItems = [
    {
      id: 1,
      title: 'Tecnologia Anti-Sombra',
      category: 'tecnologia',
      img: '/assets/images/chalkboard-clean.jpg',
      badge: 'Smart Scan Processado',
      desc: 'Algoritmo de equalização de luminância que suprime sombras de cabeças e mãos, uniformizando a lousa.'
    },
    {
      id: 2,
      title: 'Deck de Flashcards Interativos',
      category: 'estudo',
      img: '/assets/images/study-flashcards.jpg',
      badge: 'Estudo Ativo',
      desc: 'Cartões de memorização gerados automaticamente a partir do reconhecimento de fórmulas e conceitos da aula.'
    },
    {
      id: 3,
      title: 'Mapa Mental & Grafo Conceitual',
      category: 'estudo',
      img: '/assets/images/mindmap-interactive.jpg',
      badge: 'Navegação em Nós',
      desc: 'Conexão estruturada entre definições, teoremas e aplicações práticas com visualização dinâmica.'
    },
    {
      id: 4,
      title: 'Live Viewfinder & AI Effects',
      category: 'camera',
      img: '/assets/images/ai-effects-viewfinder.jpg',
      badge: '10 Estilos Armados',
      desc: 'Controles rápidos de câmera com anel de disparo iluminado e seleção de estilos fotográficos para qualquer tipo de lousa.'
    },
    {
      id: 5,
      title: 'AI Archive Centralizado',
      category: 'organizacao',
      img: '/assets/images/ai-archive-drawer.jpg',
      badge: 'Repositório de Estudos',
      desc: 'Gaveta de artefatos que cataloga resumos, flashcards e fotos originais com filtros por disciplina e data.'
    },
    {
      id: 6,
      title: 'Organização de Pastas por Matéria',
      category: 'organizacao',
      img: '/assets/images/library-folders.jpg',
      badge: 'Classificação Automática',
      desc: 'Separação inteligente por disciplinas da grade curricular universitária (Cálculo, Física, Engenharia de Software).'
    }
  ];

  const filteredItems = selectedCategory === 'todos'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  const handleOpenModal = (item) => {
    soundEffects.click();
    setActiveModalItem(item);
  };

  const handleCloseModal = () => {
    soundEffects.click();
    setActiveModalItem(null);
  };

  return (
    <section id="galeria" className="py-24 relative overflow-hidden bg-[#070b14]/70 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono mb-4">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>GALERIA VISUAL DO PROTÓTIPO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            O produto em ação, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">tela por tela</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base leading-relaxed">
            Explore as telas reais e interfaces móveis desenvolvidas para o aplicativo do Challenge JOVI + FIAP 2026.
          </p>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { id: 'todos', label: 'Todos os Recursos' },
              { id: 'tecnologia', label: 'Anti-Sombra & Visão' },
              { id: 'estudo', label: 'Estudo Ativo & IA' },
              { id: 'camera', label: 'Câmera & Disparo' },
              { id: 'organizacao', label: 'Organização & Arquivo' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  soundEffects.click();
                  setSelectedCategory(cat.id);
                }}
                className={`text-xs font-medium px-4 py-2 rounded-xl transition-all border ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white border-transparent shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-900/60 text-slate-400 hover:text-white border-white/5 hover:bg-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => handleOpenModal(item)}
              className="group cursor-pointer rounded-2xl bg-[#0b101e] border border-white/10 overflow-hidden hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-600/20 flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] bg-black overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Badge Overlay */}
                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[10px] font-mono text-cyan-300">
                  {item.badge}
                </div>

                {/* Hover Zoom Icon */}
                <div className="absolute inset-0 bg-indigo-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>Interface Jovi v4.0</span>
                  <span className="text-cyan-400">Ver Detalhes →</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Lightbox */}
        {activeModalItem && (
          <div
            onClick={handleCloseModal}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center animate-fadeIn"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-[#0b101e] border border-white/20 rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/70 hover:bg-black text-white border border-white/10 transition-colors"
                aria-label="Fechar visualizador"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/10] bg-black">
                <img
                  src={activeModalItem.img}
                  alt={activeModalItem.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-6">
                <div className="inline-block text-[11px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded mb-2">
                  {activeModalItem.badge}
                </div>
                <h3 className="text-xl font-bold text-white">{activeModalItem.title}</h3>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  {activeModalItem.desc}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

