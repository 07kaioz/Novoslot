let balance = 100.00;   // Saldo inicial do jogador
let betAmount = 10.00;   // Valor da aposta
let multiplier = 1.00;   // Multiplicador inicial
let isBetting = false;   // Estado de apostas
let gameInterval;        // Intervalo do jogo
let explosionInterval;   // Intervalo da explosão
let gameRound = 1;       // Contador de rodadas
let lastExplosion = 0;   // Última vez que o avião explodiu

const multiplierElement = document.getElementById("multiplier");
const airplaneElement = document.getElementById("airplane");
const explosionElement = document.getElementById("explosion");
const balanceElement = document.getElementById("balance");
const betButton = document.getElementById("betButton");
const cashOutButton = document.getElementById("cashOutButton");
const resetBalanceButton = document.getElementById("resetBalanceButton");
const statsTable = document.getElementById("statsTable").getElementsByTagName('tbody')[0];

let stats = [];  // Array para armazenar as estatísticas das rodadas

// Função para atualizar o saldo na tela
function updateBalance() {
    balanceElement.innerText = `Saldo: R$${balance.toFixed(2)}`;
}

// Função para atualizar o multiplicador na tela
function updateMultiplier() {
    multiplierElement.innerText = `${multiplier.toFixed(2)}x`;
}

// Função para gerar uma explosão no avião
function triggerExplosion() {
    explosionElement.style.display = 'block';
    setTimeout(() => {
        if (multiplier < 2.0) {
            balance -= betAmount; // Perde a aposta se o multiplicador for menor que 2x
        }
        updateBalance();
        airplaneElement.style.animation = 'none'; // Pausar o movimento do avião
        logRound("Explodiu", multiplier);
    }, 1000);
}

// Função para registrar estatísticas da rodada
function logRound(result, multiplier) {
    const row = statsTable.insertRow(0); // Adiciona uma nova linha no topo
    const roundCell = row.insertCell(0);
    const multiplierCell = row.insertCell(1);
    const resultCell = row.insertCell(2);

    roundCell.innerText = gameRound;
    multiplierCell.innerText = multiplier.toFixed(2);
    resultCell.innerText = result;

    stats.push({
        round: gameRound,
        multiplier: multiplier,
        result: result
    });

    gameRound++;
}

// Função para iniciar o jogo
function startGame() {
    if (balance < betAmount) {
        alert("Você não tem saldo suficiente para apostar.");
        return;
    }

    isBetting = true;
    multiplier = 1.00;
    airplaneElement.style.animation = 'airplaneFly 5s linear infinite';
    explosionElement.style.display = 'none';

    balance -= betAmount;
    updateBalance();

    gameInterval = setInterval(() => {
        if (isBetting) {
            multiplier += Math.random() * 0.05 + 0.1;  // Aumenta o multiplicador aleatoriamente

            updateMultiplier();

            if (multiplier > 10.0 && gameRound - lastExplosion > 15) {  // Alta probabilidade de multiplicador maior a cada 15 rodadas
                if (Math.random() > 0.8) {
                    clearInterval(gameInterval); // Para o intervalo
                    triggerExplosion();  // Explode o avião
                    lastExplosion = gameRound;
                }
            } else if (multiplier > 2.0 && gameRound % 7 === 0 && Math.random() > 0.9) {  // Probabilidade de multiplicador maior a cada 7 rodadas
                if (Math.random() > 0.7) {
                    clearInterval(gameInterval);
                    triggerExplosion();
                }
            } else if (multiplier > 1.5 && Math.random() > 0.99) {
                clearInterval(gameInterval);  // Para o intervalo
                triggerExplosion();  // Explode o avião
            }
        }
    }, 1000); // Atualiza a cada segundo
}

// Função para retirar a aposta
function cashOut() {
    if (!isBetting) return;

    isBetting = false;
    balance += betAmount * multiplier;
    updateBalance();
    clearInterval(gameInterval);
    airplaneElement.style.animation = 'none';  // Para o movimento do avião
    logRound("Retirado", multiplier);
}

// Função para reiniciar o saldo
function resetBalance() {
    balance = 100.00;
    updateBalance();
    statsTable.innerHTML = "";  // Limpa as estatísticas
    gameRound = 1;
}

// Função para reiniciar a animação do avião
function resetGame() {
    airplaneElement.style.animation = 'airplaneFly 5s linear infinite';
    multiplier = 1.00;
    updateMultiplier();
}

// Função para animações extras (por exemplo, explosões)
function playExplosionSound() {
    const audio = new Audio('https://www.soundjay.com/button/beep-07.wav');
    audio.play();
}

function playButtonSound() {
    const audio = new Audio('https://www.soundjay.com/button/beep-08b.wav');
    audio.play();
}

betButton.addEventListener('click', () => {
    playButtonSound();  // Toca som ao clicar
    startGame();
});

cashOutButton.addEventListener('click', () => {
    playButtonSound();  // Toca som ao clicar
    cashOut();
});

resetBalanceButton.addEventListener('click', () => {
    playButtonSound();  // Toca som ao clicar
    resetBalance();
});

updateBalance();  // Atualiza o saldo inicial

// Exemplo de uma função para adicionar animação de aumento de multiplicador
function addMultiplierAnimation() {
    const multiplierElement = document.getElementById("multiplier");
    multiplierElement.classList.add('animated-multiplier');
    setTimeout(() => {
        multiplierElement.classList.remove('animated-multiplier');
    }, 1000);
}

// Função de animação para o avião voando
function animateAirplane() {
    airplaneElement.style.animation = "airplaneFly 5s linear infinite";
}

// Função de atualização de estatísticas no jogo
function updateGameStatistics() {
    const statsElement = document.getElementById("stats");
    statsElement.innerHTML = "";
    stats.forEach((stat) => {
        const statElement = document.createElement("p");
        statElement.innerHTML = `Rodada ${stat.round}: ${stat.result} - Multiplicador: ${stat.multiplier.toFixed(2)}x`;
        statsElement.appendChild(statElement);
    });
}

// Função de controle do tempo de animações
function handleGameTiming() {
    let gameTime = 0;
    setInterval(() => {
        gameTime++;
        if (gameTime % 5 === 0) {
            addMultiplierAnimation();  // Toda vez que o tempo passar de 5 segundos, anima o multiplicador
        }
    }, 1000);
}

// Função para registrar eventos de estatísticas e explosões
function registerEventListeners() {
    betButton.addEventListener('click', () => {
        if (!isBetting) {
            startGame();
            logRound("Aposta realizada", multiplier);
        }
    });

    cashOutButton.addEventListener('click', () => {
        if (isBetting) {
            cashOut();
            logRound("Retirada feita", multiplier);
        }
    });

    resetBalanceButton.addEventListener('click', () => {
        resetBalance();
        logRound("Saldo reiniciado", 1.00);
    });
}

registerEventListeners();  // Registra os eventos
handleGameTiming();  // Inicia o tempo de controle
