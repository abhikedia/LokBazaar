CREATE TABLE `Seller` (
	`GST` varchar(255) NOT NULL,
	`seller_qid` varchar(255) NOT NULL,
	PRIMARY KEY (`GST`)
);

CREATE TABLE `Customer` (
	`customer_id` INT NOT NULL AUTO_INCREMENT,
	`customer_qid` varchar(255) NOT NULL,
	PRIMARY KEY (`customer_id`)
);

CREATE TABLE `Items` (
	`item_id` INT NOT NULL AUTO_INCREMENT,
	`item_name` varchar(255) NOT NULL,
	`item_seller` varchar(255) NOT NULL,
	`category` varchar(255) NOT NULL,
	`quantity` INT NOT NULL,
	`item_price` FLOAT NOT NULL,
	PRIMARY KEY (`item_id`)
);

ALTER TABLE `Items` ADD CONSTRAINT `Items_fk0` FOREIGN KEY (`item_seller`) REFERENCES `Seller`(`GST`);
