# Employee Tracker
Employee Tracker is a command-line application that allows you to manage departments, roles, and employees in a company. With this application, you can perform various operations such as viewing departments, roles, and employees, adding new departments, roles, and employees, and updating an employee's role.

## Installation
To use the Employee Tracker application, follow these steps:

Clone the repository to your local machine or download the source code files.

Make sure you have Node.js installed on your machine.

Install the required dependencies by running the following command in the application's root directory:

npm install
Set up your MySQL database:

Make sure you have a MySQL server installed and running on your machine.
Create a new database named Employee_Tracker.
Use the provided schema.sql file to create the necessary tables and relationships.
Optionally, you can populate the tables with initial data using the seeds.sql file.
Configure the database connection:

Open the connection.js file in a text editor.
Modify the host, user, password, and database values to match your MySQL database configuration.

## Usage
To start using the Employee Tracker application, run the following command in the application's root directory:

node index.js
You will be presented with a list of options to choose from. Use the arrow keys to navigate and press Enter to select an option.

The available options are:

View all departments
View all roles
View all employees
Add a department
Add a role
Add an employee
Update an employee's role
Selecting an option will prompt you for any necessary information to perform the chosen operation. Follow the on-screen instructions and provide the required details.

After completing an operation, the application will return to the main menu, allowing you to choose another option or exit the application.

## License
This project is licensed under the MIT License. See the LICENSE file for details.