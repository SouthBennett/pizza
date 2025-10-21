// Import the express module
import express from "express";

//Create an instance of an Express application
const app = express();

// Enable static file serving
app.use(express.static("public"));

//Allow the app to parse form data
app.use(express.urlencoded({ extended: true }));

//Create an array to store orders
const orders = [];

//Define the port number where our serve will listen
const PORT = 3000;

//Define a default "route" ('/')
//req: contains information about the incoming request
//res: allows us to send back a response to the client
app.get("/", (req, res) => {
  //Send " Hello, world!" as a response to the client
  //res.send('<h1>Welcome to Poppa\'s Pizza!');
  res.sendFile(`${import.meta.dirname}/views/home.html`);
});

//Define a contact-us route
app.get("/contact-us", (req, res) => {
  res.sendFile(`${import.meta.dirname}/views/contact.html`);
});

//define confirmation route
app.get("/confirm", (req, res) => {
  res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
});

//define an admin route
app.get("/adminpage", (req, res) => {
  res.send(orders);
  //res.sendFile(`${import.meta.dirname}/views/admin.html`);
});

//define a "submit-order" form
app.post("/submit-order", (req, res) => {
  res.sendFile(`${import.meta.dirname}/views/confirmation.html`);

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
  };

  //Add order to array
  orders.push(order);
  console.log(order);
});

//Start the server and make it listen on the port
//specified above
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
