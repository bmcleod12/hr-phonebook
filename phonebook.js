const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Tiny!Boots1',
  database: 'employees',
});

// function which prompts the user for what action they should take
const start = () => {
  inquirer
    .prompt({
      name: 'intro',
      type: 'list',
      message: 'What would you like to do?',
      choices: ['View All Employees by Department', 'View All Employees by Manager', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager'],
    })
    .then((answer) => {
      console.log(answer.intro);
      switch (answer.intro) {
        case 'View All Employees by Department':
          employeebyDept();
          break;

        // case 'View All Employees by Manager':
        //   employeebyMgr();
        //   break;

        // case 'Add Employee':
        //   addEmployee();
        //   break;

        // case 'Remove Employee':
        //   removeEmployee();
        //   break;

        // case 'Update Employee Role':
        //   updateRole();
        //   break;

        // case 'Update Employee Manager':
        //   updateMgr();
        //   break;
          
        default:
          console.log(`Invalid action: ${answer.intro}`);
          break;
      }
      });

    };

      function employeebyDept() {
        const query = 'SELECT title, salary, department_id FROM employees.role';
        connection.query(query, (err, res) => {
          res.forEach(({title, salary, department_id}) => {
            console.log(
              `Title: ${title} || Salary: ${salary} || Department: ${department_id}`
            ); 
          });
        });
        connection.end();
      };


  // connect to the mysql server and sql database
  connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    // run the start function after the connection is made to prompt the user
    start();
  });
  

// //======= McLeod: refer to the icecreamCRUD activity to show how to crud in the db //the Great Bay activity to show inquirer stuff 

// // ======= McLeod: palceholder building blocks...
// // .prompt({
// //     name: 'remove-employee',
// //     type: 'list',
// //     message: 'Which employee would you like to remove?',
// //     choices: ['tbd - need to show the list of employees'],
// // })

// // .prompt({
// //     name: 'employee-first',
// //     type: 'input',
// //     message: "What is the employee's first name?",
// // },
// // {
// //     name: 'employee-last',
// //     type: 'input',
// //     message: "What is the employee's last name?",
// // },
// // {
// //     name: 'employee-position',
// //     type: 'list',
// //     message: "What is the employee's position?",
// //     choices: ['tbd - need to show the list of positions'],
// // },
// // {
// //     name: 'employee-manager',
// //     type: 'list',
// //     message: "Who is the employee's manager?",
// //     choices: ['tbd - need to show the list of employees'],
// // })

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
