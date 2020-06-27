CREATE TABLE `Seller` (
	`address` varchar(255) NOT NULL,
	`GST` varchar(255) NOT NULL,
	PRIMARY KEY (`address`)
);

CREATE TABLE `Items` (
	`item_id` INT NOT NULL AUTO_INCREMENT,
	`item_name` varchar(255) NOT NULL,
	`item_seller` varchar(255) NOT NULL,
	`category` varchar(255) NOT NULL,
	`quantity` INT NOT NULL,
	`item_price` FLOAT NOT NULL,
	`image_hash` varchar(255) NOT NULL,
	`description` varchar(255) NOT NULL,
	`header` varchar(255) NOT NULL,
	PRIMARY KEY (`item_id`)
);

CREATE TABLE `Orders` (
	`order_id` INT NOT NULL AUTO_INCREMENT,
	`item_name` varchar(255) NOT NULL,
	`item_price` FLOAT NOT NULL,
	`item_seller` varchar(255) NOT NULL,
	PRIMARY KEY (`order_id`)
);

ALTER TABLE `Items` ADD CONSTRAINT `Items_fk0` FOREIGN KEY (`item_seller`) REFERENCES `Seller`(`address`);
