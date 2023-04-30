const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Configure body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ENTER PASSWORD',
  database: 'ENTER DATABASE NAME',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to database!');
});

// Define endpoints
app.get('/', function(req, res){
    res.sendFile(__dirname+'/Index.html');
});

app.get('/products', (req, res) => {
    db.query('SELECT * FROM products', function(err, results) {
        if (err) throw err;
        res.render('products', { products: results });
      });
});

app.get('/products/:id', (req, res) => {
    const productId = req.params.id;

    // Query the database to retrieve the product with the specified ID
    db.query('SELECT * FROM products WHERE id = ?', [productId], (error, results) => {
      if (error) throw error;
  
      // If no product is found with the specified ID, render a 404 error page
      if (results.length === 0) {
        res.status(404).render('404', {
          title: 'Product not found'
        });
        return;
      }
  
      // If a product is found, render the product detail page with the product data
      const product = results[0];
      res.render('product', {
        title: product.name,
        product: product
      });
    });
});

app.post('/cart', (req, res) => {
    const productId = req.body.productId;
    const userId = req.session.userId; // Assumes user is logged in and has a userId in session
  
    // Retrieve user's cart from database
    const userCart = getUserCartFromDatabase(userId);
  
    // Add product to user's cart in database
    addToCartInDatabase(productId, userCart);
  
    res.redirect('/cart');
});

app.get('/cart', (req, res) => {
  // Retrieve cart data from the database
  const cartData = retrieveCartDataFromDatabase();

  // Render the cart page with the retrieved cart data
  res.render('cart', { cartData });
});

app.delete('/cart/:id', (req, res) => {
    const productId = req.params.id;

    // Remove product with specified id from cart in database
    db.query('DELETE FROM cart WHERE id = ?', [productId], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error deleting product from cart");
      } else {
        res.send("Product removed from cart");
      }
    });
});

// Start server
app.listen(port, () => {
console.log(`Server running on port ${port}`);
});
