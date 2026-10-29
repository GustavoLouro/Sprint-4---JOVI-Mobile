import React from 'react';
import { Users, GraduationCap, Award, ShieldCheck } from 'lucide-react';

export default function TeamSection() {
  const members = [
    {
      name: 'João Pedro Maschion da Cruz Sá',
      rm: 'RM 570509',
      role: 'Front-End & Protótipo',
      desc: 'Desenvolvimento da arquitetura de componentes em React, integração com Tailwind CSS e algoritmos de processamento em canvas.',
      photo: '/assets/images/team/joao-pedro-sa.png',
      badgeColor: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'
    },
    {
      name: 'Gustavo Rezende Louro',
      rm: 'RM 570708',
      role: 'UX/UI & Design System',
      desc: 'Concepção do design system em modo escuro, experiência do usuário móvel, identidade visual e micro-interações da aplicação.',
      photo: '/assets/images/team/gustavo.jpg',
      badgeColor: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
    },
    {
      name: 'Raul Azzi Corsi',
      rm: 'RM 569022',
      role: 'Back-End & IA',
      desc: 'Pipeline de visão computacional, integração de endpoints com o Google Gemini Vision e microsserviços de extração OCR.',
      photo: '/assets/images/team/raul.png',
      badgeColor: 'bg-purple-500/10 text-purple-300 border-purple-500/30'
    },
    {
      name: 'João Pedro Lagonegro Bosco e Silva',
      rm: 'RM 569444',
      role: 'Pesquisa & Storytelling',
      desc: 'Condução das entrevistas com mais de 40 alunos universitários, validação da dor de mercado e estruturação da narrativa da Challenge.',
      photo: '/assets/images/team/joao-pedro-lagonegro.png',
      badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/30'
    },
    {
      name: 'Lucas Henrique Alves da Silva',
      rm: 'RM 572216',
      role: 'Documentação & Qualidade',
      desc: 'Garantia de conformidade dos requisitos de entrega, diagramas arquiteturais, manual de testes e documentação técnica acadêmica.',
      photo: '/assets/images/team/lucas.png',
      badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
    }
  ];

  return (
    <section id="equipe" className="py-24 relative overflow-hidden bg-[#060911]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono mb-4">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>FIAP · ENGENHARIA DE SOFTWARE · 2º SEMESTRE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Nossa Equipe de <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Engenharia</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base leading-relaxed">
            Estudantes responsáveis pela pesquisa, design de experiência e desenvolvimento integral do Jovi Study Hub para a Sprint 4 (Joint Delivery com Web Development).
          </p>
        </div>

        {/* Team Grid (5 members nicely laid out) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {members.map((member, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-[#0b101e] border border-white/10 hover:border-indigo-500/40 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-600/10 flex flex-col justify-between group"
            >
              <div>
                {/* Avatar & RM Header */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-800 border-2 border-white/10 group-hover:border-cyan-400/50 transition-colors shrink-0">
                    <img
                      src={member.photo}
                      alt={`Foto de ${member.name}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                      {member.name}
                    </h3>
                    <div className="text-xs font-mono text-cyan-400 font-bold mt-0.5">
                      {member.rm}
                    </div>
                  </div>
                </div>

                {/* Role Badge */}
                <div className="mb-4">
                  <span className={`inline-block text-[11px] font-mono px-2.5 py-1 rounded-lg border font-semibold ${member.badgeColor}`}>
                    {member.role}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {member.desc}
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>Engenharia FIAP</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Sprint 4 Concluída</span>
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
