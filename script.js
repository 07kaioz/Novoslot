const symbols = ["🧧", "🎋", "💰", "🐯", "🍊"];
const payouts = {
    "🧧": 3,
    "🎋": 5,
    "💰": 10,
    "🐯": 250, // Wild símbolo
    "🍊": 1,
};

let balance = 1000;
let bet = 0.40;
let cardChance = 0;

const slots = document.querySelectorAll(".slot");
const balanceElement = document.getElementById("balance");
const betElement = document.getElementById("bet");
const spinButton = document.getElementById("spin");
const increaseBetButton = document.getElementById("increase-bet");
const decreaseBetButton = document.getElementById("decrease-bet");
const messageElement = document.getElementById("message");

function updateBalance() {
    balanceElement.textContent = balance.toFixed(2);
}

function spinSlots() {
    const results = [];
    for (let i = 0; i < 9; i++) {
        const randomIndex = Math.floor(Math.random() * symbols.length);
        results.push(symbols[randomIndex]);
        slots[i].textContent = symbols[randomIndex];
    }

    cardChance += 0.10; // A cada giro, aumenta 0.10% a chance de sair a carta
    checkResults(results);
}

function checkResults(results) {
    const winningSymbols = [];

    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    lines.forEach(line => {
        const [a, b, c] = line;
        if (results[a] === results[b] && results[b] === results[c]) {
            winningSymbols.push(results[a]);
        }
    });

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

    if (Math.random() < cardChance) {
        messageElement.textContent += " Você ganhou uma cartinha de bônus!";
        cardChance = 0; // Resetando a chance de cartinha
    }

    updateBalance();
}

spinButton.addEventListener("click", spinSlots);

increaseBetButton.addEventListener("click", () => {
    bet += 0.40;
    betElement.textContent = bet.toFixed(2);
});

decreaseBetButton.addEventListener("click", () => {
    if (bet > 0.40) {
        bet -= 0.40;
        betElement.textContent = bet.toFixed(2);
    }
});

updateBalance();
