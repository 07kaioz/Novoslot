// Espera o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    // Busca o botão e a div onde a mensagem será mostrada
    const botao = document.getElementById('mostrarMensagem');
    const mensagemDiv = document.getElementById('mensagem');
    
    // Adiciona o evento de clique ao botão
    botao.addEventListener('click', function() {
        // Exibe a mensagem ao clicar
        mensagemDiv.textContent = "Você clicou no botão! A interatividade está funcionando!";
        mensagemDiv.style.display = 'block'; // Garante que a mensagem será visível
    });
});
