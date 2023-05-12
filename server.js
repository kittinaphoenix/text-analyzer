const express = require('express');
const indexRoutes = require('./routes/index');

const app = express();

// Set up middleware, routes, etc.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'ejs');
app.use('/', indexRoutes);
app.use(express.static('public'));

// middleware to handle invalid GET requests
app.use((req, res, next) => {
  if (req.method === 'GET') {
    // render the index.ejs template for GET requests
    res.status(404).render('index.ejs');
  } else {
    // pass the request to the next middleware
    next();
  }
});

// Start the server
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Server listening at:', port);
});