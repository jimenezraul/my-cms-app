const db = require("../db/connection.js");

function getAllDepartments() {
  return new Promise(function (resolve, reject) {
    const sql = "SELECT departments.id AS ID, departments.name AS Department FROM departments";

    db.query(sql, function (err, rows) {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
}

function addNewDepartment(data) {
  return new Promise(function (resolve, reject) {
    const sql = "INSERT INTO departments (name) VALUES (?)";

    db.query(sql, [data.name], function (err, rows) {
      if (err) {
        return reject(err);
      }
      resolve(`Added ${data.name} to the database.`);
    });
  });
}

function removeDepartment(data) {
  return new Promise(function (resolve, reject) {
    const sql = "DELETE FROM departments WHERE id = ?";

    db.query(sql, [data.value], function (err, rows) {
      if (err) {
        return reject(err);
      }
      resolve(`${data.name} was removed from the database.`);
    });
  });
}

function getTotalBudget(data) {
  return new Promise(function (resolve, reject) {
    const sql = `SELECT departments.id AS ID, departments.name AS Department, SUM(roles.salary) AS "Total Budget"
    FROM departments
    LEFT JOIN roles ON departments.id = roles.department_id
    LEFT JOIN employees ON employees.role_id = roles.id
    WHERE departments.id = ?`;

    db.query(sql, [data.department_id], function (err, rows) {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
}

module.exports = {
  getAllDepartments,
  addNewDepartment,
  removeDepartment,
  getTotalBudget,
};
