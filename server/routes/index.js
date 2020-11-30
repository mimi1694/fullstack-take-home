const router = require('express').Router();
module.exports = router;

router.use('/users', require('./user'));
router.use('/courses', require('./course'));
router.use('/sessions', require('./session'));
router.use('/sections', require('./section'));

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
});
