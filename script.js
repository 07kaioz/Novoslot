function playGame() {
    const result = Math.random() > 0.5 ? "Você ganhou!" : "Você perdeu!";
    document.getElementById("result").innerText = result;
}
#slot-machine {
  display: inline-block;
  margin-top: 20px;
}

#slot {
  border-collapse: collapse;
  margin-bottom: 20px;
}

.symbol {
  width: 80px;
  height: 80px;
  font-size: 50px;
  text-align: center;
  border: 1px solid #333;
  background-color: #f0f0f0;
  line-height: 80px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

#spin-button {
  margin-top: 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

#spin-button:hover {
  background-color: #45a049;
}
