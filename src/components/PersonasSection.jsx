import React from 'react';
import { Quote, Check } from 'lucide-react';

export default function PersonasSection() {
  const personas = [
    {
      name: 'Lucas, 20 anos',
      role: 'Engenharia de Software (3º Semestre - Noturno)',
      initial: 'L',
      quote: 'Nas aulas noturnas de cálculo, minha própria sombra tampa a lousa toda. Se eu fico em pé para tirar foto de outro ângulo, atrapalho o colega de trás e o professor reclama.',
      solution: 'Consegue fotografar sentado da própria carteira e a imagem sai clara sem precisar levantar.'
    },
    {
      name: 'Ana, 22 anos',
      role: 'Direito (5º Semestre)',
      initial: 'A',
      quote: 'Meu celular tem mais de 800 fotos de lousas e artigos misturadas com fotos de viagens e grupos da faculdade. Quando chega a semana de provas, eu não acho nada.',
      solution: 'As fotos caem direto nas pastas de cada disciplina com a data da aula e os resumos separados.'
    }
  ];

  return (
    <section id="publico" className="py-20 relative bg-[#080c14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono font-semibold text-indigo-400 uppercase tracking-wider">
            Pesquisa com Estudantes
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Entrevistas com universitários reais
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Conversamos com mais de 40 alunos para entender o que realmente incomoda na hora de registrar o conteúdo das aulas no smartphone.
          </p>
        </div>

        {/* Personas Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
          {personas.map((persona, idx) => (
            <div
              key={idx}
              className="rounded-xl p-6 bg-slate-900 border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold text-sm">
                    {persona.initial}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{persona.name}</h3>
                    <div className="text-xs text-slate-400">{persona.role}</div>
                  </div>
                </div>

                <div className="p-3.5 rounded bg-slate-950 border border-slate-800/80 mb-4">
                  <Quote className="w-4 h-4 text-slate-600 mb-1" />
                  <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                    "{persona.quote}"
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                <div>
                  <span className="text-emerald-400 font-medium block">Como o Jovi resolve:</span>
                  <span>{persona.solution}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary takeaway */}
        <div className="max-w-4xl mx-auto bg-slate-900/60 border border-slate-800 rounded-xl p-5 text-xs text-slate-300 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <strong className="text-white block mb-1">Sem mudar o hábito</strong>
            <p className="text-slate-400">O aluno continua tirando foto no celular, mas o arquivo gerado já vem limpo e legível.</p>
          </div>
          <div>
            <strong className="text-white block mb-1">Economia de tempo</strong>
            <p className="text-slate-400">Menos tempo procurando fotos no rolo da câmera e digitando anotações no computador.</p>
          </div>
          <div>
            <strong className="text-white block mb-1">Revisão eficiente</strong>
            <p className="text-slate-400">Flashcards rápidos baseados no que o professor de fato passou em sala.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
