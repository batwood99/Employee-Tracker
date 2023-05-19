USE employees;

INSERT INTO department (name)
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Manager', 110000, 1),
       ('Sales Representative', 75000, 1),
       ('Lead Engineer', 160000, 2),
       ('Software Engineer', 120000, 2),
       ('Finance Manager', 170000, 3),
       ('Accountant', 95000, 3),
       ('Legal Manager', 240000, 4),
       ('Lawyer', 180000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('David', 'Smith', 1, NULL),
       ('Michael', 'Johnson', 2, 1),
       ('Emily', 'Davis', 3, NULL),
       ('Kevin', 'Taylor', 4, 3),
       ('Daniel', 'Wilson', 5, NULL),
       ('Olivia', 'Thompson', 6, 5),
       ('Sophia', 'Lee', 7, NULL),
       ('Thomas', 'Clark', 8, 7);
