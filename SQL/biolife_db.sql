-- --------------------------------------------------------
-- Base de données : `biolife_db`
-- Créée le : 2025-06-05 13:50:08
-- --------------------------------------------------------

CREATE DATABASE IF NOT EXISTS biolife_db;
USE biolife_db;

-- Table `users`
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255),
  role ENUM('admin', 'agriculteur', 'customer') NOT NULL,
  state VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table `products`
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  quantity INT,
  image VARCHAR(255),
  owner_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES users(id)
);

-- Table `orders`
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  total DECIMAL(10,2),
  status ENUM('en cours', 'payé', 'livré') DEFAULT 'en cours',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insertion d'un utilisateur admin
INSERT INTO users (name, email, password, role, state)
VALUES ('Admin User', 'admin@biolife.com', 'admin123', 'admin', 'actif');
