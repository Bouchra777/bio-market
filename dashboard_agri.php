<?php
session_start();
if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'agriculteur') {
    header('Location: login.php');
    exit;
}
?>

<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dashboard Agriculteur</title>
    <link rel="stylesheet" href="assets/style/dashagri.css" />
    <link rel="icon" type="image/png" href="assets/img/logobiolife.png" />
    <link
      href="https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@400;500;700&family=Just+Another+Hand&display=swap"
      rel="stylesheet"
    />
    <script src="assets/js/agri.js"></script>
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
        <h1 class="page-title">Clients</h1>
        <div class="user-info">
          <div class="welcome-text">
            Welcome
            <span class="user-name"><?php echo htmlspecialchars($_SESSION['name']); ?></span>
            <span class="user-role"> (agriculteur)</span>
          </div>
          <a href="logout.php" style="margin-left: 20px; color: red; text-decoration: none; font-weight: bold;">Se déconnecter</a>
        </div>
      </div>

      <!-- Cartes stats (statiques pour l'instant) -->
      <div class="stats-container">
        <!-- Même contenu que HTML précédent -->
        <!-- Tu peux plus tard charger dynamiquement depuis la BDD -->
      </div>

      <!-- Tableau de clients (statiques pour l'instant) -->
      <div class="table-container">
        <!-- Table HTML inchangée, pour affichage -->
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Names</th>
              <th>Commande</th>
              <th>Produit</th>
              <th>Role</th>
              <th>Etat</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <!-- Lignes statiques conservées -->
            <tr>
              <td>1</td>
              <td class="client-name">Gloria Patterson</td>
              <td>1 produit</td>
              <td>miel</td>
              <td><span class="role-badge">Customer</span></td>
              <td>payé</td>
              <td><button class="edit-btn">Edit</button></td>
            </tr>
            <!-- ... autres lignes ... -->
          </tbody>
        </table>
        <div class="pagination">
          <div class="pagination-info">
            Showing <strong>7</strong> of <strong>60</strong>
          </div>
          <div class="pagination-controls">
            <div class="page-numbers">1 - 7</div>
            <button class="pagination-btn" disabled>←</button>
            <button class="pagination-btn">→</button>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>