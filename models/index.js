'use strict';

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const { Sequelize, DataTypes } = require('sequelize');

const db = {};

// Sequelize initialization
const sequelize = new Sequelize('mydatabase', 'myuser', 'mypassword', {
    host: 'postgres-db', // Container name of the PostgreSQL service
    dialect: 'postgres',
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
