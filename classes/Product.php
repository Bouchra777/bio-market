<?php
class Product {
    public static function getStats($conn) {
        return [
            'total_products' => $conn->query("SELECT COUNT(*) FROM products")->fetchColumn(),
            'products_today' => $conn->query("SELECT COUNT(*) FROM products WHERE DATE(created_at) = CURDATE()")->fetchColumn()
        ];
    }
}
