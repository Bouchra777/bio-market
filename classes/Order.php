<?php
class Order {
    public static function getStats($conn) {
        return [
            'total_orders' => $conn->query("SELECT COUNT(*) FROM orders")->fetchColumn(),
            'orders_today' => $conn->query("SELECT COUNT(*) FROM orders WHERE DATE(created_at) = CURDATE()")->fetchColumn()
        ];
    }
}
