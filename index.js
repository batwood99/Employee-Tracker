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