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

  #entrada {
    font-size: 24px;
    padding: 10px;
    border-radius: 8px;
    border: 2px solid #ccc;
    width: 300px;
    text-align: center;
  }

  #enviar {
    font-size: 20px;
    padding: 10px 20px;
    margin-left: 10px;
    border: none;
    border-radius: 8px;
    background-color: #87cefa;
    color: white;
    cursor: pointer;
  }

  #enviar:hover {
    background-color: #00bfff;
  }

  #feedback {
    margin-top: 15px;
    font-size: 24px;
    font-weight: bold;
  }

  #resposta {
    font-size: 28px;
    font-weight: bold;
    color: #32cd32;
    margin-top: 20px;
  }
`;
document.head.appendChild(estilo);

// 🧩 Lista de emojis e nomes
const todasAsFases = [
  { emoji: '🐴', nome: 'cavalo' },
  { emoji: '🐮', nome: 'vaca' },
  { emoji: '🐔', nome: 'galinha' },
  { emoji: '🎂', nome: 'bolo' },
  { emoji: '🏠', nome: 'casa' },
  { emoji: '🦆', nome: 'pato' },
  { emoji: '🚗', nome: 'carro' },

  { emoji: '🐱', nome: 'gato' },
  { emoji: '🐶', nome: 'cachorro' },

  { emoji: '🧃', nome: 'suco' },
  { emoji: '🛏️', nome: 'cama' },
  { emoji: '🧸', nome: 'urso' },
  { emoji: '🧦', nome: 'meia' },
  { emoji: '🪁', nome: 'pipa' },
  { emoji: '🧼', nome: 'sabonete' },
  { emoji: '🪑', nome: 'cadeira' }
];

// 🔀 Seleciona 5 fases aleatórias
const fases = embaralhar(todasAsFases).slice(0, 5);
let faseAtual = 0;

// 🎯 Criação dos elementos
const titulo = document.createElement('h1');
titulo.innerText = 'Digite o nome do emoji';
document.body.appendChild(titulo);

const emojiDiv = document.createElement('div');
emojiDiv.id = 'emoji';
document.body.appendChild(emojiDiv);

const entrada = document.createElement('input');
entrada.id = 'entrada';
entrada.placeholder = 'Digite aqui...';
document.body.appendChild(entrada);

const enviar = document.createElement('button');
enviar.id = 'enviar';
enviar.innerText = 'Enviar';
enviar.onclick = verificarResposta;
document.body.appendChild(enviar);

const feedback = document.createElement('div');
feedback.id = 'feedback';
document.body.appendChild(feedback);

const respostaDiv = document.createElement('div');
respostaDiv.id = 'resposta';
document.body.appendChild(respostaDiv);

// 🚀 Inicia o jogo
carregarFase();

function carregarFase() {
  const fase = fases[faseAtual];
  emojiDiv.innerText = fase.emoji;
  entrada.value = '';
  entrada.focus();
  feedback.innerText = '';
}

function verificarResposta() {
  const resposta = entrada.value.trim().toLowerCase();
  const correta = fases[faseAtual].nome.toLowerCase();

  if (resposta === correta) {
    faseAtual++;
    if (faseAtual < fases.length) {
      carregarFase();
    } else {
      mostrarFinal();
    }
  } else {
    feedback.innerText = '❌ Tente novamente!';
    feedback.style.color = '#ff0000';
  }
}

function mostrarFinal() {
  emojiDiv.innerText = '🎉';
  entrada.style.display = 'none';
  enviar.style.display = 'none';
  feedback.innerText = '';
  respostaDiv.innerHTML = 'PARABÉNS! VOCÊ ACERTOU TODOS!';

  const btnReiniciar = document.createElement('button');
  btnReiniciar.innerText = 'REINICIAR';
  btnReiniciar.onclick = () => {
    const novasFases = embaralhar(todasAsFases).slice(0, 5);
    fases.length = 0;
    fases.push(...novasFases);
    faseAtual = 0;
    entrada.style.display = 'inline-block';
    enviar.style.display = 'inline-block';
    respostaDiv.innerHTML = '';
    carregarFase();
  };

  const btnFechar = document.createElement('button');
  btnFechar.innerText = 'FECHAR';
  btnFechar.onclick = () => {
    if (window.parent && typeof window.parent.fecharModal === 'function') {
      window.parent.fecharModal();
    }
  };

  respostaDiv.appendChild(document.createElement('br'));
  respostaDiv.appendChild(btnReiniciar);
  respostaDiv.appendChild(btnFechar);
}

function embaralhar(array) {
  return array.sort(() => Math.random() - 0.5);
}