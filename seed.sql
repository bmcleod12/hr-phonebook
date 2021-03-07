INSERT INTO department (department)
VALUES
    ('Engineering'), ('Marketing'), ('Sales');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Quality Assurance', 80000, 1),
    ('Developer', 90000, 1),
    ('Head of Engineering', 200000, 1),
    ('Market Researcher', 75000, 2),
    ('Product Promoter', 82000, 2),
    ('Head of Marketing', 180000, 2),
    ('Account Representative', 85000, 3),
    ('Sales Representative', 100000, 3),
    ('Head of Sales', 220000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Megan', 'Jones', 3, NULL),
    ('Josie', 'Jackson', 1, 1),
    ('Sam', 'Kane', 2, 1),
    ('Jane', 'Pratt', 2, 1),
    ('Fifi', 'Houston', 2, 1),
    ('Harvey', 'Loving', 6, NULL),
    ('Heather', 'Jolley', 4, 6),
    ('Will', 'Truffles', 4, 6),
    ('Russell', 'Roberts', 5, 6),
    ('Carmen', 'Carpenter', 9, NULL),
    ('Chelsi', 'Brizendine', 7, 10),
    ('Polly', 'Thompson', 7, 10),
    ('Nick', 'Porter', 8, 10);
