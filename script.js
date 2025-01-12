let balance = 1000.00;  // Saldo inicial
let betAmount = 10.00;  // Aposta inicial
let spinning = false;  // Verifica se o jogo já está girando

// Atualiza o saldo na tela
function updateBalance() {
  document.getElementById('balance').textContent = balance.toFixed(2);  // Atualiza o saldo
}

// Função para aumentar a aposta em 0.40
document.getElementById('increaseBet').addEventListener('click', function() {
  betAmount += 0.40;
  document.getElementById('bet').value = betAmount.toFixed(2);
});

// Função para diminuir a aposta em 0.40
document.getElementById('decreaseBet').addEventListener('click', function() {
  if (betAmount >= 0.40) {
    betAmount -= 0.40;
    document.getElementById('bet').value = betAmount.toFixed(2);
  }
});

function spin() {
  if (spinning || betAmount > balance) return;  // Verifica se o jogo já está girando ou se o saldo é suficiente

  spinning = true;
  document.getElementById('resultText').textContent = '';  // Limpa o resultado anterior

  // Deduz a aposta do saldo
  balance -= betAmount;

  // Atualiza o saldo na tela
  updateBalance();

  // Aqui começa a rotação das frutas
  let results = ['🍒', '🍉', '🍋', '🍇', '🍊', '🍍', '🍎', '🍓'];  // Exemplo de frutas
  let spinResults = [];

  // Simula o giro das frutas, selecionando 3 frutas aleatórias
  for (let i = 0; i < 3; i++) {
    spinResults.push(results[Math.floor(Math.random() * results.length)]);
  }

  // Exibe as frutas girando
  document.getElementById('slot1').textContent = spinResults[0];
  document.getElementById('slot2').textContent = spinResults[1];
  document.getElementById('slot3').textContent = spinResults[2];

  // Aguarda o tempo da rotação (2 segundos) para calcular o resultado
  setTimeout(() => {
    let winAmount = 0;
    
    // Lógica para calcular os ganhos com base nos resultados dos slots
    if (spinResults[0] === spinResults[1] && spinResults[1] === spinResults[2]) {
      // Se todas as frutas forem iguais, o jogador ganha
      if (spinResults[0] === '🍒') winAmount = betAmount * 2;
      else if (spinResults[0] === '🍉') winAmount = betAmount * 4;
      else if (spinResults[0] === '🍋') winAmount = betAmount * 3;
      else if (spinResults[0] === '🍇') winAmount = betAmount * 1.5;
      else if (spinResults[0] === '🍊') winAmount = betAmount * 5;
      else if (spinResults[0] === '🍍') winAmount = betAmount * 6;
      else if (spinResults[0] === '🍎') winAmount = betAmount * 7;
      else if (spinResults[0] === '🍓') winAmount = betAmount * 10;
    }

    // Se ganhou, adiciona o valor de ganho ao saldo
    if (winAmount > 0) {
      balance += winAmount;
      document.getElementById('resultText').textContent = `Você ganhou ${winAmount.toFixed(2)} 💰!`;
    } else {
      document.getElementById('resultText').textContent = `Você perdeu!`;
    }

    // Atualiza o saldo após o giro
    updateBalance();

    spinning = false;
  }, 2000);  // Tempo da animação de rotação (2 segundos)
}
let balance = 1000.00;  // Saldo inicial
let betAmount = 10.00;  // Aposta inicial
let spinning = false;  // Verifica se o jogo já está girando

// Atualiza o saldo na tela
function updateBalance() {
  document.getElementById('balance').textContent = balance.toFixed(2);  // Atualiza o saldo
}

// Função para aumentar a aposta em 0.40
document.getElementById('increaseBet').addEventListener('click', function() {
  betAmount += 0.40;
  document.getElementById('bet').value = betAmount.toFixed(2);
});

// Função para diminuir a aposta em 0.40
document.getElementById('decreaseBet').addEventListener('click', function() {
  if (betAmount >= 0.40) {
    betAmount -= 0.40;
    document.getElementById('bet').value = betAmount.toFixed(2);
  }
});

function spin() {
  if (spinning || betAmount > balance) return;  // Verifica se o jogo já está girando ou se o saldo é suficiente

  spinning = true;
  document.getElementById('resultText').textContent = '';  // Limpa o resultado anterior

  // Deduz a aposta do saldo
  balance -= betAmount;

  // Atualiza o saldo na tela
  updateBalance();

  // Aqui começa a rotação das frutas
  let results = ['🍒', '🍉', '🍋', '🍇', '🍊', '🍍', '🍎', '🍓'];  // Exemplo de frutas
  let spinResults = [];

  // Simula o giro das frutas, selecionando 3 frutas aleatórias
  for (let i = 0; i < 3; i++) {
    spinResults.push(results[Math.floor(Math.random() * results.length)]);
  }

  // Exibe as frutas girando
  document.getElementById('slot1').textContent = spinResults[0];
  document.getElementById('slot2').textContent = spinResults[1];
  document.getElementById('slot3').textContent = spinResults[2];

  // Aguarda o tempo da rotação (2 segundos) para calcular o resultado
  setTimeout(() => {
    let winAmount = 0;
    
    // Lógica para calcular os ganhos com base nos resultados dos slots
    if (spinResults[0] === spinResults[1] && spinResults[1] === spinResults[2]) {
      // Se todas as frutas forem iguais, o jogador ganha
      if (spinResults[0] === '🍒') winAmount = betAmount * 2;
      else if (spinResults[0] === '🍉') winAmount = betAmount * 4;
      else if (spinResults[0] === '🍋') winAmount = betAmount * 3;
      else if (spinResults[0] === '🍇') winAmount = betAmount * 1.5;
      else if (spinResults[0] === '🍊') winAmount = betAmount * 5;
      else if (spinResults[0] === '🍍') winAmount = betAmount * 6;
      else if (spinResults[0] === '🍎') winAmount = betAmount * 7;
      else if (spinResults[0] === '🍓') winAmount = betAmount * 10;
    }

    // Se ganhou, adiciona o valor de ganho ao saldo
    if (winAmount > 0) {
      balance += winAmount;
      document.getElementById('resultText').textContent = `Você ganhou ${winAmount.toFixed(2)} 💰!`;
    } else {
      document.getElementById('resultText').textContent = `Você perdeu!`;
    }

    // Atualiza o saldo após o giro
    updateBalance();

    spinning = false;
  }, 2000);  // Tempo da animação de rotação (2 segundos)
}
