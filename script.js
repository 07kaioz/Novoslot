const symbols = ["🍊", "🔔", "🧧", "💰", "🎋", "🐯"];
const payouts = {
    "🍊": 3,
    "🔔": 5,
    "🧧": 8,
    "💰": 10,
    "🎋": 25,
    "🐯": 250, // Wild
};

let balance = 1000;
let bet = 0.40;
let cardChance = 0; // Chance inicial de 0% para soltar a cartinha

const slots = document.querySelectorAll(".slot");
const balanceElement = document.getElementById("balance");
const betElement = document.getElementById("bet");
const spinButton = document.getElementById("spin");
const increaseBetButton = document.getElementById("increase-bet");
const decreaseBetButton = document.getElementById("decrease-bet");
const messageElement = document.getElementById("message");
const cardElement = document.getElementById("card");

// Atualizar o saldo
function updateBalance() {
    balanceElement.textContent = balance.toFixed(2);
}

// Função para girar as slots
function spinSlots() {
    const results = [];
    const slotElements = document.querySelectorAll(".slot");

    // Gira as slots
    for (let i = 0; i < 9; i++) {
        const randomIndex = Math.floor(Math.random() * symbols.length);
        results.push(symbols[randomIndex]);
        slotElements[i].textContent = symbols[randomIndex];
    }

    // Adiciona animação
    slotElements.forEach((slot) => {
        slot.style.transform = "rotate(360deg)";
    });

    checkResults(results);

    // Aumenta a chance da cartinha após cada giro
    cardChance += 0.10;
    checkForCard();
}

// Verificar os resultados e calcular os ganhos
function checkResults(results) {
    const winningSymbols = [];

    // Checar linhas horizontais
    for (let i = 0; i < 3; i++) {
        const line = results.slice(i * 3, (i + 1) * 3);
        if (line.every(symbol => symbol === line[0])) {
            winningSymbols.push(line[0]);
        }
    }

    // Checar colunas verticais
    for (let i = 0; i < 3; i++) {
        const line = [results[i], results[i + 3], results[i + 6]];
        if (line.every(symbol => symbol === line[0])) {
            winningSymbols.push(line[0]);
        }
    }

    // Checar diagonais
    const diagonal1 = [results[0], results[4], results[8]];
    const diagonal2 = [results[2], results[4], results[6]];
    if (diagonal1.every(symbol => symbol === diagonal1[0])) {
        winningSymbols.push(diagonal1[0]);
    }
    if (diagonal2.every(symbol => symbol === diagonal2[0])) {
        winningSymbols.push(diagonal2[0]);
    }

    // Calcular o prêmio
    let winnings = 0;
    winningSymbols.forEach(symbol => {
        winnings += payouts[symbol] * bet;
    });

    if (winnings > 0) {
        balance += winnings;
        messageElement.textContent = `Você ganhou R$ ${winnings.toFixed(2)}!`;
    } else {
        balance -= bet;
        messageElement.textContent = `Você perdeu R$ ${bet.toFixed(2)}.`;
    }

    updateBalance();
}

// Função para aumentar a aposta
increaseBetButton.addEventListener("click", () => {
    bet += 0.40;
    betElement.textContent = bet.toFixed(2);
});

// Função para diminuir a aposta
decreaseBetButton.addEventListener("click", () => {
    if (bet > 0.40) {
        bet -= 0.40;
        betElement.textContent = bet.toFixed(2);
    }
});

// Evento de clique no botão "Girar"
spinButton.addEventListener("click", () => {
    spinSlots();
    messageElement.textContent = "Girando...";
});

// Função para verificar a chance da cartinha
function checkForCard() {
    if (Math.random() * 100 < cardChance) {
        cardElement.classList.remove("hidden");
        setTimeout(() => {
            cardElement.classList.add("hidden");
            // Resetar a chance da carta
            cardChance = 0;
        }, 2000);
    }
}

updateBalance(); // Atualizar o saldo inicial
