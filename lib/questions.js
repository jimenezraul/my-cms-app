const inquirer = require("inquirer");
const {
  getAllDepartments,
  addNewDepartment,
  removeDepartment,
} = require("./departments");
const { getAllRoles, addNewRole, removeARole } = require("./roles");
const {
  getAllEmployees,
  addNewEmployee,
  deleteEmployee,
  updateEmployeesRole,
  getEmployeesByDepartment,
  getEmployeesByManager,
  getAllManagers,
} = require("./employees");
const cTable = require("console.table");

class CMS {
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
            "Add Department",
            "Add Role",
            "Add Employee",
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
          case "View All Departments":
            this.viewAllDepartments();
            break;
          case "View All Roles":
            this.viewAllRoles();
            break;
          case "View All Employees":
            this.viewAllEmployees();
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
            this.quit();
            break;
        }
      });
  }

  viewAllDepartments() {
    getAllDepartments().then((departments) => {
      const table = cTable.getTable(departments);
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
        addNewDepartment(answer).then((role) => {
          console.log(role);
          this.getMenu();
        });
      });
  }

  removeDepartment() {
    getAllDepartments().then((departments) => {
      const departmentChoices = departments.map((department) => {
        return {
          name: department.name,
          value: department.id,
        };
      });
      inquirer
        .prompt([
          {
            type: "list",
            name: "id",
            message: "Which department would you like to remove?",
            choices: departmentChoices,
          },
        ])
        .then((answer) => {
          const data = departmentChoices.filter(
            (department) => department.value === answer.id
          )[0];
          removeDepartment(data).then((department) => {
            console.log(department);
            this.getMenu();
          });
        });
    });
  }

  viewAllRoles() {
    getAllRoles().then((roles) => {
      const table = cTable.getTable(roles);
      console.log(table);
      this.getMenu();
    });
  }

  addRole() {
    getAllDepartments().then((departments) => {
      const departmentChoices = departments.map((department) => {
        return {
          name: department.name,
          value: department.id,
        };
      });
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
            choices: departmentChoices,
          },
        ])
        .then((answer) => {
          addNewRole(answer).then((role) => {
            console.log(role);
            this.getMenu();
          });
        });
    });
  }

  removeRole() {
    getAllRoles().then((roles) => {
      const roleChoices = roles.map((role) => {
        return {
          name: role.title,
          value: role.id,
        };
      });
      inquirer
        .prompt([
          {
            type: "list",
            name: "id",
            message: "Which role would you like to remove?",
            choices: roleChoices,
          },
        ])
        .then((answer) => {
          const data = roleChoices.filter(
            (role) => role.value === answer.id
          )[0];
          removeARole(data).then((role) => {
            console.log(role);
            this.getMenu();
          });
        });
    });
  }

  viewAllEmployees() {
    getAllEmployees().then((employees) => {
      const table = cTable.getTable(employees);
      console.log(table);
      this.getMenu();
    });
  }

  addEmployee() {
    Promise.all([getAllRoles(), getAllEmployees()]).then(
      ([roles, employees]) => {
        const roleChoices = roles.map((role) => {
          return {
            name: role.title,
            value: role.id,
          };
        });
        const managerChoices = employees.map((employee) => {
          return {
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
          };
        });
        managerChoices.unshift({ name: "None", value: null });
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
              choices: roleChoices,
            },
            {
              type: "list",
              name: "manager_id",
              message: "Who is the employee's manager?",
              choices: managerChoices,
            },
          ])
          .then((answer) => {
            addNewEmployee(answer).then((employee) => {
              console.log(employee);
              this.getMenu();
            });
          });
      }
    );
  }

  removeEmployee() {
    getAllEmployees().then((employees) => {
      const employeeChoices = employees.map((employee) => {
        return {
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        };
      });
      inquirer
        .prompt([
          {
            type: "list",
            name: "id",
            message: "Which employee would you like to remove?",
            choices: employeeChoices,
          },
        ])
        .then((answer) => {
          const data = employeeChoices.filter(
            (employee) => employee.value === answer.id
          )[0];
          deleteEmployee(data).then((employee) => {
            console.log(employee);
            this.getMenu();
          });
        });
    });
  }

  updateEmployeeRole() {
    Promise.all([getAllRoles(), getAllEmployees()]).then(
      ([roles, employees]) => {
        const roleChoices = roles.map((role) => {
          return {
            name: role.title,
            value: role.id,
          };
        });
        const employeeChoices = employees.map((employee) => {
          return {
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
          };
        });
        inquirer
          .prompt([
            {
              type: "list",
              name: "id",
              message: "Which employee would you like to update?",
              choices: employeeChoices,
            },
            {
              type: "list",
              name: "role_id",
              message: "What is the employee's new role?",
              choices: roleChoices,
            },
          ])
          .then((answer) => {
            const data = {
              employee: employeeChoices.filter(
                (employee) => employee.value === answer.id
              )[0],
              role: roleChoices.filter(
                (role) => role.value === answer.role_id
              )[0],
            };
            updateEmployeesRole(data).then((employee) => {
              console.log(employee);
              this.getMenu();
            });
          });
      }
    );
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

  viewAllEmployeesByManager() {
    getAllManagers().then((managers) => {
      const managerChoices = managers.map((manager) => {
        return {
          name: `${manager.first_name}`,
          value: manager.id,
        };
      });
      inquirer
        .prompt([
          {
            type: "list",
            name: "id",
            message: "Which manager would you like to view?",
            choices: managerChoices,
          },
        ])
        .then((answer) => {
          getEmployeesByManager(answer).then((employees) => {
            const table = cTable.getTable(employees);
            console.log(table);
            this.getMenu();
          });
        });
    });
  }

  viewAllEmployeesByDepartment() {
    getAllDepartments().then((departments) => {
      const departmentChoices = departments.map((department) => {
        return {
          name: department.name,
          value: department.id,
        };
      });
      inquirer
        .prompt([
          {
            type: "list",
            name: "department_id",
            message: "Which department would you like to view?",
            choices: departmentChoices,
          },
        ])
        .then((answer) => {
          const data = departmentChoices.filter(
            (department) => department.value === answer.department_id
          )[0];
          getEmployeesByDepartment(data).then((employees) => {
            const table = cTable.getTable(employees);
            console.log(table);
            this.getMenu();
          });
        });
    });
  }

  quit() {
    console.log("Goodbye!");
    process.exit();
  }
}

module.exports = CMS;
