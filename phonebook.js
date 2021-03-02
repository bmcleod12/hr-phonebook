const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: '',
  database: 'phonebook_DB',
});


//======= McLeod: all of this stuff came from the icecreamCRUD activity to show how to crud in the db - gonna need to figure out how to swap out hard-coded storf w whatever the user selects:
const readProducts = () => {
  console.log('Selecting all products...\n');
  connection.query('SELECT * FROM products', (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    connection.end();
  });
};

const deleteProduct = () => {
  console.log('Deleting all strawberry icecream...\n');
  connection.query(
    'DELETE FROM products WHERE ?',
    {
      flavor: 'strawberry',
    },
    (err, res) => {
      if (err) throw err;
      console.log(`${res.affectedRows} products deleted!\n`);
      // Call readProducts AFTER the DELETE completes
      readProducts();
    }
  );
};

const updateProduct = () => {
  console.log('Updating all Rocky Road quantities...\n');
  const query = connection.query(
    'UPDATE products SET ? WHERE ?',
    [
      {
        quantity: 100,
      },
      {
        flavor: 'Rocky Road',
      },
    ],
    (err, res) => {
      if (err) throw err;
      console.log(`${res.affectedRows} products updated!\n`);
      // Call deleteProduct AFTER the UPDATE completes
      deleteProduct();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
};

const createProduct = () => {
  console.log('Inserting a new product...\n');
  const query = connection.query(
    'INSERT INTO products SET ?',
    {
      flavor: 'Rocky Road',
      price: 3.0,
      quantity: 50,
    },
    (err, res) => {
      if (err) throw err;
      console.log(`${res.affectedRows} product inserted!\n`);
      // Call updateProduct AFTER the INSERT completes
      updateProduct();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
};

// Connect to the DB
connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}\n`);
  createProduct();
});



// ======= McLeod: palceholder building blocks...
// .prompt({
//     name: 'intro',
//     type: 'list',
//     message: 'What would you like to do?',
//     choices: ['View All Employees by Department', 'View All Employees by Manager', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager'],
//   })

// .prompt({
//     name: 'remove-employee',
//     type: 'list',
//     message: 'Which employee would you like to remove?',
//     choices: ['tbd - need to show the list of employees'],
// })

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


//======= McLeod: all of this stuff came from the Great Bay activity to show inquirer stuff:

// function which prompts the user for what action they should take
const start = () => {
    inquirer
      .prompt({
        name: 'postOrBid',
        type: 'list',
        message: 'Would you like to [POST] an auction or [BID] on an auction?',
        choices: ['POST', 'BID', 'EXIT'],
      })
      .then((answer) => {
        // based on their answer, either call the bid or the post functions
        if (answer.postOrBid === 'POST') {
          postAuction();
        } else if (answer.postOrBid === 'BID') {
          bidAuction();
        } else {
          connection.end();
        }
      });
  };
  
  // function to handle posting new items up for auction
  const postAuction = () => {
    // prompt for info about the item being put up for auction
    inquirer
      .prompt([
        {
          name: 'item',
          type: 'input',
          message: 'What is the item you would like to submit?',
        },
        {
          name: 'category',
          type: 'input',
          message: 'What category would you like to place your auction in?',
        },
        {
          name: 'startingBid',
          type: 'input',
          message: 'What would you like your starting bid to be?',
          validate(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          },
        },
      ])
      .then((answer) => {
        // when finished prompting, insert a new item into the db with that info
        connection.query(
          'INSERT INTO auctions SET ?',
          // QUESTION: What does the || 0 do?
          {
            item_name: answer.item,
            category: answer.category,
            starting_bid: answer.startingBid || 0,
            highest_bid: answer.startingBid || 0,
          },
          (err) => {
            if (err) throw err;
            console.log('Your auction was created successfully!');
            // re-prompt the user for if they want to bid or post
            start();
          }
        );
      });
  };
  
  const bidAuction = () => {
    // query the database for all items being auctioned
    connection.query('SELECT * FROM auctions', (err, results) => {
      if (err) throw err;
      // once you have the items, prompt the user for which they'd like to bid on
      inquirer
        .prompt([
          {
            name: 'choice',
            type: 'rawlist',
            choices() {
              const choiceArray = [];
              /*
              [
                {
                  id: 1,
                  item_name: 'phone',
                  category: 'electronics',
                  starting_bid: 200,
                  highest_bid: 2
                },
                {
                  id: 2,
                  item_name: 'doll',
                  category: 'toys',
                  starting_bid: 5,
                  highest_bid: 3
                }
                ]
              */
             results.forEach((item) => {
              choiceArray.push(item.item_name);
            });
              // results.forEach(({ item_name }) => {
              //   choiceArray.push(item_name);
              // });
              return choiceArray;
            },
            message: 'What auction would you like to place a bid in?',
          },
          {
            name: 'bid',
            type: 'input',
            message: 'How much would you like to bid?',
          },
        ])
        .then((answer) => {
          // get the information of the chosen item
          let chosenItem;
          results.forEach((item) => {
            if (item.item_name === answer.choice) {
              chosenItem = item;
            }
          });
  
          // determine if bid was high enough
          if (chosenItem.highest_bid < parseInt(answer.bid)) {
            // bid was high enough, so update db, let the user know, and start over
            //  UPDATE auctions SET highest_bid = 10 WHERE id = 1
            connection.query(
              'UPDATE auctions SET ? WHERE ?',
              [
                {
                  highest_bid: answer.bid,
                },
                {
                  id: chosenItem.id,
                },
              ],
              (error) => {
                if (error) throw err;
                console.log('Bid placed successfully!');
                start();
              }
            );
          } else {
            // bid wasn't high enough, so apologize and start over
            console.log('Your bid was too low. Try again...');
            start();
          }
        });
    });
  };
  
  // connect to the mysql server and sql database
  connection.connect((err) => {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });
  