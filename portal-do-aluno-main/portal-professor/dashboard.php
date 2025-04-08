<?php
require 'conexao.php';
verificarLogin();

// Buscar disciplinas do professor
$stmt = $pdo->prepare("SELECT * FROM disciplinas WHERE professor_id = ?");
$stmt->execute([$_SESSION['professor_id']]);
$disciplinas = $stmt->fetchAll();

// Buscar alunos matriculados
$alunos = $pdo->query("SELECT * FROM alunos")->fetchAll();
?>

<!-- Seção de Adicionar Notas -->
<select id="student" class="form-control" required>
    <?php foreach($alunos as $aluno): ?>
    <option value="<?= $aluno['id'] ?>"><?= $aluno['nome'] ?></option>
    <?php endforeach; ?>
</select>

<!-- Seção de Disciplinas -->
<select id="subject" class="form-control" required>
    <?php foreach($disciplinas as $disciplina): ?>
    <option value="<?= $disciplina['codigo'] ?>"><?= $disciplina['nome'] ?></option>
    <?php endforeach; ?>
</select>