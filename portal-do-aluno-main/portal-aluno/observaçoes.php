<?php
$stmt = $pdo->prepare("SELECT * FROM observacoes WHERE aluno_id = ?");
$stmt->execute([$_SESSION['aluno_id']]);
$obs = $stmt->fetchAll();

foreach ($obs as $observacao) {
    $prof = $pdo->query("SELECT nome FROM professores WHERE id = {$observacao['professor_id']}")->fetch();
    echo "{$prof['nome']} ({$observacao['data_observacao']}): {$observacao['texto']}<br>";
}
?>