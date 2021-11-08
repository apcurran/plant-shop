CREATE TABLE product(
    product_id SERIAL PRIMARY KEY,
    title VARCHAR(50),
    description VARCHAR,
    category VARCHAR(25)
);

CREATE TABLE product_img(
    product_img_id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    FOREIGN KEY(product_id) REFERENCES product(product_id) ON DELETE CASCADE,
    alt_text VARCHAR,
    width INT,
    height INT,
    public_id VARCHAR
);

CREATE TABLE product_extra_info(
    product_extra_info_id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    FOREIGN KEY(product_id) REFERENCES product(product_id) ON DELETE CASCADE,
    size INT,
    price DECIMAL(5, 2)
);

CREATE TABLE app_user(
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    password VARCHAR,
    is_admin BOOLEAN
);

CREATE TABLE app_user_password_requests(
    temp_id VARCHAR NOT NULL,
    email VARCHAR(100) NOT NULL
);

CREATE TABLE app_user_order(
    order_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES app_user(user_id),
    total_cost DECIMAL(16, 2) NOT NULL,
    street VARCHAR NOT NULL,
    city VARCHAR NOT NULL,
    state VARCHAR(2) NOT NULL,
    zip INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    stripe_payment_id VARCHAR,
    is_complete BOOLEAN DEFAULT FALSE
);

CREATE TABLE app_user_order_item(
    order_item_id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    FOREIGN KEY(order_id) REFERENCES app_user_order(order_id),
    product_id INT NOT NULL,
    FOREIGN KEY(product_id) REFERENCES product(product_id),
    product_extra_info_id INT NOT NULL,
    FOREIGN KEY(product_extra_info_id) REFERENCES product_extra_info(product_extra_info_id),
    product_qty INT NOT NULL
);