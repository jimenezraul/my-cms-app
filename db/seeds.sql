INSERT INTO departments (name) 
VALUES ('Engineering'), ('Marketing'), ('Sales'), ('Human Resources');

INSERT INTO roles (title, salary, department_id)
VALUES 
('Lead Engineer', 150000, 1), 
('Software Engineer', 150000, 1), 
('Salesperson', 80000, 3),
('Sales Manager', 120000, 3), 
('Marketing Manager', 100000, 2),
('Marketing Assistant', 50000, 2),
('Human Resources Manager', 100000, 4), 
('Human Resources Assistant', 50000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
('Mary', 'Smith' , 1, NULL), 
('Bob', 'Smith', 2, 1), 
('Jim', 'Halpert', 4, NULL),
('Sally', 'Johnson', 3, 3), 
('Pam', 'Halpert', 5, NULL), 
('Ryan', 'Howard', 6, 5),
('Michael', 'Scott', 7, NULL), 
('Dwight', 'Schrute', 8, 7), 
('Angela', 'Martin', 2, 1),
('Kevin', 'Malone', 2, 1), 
('Oscar', 'Martinez', 6, 5), 
('Phyllis', 'Lapin', 8, 7),
('Stanley', 'Hudson', 8, 7), 
('Creed', 'Bratton', 8, 7), 
('Meredith', 'Palmer', 6, 5),
('Kelly', 'Kapoor', 2, 1), 
('Toby', 'Flenderson', 3, 3), 
('Darryl', 'Philbin', 3, 3),
('Erin', 'Hannon', 8, 7), 
('Kelly', 'Schrute', 3, 3), 
('Angela', 'Martin', 2, 1);