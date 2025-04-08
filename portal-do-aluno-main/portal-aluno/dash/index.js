function login(event) {
    event.preventDefault(); // Impede o envio do formulário para processar os dados

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Simulação de login: e-mail e senha fixos para exemplo
    var correctEmail = "kauasantos@gmail.com";
    var correctPassword = "090108";

    // Seleciona a div para a mensagem de erro
    var errorMessage = document.getElementById("error-message");

    // Validação do login
    if (email === correctEmail && password === correctPassword) {
        alert("Login bem-sucedido!");
        // Redireciona para outra página após login bem-sucedido
        window.location.href = "/portal-aluno/dash/dashboard.html"; // Alterar conforme necessário
    } else {
        alert("Email ou senha incorretos!")
        // Torna a mensagem visível
        errorMessage.style.display = "block";
    }
}