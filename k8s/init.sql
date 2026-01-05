CREATE DATABASE IF NOT EXISTS aadhaar_db;

USE aadhaar_db;

CREATE TABLE IF NOT EXISTS user_details (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  aadhaar_number VARCHAR(12),
  dob DATE
);

