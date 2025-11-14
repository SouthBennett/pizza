// Import the express module
import express from "express";

// Import the mysql12 module
import mysql2 from 'mysql2';

import dotenv from 'dotenv';

// Load environment variables from .env file
// This must be called before accessing process.env
dotenv.config();

// Create an instance of an Express application
const app = express();

// Create a CONNECTION POOL to the database
// Now using environment variables from the .env file
// process.env.VARIABLE_NAME accesses variables from .env
const pool = mysql2.createPool({
  //These values come from the .env file
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
}).promise();

// Set ejs as our view engine
app.set('view engine', 'ejs');

// Enable static file serving
app.use(express.static("public"));

//Allow the app to parse form data
app.use(express.urlencoded({ extended: true }));

//Create an array to store orders
const orders = [];

//Define the port number where our serve will listen
const PORT = 3000;

// Database test - http://localhost:3000/db-test to test this route
app.get('/db-test', async(req, res) => {
  try {
    const [orders] = await pool.query('SELECT * FROM orders');

    // Send the orders data back to the browser as JSON
    res.send(orders);

  } catch(err) {
    // if Any error hapened in the 'try' block, this code runs
    // log the error to the server console (for developers to see)
    console.error('Database error:', err);

    // Send an error response to the browser
    // status(500) means "Internal Server Error"
    res.status(500).send('Database error: ' + err.message);
  }
});

//Define a default "route" ('/')
//req: contains information about the incoming request
//res: allows us to send back a response to the client
app.get('/', (req, res) => {
  //Send " Hello, world!" as a response to the client
  //res.send('<h1>Welcome to Poppa\'s Pizza!');
  // res.sendFile(`${import.meta.dirname}/views/home.html`);
  res.render('home');
});

//Define a contact-us route
app.get("/contact-us", (req, res) => {
  // res.sendFile(`${import.meta.dirname}/views/contact.html`);
  res.render('contact');
});

//define confirmation route
app.get("/confirm", (req, res) => {
  // res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
  res.render('confirmation');
});

//define an admin route
app.get("/admin", (req, res) => {
  //res.send(orders);
  //res.sendFile(`${import.meta.dirname}/views/admin.html`);
  res.render('admin' , { orders });
});

//define a "submit-order" form
app.post("/submit-order", (req, res) => {
  

  //console.log(req.body);

  //Create a json
  const order = {
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    method: req.body.method,
    toppings: req.body.toppings,
    size: req.body.size,
    comment: req.body.comment,
    timestamp: new Date()
  };

  res.render('confirmation', { order });

  


  //Add order to array
  orders.push(order);
  console.log(order);
});


//Start the server and make it listen on the port
//specified above
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
