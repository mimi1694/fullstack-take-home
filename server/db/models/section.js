const { DataTypes } = require('sequelize');
const db = require('../db');

const Section = db.define('section', {
  nickname: {
    type: DataTypes.STRING
  },
  dateStart: {
    type: DataTypes.DATE
  }
});

module.exports = Section;
