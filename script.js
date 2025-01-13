document.getElementById('spinButton').addEventListener('click', spin);

function spin() {
    const symbols = ["🍒", "🍋", "🍉", "🍇", "🍊"];
    
    const reel1 = document.getElementById('reel1');
    const reel2 = document.getElementById('reel2');
    const reel3 = document.getElementById('reel3');
    const result = document.getElementById('result');

    reel1.innerText = symbols[Math.floor(Math.random() * symbols.length)];
    reel2.innerText = symbols[Math.floor(Math.random() * symbols.length)];
    reel3.innerText = symbols[Math.floor(Math.random() * symbols.length)];

    if (reel1.innerText === reel2.innerText && reel2.innerText === reel3.innerText) {
        result.innerText = "Você Ganhou!";
        result.style.color = "green";
    } else {
        result.innerText = "Tente Novamente!";
        result.style.color = "red";
    }
}
