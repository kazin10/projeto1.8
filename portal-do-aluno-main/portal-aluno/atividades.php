<?php
session_start();
include '../conexao.php';

// Busca atividades das disciplinas matriculadas
$stmt = $pdo->prepare("SELECT atividades.* FROM atividades
                      INNER JOIN matriculas ON atividades.disciplina_id = matriculas.disciplina_id
                      WHERE matriculas.aluno_id = ?");
$stmt->execute([$_SESSION['aluno_id']]);
$atividades = $stmt->fetchAll();

foreach ($atividades as $atividade) {
    echo "<h3>{$atividade['titulo']}</h3>";
    echo "<p>Entrega: {$atividade['data_entrega']}</p>";
    echo "<a href='entregar_atividade.php?id={$atividade['id']}'>Enviar Resposta</a>";
}
?>