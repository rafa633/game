// 🎨 Estilo visual embutido
const estilo = document.createElement('style');
estilo.innerHTML = `
  * { box-sizing: border-box; }

  body {
    font-family: 'Segoe UI', sans-serif;
    background-color: #fefefe;
    margin: 0;
    padding: 10px;
    text-align: center;
    overflow: hidden;
  }

  h1 {
    font-size: 24px;
    color: #333;
    margin-bottom: 10px;
    text-transform: uppercase;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 800px;
    margin: 0 auto;
    padding: 10px;
  }

  .paleta {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-bottom: 10px;
  }

  .cor {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    cursor: pointer;
    border: 2px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: white;
  }

  .cor.selecionada {
    border: 4px solid black;
  }

  .grade {
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  gap: 0.1px; /* Menor espaço entre pixels */
  width: 330px;
  margin: 0 10px;
}

.pixel {
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: #eee;
  border-radius: 0; /* Sem arredondamento */
  cursor: pointer;
  user-select: none;
  font-size: 14px;
  font-weight: bold;
  color: #555;
  display: flex;
  align-items: center;
  justify-content: center;
}

  .botoes-finais {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;
    flex-wrap: wrap;
  }

  .botoes-finais button {
    padding: 10px 20px;
    font-size: 12px;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    background-color: #25f321;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .botoes-finais button:hover {
    background-color: #41d219;
  }

  /* 🔥 Container da grade com setas laterais */
  .grade-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px; /* espaço entre seta e grade */
    margin: 10px 0;
  }

  /* 🎯 Setas grandes e modernas */
  .grade-container button {
    width: 60px;
    height: 60px;
    font-size: 32px;
    font-weight: bold;
    background: linear-gradient(135deg, #4facfe, #00f2fe);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    transition: transform 0.2s, background 0.3s;
  }

  .grade-container button:hover {
    transform: scale(1.2) rotate(5deg);
    background: linear-gradient(135deg, #43e97b, #38f9d7);
  }
`;
document.head.appendChild(estilo);

// 🎨 Paleta de cores numerada
const paletaCores = [
  { cor: "red", numero: 1 },
  { cor: "black", numero: 2 },
  { cor: "yellow", numero: 3 },
  { cor: "blue", numero: 4 },
  { cor: "brown", numero: 5 },
  { cor: "green", numero: 6 },
  { cor: "orange", numero: 7 },
  { cor: "white", numero: 8 },
  {cor: "cyan", numero: 9}
];
let corSelecionada = 1;
let pintando = false;

// 🧱 Interface
const container = document.createElement('div');
container.classList.add('container');

const titulo = document.createElement('h1');


const paleta = document.createElement('div');
paleta.classList.add('paleta');

paletaCores.forEach(({ cor, numero }) => {
  const div = document.createElement('div');
  div.className = 'cor';
  div.style.backgroundColor = cor;
  div.innerText = numero;
  div.style.color = numero === 8 ? 'black' : 'white';
  div.onclick = () => selecionarCor(numero, div);
  paleta.appendChild(div);
  if (numero === corSelecionada) div.classList.add('selecionada');
});

function selecionarCor(numero, elemento) {
  corSelecionada = numero;
  document.querySelectorAll('.cor').forEach(c => c.classList.remove('selecionada'));
  elemento.classList.add('selecionada');
}

// 🖼️ Desenhos disponíveis
const desenhos = [
  [ // Papagaio
    0,0,0,0,1,1,1,0,0,0,0,
    0,0,0,1,1,1,1,1,0,0,0,
    0,0,1,8,8,1,8,8,1,0,0,
    0,0,1,8,2,1,2,8,1,0,0,
    0,0,1,1,3,3,3,1,1,0,0,
    0,0,0,1,1,3,1,1,0,0,0,
    4,4,4,4,1,1,1,4,4,4,4,
    0,4,4,4,1,1,1,4,4,4,0,
    0,0,4,4,3,1,3,4,4,0,0,
    5,5,5,5,5,5,5,5,5,5,5,
    0,0,0,0,4,4,4,0,0,0,0,
    0,0,0,0,0,4,0,0,0,0,0
  ],
  [ // Segundo desenho
    0,0,0,0,6,6,6,0,0,0,0,
    0,0,0,6,6,6,6,6,0,0,0,
    0,0,6,0,0,6,0,0,6,0,0,
    0,0,6,0,7,6,7,0,6,0,0,
    0,0,6,6,3,3,3,6,6,0,0,
    0,0,0,6,6,3,6,6,0,0,0,
    4,4,4,4,6,6,6,4,4,4,4,
    0,4,4,4,6,6,6,4,4,4,0,
    0,0,4,4,3,6,3,4,4,0,0,
    5,5,5,5,5,5,5,5,5,5,5,
    0,0,0,0,4,4,4,0,0,0,0,
    0,0,0,0,0,4,0,0,0,0,0
  ],
  
    [
    0,0,9,0,0,0,0,0,0,0,0,
    0,0,0,0,0,9,0,0,0,0,0,
    4,4,4,4,4,0,0,0,0,0,0,
    4,4,4,9,4,4,0,0,4,0,9,
    4,4,4,4,9,4,0,0,0,4,0,
    4,2,4,4,4,4,0,0,4,8,0,
    4,4,4,4,4,4,0,4,8,0,0,
    8,8,4,4,4,4,4,8,0,0,0,
    0,8,8,4,4,8,8,0,0,0,0,
    0,0,0,0,4,4,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0
    ],
    [
    0,2,2,0,2,2,2,0,0,0,0,
    2,0,0,2,0,0,0,2,0,0,0,
    2,0,0,0,0,0,0,2,0,0,0,
    2,0,0,0,0,0,0,2,0,0,0,
    0,2,0,0,0,0,2,0,0,0,0,
    0,0,2,0,0,2,0,0,0,0,0,
    0,0,0,2,2,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0
    ],
    [
    0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,2,2,0,2,2,0,0,0,
    0,0,2,8,1,2,1,1,2,0,0,
    0,0,2,8,1,1,1,1,2,0,0,
    0,0,2,1,1,1,1,1,2,0,0,
    0,0,0,2,1,1,1,2,0,0,0,
    0,0,0,0,2,1,2,0,0,0,0,
    0,0,0,0,0,2,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0
    ]





];
let desenhoAtual = 0;

// 🎨 Grade de pixels
const grade = document.createElement('div');
grade.classList.add('grade');

function carregarDesenho(index) {
  grade.innerHTML = "";
  const modelo = desenhos[index];
  modelo.forEach(numero => {
    const pixel = document.createElement('div');
    pixel.className = 'pixel';
    pixel.innerText = numero > 0 ? numero : "";
    pixel.dataset.numero = numero;
    pixel.addEventListener('mousedown', pintarPixel);
    pixel.addEventListener('mouseover', () => {
      if (pintando) pintarPixel.call(pixel);
    });
    grade.appendChild(pixel);
  });
}

function pintarPixel() {
  if (parseInt(this.dataset.numero) === corSelecionada) {
    const cor = paletaCores.find(c => c.numero === corSelecionada).cor;
    this.style.backgroundColor = cor;
    this.style.color = "transparent";
  }
}

document.addEventListener('mousedown', () => pintando = true);
document.addEventListener('mouseup', () => pintando = false);

// ⬅️➡️ Navegação entre desenhos
const navegacaoEsquerda = document.createElement('button');
navegacaoEsquerda.innerText = '⬅️';
navegacaoEsquerda.onclick = () => {
  desenhoAtual = (desenhoAtual - 1 + desenhos.length) % desenhos.length;
  carregarDesenho(desenhoAtual);
};

const navegacaoDireita = document.createElement('button');
navegacaoDireita.innerText = '➡️';
navegacaoDireita.onclick = () => {
  desenhoAtual = (desenhoAtual + 1) % desenhos.length;
  carregarDesenho(desenhoAtual);
};

// 🎯 Botões finais
const botoes = document.createElement('div');
botoes.classList.add('botoes-finais');

const reiniciar = document.createElement('button');
reiniciar.innerText = '🔄 Reiniciar';
reiniciar.onclick = () => carregarDesenho(desenhoAtual);

const fechar = document.createElement('button');
fechar.innerText = '❌ Fechar';
fechar.onclick = () => {
  if (window.parent && typeof window.parent.fecharModal === 'function') {
    window.parent.fecharModal();
  } else {
    container.remove();
  }
};

botoes.appendChild(reiniciar);
botoes.appendChild(fechar);

// 🧩 Monta tudo
const gradeContainer = document.createElement('div');
gradeContainer.classList.add('grade-container');
gradeContainer.appendChild(navegacaoEsquerda);
gradeContainer.appendChild(grade);
gradeContainer.appendChild(navegacaoDireita);

container.appendChild(titulo);
container.appendChild(paleta);
container.appendChild(gradeContainer);
container.appendChild(botoes);
document.body.appendChild(container);

// 🔄 Carrega o primeiro desenho
carregarDesenho(desenhoAtual);
