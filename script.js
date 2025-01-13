// Função para reiniciar o saldo
function resetBalance() {
    balance = 100.0; // Redefine o saldo para 100 reais
    updateBalance(); // Atualiza a exibição do saldo
    alert("Saldo reiniciado para R$100,00!");
}

// Evento do botão de reinício do saldo
document.getElementById("resetBalanceButton").addEventListener("click", resetBalance);let balance = 100.0;
let betAmount = 0;
let currentMultiplier = 1.0;
let explosionThreshold = 0;
let betPlaced = false;

// Sons
const flightSound = document.getElementById("flightSound");
const explosionSound = document.getElementById("explosionSound");
const winSound = document.getElementById("winSound");

// Elementos do DOM
const multiplierDisplay = document.getElementById("multiplier");
const airplane = document.getElementById("airplane");
const balanceDisplay = document.getElementById("balance");
const betHistory = document.getElementById("betHistory");

function updateBalance() {
    balanceDisplay.textContent = `Saldo: R$${balance.toFixed(2)}`;
}

function generateExplosionThreshold() {
    const random = Math.random();
    if (random < 0.066) return 10 + Math.random() * 5; // Uma vez a cada 15 rodadas
    if (random < 0.142) return 2 + Math.random() * 2; // Duas vezes a cada 7 rodadas
    return 1.1 + Math.random(); // Explosões baixas
}

function startGame() {
    if (betPlaced) return alert("Jogo já em andamento!");
    const betInput = document.getElementById("betAmount");
    betAmount = parseFloat(betInput.value);
    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        return alert("Insira uma aposta válida!");
    }
    betPlaced = true;
    balance -= betAmount;
    explosionThreshold = generateExplosionThreshold();
    updateBalance();

    flightSound.currentTime = 0;
    flightSound.play();

    currentMultiplier = 1;
    const interval = setInterval(() => {
        if (currentMultiplier >= explosionThreshold) {
            clearInterval(interval);
            explode();
        } else {
            currentMultiplier += 0.05;
            multiplierDisplay.textContent = `${currentMultiplier.toFixed(2)}x`;
            airplane.style.left = `${currentMultiplier * 50}px`;
        }
    }, 100);
}

function withdrawBet() {
    if (!betPlaced) return alert("Nenhuma aposta ativa!");
    betPlaced = false;
    const winnings = betAmount * currentMultiplier;
    balance += winnings;

    flightSound.pause();
    winSound.play();

    betHistory.innerHTML += `<li>Retirou em ${currentMultiplier.toFixed(2)}x e ganhou R$${winnings.toFixed(2)}</li>`;
    updateBalance();
}

function explode() {
    flightSound.pause();
    explosionSound.play();
    multiplierDisplay.textContent = "Explodiu!";
    betPlaced = false;
    betHistory.innerHTML += `<li>Explodiu em ${currentMultiplier.toFixed(2)}x - Perdeu R$${betAmount.toFixed(2)}</li>`;
    updateBalance();
}

// Eventos
document.getElementById("betButton").addEventListener("click", startGame);
document.getElementById("withdrawButton").addEventListener("click", withdrawBet);
