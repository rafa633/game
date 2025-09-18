const estilo = document.createElement('style');
estilo.innerHTML = `
  * { box-sizing: border-box; }

  body {
    font-family: 'Comic Sans MS', cursive, sans-serif;
    margin: 0;
    padding: 0;
    height: 100vh;
    overflow: hidden;
    background-color: #f0fff0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    position: relative;
  }

  h1 {
    font-size: 32px;
    color: #2e8b57;
    margin: 10px 0;
    text-transform: uppercase;
  }

  #emoji {
    font-size: 100px;
    margin-top: 1px;
    height: 120px;
    line-height: 120px;
  }

  #palavra {
    font-size: 48px;
    margin: 1px 0 2px;
    color: #006400;
  }

  .opcoes {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 10px;
  }

  .opcoes button {
    font-size: 28px;
    padding: 20px 30px;
    border: none;
    border-radius: 12px;
    background-color: #90ee90;
    color: #006400;
    cursor: pointer;
    min-width: 80px;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
    transition: transform 0.2s, background-color 0.3s;
  }

  .opcoes button:hover {
    background-color: #32cd32;
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
    color: #2e8b57;
    margin-top: 20px;
  }

  .botao-final {
    font-size: 20px;
    padding: 12px 24px;
    margin: 10px;
    border: none;
    border-radius: 10px;
    background-color: #2e8b57;
    color: white;
    cursor: pointer;
    box-shadow: 2px 2px 6px rgba(0,0,0,0.2);
    transition: background-color 0.3s, transform 0.2s;
  }

  .botao-final:hover {
    background-color: #006400;
    transform: scale(1.05);
  }

  .progresso {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 6px;
    padding: 10px;
    background-color: rgba(255,255,255,0.9);
    box-shadow: 0 -2px 6px rgba(0,0,0,0.2);
  }

  .quadrado {
    width: 24px;
    height: 24px;
    background-color: #ccc;
    border-radius: 4px;
  }

  .acerto {
    background-color: #4caf50 !important;
  }

  .erro {
    background-color: #f44336 !important;
  }
`;
document.head.appendChild(estilo);

// 🧩 Lista de palavras com letra faltando + emojis
const todasAsFases = [
  { palavra: 'G__', correta: 'ATO', emoji: '🐱' },
  { palavra: 'CA__RRO', correta: 'CHO', emoji: '🐶' },
  { palavra: 'PA__O', correta: 'T', emoji: '🦆' },
  { palavra: 'MA__Ã', correta: 'Ç', emoji: '🍎' },
  { palavra: 'SU__O', correta: 'C', emoji: '🧃' },
  { palavra: 'BO__O', correta: 'L', emoji: '🎂' },
  { palavra: 'GA__NHA', correta: 'LI', emoji: '🐔' },
  { palavra: 'CA__A', correta: 'S', emoji: '🏠' },
  { palavra: 'LA__IS', correta: 'P', emoji: '🖍️' },
  { palavra: 'ME__A', correta: 'I', emoji: '🧦' }
];

let faseAtual = 0;
let acertos = 0;

const titulo = document.createElement('h1');

document.body.appendChild(titulo);

const emojiDiv = document.createElement('div');
emojiDiv.id = 'emoji';
document.body.appendChild(emojiDiv);

const palavraDiv = document.createElement('div');
palavraDiv.id = 'palavra';
document.body.appendChild(palavraDiv);

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

todasAsFases.forEach(() => {
  const box = document.createElement('div');
  box.className = 'quadrado';
  progressoDiv.appendChild(box);
});

// 🚀 Inicia o jogo
carregarFase();

function carregarFase() {
  const fase = todasAsFases[faseAtual];
  emojiDiv.innerText = fase.emoji;
  palavraDiv.innerText = fase.palavra;
  feedback.innerText = '';
  emojiFeedback.innerText = '';
  respostaDiv.innerText = '';
  opcoesDiv.innerHTML = '';

  const alternativas = gerarAlternativas(fase.correta);
  alternativas.forEach(letra => {
    const btn = document.createElement('button');
    btn.innerText = letra;
    btn.onclick = () => verificarResposta(letra, fase.correta, fase.palavra);
    opcoesDiv.appendChild(btn);
  });
}

function gerarAlternativas(correta) {
  const letras = ['B', 'C', 'D', 'F', 'G', 'H', 'L', 'M', 'P', 'R', 'S', 'T', 'V', 'Ç', 'LI', 'IA', 'LO'];
  const alternativas = new Set();
  alternativas.add(correta);
  while (alternativas.size < 4) {
    const aleatoria = letras[Math.floor(Math.random() * letras.length)];
    alternativas.add(aleatoria);
  }
  return Array.from(alternativas).sort(() => Math.random() - 0.5);
}

function verificarResposta(escolhida, correta, palavraOriginal) {
  const box = progressoDiv.children[faseAtual];
  if (escolhida === correta) {
    acertos++;
    feedback.innerText = '✅ Acertou!';
    feedback.style.color = '#2e8b57';
    emojiFeedback.innerText = '😄';
    box.classList.add('acerto');

    palavraDiv.innerText = palavraOriginal.replace('__', correta);
    setTimeout(proximaFase, 2000);
  } else {
    feedback.innerText = '❌ Errou!';
    feedback.style.color = '#d32f2f';
    emojiFeedback.innerText = '😢';
    box.classList.add('erro');

    setTimeout(proximaFase, 1000);
  }
}

function proximaFase() {
  faseAtual++;
  if (faseAtual < todasAsFases.length) {
    carregarFase();
  } else {
    mostrarFinal();
  }
}

function mostrarFinal() {
  emojiDiv.innerText = '🎉';
  palavraDiv.innerText = '';
  opcoesDiv.innerHTML = '';
  feedback.innerText = '';
  emojiFeedback.innerText = '';

  let mensagem = '';
  if (acertos === todasAsFases.length) {
    mensagem = 'PARABÉNS! Você acertou todas! 😄';
  } else if (acertos >= 5) {
    mensagem = `BOA! ${acertos}/${todasAsFases.length} 👏`;
  } else {
    mensagem = `${acertos}/${todasAsFases.length} — CONTINUE PRATICANDO! 💪`;
  }

    respostaDiv.innerHTML = mensagem;

  const btnReiniciar = document.createElement('button');
  btnReiniciar.className = 'botao-final';
  btnReiniciar.innerText = '🔄 REINICIAR';
  btnReiniciar.onclick = () => {
    faseAtual = 0;
    acertos = 0;
    respostaDiv.innerHTML = '';
    document.querySelectorAll('.quadrado').forEach(q => {
      q.classList.remove('acerto', 'erro');
    });
    carregarFase();
  };

  const btnFechar = document.createElement('button');
  btnFechar.className = 'botao-final';
  btnFechar.innerText = '❌ FECHAR';
  btnFechar.onclick = () => {
    if (window.parent && typeof window.parent.fecharModal === 'function') {
      window.parent.fecharModal();
    } else {
      document.body.innerHTML = '<h1>Obrigado por jogar! 👋</h1>';
    }
  };

  respostaDiv.appendChild(document.createElement('br'));
  respostaDiv.appendChild(btnReiniciar);
  respostaDiv.appendChild(btnFechar);
}