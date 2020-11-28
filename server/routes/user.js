const router = require('express').Router();
const { User, Section } = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  User.findAll({
    attributes: ['id', 'email', 'name'],
    include: [{model: Section}]
  })
  .then(users => res.json(users))
  .catch(next)
});

router.get('/:userId', (req, res, next) => {
  res.send(req.user)
});

router.post('/', (req, res, next) => {
  User.findOrCreate({
    where: { email: req.body.email,
             name: req.body.name }
  })
    .then(arr => {
      if (arr[1]) {
        res.send(arr[0])
      }
      else {
        let err = new Error('An account already exists for that email address')
        err.status = 409
        next(err)
      }
    })
    .catch(next)
});
