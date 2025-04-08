<?php
session_start();
include '../conexao.php';

// Busca faltas do aluno
$stmt = $pdo->prepare("SELECT data, disciplina_id FROM frequencia 
                      WHERE aluno_id = ? AND presente = 0");
$stmt->execute([$_SESSION['aluno_id']]);
$faltas = $stmt->fetchAll();

foreach ($faltas as $falta) {
    $disciplina = $pdo->query("SELECT nome FROM disciplinas WHERE id = {$falta['disciplina_id']}")->fetch();
    echo "Falta em {$disciplina['nome']} em {$falta['data']}<br>";
}
?>