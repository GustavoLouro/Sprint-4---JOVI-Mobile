import React, { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { soundEffects } from '../utils/audio';

export default function AiArchiveGallery() {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [activeModalItem, setActiveModalItem] = useState(null);

  const galleryItems = [
    {
      id: 1,
      title: 'Tratamento da Lousa Anti-Sombra',
      category: 'camera',
      img: '/assets/images/chalkboard-clean.jpg',
      desc: 'Resultado do algoritmo que remove a silhueta projetada do estudante, uniformizando a iluminação do quadro.'
    },
    {
      id: 2,
      title: 'Módulo de Flashcards',
      category: 'estudo',
      img: '/assets/images/study-flashcards.jpg',
      desc: 'Interface de estudo com virada 3D e contagem de acertos para fixação rápida do conteúdo.'
    },
    {
      id: 3,
      title: 'Mapa Conceitual da Matéria',
      category: 'estudo',
      img: '/assets/images/mindmap-interactive.jpg',
      desc: 'Visualização das fórmulas e teoremas interligados em árvore para facilitar a compreensão global da aula.'
    },
    {
      id: 4,
      title: 'Interface da Câmera em Aula',
      category: 'camera',
      img: '/assets/images/ai-effects-viewfinder.jpg',
      desc: 'Visor com seleção rápida de modos de contraste para lousa verde, quadro branco ou sala com projetor.'
    },
    {
      id: 5,
      title: 'Gaveta de Resumos Arquivados',
      category: 'organizacao',
      img: '/assets/images/ai-archive-drawer.jpg',
      desc: 'Central que reúne todas as anotações geradas em sala, organizadas por data e matéria.'
    },
    {
      id: 6,
      title: 'Pastas por Disciplina da Grade',
      category: 'organizacao',
      img: '/assets/images/library-folders.jpg',
      desc: 'Classificação automática em pastas separadas: Cálculo, Arquitetura, Engenharia de Software.'
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
    <section id="galeria" className="py-20 relative bg-[#090e18] border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-mono font-semibold text-indigo-400 uppercase tracking-wider">
            Protótipo
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Telas da Solução
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Interfaces desenvolvidas para o protótipo móvel do Challenge JOVI + FIAP 2026.
          </p>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {[
              { id: 'todos', label: 'Todas as Telas' },
              { id: 'camera', label: 'Câmera & Tratamento' },
              { id: 'estudo', label: 'Módulos de Estudo' },
              { id: 'organizacao', label: 'Organização em Pastas' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  soundEffects.click();
                  setSelectedCategory(cat.id);
                }}
                className={`text-xs font-medium px-3.5 py-1.5 rounded-lg transition-colors border ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white border-indigo-500'
                    : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => handleOpenModal(item)}
              className="group cursor-pointer rounded-xl bg-slate-900 border border-slate-800 overflow-hidden hover:border-slate-700 transition-colors flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] bg-black overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-2 rounded-full bg-slate-900 text-white">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeModalItem && (
          <div
            onClick={handleCloseModal}
            className="fixed inset-0 z-50 bg-black/90 p-4 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-3 right-3 z-30 p-1.5 rounded-full bg-slate-950/80 hover:bg-slate-950 text-white"
                aria-label="Fechar"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative aspect-[16/10] bg-black">
                <img
                  src={activeModalItem.img}
                  alt={activeModalItem.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-4">
                <h3 className="text-base font-semibold text-white">{activeModalItem.title}</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
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
