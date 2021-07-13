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
    password VARCHAR(50),
    is_admin BOOLEAN
);