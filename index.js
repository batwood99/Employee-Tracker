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