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
