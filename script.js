function playGame() {
    const result = Math.random() > 0.5 ? "Você ganhou!" : "Você perdeu!";
    document.getElementById("result").innerText = result;
}
#slot-machine {
  display: inline-block;
  margin-top: 20px;
}

#slot {
  border-collapse: collapse;
  margin-bottom: 20px;
}

.symbol {
  width: 80px;
  height: 80px;
  font-size: 50px;
  text-align: center;
  border: 1px solid #333;
  background-color: #f0f0f0;
  line-height: 80px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

#spin-button {
  margin-top: 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

#spin-button:hover {
  background-color: #45a049;
}
const symbols = ['🍒', '🍊', '🍉', '🍇', '🍓'];  // 5 símbolos
let spinning = false;

const slotRows = document.querySelectorAll('#slot tr');
const duration = 3; // Duração do giro (em segundos)
const spins = 6;  // Quantidade de giros

function spin() {
  if (spinning) return;
  spinning = true;

  let count = 0;

  // Inicia a rotação
  slotRows.forEach(row => {
    const cells = row.querySelectorAll('.symbol');
    cells.forEach(cell => {
      // Rotaciona cada rolo
      cell.style.animation = `spin ${duration}s ease-in-out infinite`;
    });
  });

  // Após a rotação, define símbolos aleatórios
  setTimeout(() => {
    slotRows.forEach(row => {
      const cells = row.querySelectorAll('.symbol');
      cells.forEach(cell => {
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        cell.textContent = randomSymbol;
        cell.style.animation = ''; // Remove a animação após parar
      });
    });
    spinning = false;
  }, duration * 1000); // Tempo após o qual a rotação para (em milissegundos)
}

document.getElementById('spin-button').addEventListener('click', spin);
