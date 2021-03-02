DROP DATABASE IF EXISTS department;
DROP DATABASE IF EXISTS position;
DROP DATABASE IF EXISTS employee;
CREATE DATABASE department;
CREATE DATABASE position;
CREATE DATABASE employee;

USE department;
USE position;
USE employee;

-- ================================

CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT,
  department VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

-- for easy reference later:
-- {
--     id: 1234,
--     department: 'ABC co',
-- }

-- ================================

-- department_id is what needs to link this to the department table
CREATE TABLE position(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(12,2) NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);

-- for easy reference later:
-- {
--     id: 3456,
--     title: 'Senior Consultant',
--     salary: 100000.00,
--     department_id: 1234,
-- }

-- ================================

-- position_id is what needs to link employee to their position (role)
CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  position_id INT NOT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);

-- for easy reference later:
-- {
--     id: 4567,
--     first_name: 'Brenna',
--     last_name: 'McLeod',
--     position_id: 3456,
--     -- not sure how null is represented here
--     manager_id: ,
-- },
-- {
--     id: 9876,
--     first_name: 'Harvey',
--     last_name: 'McLeod',
--     position_id: 3456,
--     manager_id: 4567,
-- }

