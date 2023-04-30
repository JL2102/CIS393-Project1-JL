// Import required libraries and models
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Create express app
const app = express();

// Set up body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up mongoose connection
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to database!'))
  .catch((error) => console.error(error));

// Create mongoose schemas for each form
const reservations = new mongoose.Schema({
  name1: { type: String, required: true },
  email1: { type: String, required: true },
  phone1: { type: Number, required: true },
  reservationTime: { type: String, required: true },
  guests: { type: String, required: true },
});

const orders = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  address: { type: String, required: true },
  deliveryTime: { type: String, required: true },
  orderDetails: { type: String, required: true },
});

const contacts = new mongoose.Schema({
    name2: { type: String, required: true },
    email2: { type: String, required: true },
    message: { type: String, required: true },
});

// Create mongoose models for each form
const Reservation = mongoose.model('reservation', reservations);
const Orders = mongoose.model('order', orders);
const Contact = mongoose.model('contact', contacts);

// Create routes for each form
app.post('/reservation', async (req, res) => {
  const form1 = new Reservation({
    name1: req.body.name1,
    email1: req.body.email1,
    phone1: req.body.phone1,
    reservationTime: req.body.reservationTime,
    guests: parseInt(req.body.guests)
  });
  try {
    await form1.save();
    console.log("Reservation Submitted");
    res.sendFile(__dirname + '/Index.html');
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.post('/order', async (req, res) => {
  const form2 = new Orders({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    deliveryTime: req.body.deliveryTime,
    orderDetails: req.body.orderDetails
  });
  try {
    await form2.save();
    console.log("Order Placed");
    res.sendFile(__dirname + '/Index.html');
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.post('/contact', async (req, res) => {
  const form3 = new Contact({
    name2: req.body.name2,
    email2: req.body.email2,
    message: req.body.message
  });
  try {
    await form3.save();
    console.log("Contact Submitted");
    res.sendFile(__dirname + '/Index.html');
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(__dirname+'/Index.html');
})

app.get('/reservation', async(req, res) => {
  res.sendFile(__dirname + '/Index.html');
});

app.get('/order', async (req, res) => {
  res.sendFile(__dirname + '/Index.html');
});

app.get('/contact', async(req, res) => {
  res.sendFile(__dirname + '/Index.html');
});

// Start server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
