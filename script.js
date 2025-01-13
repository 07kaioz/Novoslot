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
    airplane.style.left = '0%';
    airplane.style.transition = 'none';

    // Reseta o multiplicador
    multiplierDisplay.innerText = `${currentMultiplier.toFixed(2)}x`;

    // Som de iniciar o voo
    winSound.play();

    // Calcula o multiplicador e anima o avião
    let flightInterval = setInterval(() => {
        if (isCrashed || currentMultiplier > 10) {
            clearInterval(flightInterval);
            return;
        }

        // Aumento do multiplicador
        currentMultiplier += Math.random() * 0.1;

        // Movimentação do avião
        airplane.style.left = `${currentMultiplier * 5}%`;

        multiplierDisplay.innerText = `${currentMultiplier.toFixed(2)}x`;

        if (currentMultiplier >= 10 && Math.random() < 0.07) {
            // Forçar uma explosão do avião com 7% de chance
            crash();
            clearInterval(flightInterval);
        }
    }, 100);
}

// Função para lidar com a retirada
function cashOut() {
    if (betPlaced && !isCrashed) {
        balance += betAmount * currentMultiplier;
        updateBalance();
        winSound.play();
        alert(`Você retirou com sucesso! Multiplicador: ${currentMultiplier.toFixed(2)}x`);
    } else {
        crash();
    }

    // Registra a estatística da rodada
    isCrashed ? alert('Você perdeu a aposta!') : alert(`Você ganhou R$${(betAmount * currentMultiplier).toFixed(2)}`);
    stats.push({ multiplier: currentMultiplier, isCrashed: isCrashed });
    updateStats();

    // Resetando variáveis
    betPlaced = false;
    isFlying = false;
    currentMultiplier = 1;
    multiplierDisplay.innerText = '1.00x';
    airplane.style.transition = 'left 0s';
}

// Função para fazer o avião explodir
function crash() {
    if (!isFlying) return;

    isFlying = false;
    isCrashed = true;
    airplane.style.transition = 'left 2s ease-out';
    airplane.style.left = '100%'; // Avião explodindo ao ir para a direita
    crashSound.play();

    alert('O avião explodiu! Você perdeu a aposta.');
    stats.push({ multiplier: currentMultiplier, isCrashed: true });
    updateStats();
    multiplierDisplay.innerText = `${currentMultiplier.toFixed(2)}x`;
}

// Função para resetar o saldo
function resetBalance() {
    balance = 100;
    updateBalance();
    stats = [];
    statsTable.innerHTML = ''; // Limpa as estatísticas
    alert('Saldo reiniciado para R$100,00!');
}

// Event Listeners
betButton.addEventListener('click', () => {
    if (betPlaced) {
        alert('Você já fez uma aposta!');
    } else {
        startFlight();
    }
});

cashOutButton.addEventListener('click', () => {
    if (!betPlaced) {
        alert('Você ainda não fez uma aposta!');
    } else {
        cashOut();
    }
});

resetBalanceButton.addEventListener('click', resetBalance);

// Funções de UI (Animações, efeitos)
document.body.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    airplane.style.transform = `translate(-50%, -50%) rotate(${x * 0.2}deg) translate(${x - 50}%, ${y - 50}%)`;
});

updateBalance();
