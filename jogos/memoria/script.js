// 🎨 Estilo visual embutido
const estilo = document.createElement('style');
estilo.innerHTML = `
  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', sans-serif;
    background-color: #fefefe;
    margin: 0;
    padding: 10px;
    text-align: center;
    overflow: hidden;
  }

  h1 {
    font-size: 36px;
    color: #333;
    margin-bottom: 20px;
    text-transform: uppercase;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 400px;
    margin: 0 auto;
  }

  .info {
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 16px;
    font-weight: bold;
    color: #555;
    margin-bottom: 10px;
  }

  .tabuleiro {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    width: 100%;
    margin-bottom: 10px;
  }

  .carta {
    width: 100%;
    aspect-ratio: 1 / 1;
    background-color: #5b4b4b;
    font-size: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    cursor: pointer;
    user-select: none;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    transition: transform 0.2s, background-color 0.3s;
    color: transparent;
  }

  .carta.virada {
    transform: scale(1.05);
    color: white;
  }

  .final {
    font-size: 18px;
    font-weight: bold;
    color: #4caf50;
    margin-top: 15px;
  }

  .botoes-finais {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 15px;
    flex-wrap: wrap;
  }

  .botoes-finais button,
  .botao-iniciar {
    padding: 16px 32px;
    font-size: 14px;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    background-color: #25f321;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-bottom: 10px;
  }

  .botao-iniciar:hover,
  .botoes-finais button:hover {
    background-color: #41d219;
  }
`;
document.head.appendChild(estilo);

// 🧩 Emojis com cores únicas
const coresPorEmoji = {
  '🐶': '#ff0000ff', // cachorro (marrom claro)
  '🐭': '#a9a9a9', // rato (cinza)
  '🐹': '#f4d03f', // hamster (amarelo claro)
  '🐻': '#6e2c00', // urso (marrom escuro)
  '🐼': '#000000', // panda (preto/branco)
  '🦁': '#eaff00ff', // leão (dourado/laranja)
  '🐮': '#ffffff', // vaca (branco/preto)
  '🐷': '#ff00d4ff', // porco (rosa)
  '🐸': '#3cff00ff', // sapo (verde)
  '🐔': '#f7dc6f'  // galinha (amarelo)
};

const todosEmojis = Object.keys(coresPorEmoji);

// 🔀 Seleciona 8 pares aleatórios
const emojisSelecionados = embaralhar(todosEmojis).slice(0, 8);
let cartas = [...emojisSelecionados, ...emojisSelecionados];
cartas = embaralhar(cartas);

let cartaVirada = null;
let bloqueado = true;
let paresEncontrados = 0;
let erros = 0;

// 🧱 Interface
const container = document.createElement('div');
container.classList.add('container');

const fraseInicial = document.createElement('h1');
fraseInicial.innerText = 'Vocês estão preparados?';

const botaoIniciar = document.createElement('button');
botaoIniciar.classList.add('botao-iniciar');
botaoIniciar.innerText = 'Iniciar Jogo';
botaoIniciar.onclick = iniciarJogo;

const infoDiv = document.createElement('div');
infoDiv.classList.add('info');
infoDiv.style.display = 'none';

const contadorErros = document.createElement('div');
contadorErros.innerText = 'Erros: 0';

const contadorAcertos = document.createElement('div');
contadorAcertos.innerText = 'Acertos: 0/8';

infoDiv.appendChild(contadorErros);
infoDiv.appendChild(contadorAcertos);

const tabuleiro = document.createElement('div');
tabuleiro.classList.add('tabuleiro');
tabuleiro.style.display = 'none';

container.appendChild(fraseInicial);
container.appendChild(botaoIniciar);
document.body.appendChild(container);

// Cria as cartas
cartas.forEach((emoji, index) => {
  const carta = document.createElement('div');
  carta.classList.add('carta');
  carta.dataset.emoji = emoji;
  carta.dataset.index = index;
  carta.dataset.cor = coresPorEmoji[emoji];
  carta.innerText = '';
  carta.addEventListener('click', virarCarta);
  tabuleiro.appendChild(carta);
});

function iniciarJogo() {
  fraseInicial.style.display = 'none';
  botaoIniciar.style.display = 'none';
  infoDiv.style.display = 'flex';
  tabuleiro.style.display = 'grid';
  container.appendChild(infoDiv);
  container.appendChild(tabuleiro);

  const todas = document.querySelectorAll('.carta');
  todas.forEach(carta => {
    carta.classList.add('virada');
    carta.innerText = carta.dataset.emoji;
    carta.style.backgroundColor = carta.dataset.cor;
  });

  setTimeout(() => {
    todas.forEach(carta => {
      carta.classList.remove('virada');
      carta.innerText = '';
      carta.style.backgroundColor = '#5b4b4b';
    });
    bloqueado = false;
  }, 5000);
}

function virarCarta() {
  if (bloqueado || this.classList.contains('virada')) return;

  this.classList.add('virada');
  this.innerText = this.dataset.emoji;
  this.style.backgroundColor = this.dataset.cor;

  if (!cartaVirada) {
    cartaVirada = this;
  } else {
    if (cartaVirada.dataset.emoji === this.dataset.emoji &&
        cartaVirada.dataset.index !== this.dataset.index) {
      paresEncontrados++;
      atualizarAcertos();
      cartaVirada = null;

      if (paresEncontrados === 8) {
        mostrarFinal();
      }
    } else {
      bloqueado = true;
      erros++;
      atualizarErros();
      setTimeout(() => {
        this.classList.remove('virada');
        this.innerText = '';
        this.style.backgroundColor = '#5b4b4b';

        cartaVirada.classList.remove('virada');
        cartaVirada.innerText = '';
        cartaVirada.style.backgroundColor = '#5b4b4b';

        cartaVirada = null;
        bloqueado = false;
      }, 800);
    }
  }
}

function atualizarErros() {
  contadorErros.innerText = `Erros: ${erros}`;
}

function atualizarAcertos() {
  contadorAcertos.innerText = `Acertos: ${paresEncontrados}/8`;
}

function mostrarFinal() {
  const mensagem = document.createElement('div');
  mensagem.classList.add('final');
  mensagem.innerText = `🎉 Parabéns! Você encontrou todos os pares!\nErros: ${erros}`;

  const botoes = document.createElement('div');
  botoes.classList.add('botoes-finais');

  const reiniciar = document.createElement('button');
  reiniciar.innerText = 'Reiniciar';
  reiniciar.onclick = () => location.reload();

  const fechar = document.createElement('button');
  fechar.innerText = 'Fechar';
  fechar.onclick = () => {
    if (window.parent && typeof window.parent.fecharModal === 'function') {
      window.parent.fecharModal();
    }
  };

  botoes.appendChild(reiniciar);
  botoes.appendChild(fechar);
  container.appendChild(mensagem);
  container.appendChild(botoes);
}

function embaralhar(array) {
  return array.sort(() => Math.random() - 0.5);
}
