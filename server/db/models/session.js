const { DataTypes } = require('sequelize');
const db = require('../db');

const Session = db.define('session', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sessionNumber: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  },
  content: {
    type: DataTypes.TEXT
  }
});

module.exports = Session;
