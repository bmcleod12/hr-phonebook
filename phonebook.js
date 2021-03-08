const mysql = require('mysql');
const inquirer = require('inquirer');

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
        'View All Employees by Department', 
        'View All Employees by Manager',
        'Add Employee', 
        'Remove Employee', 
        'Update Employee Role', 
        'Update Employee Manager', 
        'Exit'],
    })
    .then((answer) => {
      console.log(answer.intro);
      switch (answer.intro) {
        case 'View All Employees by Department':
          employeebyDept();
          break;

        case 'View All Employees by Manager':
          employeebyMgr();
          break;

        case 'Add Employee':
          addEmployee();
          break;

        case 'Remove Employee':
          removeEmployee();
          break;

        case 'Update Employee Role':
          updateRole();
          break;

        case 'Update Employee Manager':
          updateMgr();
          break;

        case 'Exit':
          connection.end();
          break;
          
        default:
          console.log(`Invalid action: ${answer.intro}`);
          break;
      }
      });
    };

      // collects output of Department | Employee | Employee Role |
      function employeebyDept() {
        const query = "SELECT department.department AS 'Department', CONCAT(e.first_name, ' ', e.last_name) AS 'Employee', role.title as 'Employee Role' FROM employee e LEFT JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id ";
        connection.query(query, (err, res) => {
            console.table(res);
        });
        actionList();
      };

      // collects output of Manager | Employee | Employee Role
      function employeebyMgr() {
        const query = "SELECT CONCAT(m.first_name, ' ' ,  m.last_name) AS 'Manager', CONCAT(e.first_name, ' ', e.last_name) AS 'Employee', role.title as 'Employee Role' FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id WHERE m.first_name IS NOT NULL"
        connection.query(query, (err, res) => {
          console.table(res);
      });
        actionList();
      };

      // adds a new employee to the db after collecting their information
      function addEmployee() {
        const query = 'SELECT title, salary, department_id FROM employees.role';

          // .prompt({
        //     name: 'employee-first',
        //     type: 'input',
        //     message: "What is the employee's first name?",
        // },
        // {
        //     name: 'employee-last',
        //     type: 'input',
        //     message: "What is the employee's last name?",
        // },
        // {
        //     name: 'employee-position',
        //     type: 'list',
        //     message: "What is the employee's position?",
        //     choices: ['tbd - need to show the list of positions'],
        // },
        // {
        //     name: 'employee-manager',
        //     type: 'list',
        //     message: "Who is the employee's manager?",
        //     choices: ['tbd - need to show the list of employees'],
        // })


        connection.query(query, (err, res) => {
          console.table(res);
      });
        actionList();
      };

      // removes employee of choice from the db
      function removeEmployee() {
        // collects the first and last names and concatenates them into "Employee" which is then pushed to an arry for user selection
        connection.query("SELECT CONCAT(first_name, ' ', last_name) AS 'Employee' FROM employees.employee WHERE manager_id IS NOT NULL", (err, res) => {
          if (err) throw err;
            inquirer
            .prompt({
              name: 'remove-employee',
              type: 'list',
              message: 'Which employee would you like to remove?',
              choices() {
                const choiceArray = [];
                res.forEach(({Employee}) => {
                  choiceArray.push(Employee);
                });
                return choiceArray;
              },
          })
          .then((answer) => {
            console.log(answer['remove-employee']);
            connection.query(`DELETE FROM employees.employee WHERE CONCAT(first_name, ' ', last_name) = '${answer['remove-employee']}'`,
            (err, res) => {
              if (err) throw err;
              console.log("Employee deleted!");
              actionList();
            });
          });  
        });
      };

      // changes out an employee's manager
      function updateMgr() {
        const query = 'SELECT title, salary, department_id FROM employees.role';
        connection.query(query, (err, res) => {
          console.table(res);
      });
        actionList();
      };


  // connect to the mysql server and sql database
  connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    // run the start function after the connection is made to prompt the user
    actionList();
  });
  

// //======= McLeod: refer to the icecreamCRUD activity to show how to crud in the db //the Great Bay activity to show inquirer stuff 

// // ======= McLeod: palceholder building blocks...

// // after they select to add an employee
// // const employees = () => {
// //     // query the database for all items being auctioned
// //     connection.query('SELECT * FROM employee', (err, results) => {
// //       if (err) throw err;
// //       inquirer
// //         .prompt([
// //           {
// //             name: 'manager',
// //             type: 'rawlist',
// //             choices() {
// //                 // this array holds just the name of the employee that gets pushed up here by that foreach down yonder
// //               const employeeName = [];
// //               /*
// //               [
// //                 {
// //                     id: 4567,
// //                     first_name: 'Brenna',
// //                     last_name: 'McLeod',
// //                     position_id: 3456,
// //                 not sure how null is represented here
// //                     manager_id: ,
// //                 },
// //                 ...
// //                 ]
// //               */
// //             //  need to concat first/last?
// //              results.forEach((employee) => {
// //                 employeeName.push(employee.first_name);
// //             });
// //               return employeeName;
// //             },
// //             message: "Who is the employee's manaager?",
// //           },
// //           {
// //             name: 'bid',
// //             type: 'input',
// //             message: 'How much would you like to bid?',
// //           },
// //         ])
// //         .then((answer) => {
// //           // get the information of the chosen item
// //           let chosenItem;
// //           results.forEach((item) => {
// //             if (item.item_name === answer.choice) {
// //               chosenItem = item;
// //             }
// //           });
  
// //           // determine if bid was high enough
// //           if (chosenItem.highest_bid < parseInt(answer.bid)) {
// //             // bid was high enough, so update db, let the user know, and start over
// //             //  UPDATE auctions SET highest_bid = 10 WHERE id = 1
// //             connection.query(
// //               'UPDATE auctions SET ? WHERE ?',
// //               [
// //                 {
// //                   highest_bid: answer.bid,
// //                 },
// //                 {
// //                   id: chosenItem.id,
// //                 },
// //               ],
// //               (error) => {
// //                 if (error) throw err;
// //                 console.log('Bid placed successfully!');
// //                 start();
// //               }
// //             );
// //           } else {
// //             // bid wasn't high enough, so apologize and start over
// //             console.log('Your bid was too low. Try again...');
// //             start();
// //           }
// //         });
// //     });
// //   };


// // console.log(
// //     `${first_name} ${last_name}`
// // )
