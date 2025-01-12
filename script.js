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

document.getElementById('reset-button').addEventListener('click', resetGame);
