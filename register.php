<?php
session_start();
require_once 'config/database.php';

$database = new Database();
$db = $database->getConnection();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = htmlspecialchars(trim($_POST["name"]));
    $email = htmlspecialchars(trim($_POST["email"]));
    $password = htmlspecialchars(trim($_POST["password"]));
    $role = htmlspecialchars(trim($_POST["role"]));

    // 🔒 Autoriser uniquement un email spécifique pour admin
    if ($role === 'admin' && $email !== 'admin@biolife.com') {
        die("❌ Seul l'email admin@biolife.com est autorisé pour créer un compte admin.");
    }

    // Hasher le mot de passe
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Vérifier si l'email existe déjà
    $checkQuery = "SELECT id FROM users WHERE email = :email";
    $checkStmt = $db->prepare($checkQuery);
    $checkStmt->bindParam(":email", $email);
    $checkStmt->execute();

    if ($checkStmt->rowCount() > 0) {
        die("❌ Cet email est déjà utilisé.");
    }

    // Insertion dans la BDD
    $query = "INSERT INTO users (name, email, password, role, state, created_at)
              VALUES (:name, :email, :password, :role, 'actif', NOW())";
    $stmt = $db->prepare($query);

    $stmt->bindParam(":name", $name);
    $stmt->bindParam(":email", $email);
    $stmt->bindParam(":password", $hashed_password);
    $stmt->bindParam(":role", $role);

    if ($stmt->execute()) {
        // Connexion auto
        $_SESSION["user_id"] = $db->lastInsertId();
        $_SESSION["name"] = $name;
        $_SESSION["role"] = $role;

        // Redirection selon le rôle
        switch ($role) {
            case 'admin':
                header("Location: admin_dashboard.php");
                break;
            case 'agriculteur':
                header("Location: dashboard_agri.php");
                break;
            case 'customer':
                header("Location: index.php");
                break;
        }
        exit;
    } else {
        echo "❌ Une erreur est survenue lors de l'inscription.";
    }
}
?>
