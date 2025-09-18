// 🎨 Estilo visual embutido
const estilo = document.createElement('style');
estilo.innerHTML = `
  body {
    font-family: 'Comic Sans MS', cursive, sans-serif;
    text-align: center;
    background-color: #e0f7fa;
    margin: 0;
    padding: 20px;
  }

  h1 {
    margin-bottom: 20px;
    font-size: 32px;
    color: #00796b;
    text-transform: uppercase;
  }

  #conta {
    font-size: 48px;
    margin-bottom: 20px;
    color: #004d40;
  }

  .opcoes {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 20px;
  }

  .opcoes button {
    font-size: 28px;
    padding: 20px 30px;
    border: none;
    border-radius: 12px;
    background-color: #4db6ac;
    color: white;
    cursor: pointer;
    min-width: 100px;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
    transition: transform 0.2s, background-color 0.3s;
  }

  .opcoes button:hover {
    background-color: #00897b;
    transform: scale(1.05);
  }

  #feedback {
    font-size: 28px;
    font-weight: bold;
    margin-top: 10px;
  }

  #emoji-feedback {
    font-size: 80px;
    margin-top: 10px;
  }

  #resposta {
    font-size: 28px;
    font-weight: bold;
    color: #388e3c;
    margin-top: 30px;
  }

  .botao-final {
    font-size: 20px;
    padding: 12px 24px;
    margin: 10px;
    border: none;
    border-radius: 10px;
    background-color: #00796b;
    color: white;
    cursor: pointer;
    box-shadow: 2px 2px 6px rgba(0,0,0,0.2);
    transition: background-color 0.3s, transform 0.2s;
  }

  .botao-final:hover {
    background-color: #004d40;
    transform: scale(1.05);
  }

  .progresso {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #e0f7fa;
    padding: 10px 0;
    display: flex;
    justify-content: center;
    gap: 10px;
    box-shadow: 0 -2px 6px rgba(0,0,0,0.2);
    z-index: 999;
    }

  .quadrado {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background-color: #ccc;
    font-size: 20px;
    font-weight: bold;
    color: #333;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 1px 1px 4px rgba(0,0,0,0.2);
  }

  .acerto {
    background-color: #4caf50;
    color: white;
  }

  .erro {
    background-color: #f44336;
    color: white;
  }
`;
document.head.appendChild(estilo);

// 🧮 Geração de contas simples
function gerarFasesAleatorias(qtd) {
  const fases = [];
  for (let i = 0; i < qtd; i++) {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    fases.push({ a, b });
  }
  return fases;
}

function gerarAlternativas(correta) {
  const alternativas = new Set();
  alternativas.add(correta);
  while (alternativas.size < 4) {
    const variacao = Math.floor(Math.random() * 5) + 1;
    const candidato = correta + (Math.random() < 0.5 ? -variacao : variacao);
    if (candidato >= 0) alternativas.add(candidato);
  }
  return Array.from(alternativas).sort(() => Math.random() - 0.5);
}

// 🎯 Variáveis do jogo
const todasAsFases = gerarFasesAleatorias(10);
let faseAtual = 0;
let acertos = 0;

// 🎯 Elementos do jogo
const titulo = document.createElement('h1');

document.body.appendChild(titulo);

const contaDiv = document.createElement('div');
contaDiv.id = 'conta';
document.body.appendChild(contaDiv);

const opcoesDiv = document.createElement('div');
opcoesDiv.className = 'opcoes';
document.body.appendChild(opcoesDiv);

const feedback = document.createElement('div');
feedback.id = 'feedback';
document.body.appendChild(feedback);

const emojiFeedback = document.createElement('div');
emojiFeedback.id = 'emoji-feedback';
document.body.appendChild(emojiFeedback);

const respostaDiv = document.createElement('div');
respostaDiv.id = 'resposta';
document.body.appendChild(respostaDiv);

const progressoDiv = document.createElement('div');
progressoDiv.className = 'progresso';
document.body.appendChild(progressoDiv);

// 🔢 Cria os 10 quadradinhos de progresso
for (let i = 0; i < 10; i++) {
  const box = document.createElement('div');
  box.className = 'quadrado';
  box.innerText = i + 1;
  progressoDiv.appendChild(box);
}

// 🚀 Inicia o jogo
carregarFase();

function carregarFase() {
  const fase = todasAsFases[faseAtual];
  const correta = fase.a + fase.b;
  contaDiv.innerText = `${fase.a} + ${fase.b} = ?`;
  feedback.innerText = '';
  emojiFeedback.innerText = '';
  respostaDiv.innerText = '';
  opcoesDiv.innerHTML = '';

  const alternativas = gerarAlternativas(correta);
  alternativas.forEach(valor => {
    const btn = document.createElement('button');
    btn.innerText = valor;
    btn.onclick = () => verificarResposta(valor, correta);
    opcoesDiv.appendChild(btn);
  });
}

function verificarResposta(escolhida, correta) {
  const box = progressoDiv.children[faseAtual];
  if (escolhida === correta) {
    acertos++;
    feedback.innerText = '✅ Acertou!';
    feedback.style.color = '#388e3c';
    emojiFeedback.innerText = '😄';
    box.classList.add('acerto');
  } else {
    feedback.innerText = '❌ Errou!';
    feedback.style.color = '#d32f2f';
    emojiFeedback.innerText = '😢';
    box.classList.add('erro');
  }

  faseAtual++;
  setTimeout(() => {
    if (faseAtual < todasAsFases.length) {
      carregarFase();
    } else {
      mostrarFinal();
    }
  }, 1000);
}

function mostrarFinal() {
  contaDiv.innerText = '🎉';
  opcoesDiv.innerHTML = '';
  feedback.innerText = '';
  emojiFeedback.innerText = '';

  let mensagem = '';
  if (acertos === 10) {
    mensagem = 'PARABÉNS! 10/10 MUITO BEM! 😄';
  } else if (acertos >= 5) {
    mensagem = `BOA! ${acertos}/10 👏`;
  } else {
    mensagem = `${acertos}/10 — CONTINUE PRATICANDO! 💪`;
  }

  respostaDiv.innerHTML = mensagem;

  const btnReiniciar = document.createElement('button');
  btnReiniciar.className = 'botao-final';
  btnReiniciar.innerText = '🔄 REINICIAR';
  btnReiniciar.onclick = () => {
    const novasFases = gerarFasesAleatorias(10);
    todasAsFases.length = 0;
    todasAsFases.push(...novasFases);
    faseAtual = 0;
    acertos = 0;
    respostaDiv.innerHTML = '';
    for (let i = 0; i < 10; i++) {
      progressoDiv.children[i].className = 'quadrado';
    }
    carregarFase();
  };

  const btnFechar = document.createElement('button');
  btnFechar.className = 'botao-final';
  btnFechar.innerText = '❌ FECHAR';
  btnFechar.onclick = () => {
    if (window.parent && typeof window.parent.fecharModal === 'function') {
      window.parent.fecharModal();
    }
  };

  respostaDiv.appendChild(document.createElement('br'));
  respostaDiv.appendChild(btnReiniciar);
  respostaDiv.appendChild(btnFechar);
}
