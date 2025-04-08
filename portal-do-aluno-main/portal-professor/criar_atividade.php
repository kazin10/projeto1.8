<?php
require 'conexao.php';
verificarLogin();

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $titulo = $_POST['activity-title'];
    $descricao = $_POST['activity-desc'];
    $data_entrega = $_POST['activity-due'];
    $disciplina_codigo = $_POST['activity-subject'];

    try {
        $stmt = $pdo->prepare("SELECT id FROM disciplinas 
                             WHERE codigo = ? AND professor_id = ?");
        $stmt->execute([$disciplina_codigo, $_SESSION['professor_id']]);
        $disciplina = $stmt->fetch();

        if($disciplina) {
            $insert = $pdo->prepare("INSERT INTO atividades 
                                   (titulo, descricao, disciplina_id, professor_id, data_entrega)
                                   VALUES (?, ?, ?, ?, ?)");
            $insert->execute([
                $titulo,
                $descricao,
                $disciplina['id'],
                $_SESSION['professor_id'],
                $data_entrega
            ]);
            
            header("Location: dashboard.php?sucesso=atividade");
        } else {
            header("Location: dashboard.php?erro=disciplina_invalida");
        }
    } catch(PDOException $e) {
        header("Location: dashboard.php?erro=geral");
    }
    exit();
}