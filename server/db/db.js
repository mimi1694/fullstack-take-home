const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/course-db', {
    logging: false
  }
);

module.exports = db;
