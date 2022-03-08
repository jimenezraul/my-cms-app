const inquirer = require("inquirer");
const cTable = require("console.table");

class CMS {
  constructor() {}

  getMenu() {
    return inquirer
      .prompt([
        {
          type: "list",
          name: "menu",
          message: "What would you like to do?",
          choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "View All Employees by Department",
            "View All Employees by Manager",
            "Add Employee",
            "Add Department",
            "Add Role",
            "Update Employee Role",
            "Update Employee Manager",
            "Remove Employee",
            "Remove Department",
            "Remove Role",
            "Exit",
          ],
        },
      ])
      .then((answer) => {
        switch (answer.menu) {
          case "View All Employees":
            this.viewAllEmployees();
            break;
          case "View All Roles":
            this.viewAllRoles();
            break;
          case "View All Departments":
            this.viewAllDepartments();
            break;
          case "View All Employees by Department":
            this.viewAllEmployeesByDepartment();
            break;
          case "View All Employees by Manager":
            this.viewAllEmployeesByManager();
            break;
          case "Add Employee":
            this.addEmployee();
            break;
          case "Add Department":
            this.addDepartment();
            break;
          case "Add Role":
            this.addRole();
            break;
          case "Update Employee Role":
            this.updateEmployeeRole();
            break;
          case "Update Employee Manager":
            this.updateEmployeeManager();
            break;
          case "Remove Employee":
            this.removeEmployee();
            break;
          case "Remove Department":
            this.removeDepartment();
            break;
          case "Remove Role":
            this.removeRole();
            break;
          case "Exit":
            this.exit();
            break;
        }
      });
  }

  viewAllDepartments() {
    this.allDepartments.then((departments) => {
      const table = cTable.getTable(departments);
      console.log(table);
      this.getMenu();
    });
  }

  viewAllEmployees() {
    getAllEmployees().then((employees) => {
      const table = cTable.getTable(employees);
      console.log(table);
      this.getMenu();
    });
  }

  viewAllRoles() {
    getAllRoles().then((roles) => {
      const table = cTable.getTable(roles);
      console.log(table);
      this.getMenu();
    });
  }

  viewAllEmployeesByManager() {
    getEmployeesByManager().then((employees) => {
      const table = cTable.getTable(employees);
      console.log(table);
      this.getMenu();
    });
  }

  viewAllEmployeesByDepartment() {
    getEmployeesByDepartment().then((employees) => {
      const table = cTable.getTable(employees);
      console.log(table);
      this.getMenu();
    });
  }

  addDepartment() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "What is the department name?",
        },
      ])
      .then((answer) => {
        console.log(answer);
        this.getMenu();
      });
  }

  addRole() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the name of the role?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary for this role?",
        },
        {
          type: "list",
          name: "department_id",
          message: "Which department does the role belong to?",
          choices: ["1", "2", "3", "4"],
        },
      ])
      .then((answer) => {
        console.log(answer);
        this.getMenu();
      });
  }

  addEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "What is the employee's first name?",
        },
        {
          type: "input",
          name: "last_name",
          message: "What is the employee's last name?",
        },
        {
          type: "list",
          name: "role_id",
          message: "What is the employee's role?",
          choices: [
            { name: "Software Engineer", value: 1 },
            { name: "Lead Engineer", value: 2 },
            { name: "Accountant", value: 3 },
            { name: "Salesperson", value: 4 },
          ],
        },
        {
          type: "list",
          name: "manager_id",
          message: "Who is the employee's manager?",
          choices: [
            { name: "None", value: null },
            { name: "John Smith", value: 1 },
            { name: "Jane Doe", value: 2 },
          ],
        },
      ])
      .then((answer) => {
        console.log(answer);
        this.getMenu();
      });
  }

  updateEmployeeRole() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "employee_id",
          message: "What is the employee's id?",
        },
        {
          type: "list",
          name: "role_id",
          message: "What is the employee's role?",
          choices: [
            { name: "Software Engineer", value: 1 },
            { name: "Lead Engineer", value: 2 },
            { name: "Accountant", value: 3 },
            { name: "Salesperson", value: 4 },
          ],
        },
      ])
      .then((answer) => {
        console.log(answer);
        this.getMenu();
      });
  }

  updateEmployeeManager() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "employee_id",
          message: "What is the employee's id?",
        },
        {
          type: "list",
          name: "manager_id",
          message: "Who is the employee's manager?",
          choices: [
            { name: "None", value: null },
            { name: "John Smith", value: 1 },
            { name: "Jane Doe", value: 2 },
          ],
        },
      ])
      .then((answer) => {
        console.log(answer);
        this.getMenu();
      });
  }

  removeEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "employee_id",
          message: "What is the employee's id?",
        },
      ])
      .then((answer) => {
        console.log(answer);
        this.getMenu();
      });
  }

  removeDepartment() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "department_id",
          message: "What is the department's id?",
        },
      ])
      .then((answer) => {
        console.log(answer);
        this.getMenu();
      });
  }

  removeRole() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "role_id",
          message: "What is the role's id?",
        },
      ])
      .then((answer) => {
        console.log(answer);
        this.getMenu();
      });
  }

  exit() {
    console.log("Goodbye!");
    process.exit();
  }
}

module.exports = CMS;