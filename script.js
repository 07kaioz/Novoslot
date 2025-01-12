const symbols = ['🍒', '🍊', '🍉', '🍇', '🍓'];  // 5 símbolos

let spinning = false;

function spin() {
  if (spinning) return;
  spinning = true;

  // Definir animação de rotação nos slots
  document.querySelectorAll('.slot').forEach((slot, index) => {
    const symbolsList = slot.querySelectorAll('.symbol');
    
    // Adicionar animação de rotação para cada slot
    symbolsList.forEach(symbol => {
      symbol.style.animation = `roll 2s cubic-bezier(0.6, -0.1, 0.2, 1) infinite`;
    });
  });

  // Depois de 2 segundos (tempo da animação), parar a rotação e escolher um símbolo aleatório
  setTimeout(() => {
    document.querySelectorAll('.slot').forEach((slot, index) => {
      const symbolsList = slot.querySelectorAll('.symbol');
      
      // Parar a rotação e escolher um símbolo aleatório para o slot
      symbolsList.forEach(symbol => {
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        symbol.textContent = randomSymbol;
        symbol.style.animation = '';  // Remover animação após parar
      });
    });
    spinning = false;
  }, 2000);  // O tempo de rotação dos slots
}

document.getElementById('spin-button').addEventListener('click', spin);
