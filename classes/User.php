<?php
class User {
    private $conn;
    private $table_name = "users";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAllUsers() {
        $stmt = $this->conn->prepare("SELECT * FROM {$this->table_name} ORDER BY id DESC LIMIT 7");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function getStats($conn) {
        $stats = [];
        $stats['new_users'] = $conn->query("SELECT COUNT(*) FROM users WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)")->fetchColumn();
        $stats['users_today'] = $conn->query("SELECT COUNT(*) FROM users WHERE DATE(created_at) = CURDATE()")->fetchColumn();
        $stats['agriculteurs'] = $conn->query("SELECT COUNT(*) FROM users WHERE role = 'agriculteur'")->fetchColumn();
        $stats['agriculteurs_today'] = $conn->query("SELECT COUNT(*) FROM users WHERE role = 'agriculteur' AND DATE(created_at) = CURDATE()")->fetchColumn();
        return $stats;
    }
}
