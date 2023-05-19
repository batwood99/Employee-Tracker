const inquirer = require("inquirer");
const express = require('express');
const cTable = require('console.table');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'Employee_Tracker'
}, console.log('Connected to the election database.'));

db.connect();

function chooseRole() {
  inquirer.prompt([
    {
      type: 'list',
      name: "whoNext",
      message: "What would you like to do",
      choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
    }
  ]).then(ans => {
    const selectedOption = ans.whoNext.toLowerCase().replace(/\s/g, '');
    switch (selectedOption) {
      case 'viewalldepartments':
        viewDepartments();
        break;
      case 'viewallroles':
        viewRoles();
        break;
      case 'viewallemployees':
        viewEmployees();
        break;
      case 'addadepartment':
        addDepartment();
        break;
      case 'addarole':
        addRole();
        break;
      case 'addanemployee':
        addEmployee();
        break;
      case 'updateanemployeerole':
        updateEmployeeRole();
        break;
      default:
        chooseRole();
        break;
    }
  });
}

function viewDepartments() {
  db.query(`SELECT * FROM department;`, (err, res) => {
    console.table(res);
    chooseRole();
  });
}

function viewRoles() {
  db.query(`SELECT * FROM role;`, (err, res) => {
    if (err) {
      console.log(err);
    }
    console.table(res);
    chooseRole();
  });
}

function viewEmployees() {
  db.query(`SELECT * FROM employee;`, (err, res) => {
    if (err) {
      console.log(err);
    }
    console.table(res);
    chooseRole();
  });
}

function addDepartment() {
  inquirer.prompt({
    name: "Department_name",
    message: "What's the name of the department?",
    type: "input"
  }).then(ans => {
    db.query(`INSERT INTO department(name) VALUES("${ans.Department_name}");`, (err, res) => {
      if (err) {
        console.log(err);
      }
      console.table(res);
      chooseRole();
    });
  });
}

function addRole() {
  inquirer.prompt([
    {
      name: "Role_name",
      message: "What's the name of the role you'd like to add?",
      type: "input"
    },
    {
      name: "Salary",
      message: "What's the salary for this role?",
      type: "input"
    },
    {
      name: "Role_Department",
      message: "What department ID is this role in?",
      type: "input"
    }
  ]).then(roleAns => {
    db.query(`INSERT INTO role(title, salary, department_id) VALUES("${roleAns.Role_name}", ${roleAns.Salary}, ${roleAns.Role_Department});`, (err, res) => {
      if (err) {
        console.log(err);
      }
      console.table(res);
      chooseRole();
    });
  });
}

function addEmployee() {
  inquirer.prompt([
    {
      name: "first_name",
      message: "What's the employee's first name?",
      type: "input"
    },
    {
      name: "last_name",
      message: "What's the employee's last name?",
      type: "input"
    },
    {
      name: "role_id",
      message: "What's the employee's role ID?",
      type: "input"
    },
    {
      name: "manager_id",
      message: "What's the employee's manager ID?",
      type: "input"
    }
  ]).then(empAns => {
    db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("${empAns.first_name}", "${empAns.last_name}", ${empAns.role_id}, ${empAns.manager_id});`, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.table(res);
        chooseRole();
      }
    });
  });
}

function updateEmployeeRole() {
  inquirer.prompt([
    {
      name: "role_name_update",
      message: "What's the ID of the employee you'd like to update?",
      type: "input"
    },
    {
      name: "role_name_update2",
      message: "What's the ID of the role you'd like to update?",
      type: "input"
    }
  ]).then(updateEmpAns => {
    db.query(`UPDATE employee SET role_id = ${updateEmpAns.role_name_update2} WHERE id = ${updateEmpAns.role_name_update}`, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.table(res);
        chooseRole();
      }
    });
  });
}

chooseRole();
