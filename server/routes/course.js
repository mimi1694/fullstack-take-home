const router = require('express').Router();
const { Course } = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  Course.findAll({
    attributes: ['id', 'description', 'name']
  })
  .then(courses => res.json(courses))
  .catch(next)
});
