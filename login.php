<?php
// login.php
session_start();

// Si l'utilisateur est déjà connecté, on le redirige vers son dashboard
if (isset($_SESSION['role'])) {
    switch ($_SESSION['role']) {
        case 'admin':
            header('Location: admin_dashboard.php');
            break;
        case 'agriculteur':
            header('Location: dashboard_agri.php');
            break;
        case 'customer':
            header('Location: index.php');
            break;
    }
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sign up/Login</title>
  <link rel="stylesheet" href="assets/style/login.css" />
  <link rel="icon" type="image/png" href="assets/img/logobiolife.png" />
  <link
    href="https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@400;500;700&family=Just+Another+Hand&display=swap"
    rel="stylesheet"
  />
</head>
<body>
  <main>
    <div class="signup">
      <span>Don't have an account?</span>
      <button type="button" onclick="showSignup()">Register</button>
    </div>
    <div class="login">
      <span>Already have an account?</span>
      <button type="button" onclick="showLogin()">Login</button>
    </div>

    <!-- Login Form -->
    <form action="auth.php" method="post" class="login-form active">
      <h2>Login</h2>
      <input type="email" name="email" placeholder="johnsmith@gmail.com" required />
      <input type="password" name="password" placeholder="●●●●●" required />
      <button type="submit">Login</button>
    </form>

    <!-- Signup Form -->
    <form action="register.php" method="post" class="signup-form">
      <h2>Sign Up</h2>
      <input type="text" name="name" placeholder="John Smith" required />
      <input type="email" name="email" placeholder="johnsmith@gmail.com" required />
      <input type="password" name="password" placeholder="●●●●●" required />
      <select name="role" required>
        <option value="customer">Customer</option>
        <option value="agriculteur">Agriculteur</option>
        <option value="admin">Admin (reserved)</option> <!-- ✅ ajout admin -->
      </select>
      <button type="submit">Register</button>
    </form>
  </main>

  <script>
    function showSignup() {
      document.querySelector(".signup-form").classList.add("active");
      document.querySelector(".login-form").classList.remove("active");
    }

    function showLogin() {
      document.querySelector(".login-form").classList.add("active");
      document.querySelector(".signup-form").classList.remove("active");
    }
  </script>
</body>
</html>
