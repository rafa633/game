// 🎨 Estilo visual embutido
const estilo = document.createElement('style');
estilo.innerHTML = `
  body {
    font-family: 'Comic Sans MS', cursive, sans-serif;
    text-align: center;
    background-color: #f1f8e9;
    margin: 0;
    padding: 20px;
  }

  h1 {
    margin-bottom: 20px;
    font-size: 32px;
    color: #33691e;
    text-transform: uppercase;
  }

  #pergunta {
    font-size: 28px;
    margin-bottom: 20px;
    color: #1b5e20;
  }

  .sugestoes {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 80px; /* espaço para barra fixa */
  }

  .sugestoes button {
    border: none;
    background: transparent;
    cursor: pointer;
    transition: transform 0.2s;
  }

  .sugestoes button:hover {
    transform: scale(1.1);
  }

  .sugestoes img {
    width: 150px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 2px 2px 6px rgba(0,0,0,0.2);
  }

  .resposta {
    font-size: 28px;
    font-weight: bold;
    margin-top: 10px;
    text-transform: uppercase;
  }

  /* Barra de progresso fixa */
  .progresso {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 8px;
    padding: 10px;
    background-color: rgba(255,255,255,0.95);
    box-shadow: 0 -2px 6px rgba(0,0,0,0.2);
    z-index: 1000;
  }

  .quadrado {
    width: 40px;
    height: 40px;
    background-color: #e0e0e0;
    border-radius: 6px;
    font-weight: bold;
    font-size: 22px;
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
`;
document.head.appendChild(estilo);

// 🌍 Lista de países e bandeiras
const listaPaises = [
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

// 🔀 Seleciona 5 países aleatórios
const fases = embaralhar(listaPaises).slice(0, 5);
let faseAtual = 0;
let acertos = 0;

const titulo = document.createElement('h1');
document.body.appendChild(titulo);

const perguntaDiv = document.createElement('div');
perguntaDiv.id = 'pergunta';
document.body.appendChild(perguntaDiv);

const sugestoesDiv = document.createElement('div');
sugestoesDiv.className = 'sugestoes';
document.body.appendChild(sugestoesDiv);

const respostaDiv = document.createElement('div');
respostaDiv.className = 'resposta';
document.body.appendChild(respostaDiv);

// Barra de progresso
const progressoDiv = document.createElement('div');
progressoDiv.className = 'progresso';
document.body.appendChild(progressoDiv);

// Criar quadradinhos
for (let i = 0; i < fases.length; i++) {
  const box = document.createElement('div');
  box.className = 'quadrado';
  box.innerText = i + 1;
  progressoDiv.appendChild(box);
}

function carregarFase() {
  const fase = fases[faseAtual];
  perguntaDiv.innerText = `Escolha a bandeira de: ${fase.pais}`;
  respostaDiv.innerText = '';
  respostaDiv.style.color = '#388e3c';
  mostrarOpcoes(fase.bandeira);
}

function mostrarOpcoes(correta) {
  sugestoesDiv.innerHTML = '';
  const opcoes = gerarOpcoes(correta);

  opcoes.forEach(bandeira => {
    const btn = document.createElement('button');
    const img = document.createElement('img');
    img.src = bandeira;
    btn.appendChild(img);
    btn.onclick = () => verificarResposta(bandeira, correta);
    sugestoesDiv.appendChild(btn);
  });
}

function verificarResposta(escolhida, correta) {
  const box = progressoDiv.children[faseAtual];
  if (escolhida === correta) {
    respostaDiv.innerText = '✅ CORRETO!';
    respostaDiv.style.color = '#388e3c';
    box.classList.add('acerto');
    acertos++;
  } else {
    respostaDiv.innerText = '❌ ERRO!';
    respostaDiv.style.color = '#d32f2f';
    box.classList.add('erro');
  }

  faseAtual++;
  setTimeout(() => {
    if (faseAtual < fases.length) {
      carregarFase();
    } else {
      mostrarFinal();
    }
  }, 1000);
}

function mostrarFinal() {
  perguntaDiv.innerText = '🎉 Fim do Quiz!';
  sugestoesDiv.innerHTML = '';
  respostaDiv.innerText = `Você acertou ${acertos}/${fases.length}!`;
  respostaDiv.style.color = acertos >= 3 ? '#388e3c' : '#d32f2f';

  const btnReiniciar = document.createElement('button');
  btnReiniciar.innerText = '🔄 REINICIAR';
  btnReiniciar.onclick = () => {
    const novasFases = embaralhar(listaPaises).slice(0, 5);
    fases.length = 0;
    fases.push(...novasFases);
    faseAtual = 0;
    acertos = 0;
    for (let i = 0; i < progressoDiv.children.length; i++) {
      progressoDiv.children[i].className = 'quadrado';
    }
    carregarFase();
  };

  const btnFechar = document.createElement('button');
  btnFechar.innerText = '❌ FECHAR';
  btnFechar.onclick = () => {
    if (window.parent && typeof window.parent.fecharModal === 'function') {
      window.parent.fecharModal();
    }
  };

  sugestoesDiv.appendChild(btnReiniciar);
  sugestoesDiv.appendChild(btnFechar);
}

function gerarOpcoes(correta) {
  const bandeiras = listaPaises.map(f => f.bandeira);
  const embaralhados = embaralhar(bandeiras.filter(b => b !== correta)).slice(0, 3);
  embaralhados.push(correta);
  return embaralhar(embaralhados);
}

function embaralhar(array) {
  return array.sort(() => Math.random() - 0.5);
}

carregarFase();
