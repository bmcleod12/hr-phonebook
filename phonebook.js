const mysql = require('mysql');
const inquirer = require('inquirer');
// const consoleTable = require('console.table');

// establishes connection to db
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Tiny!Boots1',
  database: 'employees',
});

// prompts the user for which action to take
const actionList = () => {
  inquirer
    .prompt({
      name: 'intro',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'View All Employees by Department',
        'View All Employees by Manager',
        'Add Department',
        'Add Role',
        'Add Employee',
        'Update Employee Role',
        'Remove Employee',
        'Exit'],
    })
    .then((answer) => {
      console.log(answer.intro);
      switch (answer.intro) {
        case 'View All Departments':
          allDepts();
          break;

        case 'View All Roles':
          allRoles();
          break;

        case 'View All Employees':
          allEmployees();
          break;

        case 'View All Employees by Department':
          employeebyDept();
          break;

        case 'View All Employees by Manager':
          employeebyMgr();
          break;

        case 'Add Department':
          addDept();
          break;

        case 'Add Role':
          addRole();
          break;

        case 'Add Employee':
          addEmployee();
          break;

        case 'Update Employee Role':
          updateRole();
          break;

        case 'Remove Employee':
          removeEmployee();
          break;

        case 'Exit':
          console.log("Until next time!");  
          connection.end();
          break;

        default:
          console.log(`Invalid action: ${answer.intro}`);
          break;
      }
    });
};

// collects output of Department ID | Department Name
function allDepts() {
  const query = "SELECT id AS 'Department ID', department AS 'Department Name' FROM employees.department";
  connection.query(query, (err, res) => {
    console.log("--------------------------------------------");
    console.table(res);
  });
  actionList();
};

// collects output of Department ID | Department Name
function allRoles() {
  const query = "SELECT id AS 'Role ID', title AS 'Role Name', salary AS 'Salary' FROM employees.role";
  connection.query(query, (err, res) => {
    console.log("--------------------------------------------");
    console.table(res);
  });
  actionList();
};

// collects output of First Name | Last Name | Role | Department | Salary | Manager
function allEmployees() {
  const query = "SELECT e.id AS 'ID', e.first_name AS 'First Name', e.last_name AS 'Last Name', role.title as 'Role', department.department AS 'Department', role.salary AS 'Salary', concat(m.first_name, ' ' ,  m.last_name) AS 'Manager' FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id";
  connection.query(query, (err, res) => {
    console.log("--------------------------------------------");
    console.table(res);
  });
  actionList();
};

// collects output of Department | Employee | Employee Role |
function employeebyDept() {
  const query = "SELECT department.department AS 'Department', CONCAT(e.first_name, ' ', e.last_name) AS 'Employee', role.title as 'Employee Role' FROM employee e LEFT JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id ";
  connection.query(query, (err, res) => {
    console.log("--------------------------------------------");
    console.table(res);
  });
  actionList();
};

// collects output of Manager | Employee | Employee Role
function employeebyMgr() {
  const query = "SELECT CONCAT(m.first_name, ' ' ,  m.last_name) AS 'Manager', CONCAT(e.first_name, ' ', e.last_name) AS 'Employee', role.title as 'Employee Role' FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id WHERE m.first_name IS NOT NULL";
  connection.query(query, (err, res) => {
    console.log("--------------------------------------------");
    console.table(res);
  });
  actionList();
};

// adds a new department to the db after collecting its name
function addDept() {
  inquirer
    .prompt([
      {
        name: 'dept_name',
        type: 'input',
        message: "What is the department's name?",
      }
      ])
    .then((answer) => {
      connection.query(`INSERT INTO department (department) VALUES ("${answer['dept_name']}")`,
        (err, res) => {
          if (err) throw err;
          console.log("Department added!");
          actionList();
        });
    });
}

// adds a new role to the db after collecting its information
function addRole() {
  inquirer
    .prompt([
      {
        name: 'role_title',
        type: 'input',
        message: "What is the name of the role?",
      },
      {
        name: 'role_salary',
        type: 'input',
        message: "What is the salary for this role?",
      },
      {
        name: 'role_dept',
        type: 'input',
        message: "Enter the ID for the Department this role belongs to.",
      }])
    .then((answer) => {
      connection.query(`INSERT INTO role (title, salary, department_id) VALUES ("${answer['role_title']}", ${answer['role_salary']}, ${answer['role_dept']})`,
        (err, res) => {
          if (err) throw err;
          console.log("Role added!");
          actionList();
        });
    });
}

// adds a new employee to the db after collecting their information
function addEmployee() {
  inquirer
    .prompt([
      {
        name: 'employee_first',
        type: 'input',
        message: "What is the employee's first name?",
      },
      {
        name: 'employee_last',
        type: 'input',
        message: "What is the employee's last name?",
      },
      {
        name: 'employee_role',
        type: 'input',
        message: "Enter the employee's role ID.",
      },

      {
        name: 'employee_manager',
        type: 'input',
        message: "Enter the employee's manager's ID.",
      }])
    .then((answer) => {
      connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answer['employee_first']}", "${answer['employee_last']}", ${answer['employee_role']}, ${answer['employee_manager']})`,
        (err, res) => {
          if (err) throw err;
          console.log("Employee added!");
          actionList();
        });
    });
}

// changes out an employee's manager
function updateRole() {
    inquirer
      .prompt([{
        name: 'emp_role',
        type: 'input',
        message: "Enter the ID of the employee whose role you want to update.",
      },
      {
        name: 'new_role',
        type: 'input',
        message: "Enter the new Role ID.",
      }])
      .then((answer) => {
        connection.query("UPDATE employees.employee SET ? WHERE ?",
        [
          {
            role_id: answer.new_role
          },
          {
            id: answer.emp_role
          },
        ],
          (err, res) => {
            if (err) throw err;
            console.log("Employee deleted!");
            actionList();
          });
      });
};

// removes employee of choice from the db
function removeEmployee() {
  // collects the first and last names and concatenates them into "Employee" which is then pushed to an arry for user selection
  connection.query("SELECT CONCAT(first_name, ' ', last_name) AS 'Employee' FROM employees.employee WHERE manager_id IS NOT NULL", (err, res) => {
    console.log(res);
    if (err) throw err;
    inquirer
      .prompt({
        name: 'remove-employee',
        type: 'list',
        message: 'Which employee would you like to remove?',
        choices() {
          const choiceArray = [];
          res.forEach(({ Employee }) => {
            choiceArray.push(Employee);
          });
          return choiceArray;
        },
      })
      .then((answer) => {
        connection.query(`DELETE FROM employees.employee WHERE CONCAT(first_name, ' ', last_name) = '${answer['remove-employee']}'`,
          (err, res) => {
            if (err) throw err;
            console.log("Employee deleted!");
            actionList();
          });
      });
  });
};

// connect to the mysql server and sql database
connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  // run the start function after the connection is made to prompt the user
  actionList();
});