// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
const express = require("express");
const bodyParser = require('body-parser');
const routes = require("./routes/api-routes.js");
// Requiring our models for syncing
const db = require("./models");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
// app.use(express.static("public"));

// Routes
// =============================================================

app.use(bodyParser.json());

app.use('/api', routes);

const burritoData = [
  { name: 'Chicken Burrito', size: 'Regular', price: 7.99 },
  { name: 'Vegetarian Burrito', size: 'Large', price: 8.99 },
  // Add more burritos as needed
];

// Sync models with the database
db.sequelize.sync({ force: true })
  .then(() => {
    // Populate Burrito table with dummy data
    return db.Burrito.bulkCreate(burritoData);
  })
  .then(() => {
    console.log('Database synchronized and populated with dummy data.');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});