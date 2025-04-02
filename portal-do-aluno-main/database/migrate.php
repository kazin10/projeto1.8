<?php
$config = require __DIR__ 
.'/../config/database.php';

try{
    $pdo = new PDO("sqlite:" . $config['database'], null, null, $config['options']);
    $pdo->exec("CREATE TABLE alunos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        senha VARCHAR(10) NOT NULL,
        curso VARCHAR(100) NOT NULL,
        data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ");

     echo "Tabela criada com sucesso!";

    } catch(PDOException $e) {
        die("Erro: " . $e->getMessage());
}