const User = require('./user');
const Course = require('./course');
const Section = require('./section');
const Session = require('./session');

User.belongsToMany(Section, { through: 'SignUps', constraints: false});
Section.belongsToMany(User, { through: 'SignUps', constraints: false });

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
