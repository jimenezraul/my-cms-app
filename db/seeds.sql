INSERT INTO departments (name) 
VALUES ('Engineering'), ('Marketing'), ('Sales'), ('Human Resources');

INSERT INTO roles (title, salary, department_id)
VALUES 
('Lead Engineer', 150000, 1), 
('Software Engineer', 120000, 1), 
('Marketing Manager', 100000, 2),
('Marketing Assistant', 50000, 2),
('Sales Manager', 120000, 3),
('Salesperson', 80000, 3),
('Human Resources Manager', 100000, 4), 
('Human Resources Assistant', 50000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
('Mary', 'Smith' , 1, NULL), 
('Jim', 'Halpert', 3, NULL),
('Pam', 'Halpert', 5, NULL),
('Michael', 'Scott', 7, NULL),
('Bob', 'Smith', 2, 1), 
('Sally', 'Johnson', 3, 2), 
('Ryan', 'Howard', 6, 3),
('Dwight', 'Schrute', 8, 4), 
('Angela', 'Martin', 2, 1),
('Kevin', 'Malone', 3, 2),
('Oscar', 'Martinez', 6, 3), 
('Phyllis', 'Lapin', 8, 4);