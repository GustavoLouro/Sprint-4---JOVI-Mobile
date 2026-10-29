import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Building2, GraduationCap, Award, Mail, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEffects } from '../utils/audio';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: 'feedback',
    mensagem: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validate = () => {
    const errs = {};
    if (!formData.nome.trim()) {
      errs.nome = 'Por favor, informe seu nome completo.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Informe um endereço de e-mail válido.';
    }

    if (!formData.mensagem.trim() || formData.mensagem.trim().length < 5) {
      errs.mensagem = 'A mensagem deve conter pelo menos 5 caracteres.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    soundEffects.click();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      soundEffects.success();
      setIsSubmitting(false);
      const firstName = formData.nome.trim().split(' ')[0];
      setSuccessMessage(`Obrigado pelo contato, ${firstName}! Sua mensagem foi registrada com sucesso.`);
      
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });

      setFormData({
        nome: '',
        email: '',
        assunto: 'feedback',
        mensagem: ''
      });
      setErrors({});

      setTimeout(() => setSuccessMessage(''), 6000);
    }, 700);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  return (
    <section id="contato" className="py-24 relative overflow-hidden bg-[#070b14]/70 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>FALE COM A EQUIPE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Contato &amp; Feedback da <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Banca Avaliadora</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base leading-relaxed">
            Dúvidas sobre os algoritmos desenvolvidos, agendamento de testes no protótipo móvel ou envio de considerações dos professores.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          {/* Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#0b101e] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-indigo-400" />
              <span>Enviar Mensagem</span>
            </h3>

            {successMessage && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 text-xs sm:text-sm flex items-start gap-3 animate-fadeIn">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Mensagem Enviada!</span>
                  <span>{successMessage}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nome" className="block text-xs font-medium text-slate-300 mb-1.5">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Ex: Prof. Dr. Silva"
                    className={`w-full bg-slate-900 border rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                      errors.nome ? 'border-rose-500 focus:ring-rose-500/50' : 'border-white/10 focus:ring-indigo-500'
                    }`}
                  />
                  {errors.nome && (
                    <span className="text-[11px] text-rose-400 mt-1 block flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.nome}
                    </span>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-slate-300 mb-1.5">
                    E-mail Institucional ou Pessoal *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="professor@fiap.com.br"
                    className={`w-full bg-slate-900 border rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                      errors.email ? 'border-rose-500 focus:ring-rose-500/50' : 'border-white/10 focus:ring-indigo-500'
                    }`}
                  />
                  {errors.email && (
                    <span className="text-[11px] text-rose-400 mt-1 block flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="assunto" className="block text-xs font-medium text-slate-300 mb-1.5">
                  Assunto da Mensagem
                </label>
                <select
                  id="assunto"
                  name="assunto"
                  value={formData.assunto}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="feedback">Feedback de Avaliação da Sprint 4</option>
                  <option value="duvida">Dúvidas sobre o Algoritmo Anti-Sombra</option>
                  <option value="teste">Interesse em testar no aplicativo móvel</option>
                  <option value="outro">Outro assunto</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label htmlFor="mensagem" className="block text-xs font-medium text-slate-300">
                    Mensagem ou Considerações *
                  </label>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {formData.mensagem.length} caracteres
                  </span>
                </div>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  rows={4}
                  value={formData.mensagem}
                  onChange={handleChange}
                  placeholder="Escreva sua mensagem ou parecer técnico sobre o projeto..."
                  className={`w-full bg-slate-900 border rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all resize-none ${
                    errors.mensagem ? 'border-rose-500 focus:ring-rose-500/50' : 'border-white/10 focus:ring-indigo-500'
                  }`}
                />
                {errors.mensagem && (
                  <span className="text-[11px] text-rose-400 mt-1 block flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.mensagem}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Enviando dados...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Enviar Mensagem para a Equipe</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Academic Information Sidecard (5 cols) */}
          <div className="lg:col-span-5 bg-[#0b101e] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <h3 className="text-xl font-bold text-white mb-4">Informações do Projeto</h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-1">
                <span className="text-slate-400 text-[11px] font-mono uppercase block">Instituição de Ensino</span>
                <span className="font-semibold text-white">FIAP · Centro Universitário</span>
                <span className="text-slate-400 text-xs block">Campus Paulista · São Paulo / SP</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-1">
                <span className="text-slate-400 text-[11px] font-mono uppercase block">Curso &amp; Turma</span>
                <span className="font-semibold text-white">Engenharia de Software (2º Semestre)</span>
                <span className="text-cyan-400 text-xs block font-mono">Disciplinas: Front-End Design &amp; Web Development</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-1">
                <span className="text-slate-400 text-[11px] font-mono uppercase block">Desafio Oficial</span>
                <span className="font-semibold text-white">Challenge JOVI Experience 2026</span>
                <span className="text-slate-400 text-xs block">Solução: Jovi Study Hub (Câmera Anti-Sombra + AI Studio)</span>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-1">
                <span className="text-indigo-300 text-[11px] font-mono uppercase font-bold block">Status da Entrega</span>
                <span className="font-bold text-white">Sprint 04 Concluída com Sucesso</span>
                <span className="text-slate-300 text-xs block">React 18 + Tailwind CSS + Deploy Vercel</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
