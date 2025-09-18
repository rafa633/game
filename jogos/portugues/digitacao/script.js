const lista = [
  "a", "aq", "aqa", "qqq", "j", "ju", "juj", "uju",
  "justo", "água", "questão", "cônsul", "complicados",
  "sequência", "inconsiderado", "dedicado", "fantasmagórico",
  "soma", "ocupante", "falou", "diferenciado"
];

let atual = 0;
const palavrasDiv = document.getElementById("palavras");
const entrada = document.getElementById("entrada");
const feedback = document.getElementById("feedback");
const emoji = document.getElementById("emoji-feedback");

function mostrarPalavra() {
  palavrasDiv.textContent = lista[atual];
  entrada.value = "";
  feedback.textContent = "";
  emoji.textContent = "⌨️";
}

function verificar() {
  if (entrada.value === lista[atual]) {
    feedback.textContent = "✅ Correto!";
    emoji.textContent = "🎉";
    atual++;
    if (atual < lista.length) {
      setTimeout(mostrarPalavra, 800);
    } else {
      palavrasDiv.textContent = "🏁 Fim!";
      entrada.disabled = true;
    }
  } else {
    feedback.textContent = "⏳ Continue tentando...";
    emoji.textContent = "⌨️";
  }
}

mostrarPalavra();