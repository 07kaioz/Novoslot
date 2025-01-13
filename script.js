let balance = 10000;
let betAmount = 0.40;
let earnings = 0;

document.getElementById("spinButton").addEventListener("click", function() {
  if (balance < betAmount) {
    document.getElementById("message").textContent = "Saldo insuficiente!";
    return;
  }

  // Deduzir a aposta do saldo
  balance -= betAmount;
  document.getElementById("balance").textContent = balance.toFixed(2);

  const slots = document.querySelectorAll(".slot");
  const emojis = ["🐯", "🍊", "🏮", "🧧", "🏆"];

  // Função para girar os símbolos aleatoriamente
  function getRandomEmoji() {
    return emojis[Math.floor(Math.random() * emojis.length)];
  }

  // Rodar cada slot
  slots.forEach(function(slot) {
    slot.textContent = getRandomEmoji();
  });

  // Adicionar animação de giro da roleta
  document.querySelector(".slot-machine").classList.add("spinner");

  setTimeout(function() {
    document.querySelector(".slot-machine").classList.remove("spinner");
  }, 3000); // Remove a animação após o giro

  // Verificar se há uma combinação vencedora
  const rows = [
    [0, 1, 2], // Primeira linha
    [3, 4, 5], // Segunda linha
    [6, 7, 8]  // Terceira linha
  ];

  let message = "";
  rows.forEach(function(row) {
    const symbols = row.map(i => slots[i].textContent);
    if (symbols.every(symbol => symbol === symbols[0])) {
      message = "Você ganhou!";
      earnings = betAmount * 10;  // Exemplo de multiplicação para prêmio
      balance += earnings;
    }
  });

  if (!message) {
    message = "Tente novamente!";
    earnings = 0;
  }

  document.getElementById("message").textContent = message;
  document.getElementById("balance").textContent = balance.toFixed(2);
  document.getElementById("earnings").textContent = earnings.toFixed(2);
});

document.getElementById("increaseBet").addEventListener("click", function() {
  if (betAmount < 10000) {
    betAmount += 0.40;
    document.getElementById("betAmount").textContent = betAmount.toFixed(2);
  }
});

document.getElementById("decreaseBet").addEventListener("click", function() {
  if (betAmount > 0.40) {
    betAmount -= 0.40;
    document.getElementById("betAmount").textContent = betAmount.toFixed(2);
  }
});
