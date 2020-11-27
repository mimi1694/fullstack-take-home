const User = require('./user');
const Course = require('./course');

User.hasMany(Course);
Course.hasMany(User);

module.exports = {
  User,
  Course
}
