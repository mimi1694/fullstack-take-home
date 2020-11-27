const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/courses-db', {
    logging: false
  }
);

module.exports = db;
