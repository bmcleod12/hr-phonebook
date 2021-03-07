DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;
USE employees;

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

CREATE TABLE role(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(12,2) NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES department(id)
);

-- for easy reference later:
-- {
--     id: 3456,
--     title: 'Senior Consultant',
--     salary: 100000.00,
--     department_id: 1234,
-- }

-- ================================

CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
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

-- INSERT INTO department (department)
-- VALUES
--     ('Engineering'), ('Marketing'), ('Sales');

-- INSERT INTO role (title, salary, department_id)
-- VALUES
--     ('Quality Assurance', 80000, 1),
--     ('Developer', 90000, 1),
--     ('Head of Engineering', 200000, 1),
--     ('Market Researcher', 75000, 2),
--     ('Product Promoter', 82000, 2),
--     ('Head of Marketing', 180000, 2),
--     ('Account Representative', 85000, 3),
--     ('Sales Representative', 100000, 3),
--     ('Head of Sales', 220000, 3);

-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- VALUES
--     ('Megan', 'Jones', 3, NULL),
--     ('Josie', 'Jackson', 1, 1),
--     ('Sam', 'Kane', 2, 1),
--     ('Jane', 'Pratt', 2, 1),
--     ('Fifi', 'Houston', 2, 1),
--     ('Harvey', 'Loving', 6, NULL),
--     ('Heather', 'Jolley', 4, 6),
--     ('Will', 'Truffles', 4, 6),
--     ('Russell', 'Roberts', 5, 6),
--     ('Carmen', 'Carpenter', 9, NULL),
--     ('Chelsi', 'Brizendine', 7, 10),
--     ('Polly', 'Thompson', 7, 10),
--     ('Nick', 'Porter', 8, 10);

-- SELECT * FROM employees