import React from 'react';
import { Camera, Layers, FolderCheck, BookOpen, Clock, AlertTriangle } from 'lucide-react';
import LiveViewfinderDemo from './LiveViewfinderDemo';

export default function SolutionBento() {
  return (
    <section id="solucao" className="py-20 relative bg-[#080c14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-semibold text-indigo-400 uppercase tracking-wider">
            Contexto do Projeto
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Por que criamos o Jovi Study Hub?
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Em vez de tentar reinventar como o aluno estuda, focamos em resolver os 3 gargalos que todo estudante enfrenta ao fotografar a lousa na faculdade.
          </p>
        </div>

        {/* 3 Main Pains & Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-sm mb-4">
                01
              </div>
              <h3 className="text-base font-semibold text-white mb-2">A Sombra que Tampa as Fórmulas</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Nas salas de aula, a iluminação das lâmpadas vem de trás. Ao apontar o celular, a sombra do próprio aluno cobre frações, sinais e anotações essenciais.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-800 text-xs text-indigo-300">
              ✓ Solução: Equalização local de histograma que suprime a mancha escura.
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm mb-4">
                02
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Galeria do Celular Desorganizada</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                As fotos do quadro se perdem entre prints, memes e fotos do fim de semana. Na hora da prova, o aluno perde mais tempo procurando do que estudando.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-800 text-xs text-indigo-300">
              ✓ Solução: Categorização automática por matéria e data no caderno digital.
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm mb-4">
                03
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Dificuldade de Fazer Revisão Ativa</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Foto estática gera leitura passiva. Sem exercícios rápidos e perguntas, o cérebro esquece o conteúdo poucos dias após a aula presencial.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-800 text-xs text-indigo-300">
              ✓ Solução: Extração automática de flashcards e resumos para fixação.
            </div>
          </div>

        </div>

        {/* Embedded Live Viewfinder Simulator */}
        <div className="mb-12">
          <LiveViewfinderDemo />
        </div>

        {/* Routine Flow */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Fluxo de Uso no Dia a Dia Universitário</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded bg-slate-950 border border-slate-800">
              <span className="font-mono text-indigo-400 font-semibold block mb-1">1. Durante a Aula</span>
              <p className="text-slate-400">Você tira foto da lousa de onde estiver sentado. O app remove sombras e salva na pasta da matéria.</p>
            </div>
            <div className="p-3.5 rounded bg-slate-950 border border-slate-800">
              <span className="font-mono text-indigo-400 font-semibold block mb-1">2. No Intervalo</span>
              <p className="text-slate-400">O app gera 4 a 5 flashcards com os pontos que o professor frisou para você revisar em 3 minutos.</p>
            </div>
            <div className="p-3.5 rounded bg-slate-950 border border-slate-800">
              <span className="font-mono text-indigo-400 font-semibold block mb-1">3. Na Semana de Provas</span>
              <p className="text-slate-400">Em vez de caçar fotos soltas, você acessa o caderno com todos os resumos e fórmulas organizados.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
