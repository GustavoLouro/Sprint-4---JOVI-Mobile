import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
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
      errs.nome = 'Informe seu nome completo.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Informe um e-mail válido.';
    }

    if (!formData.mensagem.trim() || formData.mensagem.trim().length < 5) {
      errs.mensagem = 'A mensagem deve ter pelo menos 5 caracteres.';
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
      setSuccessMessage(`Obrigado pelo contato, ${firstName}! Mensagem registrada.`);
      
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.8 }
      });

      setFormData({
        nome: '',
        email: '',
        assunto: 'feedback',
        mensagem: ''
      });
      setErrors({});

      setTimeout(() => setSuccessMessage(''), 5000);
    }, 500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  return (
    <section id="contato" className="py-20 relative bg-[#090e18] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono font-semibold text-indigo-400 uppercase tracking-wider">
            Contato
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Fale com a Equipe
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Dúvidas sobre o funcionamento, feedback da banca ou agendamento de testes no protótipo.
          </p>
        </div>

        {/* Form and info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-4xl mx-auto">
          
          {/* Form */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 shadow-xl">
            {successMessage && (
              <div className="mb-5 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-3.5 text-xs">
              <div>
                <label htmlFor="nome" className="block font-medium text-slate-300 mb-1">
                  Seu Nome Completo *
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Ex: Prof. Carlos Eduardo"
                  className={`w-full bg-slate-950 border rounded px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 ${
                    errors.nome ? 'border-rose-500' : 'border-slate-800'
                  }`}
                />
                {errors.nome && (
                  <span className="text-[11px] text-rose-400 mt-1 block">{errors.nome}</span>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block font-medium text-slate-300 mb-1">
                  Seu E-mail *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="professor@fiap.com.br"
                  className={`w-full bg-slate-950 border rounded px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 ${
                    errors.email ? 'border-rose-500' : 'border-slate-800'
                  }`}
                />
                {errors.email && (
                  <span className="text-[11px] text-rose-400 mt-1 block">{errors.email}</span>
                )}
              </div>

              <div>
                <label htmlFor="assunto" className="block font-medium text-slate-300 mb-1">
                  Assunto
                </label>
                <select
                  id="assunto"
                  name="assunto"
                  value={formData.assunto}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="feedback">Feedback de Avaliação da Sprint 4</option>
                  <option value="duvida">Dúvidas sobre o Algoritmo Anti-Sombra</option>
                  <option value="teste">Quero testar o protótipo</option>
                  <option value="outro">Outro assunto</option>
                </select>
              </div>

              <div>
                <label htmlFor="mensagem" className="block font-medium text-slate-300 mb-1">
                  Mensagem *
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  rows={4}
                  value={formData.mensagem}
                  onChange={handleChange}
                  placeholder="Escreva sua mensagem ou considerações..."
                  className={`w-full bg-slate-950 border rounded px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none ${
                    errors.mensagem ? 'border-rose-500' : 'border-slate-800'
                  }`}
                />
                {errors.mensagem && (
                  <span className="text-[11px] text-rose-400 mt-1 block">{errors.mensagem}</span>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 rounded bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium text-xs transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}</span>
              </button>
            </form>
          </div>

          {/* Academic info */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 text-xs space-y-4">
            <h3 className="text-sm font-semibold text-white">Dados Acadêmicos</h3>

            <div className="space-y-3 text-slate-300">
              <div className="p-3 rounded bg-slate-950 border border-slate-800/80">
                <span className="text-slate-500 text-[10px] font-mono uppercase block">Instituição</span>
                <span className="text-white font-medium">FIAP · Centro Universitário</span>
                <span className="text-slate-400 block text-[11px]">Campus Paulista · São Paulo / SP</span>
              </div>

              <div className="p-3 rounded bg-slate-950 border border-slate-800/80">
                <span className="text-slate-500 text-[10px] font-mono uppercase block">Curso &amp; Turma</span>
                <span className="text-white font-medium">Engenharia de Software · 2º Semestre</span>
                <span className="text-slate-400 block text-[11px]">Disciplinas: Front-End Design &amp; Web Development</span>
              </div>

              <div className="p-3 rounded bg-slate-950 border border-slate-800/80">
                <span className="text-slate-500 text-[10px] font-mono uppercase block">Desafio</span>
                <span className="text-white font-medium">Challenge JOVI 2026</span>
                <span className="text-slate-400 block text-[11px]">Solução: Jovi Study Hub</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
