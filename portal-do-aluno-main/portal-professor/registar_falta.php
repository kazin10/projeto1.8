<?php
require 'conexao.php';
verificarLogin();

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = $_POST['attendance-date'];
    $disciplina_codigo = $_POST['attendance-subject'];
    $alunos = $_POST['alunos']; // Array de IDs de alunos

    try {
        // Verificar disciplina
        $stmt = $pdo->prepare("SELECT id FROM disciplinas 
                             WHERE codigo = ? AND professor_id = ?");
        $stmt->execute([$disciplina_codigo, $_SESSION['professor_id']]);
        $disciplina = $stmt->fetch();

        if($disciplina) {
            foreach($alunos as $aluno_id => $presente) {
                $insert = $pdo->prepare("INSERT INTO frequencia 
                                       (aluno_id, disciplina_id, professor_id, data, presente)
                                       VALUES (?, ?, ?, ?, ?)");
                $insert->execute([
                    $aluno_id,
                    $disciplina['id'],
                    $_SESSION['professor_id'],
                    $data,
                    $presente ? 1 : 0
                ]);
            }
            header("Location: dashboard.php?sucesso=frequencia");
        } else {
            header("Location: dashboard.php?erro=disciplina_invalida");
        }
    } catch(PDOException $e) {
        header("Location: dashboard.php?erro=geral");
    }
    exit();
}