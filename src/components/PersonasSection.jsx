import React from 'react';
import { Users, Clock, Zap, Brain, Quote, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function PersonasSection() {
  const personas = [
    {
      name: 'Lucas, 20 anos',
      role: 'Engenharia de Software (3º Semestre)',
      initial: 'L',
      badgeColor: 'from-blue-600 to-indigo-600',
      avatarBg: 'bg-indigo-600/20 text-indigo-400 border-indigo-500/30',
      quote: 'Nas aulas noturnas de cálculo, minha própria sombra tampa as integrais no quadro. Ter que ficar em pé para fotografar atrapalha a sala inteira.',
      pain: 'Perda de fórmulas cruciais e desconforto físico para fotografar a lousa.',
      gain: 'Correção de iluminação instantânea sem precisar sair da carteira.',
      metric: 'Economia de 45 min/dia na revisão de exercícios de cálculo'
    },
    {
      name: 'Ana, 22 anos',
      role: 'Direito (5º Semestre)',
      initial: 'A',
      badgeColor: 'from-amber-500 to-orange-500',
      avatarBg: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      quote: 'Tenho centenas de fotos de artigos e esquemas perdidas na galeria do celular. Na semana de provas, passo mais tempo procurando do que estudando de verdade.',
      pain: 'Desordem severa de arquivos e esquecimento do conteúdo após a aula.',
      gain: 'Pastas automáticas por matéria e flashcards gerados prontos para revisão.',
      metric: '+40% de retenção na memorização de artigos e jurisprudência'
    }
  ];

  const benefits = [
    {
      icon: Zap,
      iconColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      title: 'Sem Mudança de Hábito',
      desc: 'Você continua tirando fotos da lousa exatamente como sempre fez, mas com resultado limpo e estruturado em vez de fotos escuras.'
    },
    {
      icon: Clock,
      iconColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
      title: 'Horas Economizadas por Semana',
      desc: 'Elimina a transcrição manual de anotações do quadro para o computador e a busca caótica de imagens no rolo do celular.'
    },
    {
      icon: Brain,
      iconColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      title: 'Estudo Ativo Comprovado',
      desc: 'A memorização por flashcards com repetição espaçada transforma a leitura passiva em fixação de longo prazo para as provas.'
    }
  ];

  return (
    <section id="publico" className="py-24 relative overflow-hidden bg-[#060911]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono mb-4">
            <Users className="w-3.5 h-3.5" />
            <span>PÚBLICO-ALVO &amp; PESQUISA DE CAMPO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Construído para a rotina intensa de <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">quem estuda na faculdade</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base leading-relaxed">
            Desenvolvido a partir de entrevistas com mais de 40 estudantes universitários que utilizam o smartphone como caderno principal entre aulas presenciais e EaD.
          </p>
        </div>

        {/* Personas Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto">
          {personas.map((persona, idx) => (
            <div
              key={idx}
              className="relative rounded-3xl p-7 bg-[#0b101e] border border-white/10 hover:border-white/20 transition-all shadow-xl flex flex-col justify-between group"
            >
              <div>
                {/* Header */}
                <div className="flex items-center gap-4 mb-5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg border ${persona.avatarBg}`}>
                    {persona.initial}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{persona.name}</h3>
                    <div className="text-xs text-slate-400">{persona.role}</div>
                  </div>
                </div>

                {/* Quote */}
                <div className="relative mb-6 p-4 rounded-2xl bg-slate-900/80 border border-white/5">
                  <Quote className="w-5 h-5 text-slate-600 mb-2" />
                  <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed">
                    "{persona.quote}"
                  </p>
                </div>
              </div>

              {/* Solution Gain Box */}
              <div className="pt-4 border-t border-white/5 space-y-3">
                <div className="flex items-start gap-2.5 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-emerald-400 font-semibold block">Solução Jovi:</span>
                    <span className="text-slate-300">{persona.gain}</span>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-[11px] font-mono text-indigo-300">
                  ⚡ Impacto: {persona.metric}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0b101e] border border-white/10 hover:border-indigo-500/30 transition-all"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border mb-4 ${b.iconColor}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white mb-2">{b.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{b.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

