function playGame() {
    const result = Math.random() > 0.5 ? "Você ganhou!" : "Você perdeu!";
    document.getElementById("result").innerText = result;
}