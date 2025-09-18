// 🎨 Estilo visual embutido
const estilo = document.createElement('style');
estilo.innerHTML = `
  body {
    font-family: 'Comic Sans MS', cursive, sans-serif;
    background-color: #f0f8ff;
    text-align: center;
    padding: 20px;
  }

  h1 {
    font-size: 32px;
    color: #00695c;
    margin-bottom: 20px;
  }

  #bandeira {
    width: 200px;
    height: auto;
    margin-bottom: 20px;
    border: 2px solid #00897b;
    border-radius: 8px;
  }

  .opcoes {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 15px;
    margin-bottom: 20px;
  }

  .opcoes button {
    padding: 15px 25px;
    font-size: 20px;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
    border: none;
    border-radius: 12px;
    background-color: #4db6ac;
    color: #ffffff;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
    transition: transform 0.2s, background-color 0.3s;
    min-width: 150px;
  }

  .opcoes button:hover {
    background-color: #00897b;
    transform: scale(1.05);
  }

  #feedback {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  #emoji-feedback {
    font-size: 40px;
    margin-bottom: 10px;
  }

  #resposta {
    font-size: 24px;
    font-weight: bold;
    margin-top: 10px;
  }

    .progresso {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 8px;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.9); /* leve fundo branco translúcido */
    box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.2);
    z-index: 1000;
  }

  .quadrado {
    width: 40px;       /* mais largo para caber emoji */
    height: 40px;
    background-color: #e0e0e0;
    border-radius: 6px;
    font-weight: bold;
    font-size: 20px;
    color: #555;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .acerto {
    background-color: #81c784 !important;
    color: white;
  }

  .erro {
    background-color: #e57373 !important;
    color: white;
  }


  .botao-final {
    padding: 10px 20px;
    margin: 10px;
    font-size: 18px;
    border: none;
    border-radius: 8px;
    background-color: #4db6ac;
    color: white;
    cursor: pointer;
  }

  .botao-final:hover {
    background-color: #00897b;
  }
`;
document.head.appendChild(estilo);

// 🌍 Lista de países e bandeiras
const listaBandeiras = [
  { pais: 'Brasil', bandeira: 'https://flagcdn.com/w320/br.png' },
  { pais: 'Estados Unidos', bandeira: 'https://flagcdn.com/w320/us.png' },
  { pais: 'Japão', bandeira: 'https://flagcdn.com/w320/jp.png' },
  { pais: 'França', bandeira: 'https://flagcdn.com/w320/fr.png' },
  { pais: 'Alemanha', bandeira: 'https://flagcdn.com/w320/de.png' },
  { pais: 'Itália', bandeira: 'https://flagcdn.com/w320/it.png' },
  { pais: 'Argentina', bandeira: 'https://flagcdn.com/w320/ar.png' },
  { pais: 'México', bandeira: 'https://flagcdn.com/w320/mx.png' },
  { pais: 'Canadá', bandeira: 'https://flagcdn.com/w320/ca.png' },
  { pais: 'Austrália', bandeira: 'https://flagcdn.com/w320/au.png' }
];

// 🎯 Variáveis do jogo
const todasAsFases = embaralhar(listaBandeiras).slice(0, 10);
let faseAtual = 0;
let acertos = 0;

// 🎯 Elementos do jogo
const titulo = document.createElement('h1');
document.body.appendChild(titulo);

const img = document.createElement('img');
img.id = 'bandeira';
document.body.appendChild(img);

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
  img.src = fase.bandeira;
  feedback.innerText = '';
  emojiFeedback.innerText = '';
  respostaDiv.innerText = '';
  opcoesDiv.innerHTML = '';

  const alternativas = gerarAlternativas(fase.pais);
  alternativas.forEach(pais => {
    const btn = document.createElement('button');
    btn.innerText = pais;
    btn.onclick = () => verificarResposta(pais, fase.pais);
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
  img.src = '';
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
    const novasFases = embaralhar(listaBandeiras).slice(0, 10);
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

function gerarAlternativas(correta) {
  const paises = listaBandeiras.map(f => f.pais);
    const embaralhados = embaralhar(paises.filter(p => p !== correta)).slice(0, 3);
  embaralhados.push(correta);
  return embaralhar(embaralhados);
}

function embaralhar(array) {
  return array.sort(() => Math.random() - 0.5);
}