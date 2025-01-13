document.getElementById('mostrarMensagem').addEventListener('click', function() {
    let mensagemDiv = document.getElementById('mensagem');
    mensagemDiv.textContent = "Você clicou no botão! A interatividade está funcionando!";
    mensagemDiv.style.display = 'block';
});
