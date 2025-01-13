let betAmount = 0;
let currentMultiplier = 1;
let betPlaced = false;
let explosionTriggered = false;

// Referências aos elementos
const airplane = document.getElementById("airplane");
const betAmountInput = document.getElementById("betAmount");
const betButton = document.getElementById("betButton");
const withdrawButton = document.getElementById("withdrawButton");
const totalBetElement = document.getElementById("totalBet");
const multiplierElement = document.getElementById("multiplier");
const betHistory = document.getElementById("betHistory");
const resetButton = document.getElementById("resetButton");

// Função para iniciar o jogo
function placeBet() {
    betAmount = parseFloat(betAmountInput.value);
    if (isNaN(betAmount) || betAmount < 1) {
        alert("Por favor, insira um valor válido!");
        return;
    }

    betPlaced = true;
    currentMultiplier = 1;
    explosionTriggered = false;
    totalBetElement.textContent = `R$ ${betAmount.toFixed(2)}`;
    multiplierElement.textContent = `${currentMultiplier}x`;

    // Iniciar animação do avião
    airplane.style.left = "-90px";
    airplane.classList.remove("explode");
    airplane.style.animation = "airplaneMove 6s linear infinite";

    // Simular multiplicação do valor
    startMultiplier();
}

// Função para controlar o multiplicador e o movimento do avião
function startMultiplier() {
    const interval = setInterval(() => {
        if (betPlaced && !explosionTriggered) {
            currentMultiplier += 0.1;
            multiplierElement.textContent = `${currentMultiplier.toFixed(1)}x`;
        }

        if (parseFloat(airplane.style.left.replace("px", "")) > window.innerWidth) {
            clearInterval(interval);
            airplane.classList.add("explode");
            explosionTriggered = true;
            alert("O avião explodiu! Você perdeu sua aposta.");
            resetGame();
        }
    }, 100);
}

// Função de retirada antes da explosão
function withdrawBet() {
    if (betPlaced && !explosionTriggered) {
        alert(`Você retirou com sucesso! Multiplicador: ${currentMultiplier.toFixed(1)}x`);
        betHistory.innerHTML += `<li>Aposta de R$ ${betAmount.toFixed(2)} | Multiplicador: ${currentMultiplier.toFixed(1)}x</li>`;
        resetGame();
    }
}

// Função para resetar o jogo
function resetGame() {
    betAmountInput.value = '';
    betAmount = 0;
    betPlaced = false;
    explosionTriggered = false;
    airplane.classList.remove("explode");
    totalBetElement.textContent = "R$ 0,00";
    multiplierElement.textContent = "1x";
}

betButton.addEventListener("click", placeBet);
resetButton.addEventListener("click", resetGame);
withdrawButton.addEventListener("click", withdrawBet);
