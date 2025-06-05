<?php
session_start();
require_once 'config/database.php';

$db = (new Database())->getConnection();
$email = $_POST['email'];
$password = $_POST['password'];

$stmt = $db->prepare("SELECT * FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch();

if ($user && password_verify($password, $user['password'])) {
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['role'] = $user['role'];
    $_SESSION['name'] = $user['name'];

    switch ($user['role']) {
        case 'admin':
            header('Location: admin_dashboard.php');
            break;
        case 'agriculteur':
            header('Location: dashboard_agri.php');
            break;
        default:
            header('Location: index.php');
    }
    exit;
} else {
    echo "❌ Email ou mot de passe incorrect.";
}
