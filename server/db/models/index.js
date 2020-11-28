const User = require('./user');
const Course = require('./course');
const Section = require('./section');
const Session = require('./session');

User.hasMany(Section);
User.belongsToMany(Section, { through: 'SignUp' });

Course.hasMany(Section);
Course.belongsTo(Section, {
  foreignKey: 'courseSectionId',
  constraints: false
});

Course.hasMany(Session);
Course.belongsTo(Session, {
  through: 'CourseSession',
  foreignKey: 'courseSessionId',
  constraints: false
});

module.exports = {
  User,
  Course,
  Session,
  Section
}
