const { DataTypes } = require('sequelize');
const db = require('../db');

const Section = db.define('section', {
  nickname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dateStart: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

module.exports = Section;
