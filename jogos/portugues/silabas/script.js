// 🎨 Estilo visual embutido
const estilo = document.createElement('style');
estilo.innerHTML = `
  body {
    font-family: 'Comic Sans MS', cursive, sans-serif;
    text-align: center;
    background-color: #fff8dc;
    margin: 0;
    padding: 20px;
  }

  h1 {
    margin-bottom: 20px;
    font-size: 32px;
    color: #ff6347;
    text-transform: uppercase;
  }

  #emoji {
    font-size: 100px;
    margin-bottom: 20px;
  }

  .sugestoes {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 15px;
    margin-bottom: 20px;
  }

  .sugestoes button {
    padding: 15px 25px;
    font-size: 28px;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
    border: none;
    border-radius: 12px;
    background-color: #87cefa;
    color: #ffffff;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
    transition: transform 0.2s, background-color 0.3s;
    min-width: 150px;
  }

  .sugestoes button:hover {
    background-color: #00bfff;
    transform: scale(1.05);
  }

  .resposta {
    font-size: 28px;
    font-weight: bold;
    color: #32cd32;
    margin-top: 10px;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;
  }
`;
document.head.appendChild(estilo);

// 🧩 Lista completa de palavras
const todasAsFases = [
  { emoji: '🐴', silabas: ['CA', 'VA', 'LO'] },
  { emoji: '🐮', silabas: ['VA', 'CA'] },
  { emoji: '🐔', silabas: ['GA', 'LI', 'NHA'] },
  { emoji: '🎂', silabas: ['BO', 'LO'] },
  { emoji: '🏠', silabas: ['CA', 'SA'] },
  { emoji: '🦆', silabas: ['PA', 'TO'] },
  { emoji: '🚗', silabas: ['CAR', 'RO'] },
  { emoji: '🌳', silabas: ['AR', 'VO', 'RE'] },
  { emoji: '🐱', silabas: ['GA', 'TO'] },
  { emoji: '🐶', silabas: ['CA', 'CHOR', 'RO'] },
  { emoji: '🍎', silabas: ['MA', 'ÇA'] },
  { emoji: '🧃', silabas: ['SU', 'CO'] },
  { emoji: '🛏️', silabas: ['CA', 'MA'] },
  { emoji: '🧸', silabas: ['UR', 'SO'] },
  { emoji: '📚', silabas: ['LI', 'VROS'] },
  { emoji: '🖍️', silabas: ['LA', 'PIS'] },
  { emoji: '🧦', silabas: ['ME', 'IAS'] },
  { emoji: '🪁', silabas: ['PI', 'PA'] },
  { emoji: '🧼', silabas: ['SA', 'BO', 'NE', 'TE'] },
  { emoji: '🪑', silabas: ['CA', 'DEI', 'RA'] }
];

// 🔀 Seleciona 5 palavras aleatórias
const fases = embaralhar(todasAsFases).slice(0, 15);

let faseAtual = 0;
let silabaIndex = 0;

const emojiDiv = document.getElementById('emoji');
const sugestoesDiv = document.getElementById('sugestoes');
const respostaDiv = document.getElementById('resposta');

function carregarFase() {
  const fase = fases[faseAtual];
  emojiDiv.innerText = fase.emoji;
  respostaDiv.innerHTML = '';
  silabaIndex = 0;
  mostrarOpcoes();
}

function mostrarOpcoes() {
  const fase = fases[faseAtual];
  sugestoesDiv.innerHTML = '';

  const silabaCorreta = fase.silabas[silabaIndex];
  const opcoes = gerarOpcoes(silabaCorreta);

  opcoes.forEach(silaba => {
    const btn = document.createElement('button');
    btn.innerText = silaba;
    btn.onclick = () => verificarSilaba(silaba, silabaCorreta);
    sugestoesDiv.appendChild(btn);
  });
}

function verificarSilaba(escolhida, correta) {
  if (escolhida === correta) {
    const span = document.createElement('span');
    span.innerText = escolhida;
    respostaDiv.appendChild(span);
    silabaIndex++;

    if (silabaIndex < fases[faseAtual].silabas.length) {
      mostrarOpcoes();
    } else {
      faseAtual++;
      if (faseAtual < fases.length) {
        setTimeout(() => carregarFase(), 1000);
      } else {
        mostrarFinal();
      }
    }
  } else {
    const erro = document.createElement('div');
    erro.innerText = '❌ TENTE NOVAMENTE!';
    erro.style.color = '#ff0000';
    erro.style.fontWeight = 'bold';
    erro.style.marginTop = '10px';
    sugestoesDiv.appendChild(erro);
  }
}

function mostrarFinal() {
  emojiDiv.innerText = '🎉';
  sugestoesDiv.innerHTML = '';
  respostaDiv.innerHTML = '<span>PARABÉNS! VOCÊ COMPLETOU TODOS!</span>';

  const btnReiniciar = document.createElement('button');
  btnReiniciar.innerText = 'REINICIAR';
  btnReiniciar.onclick = () => {
    const novasFases = embaralhar(todasAsFases).slice(0, 5);
    fases.length = 0;
    fases.push(...novasFases);
    faseAtual = 0;
    silabaIndex = 0;
    carregarFase();
  };

  const btnFechar = document.createElement('button');
  btnFechar.innerText = 'FECHAR';
  btnFechar.onclick = () => {
    if (window.parent && typeof window.parent.fecharModal === 'function') {
      window.parent.fecharModal();
    }
  };

  sugestoesDiv.appendChild(btnReiniciar);
  sugestoesDiv.appendChild(btnFechar);
}

function gerarOpcoes(correta) {
  const vogais = ['A', 'E', 'I', 'O', 'U'];
  const consoante = correta[0];
  const opcoes = vogais.map(v => consoante + v);
  if (!opcoes.includes(correta)) opcoes.push(correta);
  return embaralhar(opcoes);
}

function embaralhar(array) {
  return array.sort(() => Math.random() - 0.5);
}

carregarFase();