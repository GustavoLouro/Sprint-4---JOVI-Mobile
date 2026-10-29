import React from 'react';

export default function TeamSection() {
  const members = [
    {
      name: 'João Pedro Maschion da Cruz Sá',
      rm: 'RM 570509',
      role: 'Front-End & Protótipo',
      desc: 'Estruturação dos componentes em React, responsividade com Tailwind CSS e manipulação de filtros no canvas.',
      photo: '/assets/images/team/joao-pedro-sa.png'
    },
    {
      name: 'Gustavo Rezende Louro',
      rm: 'RM 570708',
      role: 'UX/UI & Design System',
      desc: 'Concepção visual do app móvel, layout do comparador anti-sombra e testes de usabilidade com alunos.',
      photo: '/assets/images/team/gustavo.jpg'
    },
    {
      name: 'Raul Azzi Corsi',
      rm: 'RM 569022',
      role: 'Back-End & Visão Computacional',
      desc: 'Lógica do pipeline de imagem, integração das chamadas da API de visão e extração de fórmulas.',
      photo: '/assets/images/team/raul.png'
    },
    {
      name: 'João Pedro Lagonegro Bosco e Silva',
      rm: 'RM 569444',
      role: 'Pesquisa com Usuários & Storytelling',
      desc: 'Entrevistas presenciais com 42 universitários, mapeamento dos maiores gargalos em sala e validação da dor.',
      photo: '/assets/images/team/joao-pedro-lagonegro.png'
    },
    {
      name: 'Lucas Henrique Alves da Silva',
      rm: 'RM 572216',
      role: 'Documentação & Qualidade',
      desc: 'Casos de teste, roteiro de execução para a banca avaliadora, conformidade com os critérios da Sprint 4.',
      photo: '/assets/images/team/lucas.png'
    }
  ];

  return (
    <section id="equipe" className="py-20 relative bg-[#080c14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono font-semibold text-indigo-400 uppercase tracking-wider">
            Integrantes do Grupo
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Equipe de Engenharia de Software
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            FIAP Campus Paulista · 2º Semestre · Challenge JOVI 2026
          </p>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {members.map((member, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3.5 mb-3.5">
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-slate-800 border border-slate-700 shrink-0">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white leading-snug">
                      {member.name}
                    </h3>
                    <div className="text-xs font-mono text-indigo-400 font-medium mt-0.5">
                      {member.rm}
                    </div>
                  </div>
                </div>

                <div className="text-xs font-medium text-slate-300 mb-2">
                  {member.role}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {member.desc}
                </p>
              </div>

              <div className="pt-3 mt-4 border-t border-slate-800 text-[11px] font-mono text-slate-500">
                FIAP · Sprint 4
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
