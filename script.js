const symbols = ["🍊", "🔔", "🧧", "💰", "🎋", "🐯"];
const payouts = {
    "🍊": 3,
    "🔔": 5,
    "🧧": 8,
    "💰": 10,
    "🎋": 25,
    "🐯": 250,
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

function updateBalance() {
    balanceElement.textContent = balance.toFixed(2);
}

function spinSlots() {
    const results = [];
    slots.forEach((slot, index) => {
        const randomIndex = Math.floor(Math.random() * symbols.length);
        results.push(symbols[randomIndex]);
        slot.textContent = symbols[randomIndex];
        slot.style.animation = 'none';
        setTimeout(() => {
            slot.style.animation = 'rotate 1s ease-out';
        }, 10);
    });
    checkResults(results);
}

function checkResults(results) {
    const winningSymbols = [];
    for (let i = 0; i < 3; i++) {
        const line = results.slice(i * 3, (i + 1) * 3);
        if (line.every(symbol => symbol === line[0])) {
            winningSymbols.push(line[0]);
        }
    }

    for (let i = 0; i < 3; i++) {
        const line = [results[i], results[i + 3], results[i + 6]];
        if (line.every(symbol => symbol === line[0])) {
            winningSymbols.push(line[0]);
        }
    }

    const diagonal1 = [results[0], results[4], results[8]];
    const diagonal2 = [results[2], results[4], results[6]];
    if (diagonal1.every(symbol => symbol === diagonal1[0])) {
        winningSymbols.push(diagonal1[0]);
    }
    if (diagonal2.every(symbol => symbol === diagonal2[0])) {
        winningSymbols.push(diagonal2[0]);
    }

    let winnings = 0;
    winningSymbols.forEach(symbol => {
        winnings += payouts[symbol] * bet;
    });

    if (winnings > 0) {
        balance += winnings;
        messageElement.textContent = `Você ganhou R$ ${winnings.toFixed(2)}!`;
        if (winnings >= 10 * bet) {
            document.body.classList.add("win");
            setTimeout(() => {
                document.body.classList.remove("win");
            }, 500);
        }
    } else {
        balance -= bet;
        messageElement.textContent = `Você perdeu R$ ${bet.toFixed(2)}.`;
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
