const User = require('./user');
const Course = require('./course');
const Section = require('./section');
const Session = require('./session');

User.hasMany(Section);
Section.belongsToMany(User, { through: 'SignUps' });

Course.hasMany(Section);
Section.belongsTo(Course);

Course.hasMany(Session);
Session.belongsTo(Course);

module.exports = {
  User,
  Course,
  Session,
  Section
}
