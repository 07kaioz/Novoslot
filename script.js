const symbols = ["WILD", "Ouro", "Dragao", "Mochila", "Rolo", "Fruta"];
const reelElements = [document.getElementById("reel1"), document.getElementById("reel2"), document.getElementById("reel3")];
const spinButton = document.getElementById("spin-button");
const payoutInfo = document.getElementById("payout-info");

function getRandomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function spinReels() {
  reelElements.forEach((reel, index) => {
    reel.innerHTML = ""; // Limpa a bobina antes de girar
    for (let i = 0; i < 3; i++) {
      const symbol = document.createElement("div");
      symbol.className = "symbol";
      symbol.textContent = getRandomSymbol();
      reel.appendChild(symbol);
    }
  });

  // Exibir informações fictícias de pagamento
  payoutInfo.textContent = "Boa sorte!";
}

spinButton.addEventListener("click", spinReels);
const symbols = [
  { name: "WILD", image: "images/wild.png" },
  { name: "Ouro", image: "images/ouro.png" },
  { name: "Dragao", image: "images/dragao.png" },
  { name: "Mochila", image: "images/mochila.png" },
  { name: "Rolo", image: "images/rolo.png" },
  { name: "Fruta", image: "images/fruta.png" },
];

const reelElements = [document.getElementById("reel1"), document.getElementById("reel2"), document.getElementById("reel3")];
const spinButton = document.getElementById("spin-button");
const payoutInfo = document.getElementById("payout-info");

function getRandomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function spinReels() {
  reelElements.forEach((reel, index) => {
    reel.innerHTML = ""; // Limpa a bobina antes de girar
    for (let i = 0; i < 3; i++) {
      const symbolData = getRandomSymbol();
      const symbol = document.createElement("div");
      symbol.className = "symbol";
      const symbolImage = document.createElement("img");
      symbolImage.src = symbolData.image;
      symbolImage.alt = symbolData.name;
      symbolImage.className = "symbol-image";
      symbol.appendChild(symbolImage);
      reel.appendChild(symbol);
    }
  });

  payoutInfo.textContent = "Boa sorte!"; // Exibe mensagem fictícia de pagamento
}

spinButton.addEventListener("click", spinReels);
