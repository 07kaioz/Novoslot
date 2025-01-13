// Variáveis principais
let balance = 100;
let betAmount = 1;
let currentMultiplier = 1;
let isFlying = false;
let isCrashed = false;
let betPlaced = false;
let stats = [];

// Seletores
const multiplierDisplay = document.getElementById('multiplier');
const airplane = document.getElementById('airplane');
const balanceDisplay = document.getElementById('balance');
const betButton = document.getElementById('betButton');
const cashOutButton = document.getElementById('cashOutButton');
const resetBalanceButton = document.getElementById('resetBalanceButton');
const statsTable = document.getElementById('statsTable');

// Sons
const crashSound = new Audio('https://www.soundjay.com/button/beep-07.wav');  // Som de crash
const winSound = new Audio('https://www.soundjay.com/button/beep-09.wav');  // Som de vitória

// Função de atualizar o saldo
function updateBalance() {
    balanceDisplay.innerText = `Saldo: R$${balance.toFixed(2)}`;
}

// Função para atualizar as estatísticas
function updateStats() {
    let statRow = document.createElement('tr');
    statRow.innerHTML = `
        <td>${stats.length + 1}</td>
        <td>${currentMultiplier.toFixed(2)}x</td>
        <td>${isCrashed ? 'Perdeu' : 'Ganhou'}</td>
    `;
    statsTable.appendChild(statRow);
}

// Função para iniciar o voo
function startFlight() {
    if (balance < betAmount) {
        alert("Saldo insuficiente para apostar!");
        return;
    }

    betPlaced = true;
    isFlying = true;
    isCrashed = false;
    currentMultiplier = 1;

    // Atualiza o saldo após a aposta
    balance -= betAmount;
    updateBalance();

    // Inicia a animação do avião
    airplane.style.animation = 'airplaneFly 10s linear infinite';

    // Iniciar o aumento do multiplicador
    const multiplierInterval = setInterval(() => {
        if (!isFlying || isCrashed) {
            clearInterval(multiplierInterval);
            return;
        }

        currentMultiplier += 0.1;
        multiplierDisplay.textContent = `${currentMultiplier.toFixed(2)}x`;

        if (Math.random() < 0.05) {
            crash();
        }
    }, 200);
}

// Função de crash
function crash() {
    isFlying = false;
    isCrashed = true;
    crashSound.play();
    airplane.style.animation = '';  // Para a animação do avião
    alert(`O avião explodiu! Multiplicador: ${currentMultiplier.toFixed(2)}x`);
    updateStats();
}

// Função de retirada
function cashOut() {
    if (!betPlaced) {
        return;
    }

    isFlying = false;
    betPlaced = false;
    winSound.play();
    balance += betAmount * currentMultiplier;
    updateBalance();
    alert(`Você retirou com sucesso! Multiplicador:
