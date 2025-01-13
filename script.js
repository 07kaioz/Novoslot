let isBetting = false;
let multiplier = 1.00;
let betAmount = 10; // valor da aposta inicial
let betTimer;
let airplane = document.getElementById("airplane");
let multiplierDisplay = document.getElementById("multiplier");
let statusDisplay = document.getElementById("status");
let betButton = document.getElementById("betButton");
let withdrawButton = document.getElementById("withdrawButton");

// Função para iniciar o jogo
function startGame() {
    isBetting = true;
    multiplier = 1.00;
    multiplierDisplay.textContent = `${multiplier.toFixed(2)}x`;
    airplane.style.bottom = "10px"; // Inicia o avião no fundo
    statusDisplay.textContent = "O avião está subindo...";

    // Animar o avião subindo com base no multiplicador
    betTimer = setInterval(function() {
        if (isBetting) {
            multiplier += 0.1; // O multiplicador sobe com o tempo
            airplane.style.top = `${10 + multiplier * 3}px`; // Sobe o avião de acordo com o multiplicador
            multiplierDisplay.textContent = `${multiplier.toFixed(2)}x`;

            if (multiplier >= 10) {
                clearInterval(betTimer);
                statusDisplay.textContent = "O avião explodiu!";
                isBetting = false;
                betButton.disabled = false;
                withdrawButton.disabled = true;
            }
        }
    }, 500); // Atualiza a cada 500ms
}

// Função para retirar o valor da aposta
function withdrawBet() {
    if (isBetting) {
        clearInterval(betTimer);
        isBetting = false;
        let winAmount = betAmount * multiplier;
        statusDisplay.textContent = `Você retirou com ${multiplier.toFixed(2)}x! Ganhou R$${winAmount.toFixed(2)}!`;
        betButton.disabled = false;
        withdrawButton.disabled = true;
    }
}

// Botões de apostas e retirada
betButton.addEventListener("click", function() {
    if (!isBetting) {
        betButton.disabled = true;
        withdrawButton.disabled = false;
        startGame();
    }
});

withdrawButton.addEventListener("click", withdrawBet);
