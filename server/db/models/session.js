const { DataTypes } = require('sequelize');
const db = require('../db');

const Session = db.define('session', {
  name: {
    type: DataTypes.STRING
  },
  sessionNumber: {
    type: DataTypes.INTEGER
  },
  description: {
    type: DataTypes.STRING
  },
  released: {
    type: DataTypes.BOOLEAN
  }
});

module.exports = Session;
