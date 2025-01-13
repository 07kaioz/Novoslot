* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background-color: #f0f4f8;
    color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.container {
    text-align: center;
    width: 600px;
}

header {
    background-color: #4CAF50;
    color: white;
    padding: 20px;
    border-radius: 10px;
}

h1 {
    font-size: 2em;
    margin-bottom: 10px;
}

.game-area {
    position: relative;
    height: 300px;
    margin: 20px 0;
    background: linear-gradient(to top, #87CEEB, #ffffff);
    border-radius: 10px;
}

.airplane {
    width: 50px;
    height: 30px;
    background-color: #ff5722;
    border-radius: 50%;
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    transition: top 1s ease-in-out;
}

#multiplier {
    font-size: 2em;
    position: absolute;
    top: 10px;
    right: 10px;
    color: white;
}

.controls {
    margin-top: 20px;
}

button {
    background-color: #4CAF50;
    color: white;
    padding: 15px 30px;
    font-size: 1.2em;
    border: none;
    border-radius: 5px;
    margin: 10px;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}

footer {
    margin-top: 30px;
    font-size: 0.8em;
    color: #555;
}
