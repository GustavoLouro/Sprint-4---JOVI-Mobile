# Jovi Study Hub · Landing Page & Web Application
**Challenge JOVI + FIAP 2026 · Sprint 4 (Entrega Conjunta)**  
*Disciplinas Integradas: Front-End Design & Web Development*  
*Curso: Engenharia de Software (2º Semestre) — FIAP Campus Paulista*

---

## 📌 Sobre a Solução
O **Jovi Study Hub** é uma aplicação web desenvolvida para resolver um problema recorrente de alunos universitários: fotos de lousa que ficam escuras ou com sombras do próprio aluno cobrindo fórmulas e resoluções passadas pelo professor.

A aplicação equaliza a iluminação das fotos da lousa e organiza as anotações em materiais práticos de estudo:
1. **Resumos de Aula Formatados:** Transcrição das fórmulas com destaque de propriedades essenciais.
2. **Flashcards Ativos:** Decks com virada 3D e contagem de acertos para fixação rápida do conteúdo.
3. **Mapa Conceitual de Tópicos:** Visualização em árvore com definições e teoremas interligados.
4. **Assistente de Dúvidas:** Chat para tirar dúvidas rápidas sobre a matéria da aula.

---

## 🚀 Evolução da Sprint 03 para a Sprint 04
Nesta Sprint 04, a Landing Page desenvolvida na Sprint 03 foi **evoluída e integrada ao ecossistema moderno do React + Tailwind CSS**, atendendo à entrega conjunta das disciplinas de **Front-End Design** e **Web Development**:

* ⚛️ **Integração com React 18 e Vite:** Componentização modular, navegação fluida e renderização reativa sem recarregamento de página.
* 🎨 **Estilização com Tailwind CSS:** Design limpo em Dark Mode, responsividade para Mobile, Tablet e Desktop com tipografia balanceada e classes utilitárias.
* ⚡ **Comparador Antes / Depois Interativo:** Slider que permite comparar a foto bruta com sombra e o resultado após a equalização de contraste.
* 🧠 **Estúdio de Estudo:**
  * Flashcards com virada 3D, contagem de acertos e revisão;
  * Resumo executivo com botão de cópia rápida em Markdown;
  * Mapa de tópicos conceituais navegável;
  * Assistente de dúvidas com exemplos e resolução passo a passo.
* 📸 **Simulador de Câmera em Aula:** Modos de contraste para lousa de giz, quadro branco ou sala com projetor, com controles de zoom (1×, 2×, 3×).
* 🎬 **Player de Vídeo Integrado:** Exibição da gravação feita em aula com controles próprios e alternador do filtro anti-sombra.
* 📬 **Formulário de Contato com Validação:** Validação de campos obrigatórios e formato de e-mail em tempo real.
* 🔊 **Feedback Sonoro Opcional:** Micro-interações de clique e virada de card sintetizadas no navegador (com botão para silenciar a qualquer momento).

---

## 🛠️ Tecnologias Utilizadas
* **React 18:** Biblioteca para construção da interface de usuário em componentes reutilizáveis.
* **Vite 6:** Ferramenta de build e servidor de desenvolvimento ultra-rápido.
* **Tailwind CSS v3:** Framework de estilização utilitária com customização de tema dark mode.
* **Lucide React:** Biblioteca de ícones vetoriais modernos e consistentes.
* **Canvas Confetti:** Feedback visual com confetes para metas de estudo concluídas.
* **Web Audio API:** Síntese de micro-sons de interface sem dependência de arquivos externos.
* **Git + Vercel:** Controle de versão e infraestrutura de hospedagem em nuvem com Continuous Deployment.

---

## 💻 Como Instalar e Executar a Aplicação Localmente

### 1. Pré-requisitos
Certifique-se de ter o **Node.js** (versão 18 ou superior) e o gerenciador de pacotes **npm** instalados em sua máquina.
Para verificar:
```bash
node -v
npm -v
```

### 2. Clonar o Repositório ou Descompactar o .ZIP
Caso esteja com o arquivo `.ZIP`, extraia o conteúdo para uma pasta de sua preferência e acesse o diretório pelo terminal.

### 3. Instalar as Dependências
No terminal, dentro da pasta do projeto, execute:
```bash
npm install
```

### 4. Executar o Projeto em Modo de Desenvolvimento
Para iniciar o servidor local do Vite:
```bash
npm run dev
```
O terminal exibirá o endereço local, geralmente:
👉 `http://localhost:3000` ou `http://localhost:5173`  
Abra o link no navegador para testar a aplicação com *Hot Module Replacement (HMR)* ativo.

### 5. Gerar o Build de Produção
Para compilar e otimizar os arquivos para produção (equivalente ao que a Vercel executa):
```bash
npm run build
```
Os arquivos otimizados serão gerados na pasta `dist/`.

Para testar o preview da versão compilada:
```bash
npm run preview
```

---

## 🌐 Como Executar os Servidores (Back-end)
Esta aplicação foi projetada como uma **Single Page Application (SPA) client-side serverless**.
* Toda a lógica de processamento visual (shaders de correção de luminância, simulação dos 10 efeitos fotográficos, de-skewing e interações do AI Studio) foi implementada de forma reativa e executada **diretamente no navegador**.
* Portanto, **não é necessário inicializar nenhum servidor de back-end adicional** ou banco de dados externo para testar e avaliar a totalidade das funcionalidades da Sprint 4.

---

## 🔑 Usuários e Senhas para Teste (Autenticação)
* O projeto foi disponibilizado com **acesso livre e sem barreiras de autenticação**, permitindo que o professor e a banca avaliadora acessem, interajam e testem todos os recursos (Scanner, AI Studio, Flashcards, Mapa Mental, Player de Vídeo e Formulário) sem a necessidade de criar credenciais ou realizar login prévio.

---

## 🔗 Links Importantes

| Recurso | Link |
| :--- | :--- |
| **Deploy na Vercel (Produção)** | *Substitua aqui pelo seu link na Vercel gerado após o deploy* (Ex: `https://jovi-study-hub.vercel.app`) |
| **Repositório no GitHub** | *Substitua aqui pelo link do repositório Git da equipe* (Ex: `https://github.com/seu-usuario/jovi-study-hub`) |

> **Nota para a equipe:** Antes de enviar ao professor, crie o repositório no GitHub (`git init`, `git add .`, `git commit -m "feat: sprint 4 react tailwind"`, `git push`), vincule à Vercel e insira as URLs finais na tabela acima.

---

## 📁 Estrutura de Arquivos do Projeto
```
landing-page/
├── public/                     # Arquivos estáticos públicos (imagens, vídeos e favicon)
│   └── assets/
│       ├── images/             # Lousas reais, telas do app e fotos dos integrantes
│       ├── videos/             # Vídeo MP4 da demonstração em aula
│       └── favicon.svg         # Ícone oficial JoviHub
├── src/
│   ├── components/             # Componentes modulares React
│   │   ├── Navbar.jsx          # Menu de navegação responsivo com mute e scroll spy
│   │   ├── Hero.jsx            # Cabeçalho de alto impacto e mockup da câmera
│   │   ├── SolutionBento.jsx   # Grade Bento com dores e arquitetura do app
│   │   ├── AntiShadowScanner.jsx # Comparador Before/After interativo com slider
│   │   ├── InteractiveStudyStudio.jsx # Estúdio de estudos (Flashcards 3D, Resumos, Mapa, Chat)
│   │   ├── LiveViewfinderDemo.jsx # Simulador com os 10 AI Effects fotográficos
│   │   ├── VideoDemoPlayer.jsx # Player de vídeo customizado com filtro anti-sombra
│   │   ├── PersonasSection.jsx # Pesquisa de usuários e personas (Lucas e Ana)
│   │   ├── AiArchiveGallery.jsx # Galeria de telas com modal lightbox e filtros
│   │   ├── TeamSection.jsx     # Identificação visual e funções dos 5 integrantes
│   │   ├── ContactSection.jsx  # Formulário reativo com validação e dados da FIAP
│   │   └── Footer.jsx          # Rodapé com especificações acadêmicas da Sprint 4
│   ├── utils/
│   │   └── audio.js            # Síntese de áudio para micro-interações via Web Audio API
│   ├── App.jsx                 # Componente raiz que orquestra a aplicação
│   ├── main.jsx                # Ponto de entrada do React
│   └── index.css               # Diretivas do Tailwind CSS e estilos 3D
├── INTEGRANTES.TXT             # Identificação obrigatória do grupo (nomes e RMs)
├── README.md                   # Esta documentação completa do projeto
├── package.json                # Configuração de scripts e dependências npm
├── tailwind.config.js          # Configuração do Tailwind CSS (cores e animações)
├── postcss.config.js           # Processamento PostCSS
├── vite.config.js              # Configuração do Vite
├── vercel.json                 # Configuração de rotas e build para deploy na Vercel
└── .gitignore                  # Arquivos ignorados pelo controle de versão
```

---

## 👥 Identificação dos Integrantes

| Nome Completo | RM | Função Principal no Projeto |
| :--- | :---: | :--- |
| **João Pedro Maschion da Cruz Sá** | **570509** | Front-End & Protótipo (React, Tailwind & Canvas) |
| **Gustavo Rezende Louro** | **570708** | UX/UI & Design System (Identidade Visual & Micro-interações) |
| **João Pedro Lagonegro Bosco e Silva** | **569444** | Pesquisa de Campo & Storytelling (Entrevistas & Validação) |
| **Raul Azzi Corsi** | **569022** | Back-End & IA (Pipeline de Visão & Gemini Vision) |
| **Lucas Henrique Alves da Silva** | **572216** | Documentação Técnica & Garantia de Qualidade |

---

*Projeto desenvolvido com dedicação para o Challenge JOVI + FIAP 2026. Todas as instruções permitem que o professor instale, execute e avalie a aplicação com total facilidade.*
