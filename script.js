// Símbolos e valores
const symbols = ["🍊", "🔔", "🧧", "💰", "🎋", "🐯"];
const payouts = {
    "🍊": 3,
    "🔔": 5,
    "🧧": 8,
    "💰": 10,
    "🎋": 25,
    "🐯": 250, // Wild símbolo, substitui os outros
};

let balance = 1000;
let bet = 0.40;

const slots = document.querySelectorAll(".slot");
const balanceElement = document.getElementById("balance");
const betElement = document.getElementById("bet");
const spinButton = document.getElementById("spin");
const increaseBetButton = document.getElementById("increase-bet");
const decreaseBetButton = document.getElementById("decrease-bet");
const messageElement = document.getElementById("message");

// Atualizar o saldo na tela
function updateBalance() {
    balanceElement.textContent = balance.toFixed(2);
}

// Girar os slots
function spinSlots() {
    const results = [];
    for (let i = 0; i < 9; i++) {
        const randomIndex = Math.floor(Math.random() * symbols.length);
        results.push(symbols[randomIndex]);
        slots[i].textContent = symbols[randomIndex];
    }
    checkResults(results);
}

// Verificar resultados e calcular pagamentos
function checkResults(results) {
    const winningSymbols = [];

    // Verificando as linhas horizontais
    for (let i = 0; i < 3; i++) {
        const line = results.slice(i * 3, (i + 1) * 3);
        if (line.every(symbol => symbol === line[0])) {
            winningSymbols.push(line[0]);
        }
    }

    // Verificando as colunas verticais
    for (let i = 0; i < 3; i++) {
        const line = [results[i], results[i + 3], results[i + 6]];
        if (line.every(symbol => symbol === line[0])) {
            winningSymbols.push(line[0]);
        }
    }

    // Verificando as diagonais
    const diagonal1 = [results[0], results[4], results[8]];
    const diagonal2 = [results[2], results[4], results[6]];
    if (diagonal1.every(symbol => symbol === diagonal1[0])) {
        winningSymbols.push(diagonal1[0]);
    }
    if (diagonal2.every(symbol => symbol === diagonal2[0])) {
        winningSymbols.push(diagonal2[0]);
    }

    // Calcular o valor da vitória
    let winnings = 0;
    winningSymbols.forEach(symbol => {
        winnings += payouts[symbol] * bet;
    });

    if (winnings > 0) {
        balance += winnings;
        messageElement.textContent = `Você ganhou R$ ${winnings.toFixed(2)}!`;
        messageElement.classList.add("big-win"); // Animação de grande prêmio
    } else {
        balance -= bet;
        messageElement.textContent = `
