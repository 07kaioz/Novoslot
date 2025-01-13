let totalBet = 0;
let betHistory = [];

const betButton = document.getElementById("betButton");
const betAmountInput = document.getElementById("betAmount");
const totalBetDisplay = document.getElementById("totalBet");
const betHistoryDisplay = document.getElementById("betHistory");
const airplane = document.getElementById("airplane");
const multiplierDisplay = document.getElementById("multiplier");
const resetButton = document.getElementById("resetButton");

function placeBet() {
  let betAmount = parseFloat(betAmountInput.value);
  if (betAmount >= 1) {
    totalBet += betAmount;
    betHistory.push(`Apostou R$ ${betAmount.toFixed(2)}`);
    updateDisplay();
    startGame();
  } else {
    alert("Valor da aposta deve ser R$ 1,00 ou mais.");
  }
}

function startGame() {
  betButton.disabled = true;
  airplane.style.animation = "airplaneMove 2s infinite";
  let multiplier = 1;
  let gameInterval = setInterval(() => {
    multiplier += 0.1;
    multiplierDisplay.textContent = `${multiplier.toFixed(1)}x`;
    if (multiplier >= 5) {
      clearInterval(gameInterval);
      betButton.disabled = false;
      addToHistory();
    }
  }, 100);
}

function addToHistory() {
  const li = document.createElement("li");
  li.textContent = betHistory[betHistory.length - 1];
  betHistoryDisplay.appendChild(li);
  if (betHistory.length > 5) {
    betHistoryDisplay.removeChild(betHistoryDisplay.firstChild);
  }
}

function resetGame() {
  totalBet = 0;
  betHistory = [];
  betAmountInput.value = "";
  totalBetDisplay.textContent = "R$ 0,00";
  multiplierDisplay.textContent = "1x";
  betHistoryDisplay.innerHTML = "";
  betButton.disabled = false;
  airplane.style.animation = "";
}
