import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  BookOpen,
  Layers,
  GitBranch,
  MessageSquare,
  RotateCw,
  CheckCircle2,
  XCircle,
  Trophy,
  Copy,
  Check,
  Send,
  Bot,
  User,
  ArrowRight,
  Maximize2,
  Download,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEffects } from '../utils/audio';

export default function InteractiveStudyStudio() {
  const [activeTab, setActiveTab] = useState('flashcards');

  // Flashcards state
  const initialCards = [
    {
      id: 1,
      front: 'Qual é o Teorema Fundamental do Cálculo (Parte 1)?',
      back: 'Se f for contínua em [a, b], então a função g(x) = ∫[a até x] f(t) dt é derivável e g\'(x) = f(x).',
      category: 'Teorema',
      difficulty: 'Médio'
    },
    {
      id: 2,
      front: 'Como se calcula a integral indefinida ∫ xⁿ dx para n ≠ -1?',
      back: '∫ xⁿ dx = (xⁿ⁺¹) / (n + 1) + C, onde C é a constante de integração.',
      category: 'Regra Básica',
      difficulty: 'Fácil'
    },
    {
      id: 3,
      front: 'Qual é a fórmula de Integração por Partes extraída da lousa?',
      back: '∫ u dv = u·v - ∫ v du (derivada da regra do produto da diferenciação).',
      category: 'Técnica',
      difficulty: 'Difícil'
    },
    {
      id: 4,
      front: 'Por que a constante de integração (+ C) é essencial?',
      back: 'Porque a derivada de qualquer constante é zero: d/dx [F(x) + C] = f(x). O +C representa toda a família de primitivas.',
      category: 'Conceito',
      difficulty: 'Fácil'
    },
    {
      id: 5,
      front: 'Qual é a integral de 1/x dx para x ≠ 0?',
      back: '∫ (1/x) dx = ln|x| + C. A barra de módulo garante que o logaritmo receba apenas valores estritamente positivos.',
      category: 'Cálculo',
      difficulty: 'Médio'
    }
  ];

  const [cards, setCards] = useState(initialCards);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState([]);
  const [reviewCards, setReviewCards] = useState([]);
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Copilot Chat state
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Olá! Analisei a lousa de Cálculo I capturada pelo Jovi Study Hub. Todas as fórmulas de integração foram digitalizadas com 100% de precisão. O que você gostaria de explorar hoje?'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Mind map state
  const [activeNode, setActiveNode] = useState('integral');

  const handleFlip = () => {
    soundEffects.flip();
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    soundEffects.click();
    setIsFlipped(false);
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const handlePrev = () => {
    soundEffects.click();
    setIsFlipped(false);
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  const handleMarkMastered = () => {
    soundEffects.success();
    const cardId = cards[currentCardIndex].id;
    if (!masteredCards.includes(cardId)) {
      setMasteredCards([...masteredCards, cardId]);
    }
    setReviewCards(reviewCards.filter(id => id !== cardId));
    
    if (currentCardIndex === cards.length - 1) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      handleNext();
    }
  };

  const handleMarkReview = () => {
    soundEffects.click();
    const cardId = cards[currentCardIndex].id;
    if (!reviewCards.includes(cardId)) {
      setReviewCards([...reviewCards, cardId]);
    }
    setMasteredCards(masteredCards.filter(id => id !== cardId));
    handleNext();
  };

  const handleResetCards = () => {
    soundEffects.click();
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setMasteredCards([]);
    setReviewCards([]);
  };

  const handleCopySummary = () => {
    soundEffects.success();
    const text = `# Jovi Study Hub - Resumo de Aula: Cálculo I
Disciplina: Cálculo Diferencial e Integral I
Professor: Anotações da Lousa Digitalizada
Data: Outubro de 2026

## 1. Conceito Fundamental
A integral indefinida representa a operação inversa da diferenciação, também chamada de antiderivada ou primitiva de uma função f(x).

## 2. Fórmulas Principais Identificadas na Lousa:
* Regra da Potência: ∫ xⁿ dx = (xⁿ⁺¹)/(n+1) + C (n ≠ -1)
* Integral Logarítmica: ∫ 1/x dx = ln|x| + C
* Integração por Partes: ∫ u dv = u·v - ∫ v du

## 3. Atenção para a Prova da FIAP:
* Nunca esquecer de adicionar a constante de integração (+ C) em integrais indefinidas.
* Ao integrar por substituição (u-du), lembre-se de reescrever a resposta na variável original x.`;

    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const handleSendMessage = (textToSend) => {
    const query = textToSend || chatInput;
    if (!query.trim()) return;

    soundEffects.click();
    const userMsg = { id: Date.now(), sender: 'user', text: query };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      soundEffects.success();
      let botResponse = '';
      if (query.toLowerCase().includes('prova') || query.toLowerCase().includes('exercício')) {
        botResponse = 'Aqui está uma questão no estilo das avaliações de Engenharia da FIAP:\n\n**Questão:** Calcule a integral indefinida de f(x) = 3x² + 4x - 2.\n\n**Resolução Passo a Passo:**\n1. ∫ 3x² dx = 3 · (x³/3) = x³\n2. ∫ 4x dx = 4 · (x²/2) = 2x²\n3. ∫ -2 dx = -2x\n4. Resultado final: **x³ + 2x² - 2x + C**.\n\nDica: Não se esqueça da constante +C!';
      } else if (query.toLowerCase().includes('parte') || query.toLowerCase().includes('partes')) {
        botResponse = 'A fórmula de **Integração por Partes** é derivada da regra do produto da diferenciação:\n\n`∫ u dv = u·v - ∫ v du`\n\n**Macete LIATE** para escolher quem será o "u":\n* **L**ogarítmicas\n* **I**nversas trigonométricas\n* **A**lgébricas (polinômios)\n* **T**rigonométricas\n* **E**xponenciais';
      } else {
        botResponse = `Com base nas fórmulas digitalizadas da lousa de Cálculo: ${query} está diretamente ligado ao Teorema Fundamental do Cálculo e à busca pela área sob a curva. No aplicativo móvel Jovi, você pode exportar este tópico para o seu caderno do Notion ou Anki!`;
      }

      setChatMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: botResponse }]);
      setIsTyping(false);
    }, 900);
  };

  const currentCard = cards[currentCardIndex];
  const isFinished = currentCardIndex === cards.length - 1 && (masteredCards.includes(currentCard.id) || reviewCards.includes(currentCard.id));

  return (
    <section id="studio" className="py-24 relative overflow-hidden bg-[#060911]">
      
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>NOVO NA SPRINT 4 · REACT STUDY STUDIO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            AI Studio: da foto ao <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-indigo-500">estudo ativo em 4 modos</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base leading-relaxed">
            Experimente a interface de estudo gerada instantaneamente pelo Google Gemini após o disparo da foto. Alterne entre os flashcards interativos, o resumo estruturado, o mapa mental e o tutor em tempo real.
          </p>
        </div>

        {/* Tab Switcher Header */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-md shadow-2xl">
            <button
              onClick={() => {
                soundEffects.click();
                setActiveTab('flashcards');
              }}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'flashcards'
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>1. Deck de Flashcards</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-white/20 text-white">
                {cards.length}
              </span>
            </button>

            <button
              onClick={() => {
                soundEffects.click();
                setActiveTab('resumo');
              }}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'resumo'
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>2. Resumo da Lousa</span>
            </button>

            <button
              onClick={() => {
                soundEffects.click();
                setActiveTab('mindmap');
              }}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'mindmap'
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <GitBranch className="w-4 h-4" />
              <span>3. Mapa Mental</span>
            </button>

            <button
              onClick={() => {
                soundEffects.click();
                setActiveTab('chat');
              }}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'chat'
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>4. Tutor Gemini</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Flashcards Interativos 3D */}
        {activeTab === 'flashcards' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-[#0b101d] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
              
              {/* Deck Header & Progress */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-lg">
                    {currentCard.category}
                  </span>
                  <span className="text-xs text-slate-400">
                    Dificuldade: <strong className="text-slate-200">{currentCard.difficulty}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                  <span>Card {currentCardIndex + 1} de {cards.length}</span>
                  <button
                    onClick={handleResetCards}
                    title="Reiniciar Deck"
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden mb-8">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${((currentCardIndex + 1) / cards.length) * 100}%` }}
                />
              </div>

              {/* 3D Flip Card Container */}
              <div
                onClick={handleFlip}
                className="perspective-1000 min-h-[260px] sm:min-h-[280px] cursor-pointer select-none group"
              >
                <div
                  className={`relative w-full h-full min-h-[260px] sm:min-h-[280px] rounded-2xl p-6 sm:p-8 transition-transform duration-500 transform-style-3d border ${
                    isFlipped
                      ? 'rotate-y-180 bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-950 border-cyan-500/40 shadow-xl shadow-cyan-500/10'
                      : 'bg-gradient-to-br from-slate-900/90 via-slate-900 to-slate-950/90 border-white/10 group-hover:border-indigo-500/40 shadow-xl'
                  } flex flex-col justify-between`}
                >
                  
                  {/* Front Side (Question) */}
                  <div className={`backface-hidden ${isFlipped ? 'hidden' : 'block'}`}>
                    <div className="flex items-center justify-between text-xs text-indigo-400 font-mono mb-4">
                      <span>PERGUNTA DA LOUSA</span>
                      <span className="text-[11px] text-slate-500">Clique para virar</span>
                    </div>
                    <p className="text-lg sm:text-xl font-medium text-white leading-relaxed mt-4">
                      {currentCard.front}
                    </p>
                  </div>

                  {/* Back Side (Answer) */}
                  <div className={`backface-hidden rotate-y-180 ${isFlipped ? 'block' : 'hidden'}`}>
                    <div className="flex items-center justify-between text-xs text-cyan-400 font-mono mb-4">
                      <span>RESPOSTA &amp; EXPLICAÇÃO DA IA</span>
                      <span className="text-[11px] text-slate-500">Clique para desvirar</span>
                    </div>
                    <p className="text-base sm:text-lg font-normal text-slate-100 leading-relaxed mt-2">
                      {currentCard.back}
                    </p>
                  </div>

                  {/* Card bottom hint */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                    <span>💡 Extraído de Cálculo I · Anotações 2026</span>
                    <span className="font-mono text-cyan-400">Jovi Memory Engine</span>
                  </div>
                </div>
              </div>

              {/* User Self-Evaluation Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={handlePrev}
                    disabled={currentCardIndex === 0}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-xs font-semibold text-slate-300 transition-colors"
                  >
                    ← Anterior
                  </button>
                  <button
                    onClick={handleFlip}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
                  >
                    Virar Card (Espaço)
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={currentCardIndex === cards.length - 1}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-xs font-semibold text-slate-300 transition-colors"
                  >
                    Próximo →
                  </button>
                </div>

                {/* Mastery buttons */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleMarkReview}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 text-xs font-semibold transition-colors"
                  >
                    <XCircle className="w-3.5 h-3.5 text-rose-400" />
                    <span>Preciso Revisar</span>
                  </button>
                  <button
                    onClick={handleMarkMastered}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-semibold transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Acertei!</span>
                  </button>
                </div>
              </div>

              {/* Completion Banner */}
              {isFinished && (
                <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-indigo-500/20 border border-emerald-400/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Trophy className="w-6 h-6 text-yellow-400" />
                    <div>
                      <div className="text-xs font-bold text-white">Parabéns! Sessão de Flashcards Concluída</div>
                      <div className="text-[11px] text-slate-300">
                        {masteredCards.length} dominados · {reviewCards.length} para reforçar
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleResetCards}
                    className="text-xs font-semibold px-3 py-1.5 bg-emerald-500 text-slate-950 rounded-lg hover:bg-emerald-400 transition-colors font-mono"
                  >
                    Estudar Novamente
                  </button>
                </div>
              )}

            </div>
          </div>
        )}

        {/* Tab 2: Resumo Estruturado */}
        {activeTab === 'resumo' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-[#0b101d] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
                <div>
                  <div className="text-xs font-mono text-cyan-400 mb-1">CÁLCULO DIFERENCIAL E INTEGRAL I</div>
                  <h3 className="text-xl font-bold text-white">Resumo Executivo da Aula: Integrais &amp; Primitivas</h3>
                  <p className="text-xs text-slate-400 mt-1">Digitalizado em 29/10/2026 · Sala 402 FIAP Paulista</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopySummary}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-all border border-white/5"
                  >
                    {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSummary ? 'Copiado!' : 'Copiar Texto'}</span>
                  </button>
                  <button
                    onClick={handleCopySummary}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-medium text-white transition-all shadow-md shadow-indigo-600/30"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Exportar Markdown</span>
                  </button>
                </div>
              </div>

              {/* Note Content */}
              <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
                <div>
                  <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                    1. O que é a Integral Indefinida?
                  </h4>
                  <p>
                    Dada uma função contínua <strong className="text-cyan-300">f(x)</strong> em um intervalo, sua integral indefinida consiste no conjunto de todas as funções <strong className="text-indigo-300">F(x)</strong> cuja derivada é igual a <strong className="text-cyan-300">f(x)</strong>. Como a derivada de uma constante é nula, sempre somamos a constante arbitrária <strong className="text-amber-400 font-mono">+ C</strong>.
                  </p>
                </div>

                <div className="bg-slate-900/80 rounded-2xl p-4 border border-white/5 font-mono text-xs space-y-2">
                  <div className="text-slate-400 text-[10px] uppercase tracking-wider">Tabela de Integrais Imediatas Extraída da Lousa:</div>
                  <div className="p-2 rounded bg-black/40 text-cyan-300">∫ k dx = kx + C</div>
                  <div className="p-2 rounded bg-black/40 text-cyan-300">∫ xⁿ dx = (xⁿ⁺¹) / (n + 1) + C  [para n ≠ -1]</div>
                  <div className="p-2 rounded bg-black/40 text-cyan-300">∫ eˣ dx = eˣ + C</div>
                  <div className="p-2 rounded bg-black/40 text-cyan-300">∫ (1/x) dx = ln|x| + C</div>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                    2. Pontos de Atenção na Prova
                  </h4>
                  <ul className="list-disc list-inside space-y-1.5 text-slate-300">
                    <li><strong className="text-white">Constante C:</strong> Não esquecer de incluir <code className="text-amber-300 bg-amber-400/10 px-1 py-0.5 rounded font-mono">+ C</code> no gabarito, sob pena de perda de nota.</li>
                    <li><strong className="text-white">Substituição u:</strong> Identifique sempre a derivada interna <code className="text-cyan-300 font-mono">du</code> antes de substituir a variável.</li>
                    <li><strong className="text-white">Linearidade:</strong> A integral da soma é a soma das integrais, e constantes multiplicativas podem ser "puxadas" para fora do operador.</li>
                  </ul>
                </div>
              </div>

              {/* Note Footer */}
              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                <span>Salvo automaticamente no <strong className="text-slate-200">AI Archive</strong></span>
                <span className="text-emerald-400 font-mono">Status: Sincronizado</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Mapa Mental Interativo */}
        {activeTab === 'mindmap' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#0b101d] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <div className="text-xs font-mono text-cyan-400 mb-1">MAPA CONCEITUAL GERADO POR IA</div>
                  <h3 className="text-xl font-bold text-white">Navegação em Árvore: Cálculo &amp; Primitivas</h3>
                </div>
                <div className="text-xs text-slate-400">
                  Clique nos nós para inspecionar os detalhes
                </div>
              </div>

              {/* Visual Graph Representation */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Node 1 */}
                <div
                  onClick={() => {
                    soundEffects.click();
                    setActiveNode('integral');
                  }}
                  className={`p-5 rounded-2xl cursor-pointer transition-all border ${
                    activeNode === 'integral'
                      ? 'bg-indigo-600/25 border-indigo-500 shadow-lg shadow-indigo-600/20'
                      : 'bg-slate-900/60 border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold mb-3">
                    ∫
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">Conceito de Integral</h4>
                  <p className="text-xs text-slate-300">
                    Operação inversa da derivação, cálculo de área e acumulação contínua de grandezas.
                  </p>
                </div>

                {/* Node 2 */}
                <div
                  onClick={() => {
                    soundEffects.click();
                    setActiveNode('teorema');
                  }}
                  className={`p-5 rounded-2xl cursor-pointer transition-all border ${
                    activeNode === 'teorema'
                      ? 'bg-cyan-600/25 border-cyan-500 shadow-lg shadow-cyan-600/20'
                      : 'bg-slate-900/60 border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold mb-3">
                    ⚡
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">Teorema Fundamental</h4>
                  <p className="text-xs text-slate-300">
                    Conecta a derivada e a integral definida: ∫[a, b] f(x) dx = F(b) - F(a).
                  </p>
                </div>

                {/* Node 3 */}
                <div
                  onClick={() => {
                    soundEffects.click();
                    setActiveNode('metodos');
                  }}
                  className={`p-5 rounded-2xl cursor-pointer transition-all border ${
                    activeNode === 'metodos'
                      ? 'bg-purple-600/25 border-purple-500 shadow-lg shadow-purple-600/20'
                      : 'bg-slate-900/60 border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold mb-3">
                    🧩
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">Técnicas de Resolução</h4>
                  <p className="text-xs text-slate-300">
                    Substituição simples de variável (u-du) e integração por partes (LIATE).
                  </p>
                </div>

              </div>

              {/* Node Inspector Detail Panel */}
              <div className="mt-6 p-6 rounded-2xl bg-slate-900/80 border border-white/10">
                <div className="text-xs font-mono text-indigo-400 mb-2">DETALHAMENTO DO NÓ SELECIONADO</div>
                {activeNode === 'integral' && (
                  <div>
                    <h4 className="text-base font-bold text-white">Definição Rigorosa de Integral Indefinida</h4>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      Se F'(x) = f(x) para todo x em um intervalo I, então F é dita uma antiderivada de f em I. A integral indefinida engloba a família de curvas paralelas distanciadas pela constante vertical C.
                    </p>
                  </div>
                )}
                {activeNode === 'teorema' && (
                  <div>
                    <h4 className="text-base font-bold text-white">Importância Histórica e Prática</h4>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      Formulado independentemente por Newton e Leibniz, o Teorema Fundamental do Cálculo transforma a computação de áreas geométricas complexas em um cálculo analítico de antiderivadas simples.
                    </p>
                  </div>
                )}
                {activeNode === 'metodos' && (
                  <div>
                    <h4 className="text-base font-bold text-white">Regra de Ouro para a Prova</h4>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      Sempre tente primeiro a substituição direta. Caso o integrando seja produto de funções de classes diferentes (ex: polinômio x exponencial), passe imediatamente para a integração por partes.
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* Tab 4: Copilot Chat Simulator */}
        {activeTab === 'chat' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-[#0b101d] border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col h-[520px]">
              
              {/* Chat Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-[1.5px]">
                    <div className="w-full h-full bg-[#080c16] rounded-[10px] flex items-center justify-center text-cyan-400">
                      <Bot className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-1.5">
                      <span>Jovi Tutor Gemini</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    </div>
                    <div className="text-[11px] text-slate-400">Contexto ativo: Foto da Lousa · Cálculo I</div>
                  </div>
                </div>
              </div>

              {/* Chat Message Scroll */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {chatMessages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.sender === 'bot' && (
                      <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-cyan-300 shrink-0 mt-1">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-indigo-600 text-white rounded-br-none'
                          : 'bg-slate-900 border border-white/10 text-slate-200 rounded-bl-none whitespace-pre-line'
                      }`}
                    >
                      {msg.text}
                    </div>
                    {msg.sender === 'user' && (
                      <div className="w-7 h-7 rounded-lg bg-slate-800 border border-white/10 flex items-center justify-center text-slate-300 shrink-0 mt-1">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-3 items-center text-xs text-slate-400 font-mono">
                    <div className="w-7 h-7 rounded-lg bg-indigo-600/30 flex items-center justify-center text-cyan-300">
                      <Bot className="w-4 h-4" />
                    </div>
                    <span>Jovi Tutor está digitando...</span>
                  </div>
                )}
              </div>

              {/* Quick Prompt Suggestions */}
              <div className="py-2 flex flex-wrap gap-1.5">
                <button
                  onClick={() => handleSendMessage('Gere um exercício de prova com resolução')}
                  className="text-[10px] bg-slate-800/80 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-lg border border-white/5 transition-colors"
                >
                  📝 Exercício de prova
                </button>
                <button
                  onClick={() => handleSendMessage('Explique a regra de integração por partes')}
                  className="text-[10px] bg-slate-800/80 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-lg border border-white/5 transition-colors"
                >
                  🔍 Regra por partes
                </button>
                <button
                  onClick={() => handleSendMessage('Qual é o erro mais comum nessa matéria?')}
                  className="text-[10px] bg-slate-800/80 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-lg border border-white/5 transition-colors"
                >
                  ⚠️ Erro mais comum
                </button>
              </div>

              {/* Chat Input Bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="pt-2 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Pergunte qualquer dúvida sobre a lousa..."
                  className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="p-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                  aria-label="Enviar mensagem"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}

