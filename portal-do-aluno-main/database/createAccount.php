<?php

// Configuração do banco de dados
$config = require __DIR__ . '/../config/database.php';

// Verificar se o formulário foi enviado
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $senha = password_hash($_POST['senha'], PASSWORD_DEFAULT); // Criptografar senha
    $curso = $_POST['curso'];

    try {
        // Conexão com o banco de dados
        $pdo = new PDO("sqlite:" . $config['database'], null, null, $config['options']);
        
        // Verificar se o e-mail já existe no banco de dados
        $stmt = $pdo->prepare("SELECT COUNT(*) FROM alunos WHERE email = ?");
        $stmt->execute([$email]);
        $emailExistente = $stmt->fetchColumn();

        if ($emailExistente) {
            die("Erro: Este e-mail já está registrado!");
        }

        // Inserir os dados na tabela
        $stmt = $pdo->prepare("INSERT INTO alunos (nome, email, senha, curso) VALUES (?, ?, ?, ?)");
        $stmt->execute([$nome, $email, $senha, $curso]);

        echo "Conta criada com sucesso!";
    } catch (PDOException $e) {
        die("Erro: " . $e->getMessage());
    }
} else {
    echo "Por favor, envie o formulário!";
}
?>