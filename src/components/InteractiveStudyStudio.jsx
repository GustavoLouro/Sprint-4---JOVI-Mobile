import React, { useState } from 'react';
import {
  Layers,
  BookOpen,
  GitBranch,
  MessageSquare,
  RotateCw,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  Send,
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEffects } from '../utils/audio';

export default function InteractiveStudyStudio() {
  const [activeTab, setActiveTab] = useState('flashcards');

  // Flashcards state com dados autênticos de aula de Engenharia
  const initialCards = [
    {
      id: 1,
      front: 'O que diz o Teorema Fundamental do Cálculo?',
      back: 'Conecta derivação e integração: se f é contínua em [a, b], a integral definida de f é calculada pela diferença de sua primitiva F(b) - F(a).',
      topic: 'Cálculo I',
      tip: 'Cai com frequência na prova intermediária'
    },
    {
      id: 2,
      front: 'Qual é a regra geral da integral de potência ∫ xⁿ dx?',
      back: '∫ xⁿ dx = (xⁿ⁺¹) / (n + 1) + C, válida para todo n ≠ -1.',
      topic: 'Regra Prática',
      tip: 'Não esquecer do + C nas integrais indefinidas'
    },
    {
      id: 3,
      front: 'Quando devemos usar Integração por Partes?',
      back: 'Quando o integrando é um produto de duas funções de naturezas diferentes (ex: x · eˣ ou x · sen(x)). A fórmula é: ∫ u dv = u·v - ∫ v du.',
      topic: 'Técnica de Resolução',
      tip: 'Dica do professor: use o macete LIATE para escolher o u'
    },
    {
      id: 4,
      front: 'Qual é a integral de 1/x dx e por que usamos módulo?',
      back: '∫ (1/x) dx = ln|x| + C. O módulo é obrigatório porque o logaritmo natural só é definido para números estritamente positivos.',
      topic: 'Pegadinha Clássica',
      tip: 'Ponto descontado se esquecer a barra de módulo'
    }
  ];

  const [cards, setCards] = useState(initialCards);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState([]);
  const [reviewCards, setReviewCards] = useState([]);
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Chat com a lousa
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Oi! Li as anotações da lousa de Cálculo I da aula de hoje. Tem fórmulas de primitiva imediata, integração por partes e o Teorema Fundamental. O que você quer que eu explique com mais calma?'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Mapa de nós
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
        particleCount: 60,
        spread: 60,
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
    const text = `# Anotações de Aula: Cálculo I (FIAP)
Data da Aula: Outubro de 2026 · Sala 402
Assunto: Introdução às Integrais e Primitivas

## O Conceito Básico
A integral indefinida é o inverso da derivada. Encontrar a integral de f(x) é descobrir qual função, ao ser derivada, resulta em f(x).

## Fórmulas da Lousa:
* Potência: ∫ xⁿ dx = (xⁿ⁺¹)/(n+1) + C (n ≠ -1)
* Exponencial: ∫ eˣ dx = eˣ + C
* Logarítmica: ∫ (1/x) dx = ln|x| + C
* Por Partes: ∫ u dv = u·v - ∫ v du

## Cuidados para a Prova:
1. Sempre colocar o "+ C" no final da resposta.
2. Não esquecer a barra de módulo no ln|x|.
3. Na integração por partes, escolha o u com a regra LIATE.`;

    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
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
      if (query.toLowerCase().includes('exercício') || query.toLowerCase().includes('prova')) {
        botResponse = 'Aqui vai um exemplo típico de prova da FIAP:\n\nCalcule: ∫ (4x³ - 6x² + 5) dx\n\nResolução passo a passo:\n1. ∫ 4x³ dx = 4 · (x⁴/4) = x⁴\n2. ∫ -6x² dx = -6 · (x³/3) = -2x³\n3. ∫ 5 dx = 5x\n\nResposta final: x⁴ - 2x³ + 5x + C (lembre-se do + C!).';
      } else if (query.toLowerCase().includes('partes') || query.toLowerCase().includes('liate')) {
        botResponse = 'O macete LIATE serve para definir quem você chama de "u" na fórmula ∫ u dv = u·v - ∫ v du:\n\n• L: Logarítmicas (ln x)\n• I: Inversas trigonométricas (arcsen x)\n• A: Algébricas / Polinômios (x², 3x)\n• T: Trigonométricas (sen x, cos x)\n• E: Exponenciais (eˣ)\n\nQuem aparecer primeiro nessa lista vira o seu "u". O resto vira "dv".';
      } else {
        botResponse = `Baseado na lousa digitalizada: esse conceito se apoia na antiderivada. No aplicativo, esse trecho foi associado à pasta "Cálculo I" para revisão rápida antes da prova.`;
      }

      setChatMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: botResponse }]);
      setIsTyping(false);
    }, 700);
  };

  const currentCard = cards[currentCardIndex];

  return (
    <section id="studio" className="py-20 relative bg-[#080c14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-mono font-semibold text-indigo-400 uppercase tracking-wider">
            Módulo de Estudo
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Como a anotação vira material de revisão
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Depois que a câmera equaliza a iluminação da lousa, o sistema gera 4 formatos de revisão para o aluno escolher como prefere estudar.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 rounded-lg bg-slate-900 border border-slate-800">
            <button
              onClick={() => {
                soundEffects.click();
                setActiveTab('flashcards');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeTab === 'flashcards'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Flashcards ({cards.length})</span>
            </button>

            <button
              onClick={() => {
                soundEffects.click();
                setActiveTab('resumo');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeTab === 'resumo'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Resumo Formatado</span>
            </button>

            <button
              onClick={() => {
                soundEffects.click();
                setActiveTab('mindmap');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeTab === 'mindmap'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>Mapa de Tópicos</span>
            </button>

            <button
              onClick={() => {
                soundEffects.click();
                setActiveTab('chat');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeTab === 'chat'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Dúvidas da Matéria</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Flashcards */}
        {activeTab === 'flashcards' && (
          <div className="max-w-xl mx-auto">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 shadow-xl">
              
              {/* Header */}
              <div className="flex items-center justify-between text-xs mb-4">
                <span className="font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                  {currentCard.topic}
                </span>
                <div className="flex items-center gap-3 text-slate-400 font-mono">
                  <span>Card {currentCardIndex + 1} de {cards.length}</span>
                  <button
                    onClick={handleResetCards}
                    title="Reiniciar"
                    className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
                  >
                    <RotateCw className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Progress */}
              <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden mb-6">
                <div
                  className="bg-indigo-500 h-full rounded-full transition-all duration-200"
                  style={{ width: `${((currentCardIndex + 1) / cards.length) * 100}%` }}
                />
              </div>

              {/* Card Container */}
              <div
                onClick={handleFlip}
                className="perspective-1000 min-h-[220px] cursor-pointer select-none"
              >
                <div
                  className={`relative w-full h-full min-h-[220px] rounded-lg p-6 transition-transform duration-300 transform-style-3d border ${
                    isFlipped
                      ? 'rotate-y-180 bg-slate-950 border-indigo-500/40 text-slate-100'
                      : 'bg-slate-950/80 border-slate-800 text-white'
                  } flex flex-col justify-between`}
                >
                  <div className={`backface-hidden ${isFlipped ? 'hidden' : 'block'}`}>
                    <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-2">
                      Pergunta da Lousa
                    </div>
                    <p className="text-base sm:text-lg font-medium leading-relaxed">
                      {currentCard.front}
                    </p>
                  </div>

                  <div className={`backface-hidden rotate-y-180 ${isFlipped ? 'block' : 'hidden'}`}>
                    <div className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider mb-2">
                      Resposta / Explicação
                    </div>
                    <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                      {currentCard.back}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-500 flex justify-between">
                    <span>💡 {currentCard.tip}</span>
                    <span>Clique para virar</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handlePrev}
                    disabled={currentCardIndex === 0}
                    className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-xs text-slate-300 font-medium"
                  >
                    Anterior
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={currentCardIndex === cards.length - 1}
                    className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-xs text-slate-300 font-medium"
                  >
                    Próximo
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleMarkReview}
                    className="px-3 py-1.5 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 text-xs font-medium flex items-center gap-1"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Preciso rever</span>
                  </button>
                  <button
                    onClick={handleMarkMastered}
                    className="px-3 py-1.5 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/20 text-xs font-medium flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Já memorizei</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab 2: Resumo */}
        {activeTab === 'resumo' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
                <div>
                  <h3 className="text-base font-semibold text-white">Resumo: Introdução às Primitivas</h3>
                  <span className="text-xs text-slate-400">Cálculo I · Anotações da Sala 402</span>
                </div>
                <button
                  onClick={handleCopySummary}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition-colors"
                >
                  {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSummary ? 'Copiado' : 'Copiar Texto'}</span>
                </button>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                <div>
                  <strong className="text-white block mb-1">1. Ideia Central:</strong>
                  <p>A integral indefinida busca a função primitiva cuja taxa de variação (derivada) equivale ao integrando. A constante <code className="text-indigo-300 bg-slate-950 px-1 py-0.5 rounded font-mono">+ C</code> representa as infinitas translações verticais possíveis.</p>
                </div>

                <div className="bg-slate-950 p-3.5 rounded border border-slate-800/80 font-mono text-xs space-y-1.5 text-slate-300">
                  <div className="text-slate-500 text-[10px] uppercase">Tabela de Fórmulas da Lousa:</div>
                  <div>∫ xⁿ dx = (xⁿ⁺¹)/(n + 1) + C  [para n ≠ -1]</div>
                  <div>∫ (1/x) dx = ln|x| + C</div>
                  <div>∫ eˣ dx = eˣ + C</div>
                </div>

                <div>
                  <strong className="text-white block mb-1">2. Pontos que o Professor Destacou:</strong>
                  <ul className="list-disc list-inside space-y-1 text-slate-400">
                    <li>Não deixe de colocar o "+ C" no gabarito das questões dissertativas.</li>
                    <li>Sempre verifique se dá para simplificar o polinômio antes de começar a integrar.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Mapa de Tópicos */}
        {activeTab === 'mindmap' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 shadow-xl">
              <div className="mb-4">
                <h3 className="text-base font-semibold text-white">Hierarquia de Tópicos da Aula</h3>
                <span className="text-xs text-slate-400">Clique em um conceito para ler a síntese</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                <button
                  onClick={() => {
                    soundEffects.click();
                    setActiveNode('integral');
                  }}
                  className={`p-3 rounded text-left border text-xs transition-colors ${
                    activeNode === 'integral'
                      ? 'bg-indigo-950/60 border-indigo-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="font-semibold text-white mb-1">1. Conceito Básico</div>
                  <div className="text-[11px] text-slate-400">Operação inversa da derivada</div>
                </button>

                <button
                  onClick={() => {
                    soundEffects.click();
                    setActiveNode('teorema');
                  }}
                  className={`p-3 rounded text-left border text-xs transition-colors ${
                    activeNode === 'teorema'
                      ? 'bg-indigo-950/60 border-indigo-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="font-semibold text-white mb-1">2. Teorema Fundamental</div>
                  <div className="text-[11px] text-slate-400">Cálculo de área e primitivas</div>
                </button>

                <button
                  onClick={() => {
                    soundEffects.click();
                    setActiveNode('metodos');
                  }}
                  className={`p-3 rounded text-left border text-xs transition-colors ${
                    activeNode === 'metodos'
                      ? 'bg-indigo-950/60 border-indigo-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="font-semibold text-white mb-1">3. Técnicas de Resolução</div>
                  <div className="text-[11px] text-slate-400">Substituição e Partes</div>
                </button>
              </div>

              <div className="p-4 rounded bg-slate-950 border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                {activeNode === 'integral' && (
                  <p>A integral indefinida representa uma família de funções. Se a derivada de x² é 2x, a integral de 2x dx é x² + C, pois a constante derivada sempre dá zero.</p>
                )}
                {activeNode === 'teorema' && (
                  <p>O Teorema Fundamental unifica o cálculo diferencial e o integral. Ele permite encontrar a área delimitada por uma curva apenas calculando a diferença F(b) - F(a).</p>
                )}
                {activeNode === 'metodos' && (
                  <p>Quando a tabela direta não resolve, aplicamos a substituição simples (u-du) ou a integração por partes (LIATE) para reduzir a integral a termos conhecidos.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Dúvidas */}
        {activeTab === 'chat' && (
          <div className="max-w-xl mx-auto">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-xl flex flex-col h-[460px]">
              
              <div className="pb-3 border-b border-slate-800 mb-3 flex items-center justify-between text-xs">
                <span className="font-semibold text-white">Assistente da Lousa (Cálculo I)</span>
                <span className="text-slate-400 text-[11px]">Contexto: Aula de 29/10</span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
                {chatMessages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg p-3 leading-relaxed whitespace-pre-line ${
                        msg.sender === 'user'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-950 border border-slate-800 text-slate-200'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="text-[11px] text-slate-500 font-mono">
                    Consultando as equações da lousa...
                  </div>
                )}
              </div>

              <div className="py-2 flex flex-wrap gap-1.5">
                <button
                  onClick={() => handleSendMessage('Gere um exercício com resposta')}
                  className="text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-0.5 rounded"
                >
                  📝 Exercício de prova
                </button>
                <button
                  onClick={() => handleSendMessage('Como funciona a regra LIATE?')}
                  className="text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-0.5 rounded"
                >
                  🔍 Macete LIATE
                </button>
              </div>

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
                  placeholder="Ex: Como eu sei quando usar integração por partes?"
                  className="flex-1 bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="p-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
