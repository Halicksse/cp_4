CREATE DATABASE IF NOT EXISTS plannit_db;

USE plannit_db;

CREATE TABLE IF NOT EXISTS user (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL, created_at TIMESTAMP NOT NULL DEFAULT NOW(), is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS product (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, price DECIMAL(10, 2) NOT NULL, stock INT NULL
);

CREATE TABLE IF NOT EXISTS cart (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, created_at TIMESTAMP NOT NULL DEFAULT NOW(), user_id INT NULL, product_id INT NULL, quantity INT NOT NULL, CONSTRAINT fk_cart_user FOREIGN KEY (user_id) REFERENCES user (id), CONSTRAINT fk_cart_product FOREIGN KEY (product_id) REFERENCES product (id)
);

CREATE TABLE IF NOT EXISTS detailedorder (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, quantity INT NOT NULL, unit_price DECIMAL(10, 2) NOT NULL, cart_id INT NULL, product_id INT NULL, CONSTRAINT fk_order_detail_order FOREIGN KEY (cart_id) REFERENCES cart (id), CONSTRAINT fk_order_detail_product FOREIGN KEY (product_id) REFERENCES product (id)
);

INSERT INTO
    user (
        firstname, lastname, email, password, is_admin
    )
VALUES (
        'John', 'Doe', 'johndoe@example.com', 'password123', FALSE
    ),
    (
        'Jane', 'Smith', 'janesmith@example.com', 'password123', FALSE
    ),
    (
        'Emily', 'Johnson', 'emilyjohnson@example.com', 'password123', FALSE
    ),
    (
        'Michael', 'Brown', 'michaelbrown@example.com', 'password123', FALSE
    ),
    (
        'Sarah', 'Davis', 'sarahdavis@example.com', 'password123', TRUE
    );

INSERT INTO
    product (
        name, description, price, stock
    )
VALUES (
        'Digital Planner 2023', 'Planner for the year 2023 with digital features', 19.99, 100
    ),
    (
        'Fitness Tracker', 'Digital planner for tracking fitness goals', 14.99, 200
    ),
    (
        'Meal Planner', 'Digital planner for organizing weekly meals', 9.99, 150
    ),
    (
        'Budget Tracker', 'Digital planner for tracking expenses and budgeting', 12.99, 120
    ),
    (
        'Travel Planner', 'Digital planner for organizing travel itineraries', 17.99, 80
    );

-- Assuming user_id and product_id are already populated
INSERT INTO
    cart (user_id, product_id, quantity)
VALUES (1, 1, 2),
    (2, 3, 1),
    (3, 2, 1),
    (4, 5, 2),
    (5, 4, 1);

-- Assuming order_id and product_id are already populated
INSERT INTO
    detailedorder (
        quantity, unit_price, cart_id, product_id
    )
VALUES (1, 19.99, 1, 1),
    (2, 9.99, 2, 3),
    (1, 14.99, 3, 2),
    (2, 17.99, 4, 5),
    (1, 12.99, 5, 4);