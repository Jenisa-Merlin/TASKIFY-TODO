CREATE DATABASE Taskify;
CREATE TABLE todos (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255),
    title VARCHAR(255),
    progress INT,
    date VARCHAR(255),
    status BOOLEAN
);
CREATE TABLE users(
    id VARCHAR(255) PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255)
);
SELECT * FROM users;
SELECT * FROM todos;
