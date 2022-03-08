const db = require("../db/connection.js");

function getAllEmployees() {
  return new Promise((resolve, reject) => {
    const sql = `SELECT e.id, e.first_name, e.last_name,
        roles.title AS title,
        departments.name AS department,
        roles.salary AS salary,
        m.first_name AS manager FROM employees e
        LEFT JOIN employees m ON m.id = e.manager_id
        LEFT JOIN roles ON e.role_id = roles.id
        LEFT JOIN departments ON roles.department_id = departments.id`;

    db.query(sql, (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
}

function addNewEmployee(data) {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
        VALUES (?, ?, ?, ?)`;

    db.query(
      sql,
      [data.first_name, data.last_name, data.role_id, data.manager_id],
      (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(`Added ${data.first_name} ${data.last_name} to the database.`);
      }
    );
  });
}

module.exports = {
    getAllEmployees,
    addNewEmployee
};
