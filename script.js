const symbols = ['🍒', '🍊', '🍉', '🍇', '🍓'];  // 5 símbolos
let spinning = false;

function spin() {
  if (spinning) return;
  spinning = true;
  document.getElementById('result').textContent = '';  // Limpa o resultado anterior

  // Inicia a rotação dos rolos
  document.querySelectorAll('.slot').forEach((slot) => {
    const symbolsList = slot.querySelectorAll('.symbol');
    
    // Aplica a animação de rotação
    symbolsList.forEach(symbol => {
      symbol.style.animation = `roll 2s cubic-bezier(0.6, -0.1, 0.2, 1) infinite`;
    });
  });

  // Após 2 segundos, para a rotação e escolhe um símbolo aleatório
  setTimeout(() => {
    const results = [];
    document.querySelectorAll('.slot').forEach((slot) => {
      const symbolsList = slot.querySelectorAll('.symbol');
      
      // Para a rotação e escolhe um símbolo aleatório
      symbolsList.forEach(symbol => {
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        symbol.textContent = randomSymbol;
        symbol.style.animation = '';  // Remove a animação após parar
      });

      // Salva o resultado final de cada slot
      results.push(symbolsList[2].textContent); // Pegando o símbolo do meio para exibir
    });

    // Exibe o resultado
    displayResult(results);
    spinning = false;
  }, 2000);  // Tempo de rotação dos rolos (em milissegundos)
}

function displayResult(results) {
  if (results[0] === results[1] && results[1] === results[2]) {
    document.getElementById('result').textContent = `Você ganhou! (${results[0]})`;
  } else {
    document.getElementById('result').textContent = `Tente novamente!`;
  }
}

function resetSlots() {
  document.querySelectorAll('.slot').forEach((slot) => {
    const symbolsList = slot.querySelectorAll('.symbol');
    symbolsList.forEach(symbol => {
      symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      symbol.style.animation = '';  // Remove a animação
    });
  });
  document.getElementById('result').textContent = '';
}

document.getElementById('spin-button').addEventListener('click', spin);
document.getElementById('reset-button').addEventListener('click', resetSlots);
const symbols = ['🍒', '🍊', '🍉', '🍇', '🍓'];  // 5 símbolos
let balance = 1000;  // Saldo inicial
let betAmount = 10;  // Aposta inicial
let spinning = false;
let winProbability = 0.1;  // Probabilidade de ganhar (inicialmente 0.1)

// Definindo os valores dos pagamentos
const payouts = {
  '🍒': 2,    // Cereja paga 2x
  '🍊': 1.5,  // Laranja paga 1.5x
  '🍉': 4,    // Melancia paga 4x
  '🍇': 0.5,  // Uva paga 0.5x
  '🍓': 50    // Morango paga 50x
};

function spin() {
  if (spinning || betAmount > balance) return;
  spinning = true;
  document.getElementById('result').textContent = '';  // Limpa o resultado anterior

  // Atualiza o saldo na tela
  updateBalance();

  // Deduz a aposta do saldo
  balance -= betAmount;

  // Inicia a rotação dos rolos
  document.querySelectorAll('.slot').forEach((slot) => {
    const symbolsList = slot.querySelectorAll('.symbol');
    
    // Aplica a animação de rotação
    symbolsList.forEach(symbol => {
      symbol.style.animation = `roll 2s cubic-bezier(0.6, -0.1, 0.2, 1) infinite`;
    });
  });

  // Aumenta a probabilidade de ganhar
  winProbability += 0.1;

  // Após 2 segundos, para a rotação e escolhe um símbolo aleatório
  setTimeout(() => {
    const results = [];
    let winAmount = 0;

    document.querySelectorAll('.slot').forEach((slot) => {
      const symbolsList = slot.querySelectorAll('.symbol');
      
      // Para a rotação e escolhe um símbolo aleatório
      symbolsList.forEach(symbol => {
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        symbol.textContent = randomSymbol;
        symbol.style.animation = '';  // Remove a animação após parar
      });

      // Salva o resultado final de cada slot
      results.push(symbolsList[2].textContent); // Pegando o símbolo do meio para exibir
    });

    // Verifica o resultado e calcula os ganhos
    results.forEach(result => {
      if (payouts[result]) {
        winAmount += betAmount * payouts[result];  // Calcula o valor do ganho
      }
    });

    // Atualiza o saldo se houver ganho
    if (winAmount > 0) {
      balance += winAmount;
      document.getElementById('result').textContent = `Você ganhou ${winAmount.toFixed(2)} 💰!`;
    } else {
      document.getElementById('result').textContent = `Você perdeu!`;
    }

    // Reseta a probabilidade de ganhar caso o jogador tenha ganhado
    if (winAmount > 0) {
      winProbability = 0.1;
    }

    // Atualiza o saldo na tela após o giro
    updateBalance();

    spinning = false;
  }, 2000);  // Tempo de rotação (2 segundos)
}

// Atualiza o saldo na tela
function updateBalance() {
  document.getElementById('balance').textContent = balance.toFixed(2);
}

// Função para resetar o jogo
function resetGame() {
  balance = 1000;
  winProbability = 0.1;
  document.getElementById('bet').value = 10;
  updateBalance();
  document.getElementById('result').textContent = '';
}

// Eventos de clique nos botões
document.getElementById('spin-button').addEventListener('click', () => {
  betAmount = parseFloat(document.getElementById('bet').value);
  spin();
});
let balance = 1000;  // Saldo inicial
let betAmount = 10;  // Valor da aposta inicial
document.getElementById('reset-button').addEventListener('click', resetGame);
// Atualiza o saldo na tela
function updateBalance() {
  document.getElementById('balance').textContent = balance.toFixed(2);  // Atualiza o saldo
}
function spin() {
  if (spinning || betAmount > balance) return;
  spinning = true;
  document.getElementById('result').textContent = '';  // Limpa o resultado anterior

  // Deduz a aposta do saldo
  balance -= betAmount;
  
  // Atualiza o saldo na tela
  updateBalance();

  // Aumenta a probabilidade de ganhar
  winProbability += 0.1;

  // Aqui inicia a rotação dos slots (o seu código já está correto para isso)

  setTimeout(() => {
    let winAmount = 0;
    
    // Lógica para calcular os ganhos com base nos resultados dos slots
    // (Você já tem a lógica de payout no código)

    // Se o jogador ganhou, adiciona o valor de ganho ao saldo
    if (winAmount > 0) {
      balance += winAmount;
      document.getElementById('result').textContent = `Você ganhou ${winAmount.toFixed(2)} 💰!`;
    } else {
      document.getElementById('result').textContent = `Você perdeu!`;
    }

    // Atualiza o saldo após o giro
    updateBalance();
    
    spinning = false;
  }, 2000);  // Tempo da animação de rotação (2 segundos)
}
let balance = 1000;  // Saldo inicial
let betAmount = 10;  // Aposta inicial
let spinning = false;  // Verifica se está girando

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
  document.getElementById('result').textContent = '';  // Limpa o resultado anterior

  // Deduz a aposta do saldo
  balance -= betAmount;

  // Atualiza o saldo na tela
  updateBalance();

  // Aqui começa a rotação das frutas
  let results = ['🍒', '🍉', '🍋', '🍇', '🍊'];  // Exemplo de frutas
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
    }

    // Se ganhou, adiciona o valor de ganho ao saldo
    if (winAmount > 0) {
      balance += winAmount;
      document.getElementById('result').textContent = `Você ganhou ${winAmount.toFixed(2)} 💰!`;
    } else {
      document.getElementById('result').textContent = `Você perdeu!`;
    }

    // Atualiza o saldo após o giro
    updateBalance();

    spinning = false;
  }, 2000);  // Tempo da animação de rotação (2 segundos)
}
