// 🎨 Estilo visual embutido
const estilo = document.createElement('style');
estilo.innerHTML = `
  body {
    font-family: 'Comic Sans MS', cursive, sans-serif;
    text-align: center;
    background-color: #fff0f5;
    margin: 0;
    padding: 20px;
  }

  h1 {
    font-size: 32px;
    color: #c71585;
    margin-bottom: 20px;
    text-transform: uppercase;
  }

  #emoji {
    font-size: 100px;
    margin-bottom: 10px;
  }

  #palavra {
    font-size: 48px;
    margin-bottom: 20px;
    color: #8b008b;
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
    background-color: #ff69b4;
    color: white;
    cursor: pointer;
    min-width: 100px;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
    transition: transform 0.2s, background-color 0.3s;
  }

  .opcoes button:hover {
    background-color: #db3e8d;
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
    color: #c71585;
    margin-top: 30px;
  }

  .botao-final {
    font-size: 20px;
    padding: 12px 24px;
    margin: 10px;
    border: none;
    border-radius: 10px;
    background-color: #c71585;
    color: white;
    cursor: pointer;
    box-shadow: 2px 2px 6px rgba(0,0,0,0.2);
    transition: background-color 0.3s, transform 0.2s;
  }

  .botao-final:hover {
    background-color: #8b008b;
    transform: scale(1.05);
  }
`;
document.head.appendChild(estilo);

// 🎵 Lista de palavras com rimas e emojis
const todasAsFases = [
  { palavra: 'CÃO', correta: 'PÃO', emoji: '🐶', opcoes: ['SOL', 'PÃO', 'BOLA', 'GATO'] },
  { palavra: 'GATO', correta: 'SAPATO', emoji: '🐱', opcoes: ['SAPATO', 'CACHORRO', 'CASA', 'BOLA'] },
  { palavra: 'BOLA', correta: 'ESCOLA', emoji: '⚽', opcoes: ['ESCOLA', 'CÃO', 'MAÇÃ', 'CARRO'] },
  { palavra: 'FADA', correta: 'JADA', emoji: '🧚', opcoes: ['JADA', 'FARO', 'PATO', 'LATA'] },
  { palavra: 'SAPO', correta: 'PAPO', emoji: '🐸', opcoes: ['PAPO', 'GATO', 'CASA', 'BOLA'] },
  { palavra: 'PATO', correta: 'RATO', emoji: '🦆', opcoes: ['RATO', 'GATO', 'SAPO', 'CÃO'] },
  { palavra: 'MAÇÃ', correta: 'IRMÃ', emoji: '🍎', opcoes: ['IRMÃ', 'BOLA', 'CASA', 'CACHORRO'] },
  { palavra: 'SOL', correta: 'FAROL', emoji: '🌞', opcoes: ['FAROL', 'SAPATO', 'PATO', 'GATO'] },
  { palavra: 'CASA', correta: 'ASA', emoji: '🏠', opcoes: ['ASA', 'MAÇÃ', 'BOLA', 'CÃO'] },
  { palavra: 'RATO', correta: 'SAPATO', emoji: '🐭', opcoes: ['SAPATO', 'GATO', 'CASA', 'PÃO'] }
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

// 🚀 Inicia o jogo
carregarFase();

function carregarFase() {
  const fase = todasAsFases[faseAtual];
  emojiDiv.innerText = fase.emoji;
  palavraDiv.innerText = `Qual rima com: ${fase.palavra}`;
  feedback.innerText = '';
  emojiFeedback.innerText = '';
  respostaDiv.innerText = '';
  opcoesDiv.innerHTML = '';

  fase.opcoes.sort(() => Math.random() - 0.5).forEach(opcao => {
    const btn = document.createElement('button');
    btn.innerText = opcao;
    btn.onclick = () => verificarResposta(opcao, fase.correta);
    opcoesDiv.appendChild(btn);
  });
}

function verificarResposta(escolhida, correta) {
  if (escolhida === correta) {
    acertos++;
    feedback.innerText = '✅ Acertou!';
    feedback.style.color = '#c71585';
    emojiFeedback.innerText = '😄';
  } else {
    feedback.innerText = '❌ Errou!';
    feedback.style.color = '#d32f2f';
    emojiFeedback.innerText = '😢';
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