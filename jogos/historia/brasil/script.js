// 🎨 ESTILO VISUAL
const estilo = document.createElement('style');
estilo.innerHTML = `
  body {
    font-family: 'Comic Sans MS', cursive, sans-serif;
    text-align: center;
    background-color: #F3D6B3;
    margin: 0;
    padding: 10px;
    overflow: hidden;
  }

  h1 {
    font-size: 28px;
    color: #00796b;
    margin-bottom: 10px;
    text-transform: uppercase;
  }

  .mascote {
    font-size: 50px;
    margin-bottom: 5px;
  }

  .curiosidade {
    font-size: 20px;
    color: #00695c;
    margin-bottom: 20px;
    text-transform: uppercase;
  }

  .botao-iniciar {
    padding: 10px 20px;
    font-size: 22px;
    font-weight: bold;
    text-transform: uppercase;
    background-color: #4db6ac;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
    transition: transform 0.2s, background-color 0.3s;
  }

  .botao-iniciar:hover {
    background-color: #00897b;
    transform: scale(1.05);
  }

  #pergunta {
    font-size: 22px;
    margin-bottom: 15px;
    color: #004d40;
    text-transform: uppercase;
  }

  .sugestoes {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
  }

  .sugestoes button {
    padding: 10px 15px;
    font-size: 20px;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
    border: none;
    border-radius: 10px;
    background-color: #4db6ac;
    color: #ffffff;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
    transition: transform 0.2s, background-color 0.3s;
    min-width: 120px;
  }

  .sugestoes button:hover {
    background-color: #00897b;
    transform: scale(1.05);
  }

  .resposta {
    font-size: 24px;
    font-weight: bold;
    margin-top: 10px;
    text-transform: uppercase;
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
    background-color: rgba(255,255,255,0.95);
    box-shadow: 0 -2px 6px rgba(0,0,0,0.2);
    z-index: 1000;
  }

  .quadrado {
    width: 30px;
    height: 30px;
    background-color: #e0e0e0;
    border-radius: 6px;
    font-weight: bold;
    font-size: 18px;
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

// 🦉 MASCOTE
const mascote = document.createElement('div');
mascote.className = 'mascote';
mascote.innerText = '🤖';
document.body.appendChild(mascote);

// 🧠 TÍTULO
const titulo = document.createElement('h1');
titulo.innerText = "CURIOSIDADES DE MIRACATU-SP";
document.body.appendChild(titulo);

// 👨‍🏫 TEXTO EDUCATIVO
const curiosidade = document.createElement('div');
curiosidade.className = 'curiosidade';
// 👨‍🏫 TEXTO EDUCATIVO
curiosidade.innerHTML = `
  • O BRASIL FOI COLONIZADO POR PORTUGAL EM 1500. 🇵🇹<br>
  • A INDEPENDÊNCIA FOI PROCLAMADA EM 1822 POR DOM PEDRO I. 📜<br>
  • A ESCRAVIDÃO FOI ABOLIDA EM 1888 COM A LEI ÁUREA. 🪙<br>
  • A REPÚBLICA FOI PROCLAMADA EM 1889 POR MARECHAL DEODORO. 🏛️<br>
  • BRASÍLIA SE TORNOU CAPITAL EM 1960, SUBSTITUINDO O RIO DE JANEIRO. 🗺️<br><br>
  VAMOS TESTAR O QUE VOCÊ SABE SOBRE NOSSA HISTÓRIA!
`;

document.body.appendChild(curiosidade);

// ▶️ BOTÃO DE RESPONDER
const botaoIniciar = document.createElement('button');
botaoIniciar.className = 'botao-iniciar';
botaoIniciar.innerText = 'RESPONDER PERGUNTAS';
botaoIniciar.onclick = iniciarQuiz;
document.body.appendChild(botaoIniciar);

const perguntas = [
  {
    pergunta: "QUEM PROCLAMOU A INDEPENDÊNCIA DO BRASIL?",
    opcoes: ["DOM PEDRO I", "TIRADENTES", "GETÚLIO VARGAS", "DOM PEDRO II"],
    correta: "DOM PEDRO I"
  },
  {
    pergunta: "EM QUE ANO FOI PROCLAMADA A REPÚBLICA?",
    opcoes: ["1822", "1888", "1889", "1930"],
    correta: "1889"
  },
  {
    pergunta: "QUAL FOI A PRIMEIRA CAPITAL DO BRASIL?",
    opcoes: ["RIO DE JANEIRO", "SALVADOR", "BRASÍLIA", "SÃO PAULO"],
    correta: "SALVADOR"
  },
  {
    pergunta: "QUEM ASSINOU A LEI ÁUREA?",
    opcoes: ["DOM PEDRO II", "ISABEL DO BRASIL", "GETÚLIO VARGAS", "JUSCELINO KUBITSCHEK"],
    correta: "ISABEL DO BRASIL"
  },
  {
    pergunta: "QUAL PAÍS COLONIZOU O BRASIL?",
    opcoes: ["ESPANHA", "FRANÇA", "PORTUGAL", "INGLATERRA"],
    correta: "PORTUGAL"
  }
];


let faseAtual = 0;
let acertos = 0;
let perguntaDiv, sugestoesDiv, respostaDiv, progressoDiv;

function iniciarQuiz() {
  curiosidade.remove();
  botaoIniciar.remove();
  titulo.innerText = "VAMOS COMEÇAR!";
  faseAtual = 0;
  acertos = 0;

  perguntaDiv = document.createElement('div');
  perguntaDiv.id = 'pergunta';
  document.body.appendChild(perguntaDiv);

  sugestoesDiv = document.createElement('div');
  sugestoesDiv.className = 'sugestoes';
  document.body.appendChild(sugestoesDiv);

  respostaDiv = document.createElement('div');
  respostaDiv.className = 'resposta';
  document.body.appendChild(respostaDiv);

  progressoDiv = document.createElement('div');
  progressoDiv.className = 'progresso';
  document.body.appendChild(progressoDiv);

  for (let i = 0; i < perguntas.length; i++) {
    const box = document.createElement('div');
    box.className = 'quadrado';
    box.innerText = i + 1;
    progressoDiv.appendChild(box);
  }

  carregarFase();
}

function carregarFase() {
  const fase = perguntas[faseAtual];
  perguntaDiv.innerText = fase.pergunta;
  respostaDiv.innerText = '';
  respostaDiv.style.color = '#388e3c';
  mostrarOpcoes(fase.opcoes, fase.correta);
}

function mostrarOpcoes(opcoes, correta) {
  sugestoesDiv.innerHTML = '';
  const embaralhadas = embaralhar(opcoes);
  embaralhadas.forEach(opcao => {
    const btn = document.createElement('button');
    btn.innerText = opcao;
    btn.onclick = () => verificarResposta(opcao, correta);
    sugestoesDiv.appendChild(btn);
  });
}

function verificarResposta(escolhida, correta) {
  const box = progressoDiv.children[faseAtual];
  if (escolhida === correta) {
        respostaDiv.innerText = '✅ MUITO BEM! 😄';
    respostaDiv.style.color = '#388e3c';
    box.classList.add('acerto');
    acertos++;
  } else {
    respostaDiv.innerText = '❌ OPS, NÃO FOI ESSA! 😢';
    respostaDiv.style.color = '#d32f2f';
    box.classList.add('erro');
  }

  faseAtual++;
  setTimeout(() => {
    if (faseAtual < perguntas.length) {
      carregarFase();
    } else {
      mostrarFinal();
    }
  }, 1000);
}

function mostrarFinal() {
  perguntaDiv.innerText = '🎉 FIM DO QUIZ!';
  sugestoesDiv.innerHTML = '';
  respostaDiv.innerText = `VOCÊ ACERTOU ${acertos}/${perguntas.length}!`;
  respostaDiv.style.color = acertos >= 3 ? '#388e3c' : '#d32f2f';

  const mensagemFinal = document.createElement('div');
  mensagemFinal.className = 'curiosidade';
  mensagemFinal.innerHTML = acertos >= 3
    ? '🤖 PARABÉNS! VOCÊ É UM VERDADEIRO Miracatuense!'
    : '🤖 VOCÊ FOI BEM! VAMOS TREINAR MAIS E FICAR AINDA MELHOR! 💪';
  document.body.insertBefore(mensagemFinal, sugestoesDiv);

  const btnReiniciar = document.createElement('button');
  btnReiniciar.innerText = '🔄 REINICIAR';
  btnReiniciar.className = 'botao-iniciar';
  btnReiniciar.onclick = () => {
    mensagemFinal.remove();
    progressoDiv.remove();
    perguntaDiv.remove();
    sugestoesDiv.innerHTML = '';
    respostaDiv.innerText = '';
    respostaDiv.remove();
    titulo.innerText = "CURIOSIDADES DE MIRACATU";
    document.body.appendChild(curiosidade);
    document.body.appendChild(botaoIniciar);
  };



  sugestoesDiv.appendChild(btnReiniciar);
  sugestoesDiv.appendChild(btnFechar);
}

function embaralhar(array) {
  return array.sort(() => Math.random() - 0.5);
}
  