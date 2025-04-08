<?php
session_start();
$host = 'localhost';
$db   = 'portal_professor';
$user = 'admin@gmail.com';
$pass = 'admin';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    die("Erro de conexão: " . $e->getMessage());
}

// Verificar login
function verificarLogin() {
    if(!isset($_SESSION['professor_id'])) {
        header("Location: login.php");
        exit();
    }
}
?>