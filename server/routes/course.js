const router = require('express').Router();
const { Course, Section, Session } = require('../db/models');
module.exports = router;

router.param('courseId', (req, res, next, courseId) => {
  Course.findOne({
    where: {id: courseId},
    attributes: ['id', 'description', 'name'],
    include: [{model: Section}, {model: Session}]
  })
  .then(course => {
    req.course = course
    next()
  })
});

router.get('/', (req, res, next) => {
  Course.findAll({
    attributes: ['id', 'description', 'name'],
    include: [{model: Section}, {model: Session}]
  })
  .then(courses => res.json(courses))
  .catch(next)
});

router.get('/:courseId', (req, res, next) => {
  res.send(req.course)
});
