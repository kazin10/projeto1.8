<?php
require 'conexao.php';
verificarLogin();

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $aluno_id = $_POST['student'];
    $disciplina_codigo = $_POST['subject'];
    $nota = $_POST['grade'];

    try {
        // Verificar se a disciplina pertence ao professor
        $stmt = $pdo->prepare("SELECT id FROM disciplinas 
                             WHERE codigo = ? AND professor_id = ?");
        $stmt->execute([$disciplina_codigo, $_SESSION['professor_id']]);
        $disciplina = $stmt->fetch();

        if($disciplina) {
            $insert = $pdo->prepare("INSERT INTO notas 
                                   (aluno_id, disciplina_id, professor_id, valor, data_registro)
                                   VALUES (?, ?, ?, ?, CURDATE())");
            $insert->execute([$aluno_id, $disciplina['id'], $_SESSION['professor_id'], $nota]);
            
            header("Location: dashboard.php?sucesso=nota");
        } else {
            header("Location: dashboard.php?erro=disciplina_invalida");
        }
    } catch(PDOException $e) {
        header("Location: dashboard.php?erro=geral");
    }
    exit();
}