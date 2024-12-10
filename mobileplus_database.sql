-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for mobileplus
CREATE DATABASE IF NOT EXISTS `mobileplus` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mobileplus`;

-- Dumping structure for table mobileplus.brands
CREATE TABLE IF NOT EXISTS `brands` (
  `brand_id` int NOT NULL AUTO_INCREMENT,
  `brand_name` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`brand_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table mobileplus.brands: ~1 rows (approximately)
INSERT INTO `brands` (`brand_id`, `brand_name`, `created_at`) VALUES
	(2, 'ROG PHONE', '2024-11-17 07:15:17');

-- Dumping structure for table mobileplus.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table mobileplus.categories: ~2 rows (approximately)
INSERT INTO `categories` (`category_id`, `category_name`, `created_at`) VALUES
	(2, 'Iphone', '2024-11-16 21:32:57'),
	(3, 'Android', '2024-11-16 21:33:04');

-- Dumping structure for table mobileplus.customers
CREATE TABLE IF NOT EXISTS `customers` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`customer_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table mobileplus.customers: ~3 rows (approximately)
INSERT INTO `customers` (`customer_id`, `user_id`, `full_name`, `phone`, `created_at`) VALUES
	(1, 1, 'Johnathan Doe', '0987654321', '2024-11-16 16:15:19'),
	(2, 2, 'John Smith', '08198765432', '2024-11-16 18:44:28'),
	(3, 2, 'John Doe', '08123456789', '2024-11-16 18:47:07');

-- Dumping structure for table mobileplus.inventory_logs
CREATE TABLE IF NOT EXISTS `inventory_logs` (
  `log_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `stock_change` int NOT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `logged_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`log_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `inventory_logs_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table mobileplus.inventory_logs: ~0 rows (approximately)

-- Dumping structure for table mobileplus.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int DEFAULT NULL,
  `order_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('pending','completed','cancelled') DEFAULT 'pending',
  `total_price` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table mobileplus.orders: ~3 rows (approximately)
INSERT INTO `orders` (`order_id`, `customer_id`, `order_date`, `status`, `total_price`) VALUES
	(1, 1, '2024-11-18 05:33:36', 'cancelled', 45000000.00),
	(2, 1, '2024-11-18 05:36:17', 'cancelled', 1000000.00),
	(3, 1, '2024-11-18 06:18:32', 'completed', 1000000.00);

-- Dumping structure for table mobileplus.order_items
CREATE TABLE IF NOT EXISTS `order_items` (
  `order_item_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  PRIMARY KEY (`order_item_id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table mobileplus.order_items: ~2 rows (approximately)
INSERT INTO `order_items` (`order_item_id`, `order_id`, `product_id`, `quantity`, `price`, `subtotal`) VALUES
	(1, 1, 4, 2, 15000000.00, 30000000.00),
	(2, 1, 5, 1, 15000000.00, 15000000.00);

-- Dumping structure for table mobileplus.payments
CREATE TABLE IF NOT EXISTS `payments` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `payment_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `amount` decimal(10,2) NOT NULL,
  `method` enum('transfer','credit_card','cash') NOT NULL,
  `status` enum('pending','completed','failed') DEFAULT 'pending',
  PRIMARY KEY (`payment_id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table mobileplus.payments: ~2 rows (approximately)
INSERT INTO `payments` (`payment_id`, `order_id`, `payment_date`, `amount`, `method`, `status`) VALUES
	(1, 3, '2024-11-18 06:22:18', 1000000.00, 'transfer', 'pending'),
	(2, 3, '2024-11-18 06:36:57', 1000000.00, 'transfer', 'completed');

-- Dumping structure for table mobileplus.products
CREATE TABLE IF NOT EXISTS `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(100) NOT NULL,
  `colour` varchar(50) DEFAULT NULL,
  `variant` varchar(50) DEFAULT NULL,
  `specs` text,
  `price` decimal(10,2) NOT NULL,
  `stock` int NOT NULL,
  `category_id` int DEFAULT NULL,
  `brand_id` int DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`product_id`),
  KEY `category_id` (`category_id`),
  KEY `brand_id` (`brand_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE SET NULL,
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`brand_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table mobileplus.products: ~2 rows (approximately)
INSERT INTO `products` (`product_id`, `product_name`, `colour`, `variant`, `specs`, `price`, `stock`, `category_id`, `brand_id`, `image`, `created_at`) VALUES
	(4, 'iPhone X', 'Silver', '64 GB', 'OLED Display, A12 Bionic Chip', 15000000.00, 10, 2, 2, NULL, '2024-11-18 10:56:10'),
	(5, 'POCO  Pro', NULL, NULL, NULL, 15000000.00, 3, 2, 2, NULL, '2024-11-18 10:56:16'),
	(9, 'iPhone X', 'Silver', '64 GB', 'OLED Display, A12 Bionic Chip', 15000000.00, 20, 2, 2, NULL, '2024-12-10 12:38:30');

-- Dumping structure for table mobileplus.users
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` enum('admin','customer') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table mobileplus.users: ~2 rows (approximately)
INSERT INTO `users` (`user_id`, `username`, `password`, `email`, `role`, `created_at`) VALUES
	(1, 'newUsername', '$2b$10$dLeeTjUxmOGofyuDdYgt7.Vmb9L2JLXYP6G15YV9l5ni1bXz0YSJ.', 'newEmail@example.com', 'admin', '2024-11-16 07:51:27'),
	(2, 'Username', '$2b$10$A7UiK.crqfsFAQRyJOdBqeyQZ3IJ/UA.f/Cb9YvePmybxxvrDOHw6', 'Email@example.com', 'customer', '2024-11-16 08:02:17');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
