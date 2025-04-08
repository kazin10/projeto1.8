<?php
require 'conexao.php';

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $senha = $_POST['senha'];

    $stmt = $pdo->prepare("SELECT * FROM professores WHERE email = ?");
    $stmt->execute([$email]);
    $professor = $stmt->fetch();

    if($professor && password_verify($senha, $professor['senha_hash'])) {
        $_SESSION['professor_id'] = $professor['id'];
        $_SESSION['professor_nome'] = $professor['nome'];
        header("Location: dashboard.php");
        exit();
    } else {
        $erro = "Credenciais inválidas!";
    }
}
?>

<!DOCTYPE html>
<html>
<body>
    <form method="POST">
        <input type="email" name="email" placeholder="E-mail" required>
        <input type="password" name="senha" placeholder="Senha" required>
        <button type="submit">Entrar</button>
        <?php if(isset($erro)) echo "<p>$erro</p>"; ?>
    </form>
</body>
</html>