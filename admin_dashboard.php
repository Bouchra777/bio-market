<?php
session_start();
require_once('config/database.php');
require_once('classes/User.php');
require_once('classes/Product.php');
require_once('classes/Order.php');

// Si l'utilisateur n'est pas connecté OU n'est pas admin, rediriger vers login
if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'admin') {
    header('Location: login.php');
    exit;
}

$db = (new Database())->getConnection();
$user = new User($db);

$users = $user->getAllUsers();
$user_stats = User::getStats($db);
$product_stats = Product::getStats($db);
$order_stats = Order::getStats($db);
?>

<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>Dashboard admin</title>
  <link rel="stylesheet" href="assets/style/dashadmin.css" />
  <link rel="icon" type="image/png" href="assets/img/logobiolife.png" />
</head>
<body>
  <div class="sidebar">
    <div class="sidebar-header">Biolife</div>
    <div class="menu-item">📊 Dashboard</div>
    <div class="menu-item active">👥 USERS</div>
    <div class="menu-item">🛒 Products</div>
    <div class="menu-item">📦 Orders</div>
    <div class="menu-item">🔔 Notifications</div>
  </div>

  <div class="main-content">
    <div class="header">
      <h1 class="page-title">USERS</h1>
      <div class="user-info">
        <div class="welcome-text">
          Welcome <span class="user-name"><?= htmlspecialchars($_SESSION['name']) ?></span>
          <span class="user-role">(admin)</span>
        </div>
        <form action="logout.php" method="post">
          <button type="submit" style="margin-left: 20px;">🚪 Logout</button>
        </form>
      </div>
    </div>

    <div class="stats-container">
      <div class="stat-card gradient">
        <div class="stat-title">NEW USERS</div>
        <div class="stat-value"><?= $user_stats['new_users'] ?></div>
        <div class="stat-today"><span class="today-number"><?= $user_stats['users_today'] ?></span><span>Today</span></div>
      </div>
      <div class="stat-card">
        <div class="stat-title" style="color: #c5d86d">PRODUCTS</div>
        <div class="stat-value"><?= $product_stats['total_products'] ?></div>
        <div class="stat-today"><span class="today-number"><?= $product_stats['products_today'] ?></span><span style="color: #657285">Today</span></div>
      </div>
      <div class="stat-card">
        <div class="stat-title" style="color: #f46036">ORDERS</div>
        <div class="stat-value"><?= $order_stats['total_orders'] ?></div>
        <div class="stat-today"><span class="today-number"><?= $order_stats['orders_today'] ?></span><span style="color: #657285">Today</span></div>
      </div>
      <div class="stat-card">
        <div class="stat-title" style="color: #657285">AGRICULTEUR</div>
        <div class="stat-value"><?= $user_stats['agriculteurs'] ?></div>
        <div class="stat-today"><span class="today-number"><?= $user_stats['agriculteurs_today'] ?></span><span style="color: #657285">Today</span></div>
      </div>
    </div>

    <div class="table-container">
      <table>
        <thead>
          <tr><th>NO.</th><th>NAMES</th><th>EMAIL</th><th>ROLE</th><th>ETAT</th><th></th></tr>
        </thead>
        <tbody>
          <?php foreach ($users as $index => $u): ?>
          <tr>
            <td><?= $index + 1 ?></td>
            <td class="client-name"><?= htmlspecialchars($u['name']) ?></td>
            <td><?= htmlspecialchars($u['email']) ?></td>
            <td><span class="role-badge"><?= $u['role'] ?></span></td>
            <td><?= $u['state'] ?></td>
            <td><button class="edit-btn">Edit</button></td>
          </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>
  </div>
</body>
</html>
