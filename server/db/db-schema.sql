CREATE TABLE product(
    product_id SERIAL PRIMARY KEY,
    product_img_id INT NOT NULL,
    FOREIGN KEY(product_img_id) REFERENCES product_img(product_img_id) ON DELETE CASCADE,
    product_extra_info_id INT NOT NULL,
    FOREIGN KEY(product_extra_info_id) REFERENCES product_extra_info(product_extra_info_id) ON DELETE CASCADE,
    title VARCHAR(50),
    description VARCHAR,
    category VARCHAR(25)
);

CREATE TABLE product_img(
    product_img_id SERIAL PRIMARY KEY,
    alt_text VARCHAR,
    width INT,
    height INT,
    url VARCHAR
);