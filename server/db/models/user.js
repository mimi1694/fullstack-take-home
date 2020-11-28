const { DataTypes } = require('sequelize');
const db = require('../db');

const User = db.define('user', {
  name: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  }
});

module.exports = User;
